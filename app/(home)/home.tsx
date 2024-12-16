import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/store/userStore';

export default function Home() {
  const { user, clearUser } = useUserStore();
  const router = useRouter();
  console.log("User details:", user)

  const handleLogOut = async () => {
    try {
      await supabase.auth.signOut();
      clearUser();
      console.log("User logged out successfully!")
      router.replace('/')
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Your Home Screen!</Text>
        <Text style={styles.subtitle}>This is where you can manage your barbershop experience.</Text>

        {user ? (
          <>
            <Text style={styles.email}>Email: {user?.email}</Text>
            <Text style={styles.confirmedAt}>
              Email Confirmed At: {user?.email_confirmed_at ? new Date(user.email_confirmed_at).toLocaleString() : 'Not confirmed'}
            </Text>
            <Button onPress={handleLogOut} variant="secondary">
              Log Out
            </Button>
          </>
        ) : (
          <Text style={styles.subtitle}>Please log in to see your details.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  email: {
    fontSize: 16,
    marginTop: 10,
  },
  confirmedAt: {
    fontSize: 16,
    marginTop: 5,
  },
});
