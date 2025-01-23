import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore'
import { supabase } from '@/server/client';
import { UserProfile, UserRole } from '@/types/models';
import { CountryCode } from 'react-native-country-picker-modal';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserProfile | null;
  session: any | null;
  error: string | null;
}

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return { user: null, session: null, error: error.message };
    }

    if (user && session) {
      const userProfile: UserProfile = {
        ...user,
        email: user.email || '',
      };
      
      useUserStore.setState({ user: userProfile, session });
      return { user: userProfile, session, error: null };
    }

    return { user: null, session: null, error: 'Unknown authentication error' };
  } catch (err: any) {
    return { user: null, session: null, error: err.message || 'Login failed' };
  }
}

export interface RegisterCredentials {
  email: string;
  password: string;
  forename: string;
  surname: string;
  role: UserRole;
  country: CountryCode;
}

export interface RegisterResponse {
  user: UserProfile | null;
  session: any | null;
  error: string | null;
}

export async function registerUser(credentials: RegisterCredentials): Promise<RegisterResponse> {
  try {
    const { data: { user, session }, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          forename: credentials.forename,
          surname: credentials.surname,
          email: credentials.email,
          job_role: credentials.role,
          country: credentials.country
        }
      }
    });

    if (error) {
      return { user: null, session: null, error: error.message };
    }

    if (user && session) {
      const userProfile: UserProfile = {
        ...user,
        forename: credentials.forename,
        surname: credentials.surname,
        profile_picture: "https://robohash.org/F54.png?set=set1&size=200x200",
        email: credentials.email,
        job_role: credentials.role,
        country: credentials.country,
      };

      useUserStore.setState({ user: userProfile, session });
      return { user: userProfile, session, error: null };
    }

    return { user: null, session: null, error: 'Registration failed' };
  } catch (err: any) {
    return { user: null, session: null, error: err.message || 'Registration failed' };
  }
}

/* Asynchronous logout using Supabase SDK */
export const useHandleLogOut = () => {
  const clearUser = useUserStore((state) => state.clearUser);
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

