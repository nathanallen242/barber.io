import { create } from 'zustand';
import { Availability } from '@/types/models';
import { supabase } from '@/server/client';
import { formatDate } from '@/utils/date';
import { IAvailabilityEvent, availabilityToEventItem } from '@/types/availability.types';

/**
 * Status indicates whether the event is only local ('new'/'updated'/'deleted')
 * or in sync with the server ('synced').
 */
export type EventStatus = 'synced' | 'new' | 'updated' | 'deleted';

export interface AvailabilityMeta {
  data: Availability;
  status: EventStatus;
}

interface AvailabilityState {
  /**
   * Stores all events, including those fetched from Supabase
   * and any local changes not yet persisted.
   */
  events: Map<string, AvailabilityMeta>;

  /**
   * Indicates network or other loading states for UI.
   */
  isLoading: boolean;
  error: string | null;

  /**
   * Called when you fetch events from Supabase. This replaces the current
   * store with a new Map, all having status 'synced'.
   */
  initializeEvents: (serverEvents: Availability[]) => void;

  /**
   * Creates a new Availability in the local store with status 'new'.
   */
  addEvent: (newEvent: Availability) => void;

  /**
   * Updates an existing Availability. If it was 'synced', it becomes 'updated'.
   * If it was 'new', it stays 'new'.
   */
  updateEvent: (id: string, updates: Partial<Availability>) => void;

  /**
   * If 'new', removes it entirely. If 'synced' or 'updated', marks as 'deleted'.
   */
  deleteEvent: (id: string) => void;

  /**
   * Returns a list of IAvailabilityEvent for calendar rendering,
   * omitting 'deleted' items so they don't appear.
   */
  getCalendarEvents: () => Array<IAvailabilityEvent & { status: EventStatus }>;

  /**
   * Can be used later to do a single Supabase batch commit of
   * 'new'/'updated'/'deleted' items.
   */
  commitChanges: () => Promise<void>;

  /**
   * Helpers for controlling loading/error states in UI.
   */
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAvailabilityStore = create<AvailabilityState>((set, get) => ({
  events: new Map<string, AvailabilityMeta>(),
  isLoading: false,
  error: null,

  initializeEvents: (serverEvents) => {
    const map = new Map<string, AvailabilityMeta>();
    serverEvents.forEach((evt) => {
      map.set(evt.id, {
        data: evt,
        status: 'synced',
      });
    });
    set({ events: map });
  },

  addEvent: (newEvent) => {
    set((state) => {
      const eventsCopy = new Map(state.events);
      eventsCopy.set(newEvent.id, {
        data: newEvent,
        status: 'new',
      });
      return { events: eventsCopy };
    });
  },

  updateEvent: (id, updates) => {
    set((state) => {
      const eventsCopy = new Map(state.events);
      const existing = eventsCopy.get(id);
      if (!existing) {
        return { events: eventsCopy };
      }
      const updatedData = { ...existing.data, ...updates };
      const nextStatus = existing.status === 'new' ? 'new' : 'updated';
      eventsCopy.set(id, {
        data: updatedData,
        status: nextStatus,
      });
      return { events: eventsCopy };
    });
  },

  deleteEvent: (id) => {
    set((state) => {
      const eventsCopy = new Map(state.events);
      const existing = eventsCopy.get(id);
      if (!existing) {
        return { events: eventsCopy };
      }
      if (existing.status === 'new') {
        // Remove entirely if never synced
        eventsCopy.delete(id);
      } else {
        // Mark as 'deleted'
        eventsCopy.set(id, {
          ...existing,
          status: 'deleted',
        });
      }
      return { events: eventsCopy };
    });
  },

  getCalendarEvents: () => {
    const state = get();
    return Array.from(state.events.values())
      .filter(({ status }) => status !== 'deleted')
      .map(({ data, status }) => ({
        ...availabilityToEventItem(data),
        status,
      }));
  },

  commitChanges: async () => {
    try {
      set({ isLoading: true });

      const events = useAvailabilityStore((state) => state.events);
      const newEvents: Availability[] = [];
      const updatedEvents: Availability[] = [];
      const deletedEvents: Availability[] = [];

      // Separate local changes by status
      events.forEach(({ data, status }) => {
        if (status === 'new') newEvents.push(data);
        if (status === 'updated') updatedEvents.push(data);
        if (status === 'deleted') deletedEvents.push(data);
      });

      // 1) Upsert (insert or update) all 'new' & 'updated'
      const upsertList = [...newEvents, ...updatedEvents];
      if (upsertList.length > 0) {
        const formattedList = upsertList.map(avail => ({
          ...avail,
          date: formatDate(avail.date),
      }));
        const { error: upsertError } = await supabase
          .from('availability')
          .upsert(formattedList, { onConflict: 'id' });

        if (upsertError) {
          throw new Error(upsertError.message);
        }
      }

      // 2) Delete all 'deleted'
      if (deletedEvents.length > 0) {
        const idsToDelete = deletedEvents.map((evt) => evt.id);
        const { error: deleteError } = await supabase
          .from('availability')
          .delete()
          .in('id', idsToDelete);

        if (deleteError) {
          throw new Error(deleteError.message);
        }
      }

      // 3) Mark 'new' and 'updated' as 'synced', remove 'deleted'
      set((state) => {
        const eventsCopy = new Map(state.events);

        newEvents.forEach((evt) => {
          eventsCopy.set(evt.id, { data: evt, status: 'synced' });
        });
        updatedEvents.forEach((evt) => {
          eventsCopy.set(evt.id, { data: evt, status: 'synced' });
        });
        deletedEvents.forEach((evt) => {
          eventsCopy.delete(evt.id);
        });

        return { events: eventsCopy };
      });
    } catch (err: any) {
      console.error(err);
      get().setError(err?.message || 'Unknown error occurred during commit.');
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));

