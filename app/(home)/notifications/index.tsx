import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Pressable, ActivityIndicator, Text } from 'react-native';
import Notification from '@/components/notifs/Notification';
import { screenDimensions } from '@/utils/screenDimensions';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore';

export default function Notifications() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(Boolean);
  const notifications = useUserStore((state) => state.notifications) || [];
  const setNotifications = useUserStore((state) => state.setNotifications);

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    if (notifications.length === 0) {
      setNotifications([
        {
          id: '1',
          title: 'Test Notification',
          body: 'Test content',
          is_read: false,
          created_at: '2024091011:11:35DZ',
          delivery_method: 'push',
          type: 'reminder'
        },
        {
            id: '2',
            title: 'Test Notification',
            body: 'Test content',
            is_read: false,
            created_at: '2024091011:11:35DZ',
            delivery_method: 'push',
            type: 'reminder'
          },
          {
            id: '3',
            title: 'Test Notification',
            body: 'Test content',
            is_read: false,
            created_at: '2024091011:11:35DZ',
            delivery_method: 'push',
            type: 'reminder'
          },
          {
            id: '4',
            title: 'Test Notification',
            body: 'Test content',
            is_read: false,
            created_at: '2024091011:11:35DZ',
            delivery_method: 'push',
            type: 'reminder'
          },
          {
            id: '5',
            title: 'Test Notification',
            body: 'Test content',
            is_read: false,
            created_at: '2024091011:11:35DZ',
            delivery_method: 'push',
            type: 'reminder'
          }
      ]);
    }
  }, []);

  return (
    <View style={styles.container}>
        {refreshing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color="#7A94FE" />
        </View>
      )}
      {notifications.length === 0 ? (
        <View style={styles.noNotificationsContainer}>
            <Text style={styles.noNotificationsText}>No notifications at this time.</Text>
        </View>
        ) : (
        <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <Pressable onPress={() => router.push({ pathname: '/(home)/notifications/[id]', params: { id: item.id } })}>
                <Notification notification={item} onDismiss={handleDismiss} />
            </Pressable>
            )}
            contentContainerStyle={styles.listContainer}
            onScroll={({ nativeEvent }) => {
            if (nativeEvent.contentOffset.y < -50 && !refreshing) {
                handleRefresh();
            }
            }}
            scrollEventThrottle={16}
        />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: screenDimensions.screenHeight * 0.40,
    alignItems: 'center',
    zIndex: 999
  },
  noNotificationsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noNotificationsText: {
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    color: '#777',
  },  
});
