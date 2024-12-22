import { Tabs } from 'expo-router';
import TabBar from '@/components/nav/TabBar';

export default function TabLayout() {

  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      initialRouteName='scheduled'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen 
        name="scheduled" 
        options={{ 
          tabBarLabel: 'Scheduled'
        }} 
      />
      <Tabs.Screen 
        name="completed" 
        options={{ 
          tabBarLabel: 'Completed'
        }} 
      />
      <Tabs.Screen 
        name="cancelled" 
        options={{ 
          tabBarLabel: 'Cancelled'
        }} 
      />
    </Tabs>
  );
}