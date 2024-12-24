import { Stack, useRouter, useSegments } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AppointmentsLayout() {
  const router = useRouter();
  const segments = useSegments();

  const isAppointmentScreen = (): boolean => {
    const appointmentRoutes = [
      '(home)/appointments/(tabs)/scheduled',
      '(home)/appointments/(tabs)/completed',
      '(home)/appointments/(tabs)/cancelled',
    ];

    const currentRoute = segments.join('/');
    return appointmentRoutes.some((route) => currentRoute === route);
  };

  const navigateHome = () => {
    router.push('/(home)/home');
  };

  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            onPress={isAppointmentScreen() ? navigateHome : () => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      {/* Main Appointments Screens */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitle: 'Your Appointments',
          headerTitleStyle: {
            fontFamily: 'Poppins_300Light',
            fontSize: 17,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/(home)/appointments/(booking)/category')}
            >
              <Ionicons name="add" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(booking)"
        options={{
          headerTitle: 'Book an Appointment',
          headerTitleStyle: {
            fontFamily: 'Poppins_300Light',
            fontSize: 17,
          }
        }}
      />
      <Stack.Screen
        name="(confirmation)"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}
