import { Stack, useRouter, useSegments } from 'expo-router';
import { Popable } from 'react-native-popable';
import { useRef, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { useUserStore } from '@/store/userStore';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AppointmentsLayout() {
  const router = useRouter();
  const segments = useSegments();

  const { colors, typography } = useThemeStore();
  const { user } = useUserStore();
  const isBarber = user?.job_role === 'barber';

  const [popableVisible, setPopableVisible] = useState(false);
  const togglePopable = () => {
    setPopableVisible((prev) => !prev);
  };
  const navigateToRoute = (route: any) => {
    // Hide popover, then navigate
    setPopableVisible(false);
    router.push(route);
  };
  const popableContent = (
    <View>
      <TouchableOpacity
        style={{ padding: 8 }}
        onPress={() =>
          navigateToRoute(
            isBarber
              ? '/(home)/appointments/(availability)/schedule'
              : '/(home)/appointments/(booking)/services'
          )
        }
      >
        <Text style={{ fontFamily: typography.fonts.regular }}>
          {isBarber ? 'Add Availability' : 'Book Appointment'}
        </Text>
      </TouchableOpacity>
    </View>
  );

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
          color: colors.text,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      {/* Main Appointments Screens */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitle: 'Your Appointments',
          headerRight: () => (
            <Popable
              visible={popableVisible}
              position="bottom"
              backgroundColor="white"
              content={popableContent}
              onAction={(visible) => {
                if (!visible) setPopableVisible(false);
              }}
            >
              <TouchableOpacity onPress={togglePopable}>
                <Ionicons name="add" size={20} color={colors.icon} />
              </TouchableOpacity>
            </Popable>
          ),
        }}
      />

      {isBarber ? (
        // If barber, show (availability) instead of (booking) & (confirmation)
        <Stack.Screen
          name="(availability)"
          options={{
            headerTitle: 'Your Availability'
          }}
        />
      ) : (
        // If client, show (booking) and (confirmation)
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
