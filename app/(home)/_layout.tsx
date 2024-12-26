import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import ThemeToggle from '@/components/ui/Toggle';
import { useThemeStore } from '@/store/themeStore';
import { screenDimensions } from '@/utils/screenDimensions';
import CustomDrawerContent from '@/components/nav/CustomDrawerContent';

export default function HomeLayout() {
  const unseenNotifications = 2; // PLACEHOLDER
  const { mode, colors } = useThemeStore();
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
          color: colors.text,
        },
        drawerStyle: {
          width: screenDimensions.screenWidth * 0.61,
          backgroundColor: colors.background,
        },
        headerStyle: {
          backgroundColor: colors.background,
        }
      }}>
      
      <Drawer.Screen
          name="home"
          options={{
            drawerIcon: ({ size }) => (
              <Ionicons name="home-outline" size={size} color={colors.icon} />
            ),
            drawerLabel: 'Home',
            headerShown: true,
            headerTitle: 'barber.io',
            headerTitleStyle: {
              fontFamily: 'Poppins_300Light',
              fontSize: 20,
              color: colors.text,
            },
            headerShadowVisible: false,
            headerLeft: () => {
              const navigation = useNavigation();
              return (
                  <TouchableOpacity 
                      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                      style={{ marginLeft: 15 }}
                  >
                      <Ionicons name="menu" size={screenDimensions.screenWidth * 0.08} color={colors.icon} />
                  </TouchableOpacity>
              );
          },
            headerRight: () => (
              <>
              <ThemeToggle style={{ marginRight: 15 }} />
              <TouchableOpacity style={{ marginRight: 15, position: 'relative' }} onPress={() => router.push('/(home)/notifications')}>
                <Ionicons name="notifications-outline" size={screenDimensions.screenWidth * 0.06} color={colors.icon} />
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
                      color: colors.icon,
                      fontSize: screenDimensions.screenWidth * 0.025,
                      fontWeight: 'bold',
                    }}>{unseenNotifications}</Text>
                  </View>
                )}
             </TouchableOpacity>
             </>
           )
          }}
        />
        <Drawer.Screen
          name="search"
          options={{
            drawerIcon: ({ size }) => (
              <Ionicons name="search-outline" size={size} color={colors.icon} />
            ),
            drawerLabel: 'Search',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="notifications"
          options={{
            drawerIcon: ({ size }) => (
              <Ionicons name="notifications-outline" size={size} color={colors.icon} />
            ),
            drawerLabel: 'Notifications',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="appointments"
          options={{
            drawerIcon: ({ size }) => (
              <Ionicons name="calendar-outline" size={size} color={colors.icon} />
            ),
            drawerLabel: 'Appointments',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerIcon: ({ size }) => (
              <Ionicons name="person-outline" size={size} color={colors.icon} />
            ),
            drawerLabel: 'Profile',
            headerShown: false,
          }}
        />
      </Drawer>
    </View>
  );
}
