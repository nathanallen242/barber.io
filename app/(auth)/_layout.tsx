import { Stack } from 'expo-router';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export default function Layout() {
  const commonScreenOptions: NativeStackNavigationOptions = {
    animation: 'fade_from_bottom',
    presentation: 'modal',
  };

  const screens = [
    {
      name: 'landing',
      options: {
        animation: 'default' as const,
        gestureEnabled: false,
      },
    },
    { name: 'login', options: commonScreenOptions },
    { name: 'register', options: commonScreenOptions },
    { name: 'forgot-password', options: commonScreenOptions },
  ];

  return (
    <Stack
      screenOptions={({ route }) => {
        const isLanding = route.name === 'landing';
        return {
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
          animation: isLanding ? 'default' : 'fade',
          presentation: isLanding ? 'card' : 'modal',
          gestureEnabled: !isLanding,
        };
      }}
    >
      {screens.map(({ name, options }) => (
        <Stack.Screen key={name} name={name} options={options as NativeStackNavigationOptions} />
      ))}
    </Stack>
  );
}
