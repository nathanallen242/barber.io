import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeStore } from '@/store/themeStore';
import { useRouter } from 'expo-router';

export default function SearchLayout() {
  const { colors, typography } = useThemeStore();
  const router = useRouter();
  return (
    <Stack
    screenOptions={{
        title: 'Notifications',
        headerShadowVisible: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.icon} />
          </TouchableOpacity>
        )
    }}
    >
      <Stack.Screen name="index" options={{
        title: "Search",
        headerTitleStyle: {
            fontFamily: typography.fonts.light,
            fontSize: typography.sizes.lg,
            color: colors.text
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