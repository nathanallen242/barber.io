import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, Service } from '@/types/models';
import { asyncStorage } from '@/store/userStore';

type BookingStore = {
  selectedService: Service | null;
  selectedBarber: UserProfile | null;
  setSelectedService: (service: Service | null) => void;
  setSelectedBarber: (barber: UserProfile | null) => void;
  clearBooking: () => void;
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      selectedService: null,
      selectedBarber: null,
      setSelectedService: (service) => set({ selectedService: service }),
      setSelectedBarber: (barber) => set({ selectedBarber: barber }),
      clearBooking: () => set({
        selectedService: null,
        selectedBarber: null,
      }),
    }),
    {
      name: 'booking-storage',
      storage: asyncStorage,
      partialize: (state) => ({
        service: state.selectedService,
        barber: state.selectedBarber,
      }),
    }
  )
);
