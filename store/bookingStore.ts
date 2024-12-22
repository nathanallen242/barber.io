import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PublicUser, Availability, Service } from '@/types/models';
import { LargeSecureStore } from '@/lib/supabase';

type BookingStore = {
  selectedService: Service | null;
  selectedBarber: PublicUser | null;
  bookedAppointment: boolean;
  selectedAvailability: Availability | null;
  setSelectedService: (service: Service | null) => void;
  setSelectedBarber: (barber: PublicUser | null) => void;
  setBookedAppointment: (booked: boolean) => void;
  setSelectedAvailability: (availability: Availability | null) => void;
  clearBooking: () => void;
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      selectedService: null,
      selectedBarber: null,
      bookedAppointment: false,
      selectedAvailability: null,
      setSelectedService: (service) => set({ selectedService: service }),
      setSelectedBarber: (barber) => set({ selectedBarber: barber }),
      setBookedAppointment: (booked) => set({ bookedAppointment: booked }),
      setSelectedAvailability: (availability) => set({ selectedAvailability: availability }),
      clearBooking: () => set({
        selectedService: null,
        selectedBarber: null,
        bookedAppointment: false,
        selectedAvailability: null,
      }),
    }),
    {
      name: 'booking-storage',
      storage: LargeSecureStore,
      partialize: (state) => ({
        service: state.selectedService,
        barber: state.selectedBarber,
        availability: state.selectedAvailability
      }),
    }
  )
);
