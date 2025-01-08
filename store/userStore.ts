import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Session } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserProfile } from '../types/models';

type UserStore = {
  session: Session | null;
  user: UserProfile | null;
  setSession: (session: Session | null) => void;
  setUser: (user: Partial<UserProfile> | null) => void;
  clearUser: () => void;
};

export const asyncStorage = {
  getItem: async (key: string) => {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error("Error getting item from AsyncStorage:", error);
      return null;
    }
  },
  setItem: async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting item in AsyncStorage:", error);
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from AsyncStorage:", error);
    }
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => {
      const updateAuthState = (
      user: UserProfile | null,
      session: Session | null,
      ) => {
        set({
          user,
          session
        });
      };

      return {
        user: null,
        session: null,
        setUser: (newUserData) => {
          const currentUser = get().user;
          const updatedUser = newUserData ? {
            ...currentUser,
            ...newUserData
          } : null;
          updateAuthState(updatedUser as UserProfile | null, get().session);
        },
        setSession: (session) => {
          updateAuthState(get().user, session);
        },
        clearUser: () => {
          updateAuthState(null, null);
        },
      };
    },
    {
      name: 'auth-storage',
      storage: asyncStorage,
      partialize: (state) => ({
        user: state.user,
        session: state.session,
      }),
    }
  )
);
