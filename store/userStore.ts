import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Session } from '@supabase/supabase-js';
import { UserProfile, Notification } from '@/types/models';
import { LargeSecureStore } from '@/lib/supabase';

type UserStore = {
  session: Session | null;
  user: UserProfile | null;
  notifications: Notification[] | null;
  setSession: (session: Session | null) => void;
  setUser: (user: UserProfile | null) => void;
  setNotifications: (notifications: Notification[] | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => {
      const updateAuthState = (
      user: UserProfile | null,
      session: Session | null,
      notifications: Notification[] | null,
      ) => {
        set({
          user,
          session,
          notifications,
        });
      };

      return {
        user: null,
        session: null,
        setUser: (user) => {
          updateAuthState(user, get().session, get().notifications);
        },
        setSession: (session) => {
          updateAuthState(get().user, session, get().notifications);
        },
        setNotifications: (notifications) => {
          updateAuthState(get().user, get().session, notifications)
        },
        clearUser: () => {
          updateAuthState(null, null, null);
        },
      };
    },
    {
      name: 'auth-storage',
      storage: LargeSecureStore,
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        notifications: state.notifications,
      }),
    }
  )
);
