import { useAvailabilityStore } from "@/store/availabilityStore";
import { Availability, Period } from "@/types/models";
import { supabase } from "@/server/client";
import { formatDate } from "@/utils/date";

export async function initializeAvailability(barberId: string): Promise<Availability[]> {
  const store = useAvailabilityStore.getState();
  store.setLoading(true);

  try {
    const { data, error } = await supabase
      .rpc('get_barber_availability', { p_barber_id: barberId });

    if (error) throw error;
    
    const availabilities: Availability[] = data.map((row: any) => ({
      ...row,
      date: row.date,
      start_time: new Date(row.start_time),
      end_time: new Date(row.end_time),
      period: row.period as Period
    }));
    
    store.initializeEvents(availabilities);
    store.setLoading(false);

    return availabilities;
  } catch (error: any) {
    store.setError(error.message || 'An unknown error occurred');
    store.setLoading(false);
    throw error;
  }
}

export async function fetchAvailability(barberId: string): Promise<{
  availability: any[];
  error: string | null;
}> {
  try {
    const { data, error } = await supabase
      .rpc('get_barber_availability', { p_barber_id: barberId });

    if (error) {
      console.error('Error fetching barber availability:', error);
      return { availability: [], error: error.message };
    }

    return { 
      availability: data || [], 
      error: null 
    };
  } catch (err: any) {
    return { 
      availability: [], 
      error: err.message 
    };
  }
}

export async function updateAvailability(
  newEvents: Availability[], 
  updatedEvents: Availability[]
): Promise<void> {
  const store = useAvailabilityStore.getState();
  store.setLoading(true);

  try {
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

    store.initializeEvents([...newEvents, ...updatedEvents]);
    store.setLoading(false);
  } catch (error: any) {
    store.setError(error.message || 'Update error');
    store.setLoading(false);
    throw error;
  }
}

export async function deleteAvailability(eventsToDelete: Availability[]): Promise<void> {
  const store = useAvailabilityStore.getState();
  if (eventsToDelete.length === 0) return;

  try {
    const idsToDelete = eventsToDelete.map((evt) => evt.id);
    const { error: deleteError } = await supabase
      .from('availability')
      .delete()
      .in('id', idsToDelete);

    if (deleteError) {
      throw new Error(deleteError.message);
    }
  } catch (error: any) {
    store.setError(error.message || 'Delete error');
    throw error;
  }
}