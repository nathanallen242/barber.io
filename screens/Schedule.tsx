import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarPlus, faPencil, faUser } from '@fortawesome/free-solid-svg-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AuthContext } from '../contexts/AuthContext';
import Past from '../components/schedule/Past';
import Upcoming from '../components/schedule/Upcoming';

const Tab = createMaterialTopTabNavigator();

interface ScheduleProps {
 navigation: any;
}

const Schedule: React.FC<ScheduleProps> = ({ navigation }) => {
 const { user } = useContext(AuthContext);

 const handlePress = () => {
   if (user?.role === 'client') {
    navigation.navigate('Schedule', { screen: 'Services' });
   } else {
     navigation.navigate('Schedule', { screen: 'BarberSchedule' });
   }
 };

 const Icon = user?.role === 'client' ? faCalendarPlus : faPencil;

 return (
   <>
     <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
       <Tab.Screen name="Upcoming Schedule" component={Upcoming} />
       <Tab.Screen name="Past Schedules" component={Past} />
     </Tab.Navigator>
     {user && (<TouchableOpacity 
       onPress={handlePress}
       style={{ position: 'absolute', bottom: 10, right: 10 }}>
       <FontAwesomeIcon icon={Icon} size={45} color="#808080" />
     </TouchableOpacity>)}
   </>
 );
};

export default Schedule;