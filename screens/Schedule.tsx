import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Past from '../components/schedule/Past';
import Upcoming from '../components/schedule/Upcoming';

const Tab = createMaterialTopTabNavigator();

interface ScheduleProps {
  navigation: any;
}

const Schedule: React.FC<ScheduleProps> = ({ navigation }) => {
  return (
    <>
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen name="Upcoming Schedule" component={Upcoming} />
        <Tab.Screen name="Past Schedules" component={Past} />
      </Tab.Navigator>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Schedule', { screen: 'Services' })}
        style={{ position: 'absolute', bottom: 10, right: 10 }}>
        <FontAwesomeIcon icon={faCalendarPlus} size={45} color="#808080" />
      </TouchableOpacity>
    </>
  );
};

export default Schedule;
