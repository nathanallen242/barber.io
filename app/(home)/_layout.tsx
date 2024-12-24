import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import { useUserStore } from '@/store/userStore';
import { screenDimensions } from '@/utils/screenDimensions';
import CustomDrawerContent from '@/components/nav/CustomDrawerContent';

export default function HomeLayout() {
  const unseenNotifications = 2; // PLACEHOLDER
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Drawer 
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerHideStatusBarOnOpen: true,
        drawerActiveTintColor: '#7A94FE',
        drawerLabelStyle: {
          marginLeft: 25,
          fontSize: 20,
          fontFamily: 'Poppins_300Light',
        },
        drawerStyle: {
          width: screenDimensions.screenWidth * 0.61
        }
      }}>
      
      <Drawer.Screen
          name="home"
          options={{
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
            drawerLabel: 'Home',
            headerShown: true,
            headerTitle: 'barber.io',
            headerTitleStyle: {
              fontFamily: 'Poppins_300Light',
              fontSize: 20,
            },
            headerShadowVisible: false,
            headerLeft: () => {
              const navigation = useNavigation();
              return (
                  <TouchableOpacity 
                      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                      style={{ marginLeft: 15 }}
                  >
                      <Ionicons name="menu" size={screenDimensions.screenWidth * 0.08} color="black" />
                  </TouchableOpacity>
              );
          },
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 15, position: 'relative' }} onPress={() => router.push('/(home)/notifications')}>
                <Ionicons name="notifications-outline" size={screenDimensions.screenWidth * 0.06} color="black" />
                {unseenNotifications > 0 && (
                  <View style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    backgroundColor: '#FF3B30',
                    borderRadius: screenDimensions.screenWidth * 0.02,
                    paddingHorizontal: screenDimensions.screenWidth * 0.01,
                    paddingVertical: screenDimensions.screenHeight * 0.005,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{
                      color: '#FFFFFF',
                      fontSize: screenDimensions.screenWidth * 0.025,
                      fontWeight: 'bold',
                    }}>{unseenNotifications}</Text>
                  </View>
                )}
             </TouchableOpacity>
           )
          }}
        />
        <Drawer.Screen
          name="search"
          options={{
            drawerIcon: ({ size, color }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
            drawerLabel: 'Search',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="notifications"
          options={{
            drawerIcon: ({ size, color }) => (
              <Ionicons name="notifications-outline" size={size} color={color} />
            ),
            drawerLabel: 'Notifications',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="appointments"
          options={{
            drawerIcon: ({ size, color }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
            drawerLabel: 'Appointments',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerIcon: ({ size, color }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
            drawerLabel: 'Profile',
            headerShown: false,
          }}
        />
      </Drawer>
    </View>
  );
}
