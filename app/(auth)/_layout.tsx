import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 750,
      }}
    >
      <Stack.Screen
        name="onboarding"
      />
      <Stack.Screen
        name="landing"
      />
      <Stack.Screen
        name="login"
      />
      <Stack.Screen
        name="register"
      />
      <Stack.Screen
        name="forgot-password"
      />
    </Stack>
  );
}
