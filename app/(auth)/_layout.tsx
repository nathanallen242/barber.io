import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={({ route }) => {
        const isLanding = route.name === "landing";
        return {
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
          animation: isLanding ? 'default' : 'fade_from_bottom',
          presentation: isLanding ? 'card' : 'modal',
          gestureEnabled: !isLanding,
        };
      }}
    >
      {/* Landing Page */}
      <Stack.Screen
        name="landing"
        options={{
          animation: 'default',
          gestureEnabled: false,
        }}
      />

      {/* Login Screen */}
      <Stack.Screen
        name="login"
        options={{
          animation: 'fade_from_bottom',
          presentation: 'modal',
        }}
      />

      {/* Register Screen */}
      <Stack.Screen
        name="register"
        options={{
          animation: 'fade_from_bottom',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
