import { Stack, useRouter, useSegments } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AvailabilityLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { colors, typography } = useThemeStore();

  // Check current route
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
    }}>
      {/* Main Availability Screen */}
      <Stack.Screen
        name="schedule"
        options={{
            headerTitle: "Schedule",
            headerRight: () => (
              <>
              <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => console.log('Batch event creation/deletion')}>
                <Ionicons name="calendar-outline" size={24} color={colors.icon} />
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => console.log('Confirm all events before making batch API call')}>
                <Ionicons name="checkbox" size={24} color={colors.icon} />
              </TouchableOpacity>
              </>
            )
        }}
      />
    </Stack>
  );
}
