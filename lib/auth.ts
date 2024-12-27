// useHandleLogOut.ts
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore'
import { supabase } from '@/lib/supabase';

export const useHandleLogOut = () => {
  const { clearUser } = useUserStore();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await supabase.auth.signOut();
      clearUser();
      console.log("User logged out successfully!");
      router.replace('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return handleLogOut;
};
