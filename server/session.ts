import { supabase } from '@/server/client';
import { Session } from '@supabase/supabase-js';

export async function fetchInitialSession(): Promise<Session | null> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) return null;
    return session;
  } catch {
    return null;
  }
}

export function subscribeToAuthChanges(
  handleSessionChange: (session: Session | null) => void
) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      handleSessionChange(session);
    }
  );

  return () => subscription?.unsubscribe();
}