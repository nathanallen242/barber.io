import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeStore } from '@/store/themeStore';

export default function ProfileLayout() {
  const router = useRouter();
  const { colors, typography } = useThemeStore();
  return (
      <Stack
        initialRouteName='[id]'
        screenOptions={{
        title: 'Profile',
        headerTitleStyle: {
          fontFamily: typography.fonts.light,
          fontSize: typography.sizes.md,
          color: colors.text
        },
        headerShadowVisible: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.icon} />
          </TouchableOpacity>
        ),
        }}
      >

      <Stack.Screen name='[id]' />
      <Stack.Screen 
        options={{
          headerTitle: 'Bio-data',
          headerTitleStyle: {
            fontFamily: typography.fonts.light,
            fontSize: typography.sizes.md,
            color: colors.text
          },
          headerShadowVisible: true,
          headerStyle: {
            backgroundColor: colors.background,
          }
        }}
        name='edit' />
    </Stack>
  );
}