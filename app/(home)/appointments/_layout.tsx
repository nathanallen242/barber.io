import { Stack, useRouter, useSegments } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { useUserStore } from '@/store/userStore';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AppointmentsLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { user } = useUserStore();
  const { colors, typography } = useThemeStore();

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
  const isBarber = user?.job_role === "barber"

  return (
    <Stack
      screenOptions={{
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
            <TouchableOpacity
              onPress={() =>
                router.push(
                  isBarber
                    ? '/(home)/appointments/(availability)/schedule'
                    : '/(home)/appointments/(booking)/services'
                )
              }
            >
              <Ionicons name="add" size={20} color={colors.icon} />
            </TouchableOpacity>
          ),
        }}
      />
      {isBarber ? (
        /*  If barber, show (availability) instead of (booking) & (confirmation) */
        <Stack.Screen
          name="(availability)"
          options={{
            headerTitle: 'Set Your Availability',
          }}
        />
      ) : (
        /*  If client, show (booking) and (confirmation), but not (availability) */
        <>
          <Stack.Screen
            name="(booking)"
            options={{
              headerTitle: 'Book an Appointment',
            }}
          />
          <Stack.Screen
            name="(confirmation)"
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack>
  );
}
