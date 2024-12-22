import { Stack } from 'expo-router';

export default function ServiceLayout() {
  return (
    <Stack
    initialRouteName="index"
    screenOptions={{
        headerShown: false,
    }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="[id]" options={{
        animation: 'fade_from_bottom',
        presentation: 'transparentModal',
        headerShown: false}} />
    </Stack>
  );
}