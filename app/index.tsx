import { useEffect, useState } from 'react';
import { useRootNavigationState, Redirect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/userStore';
import { Session } from '@supabase/supabase-js';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const rootNavigationState = useRootNavigationState();
  const setUser = useUserStore((state) => state.setUser);
  const setSessionStore = useUserStore((state) => state.setSession);

  useEffect(() => {
    let isMounted = true;
    const handleSession = async (session: Session | null) => {
      if (isMounted) {
        setSession(session);
        setSessionStore(session);
        console.log("Session:", session);

        if (session?.user) {
          setUser(session.user);
          console.log("User:", session.user);
        } else {
          setUser(null);
          console.log("No user found in session.");
        }
      }
    };

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Error fetching session:", error);
        handleSession(null);
        return;
      }
      handleSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [setSessionStore, setUser]);

  if (!rootNavigationState?.key) {
    return null;
  }

  if (session === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (session) {
    return <Redirect href="/(home)/home" />;
  } else {
    return <Redirect href="/(auth)/landing" />;
  }
}
