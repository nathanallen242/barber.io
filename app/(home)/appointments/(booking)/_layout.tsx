import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { useThemeStore } from "@/store/themeStore";
import { View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { screenDimensions } from "@/utils/screenDimensions";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function BookingLayout() {
  const { colors, typography } = useThemeStore();
  return (
    // <MaterialTopTabs
    //   screenOptions={{
    //     tabBarActiveTintColor: '#131620',
    //     tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold', textTransform: 'capitalize'},
    //     tabBarIndicatorStyle: { backgroundColor: '#1C87ED', height: 3 },
    //     swipeEnabled: true,
    //   }}>
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.subtext,
        tabBarLabelStyle: { 
          fontSize: typography.sizes.sm,
          textTransform: 'none',
          fontFamily: typography.fonts.regular
        },
        tabBarStyle: {
          backgroundColor: colors.card
        },
        tabBarIndicatorStyle: {
          height: 2,
          backgroundColor: '#1C87ED',
          width: screenDimensions.screenWidth * 0.333,
        },
        tabBarItemStyle: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        tabBarIcon: ({ focused }) => (
          <View style={{
            width: 18,
            height: 18,
            borderRadius: 9,
            borderWidth: 2,
            borderColor: focused ? '#1C87ED' : colors.border,
            backgroundColor: focused ? '#1C87ED' : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8
          }}>
            {focused && (
              <Ionicons name="checkmark" size={16} color="white" />
            )}
          </View>
        ),
      }}>
      <MaterialTopTabs.Screen name="services" options={{ title: 'Service' }} />
      <MaterialTopTabs.Screen name="barber" options={{ title: 'Barber' }} />
      <MaterialTopTabs.Screen name="details" options={{ title: 'Availability' }} />
    </MaterialTopTabs>
  );
}
