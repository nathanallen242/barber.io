import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/Home';
import Schedule from '../screens/Schedule';
import Profile from '../screens/profile/Profile';
import LoginScreen from '../screens/auth/Login';
import SignUpScreen from '../screens/auth/Signup';
import Services from '../screens/appointment/Services';
import Availability from '../screens/appointment/Availability';
import BarberSchedule from '../screens/barber/BarberSchedule';
import Barber from '../screens/appointment/Barber';
import Update from '../screens/profile/Update';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

interface TabNavigatorProps {
    username: string;
}

const UserStack = () => {
  return (
    <Stack.Navigator
    screenOptions = {{
      headerShown: false,
    }}>
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="Signup" component={SignUpScreen} options={{ title: 'Signup' }} />
      <Stack.Screen name="Update" component={Update} options={{ title: 'Update' }} />
    </Stack.Navigator>
  );
};

const ScheduleStack = () => {
  return (
    <Stack.Navigator
    screenOptions = {{
      headerShown: false,
    }}>
      <Stack.Screen name="MainSchedule" component={Schedule} options={{ title: 'MainSchedule' }} />
      <Stack.Screen name="BarberSchedule" component={BarberSchedule} options={{ title: 'BarberSchedule' }} />
      <Stack.Screen name="Services" component={Services} options={{ title: 'Services' }} />
      <Stack.Screen name="Barber" component={Barber} options={{ title: 'Barber' }} />
      <Stack.Screen name="Availability" component={Availability} options={{ title: 'Availability' }} />
    </Stack.Navigator>
  );
};

export default function TabNavigator({ username }: TabNavigatorProps) {
 return (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      children={(props) => <Home {...props} username={username} />}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="home" color={color} size={25} />
        ),
      }}
    />
    <Tab.Screen
      name="Schedule"
      component={ScheduleStack}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Icon name="calendar" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="User"
      component={UserStack}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Icon name="user" color={color} size={24} />
        ),
      }}
    />
  </Tab.Navigator>
 );
}