import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeStore } from '@/store/themeStore';
import { useUserStore } from '@/store/userStore';

export default function NotificationsLayout() {
  const router = useRouter();
  const { colors, typography } = useThemeStore();
  const setNotifications = useUserStore((state) => state.setNotifications);
  
  return (
    <Stack
      screenOptions={{
        title: 'Notifications',
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
          <TouchableOpacity 
            onPress={() => {
              Alert.alert(
                'Confirm',
                'Are you sure you want to dismiss all notifications?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Yes', onPress: () => setNotifications([]) }
                ]
              );
            }}
          >
            <Ionicons name="remove-circle-sharp" size={24} color={colors.icon} />
          </TouchableOpacity>
        )        
      }}
    >
      <Stack.Screen name="index" options={{
        animation: 'simple_push' }}/>
      <Stack.Screen name="[id]" options={{
        animation: 'fade_from_bottom',
        presentation: 'transparentModal',
        headerShown: false}} />
    </Stack>
  );
}