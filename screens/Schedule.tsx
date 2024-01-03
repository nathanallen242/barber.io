import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Past from '../components/schedule/Past';
import Upcoming from '../components/schedule/Upcoming';

const Tab = createMaterialTopTabNavigator();

const Schedule: React.FC = () => {
 return (
  <NavigationContainer independent={true}>
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false}}>
      <Tab.Screen name="Upcoming Schedule" component={Upcoming} />
      <Tab.Screen name="Past Schedules" component={Past} />
    </Tab.Navigator>
  <FontAwesomeIcon icon={faCalendarPlus} size={45} style={{ position: 'absolute', bottom: 10, right: 10}} />
  </NavigationContainer>
 );
};

export default Schedule;