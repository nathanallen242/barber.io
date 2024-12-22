import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function BookingLayout() {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: '#131620',
        tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold', textTransform: 'capitalize'},
        tabBarIndicatorStyle: { backgroundColor: '#1C87ED', height: 3 },
        swipeEnabled: true,
      }}>
      <MaterialTopTabs.Screen name="category" options={{ title: 'Category' }} />
      <MaterialTopTabs.Screen name="services" options={{ title: 'Service' }} />
      <MaterialTopTabs.Screen name="barber" options={{ title: 'Barber' }} />
      <MaterialTopTabs.Screen name="details" options={{ title: 'Availability' }} />
    </MaterialTopTabs>
  );
}
