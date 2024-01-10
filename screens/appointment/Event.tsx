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

 const addEventToCalendar = async () => {
   const defaultCalendarSource = await Calendar.getDefaultCalendarAsync();
   const newCalendarID = await Calendar.createCalendarAsync({
     title: 'Expo Calendar',
     color: 'blue',
     entityType: Calendar.EntityTypes.EVENT,
     sourceId: defaultCalendarSource.id,
     source: defaultCalendarSource.source,
     name: 'internalCalendarName',
     ownerAccount: 'personal',
     accessLevel: Calendar.CalendarAccessLevel.OWNER,
   });

   const eventId = await Calendar.createEventAsync(newCalendarID, eventDetails);
   setEventIdInCalendar(eventId);
 };

 return (
   <SafeAreaView style={styles.container}>
     <Animated.View style={{ opacity: animation }}>
       <FontAwesomeIcon icon={faCheckCircle} size={100} color="#00ff00" />
       <Text>Appointment Successfully Booked</Text>
     </Animated.View>
     <TouchableOpacity onPress={() => Alert.alert('Confirm', 'Do you want to add this to your calendar?', [{text: 'Yes', onPress: addEventToCalendar}, {text: 'No'}])}>
       <Animated.View style={{ opacity: animation }}>
         <Text>Add to Calendar</Text>
       </Animated.View>
     </TouchableOpacity>
   </SafeAreaView>
 );
};


const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
});

export default Event;
