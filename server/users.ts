import { supabase } from './client';
import { UserProfile, UserRole } from '../types/models';

export async function fetchUsers(role: UserRole): Promise<{
    users: UserProfile[];
    error: string | null;
  }> {
    try {
      const viewName = role === 'barber' ? 'barber_view' : 'client_view'
      const { data: users, error: supabaseError } = await supabase
        .from(viewName)
        .select('*');
  
      if (supabaseError) {
        throw supabaseError;
      }
  
      return { 
        users: users || [], 
        error: null 
      };
    } catch (error: any) {
      return { 
        users: [], 
        error: error.message 
      };
    }
  }