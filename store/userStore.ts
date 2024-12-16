import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Session, User } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserStore = {
  session: Session | null;
  user: User | null;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

const customStorage = {
  getItem: async (name: string) => {
    const item = await AsyncStorage.getItem(name);
    return item ? JSON.parse(item) : null; 
  },
  setItem: async (name: string, value: any) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => {
      const updateAuthState = (user: User | null, session: Session | null) => {
        set({
          user,
          session,
        });
      };

      return {
        user: null,
        session: null,
        setUser: (user) => {
          updateAuthState(user, get().session);
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
      storage: customStorage,
      partialize: (state) => ({
        user: state.user,
        session: state.session,
      }),
    }
  )
);
