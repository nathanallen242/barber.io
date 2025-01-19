import { useAvailabilityStore } from "@/store/availabilityStore";
import { Availability, Period } from "@/types/models";
import { supabase } from "@/lib/supabase";

export const fetchAvailability = async (barberId: string) => {
    const store = useAvailabilityStore.getState();
    store.setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('availability')
        .select('*')
        .eq('barber_id', barberId);
        
      if (error) throw error;
      
      // Convert the raw database rows to Availability type
      const availabilities: Availability[] = data.map(row => ({
        ...row,
        date: row.date,
        start_time: new Date(row.start_time),
        end_time: new Date(row.end_time),
        period: row.period as Period
      }));
      
      store.initializeEvents(availabilities);
      // console.log(JSON.stringify(availabilities, null, 2))
      return availabilities;
    } catch (error: any) {
        if (error instanceof Error) {
            store.setError(error.message);
          } else {
            store.setError('An unknown error occurred');
          }
        throw error;
    }
};