import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeStore } from '@/store/themeStore';
import { useRouter } from 'expo-router';

export default function SearchLayout() {
  const { sharedColors, mode, colors } = useThemeStore();
  const router = useRouter();
  return (
    <Stack
    screenOptions={{
        title: 'Notifications',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={sharedColors.white} />
          </TouchableOpacity>
        )
    }}
    >
      <Stack.Screen name="index" options={{
        title: "Search",
        headerTitleStyle: {
            fontFamily: 'Poppins_300Light',
            fontSize: 18,
            color: sharedColors.white
          },
        headerStyle: {
          backgroundColor: colors.background
        },
        animation: 'slide_from_bottom',
        animationDuration: 200,
      }}/>
    </Stack>
  );
}