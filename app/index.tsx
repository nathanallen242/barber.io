import { useEffect, useState } from 'react';
import { useRootNavigationState, Redirect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/userStore';
import { useThemeStore } from '@/store/themeStore';
import { Session } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const rootNavigationState = useRootNavigationState();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setSessionStore = useUserStore((state) => state.setSession);
  const setThemeMode = useThemeStore((state) => state.setThemeMode);

  useEffect(() => {
    async function loadTheme() {
      const storedTheme = await AsyncStorage.getItem('theme-storage');
      if (storedTheme) {
        const { state } = JSON.parse(storedTheme);
        setThemeMode(state.mode);
      }
      setThemeLoaded(true);
    }
    loadTheme();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const handleSession = async (session: Session | null) => {
      if (isMounted) {
        setSession(session);
        setSessionStore(session);

        if (session?.user) {
          setUser(session.user);
          console.log(JSON.stringify(user, null, 2))
        } else {
          setUser(null);
        }
      }
    };

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
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

  if (!rootNavigationState?.key || !themeLoaded) {
    return null;
  }

  if (session === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (session) {
    return <Redirect href="/(home)/home"/>;
  } else {
    return <Redirect href="/(auth)/onboarding" />;
  }
}
