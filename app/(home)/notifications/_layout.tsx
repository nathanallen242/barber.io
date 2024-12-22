import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '@/store/userStore';

export default function NotificationsLayout() {
  const router = useRouter();
  const setNotifications = useUserStore((state) => state.setNotifications);
  
  return (
    <Stack
      screenOptions={{
        title: 'Notifications',
        headerTitleStyle: {
          fontFamily: 'Poppins_300Light',
          fontSize: 17,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
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
            <Ionicons name="remove-circle-sharp" size={24} color="black" />
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