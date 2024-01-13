import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Alert, Text, View, Image, StyleSheet, FlatList, TouchableOpacity, Animated, Easing, ScrollView } from 'react-native';
import { AppointmentContext } from '../../contexts/AppointmentContext';
import * as Calendar from 'expo-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface EventProps {
 navigation: any;
}

const Event: React.FC<EventProps> = ({ navigation }) => {
 const [eventIdInCalendar, setEventIdInCalendar] = useState("");
 const { appointmentDetails } = useContext(AppointmentContext);
 const [animation, setAnimation] = useState(new Animated.Value(0));

 useEffect(() => {
   Animated.timing(animation, {
     toValue: 1,
     duration: 2000,
     useNativeDriver: true,
   }).start();
 }, []);

 const eventDetails = {
   title: `Appointment with ${appointmentDetails?.employee?.displayName}`,
   startDate: new Date(`${appointmentDetails?.start_time}`),
   endDate: new Date(`${appointmentDetails?.end_time}`),
 };
 
 const requestCalendarPermissions = async () => {
   const { status } = await Calendar.requestCalendarPermissionsAsync();
   if (status === 'granted') {
     return true;
   } else {
     Alert.alert("Permission not granted", "You need to enable calendar permissions to use this feature.");
     return false;
   }
 };

 const addEventToCalendar = async () => {
  const hasPermission = await requestCalendarPermissions();
  if (!hasPermission) return;

  try {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    let defaultCalendarSource;
    if (calendars.length > 0) {
      // Select an appropriate source - this is just an example
      defaultCalendarSource = calendars.find(calendar => calendar.source && calendar.source.name === 'Default');
    }

    if (!defaultCalendarSource) {
      Alert.alert('No Calendar Sources Available', 'Please setup a calendar account.');
      return;
    }

    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Expo Calendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.source.id,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });

    const eventId = await Calendar.createEventAsync(newCalendarID, eventDetails);
    setEventIdInCalendar(eventId);
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Failed to add event to calendar.');
  }
};

 return (
   <SafeAreaView style={styles.container}>
     <Animated.View style={{ opacity: animation }}>
       <FontAwesomeIcon icon={faCheckCircle} size={100} style={{alignSelf: 'center'}} color="#00ff00" />
       <Text style={styles.appointment}>Appointment Successfully Booked!</Text>
     </Animated.View>
     <TouchableOpacity onPress={() => Alert.alert('Confirm', 'Do you want to add this to your calendar?', [{text: 'Yes', onPress: addEventToCalendar}, {text: 'No'}])}>
       <Animated.View style={{ opacity: animation }}>
        <TouchableOpacity 
         onPress={() => navigation.reset({
          index: 0,
          routes: [{ name: 'Schedule' }],
         })}
         style={{backgroundColor: '#007BFF', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10}}
        >
         <Text style={{color: '#FFFFFF'}}>View Appointments</Text>
        </TouchableOpacity>
         <TouchableOpacity 
          onPress={() => Alert.alert('Confirm', 'Do you want to add this to your calendar?', [{text: 'Yes', onPress: addEventToCalendar}, {text: 'No'}])}
          style={{backgroundColor: '#007BFF', padding: 10, borderRadius: 5, alignItems: 'center'}}
         >
          <Text style={{color: '#FFFFFF'}}>Add to Calendar</Text>
         </TouchableOpacity>
       </Animated.View>
     </TouchableOpacity>
   </SafeAreaView>
 );
};


const styles = StyleSheet.create({
 appointment: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
});

export default Event;
