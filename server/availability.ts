import { useAvailabilityStore } from "@/store/availabilityStore";
import { Availability, Period } from "@/types/models";
import { supabase } from "@/server/client";

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