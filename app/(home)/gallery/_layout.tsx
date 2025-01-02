import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { useThemeStore } from '@/store/themeStore';

export default function GalleryLayout() {
  const router = useRouter();
  const { colors, typography } = useThemeStore();
  
  return (
    <Stack
      screenOptions={{
        title: 'Photo Gallery',
        headerShadowVisible: true,
        headerTitleStyle: {
          fontFamily: typography.fonts.light,
          fontSize: typography.sizes.md,
          color: colors.text
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.icon} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => console.log("Add modal which allows users to submit image, associated appointment & barber, style requested....")}>
            <AntDesign name="plus" size={24} color={colors.icon} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="index" options={{
        animation: 'simple_push' }}/>
    </Stack>
  );
}