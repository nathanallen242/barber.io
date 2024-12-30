import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Pressable, ActivityIndicator, Text, ScrollView } from 'react-native';
import Notification from '@/components/notifs/Notification';
import { screenDimensions } from '@/utils/screenDimensions';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';

export default function Notifications() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(Boolean);
  const { colors, typography } = useThemeStore();

  const handleDismiss = (id: string) => {
    console.log("Dismiss notifications...")
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // useEffect(() => {
  //   if (notifications.length === 0) {
  //     setNotifications([
  //       {
  //         id: '1',
  //         title: 'Test Notification',
  //         body: 'Test content',
  //         is_read: false,
  //         created_at: '2024091011:11:35DZ',
  //         delivery_method: 'push',
  //         type: 'reminder'
  //       },
  //       {
  //           id: '2',
  //           title: 'Test Notification',
  //           body: 'Test content',
  //           is_read: false,
  //           created_at: '2024091011:11:35DZ',
  //           delivery_method: 'push',
  //           type: 'reminder'
  //         },
  //         {
  //           id: '3',
  //           title: 'Test Notification',
  //           body: 'Test content',
  //           is_read: false,
  //           created_at: '2024091011:11:35DZ',
  //           delivery_method: 'push',
  //           type: 'reminder'
  //         },
  //         {
  //           id: '4',
  //           title: 'Test Notification',
  //           body: 'Test content',
  //           is_read: false,
  //           created_at: '2024091011:11:35DZ',
  //           delivery_method: 'push',
  //           type: 'reminder'
  //         },
  //         {
  //           id: '5',
  //           title: 'Test Notification',
  //           body: 'Test content',
  //           is_read: false,
  //           created_at: '2024091011:11:35DZ',
  //           delivery_method: 'push',
  //           type: 'reminder'
  //         }
  //     ]);
  //   }
  // }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        {refreshing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color="#7A94FE" />
        </View>
      )}
      {true ? (
        <View style={styles.noNotificationsContainer}>
            <Text style={styles.noNotificationsText}>No notifications at this time.</Text>
        </View>
        ) : (
        <FlatList
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: screenDimensions.screenHeight * 0.8,
  },
  noNotificationsText: {
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    color: '#777',
  },  
});
