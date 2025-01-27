import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        gestureEnabled: false,
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
        name="success"
       />
      <Stack.Screen
        name="forgot-password"
      />
    </Stack>
  );
}
