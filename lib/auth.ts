import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore'
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types/models';

/* Asynchronous logout using Supabase SDK */
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

/* Profile updates using Supabase SDK
Due to a private users table (auth.users) & public table (public.users),
we have to sync data between two sources of truth.
This method syncs data between raw_user_metadata & public.users columns
via a trigger.
*/

interface UpdateUserParams {
  userId: string;
  updates: Partial<UserProfile>;
}

export const updateUserProfile = async ({ userId, updates }: UpdateUserParams) => {
  if (!userId?.trim()) {
    throw new Error('User ID is required');
  }

  const { setUser, user: currentUser } = useUserStore.getState();

  try {
    // Format date if present
    const formattedUpdates = {
      ...updates,
      birth_date: updates.birth_date || null
    };

    // Update auth.users metadata first
    const { error: metadataError } = await supabase.auth.updateUser({
      data: {
        forename: updates.forename,
        surname: updates.surname,
        phone_number: updates.phone_number ?? null,
        birth_date: formattedUpdates.birth_date,
        country: updates.country,
        profile_picture: updates.profile_picture
      }
    });

    if (metadataError) throw metadataError;

    // Then update public.users
    const { data, error: publicError } = await supabase
      .from('users')
      .update(formattedUpdates)
      .eq('id', userId)
      .select<'*', UserProfile>()
      .single();

    if (publicError) throw publicError;

    // Update store only after successful DB updates
    setUser({
      ...currentUser,
      ...data,
      user_metadata: {
        ...currentUser?.user_metadata,
        ...formattedUpdates
      },
      password: undefined
    } as UserProfile);

    return { data, error: null };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { data: null, error };
  }
};

