import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/Home';
import Schedule from '../screens/Schedule';
// import Profile from '../screens/Profile'; // Import the Profile component

const Tab = createBottomTabNavigator();

interface TabNavigatorProps {
    username: string;
}

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
      children={() => <Home username={username} />}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="home" color={color} size={25} />
        ),
      }}
    />
    <Tab.Screen
      name="Schedule"
      component={Schedule}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="calendar" color={color} size={24} />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="user" color={color} size={24} />
        ),
      }}
    /> */}
  </Tab.Navigator>
 );
}