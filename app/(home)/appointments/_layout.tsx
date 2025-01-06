import { Stack, useRouter, useSegments } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { useUserStore } from '@/store/userStore';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AppointmentsLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { user } = useUserStore();
  const { colors, typography } = useThemeStore();
  const isBarber = user?.job_role === "barber"

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

  const navigate = (barber: boolean) => {
    if (barber) {
      router.push('/(home)/appointments/(availability)/schedule');
    } else {
      router.push('/(home)/appointments/(booking)/services');
    }
  };
  
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={isAppointmentScreen() ? navigateHome : () => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color={colors.icon} />
          </TouchableOpacity>
        ),
        headerTitleStyle: {
          fontFamily: typography.fonts.light,
          fontSize: typography.sizes.md,
          color: colors.text
        },
        headerStyle: {
          backgroundColor: colors.background
        },
      }}
    >
      {/* Main Appointments Screens */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitle: 'Your Appointments',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigate(isBarber)}>
              <Ionicons name="add" size={20} color={colors.icon} />
            </TouchableOpacity>
          )          
        }}
      />
      
      <Stack.Screen
        name="(availability)"
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="(booking)"
        options={{ headerTitle: 'Book an Appointment' }}
      />
      
      <Stack.Screen
        name="(confirmation)"
        options={{ headerShown: false }}
      />

    </Stack>
  );
}
