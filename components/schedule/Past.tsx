import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet } from 'react-native';
import Card from '../profile/Card';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { Appointment } from '../../contexts/AppointmentContext';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { FIREBASE_DB } from '../../config/Firebase';

const Past: React.FC = () => {
 const { user } = useAuth();
 const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
 const isFocused = useIsFocused();

 function parseDateTime(dateStr: any, timeStr: any) {
  // Example formats: dateStr = 'Fri Jan 12 2024', timeStr = '1:00 PM'

  // Convert 12-hour format to 24-hour format
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  // Format the date string into a standard format (YYYY-MM-DD)
  const formattedDateStr = new Date(dateStr).toISOString().split('T')[0];

  // Combine date and time
  return new Date(`${formattedDateStr} ${hours}:${minutes}`);
}

 let title;
 if (user?.role === 'barber') {
  title = 'Past Clients';
 } else {
  title = 'Past Appointments';
 }

 useEffect(() => {
   const fetchAppointments = async () => {
     const appointmentsRef = ref(FIREBASE_DB, '/appointments');
     if (user) {
      const clientAppointmentsQuery = query(appointmentsRef, orderByChild('client_id'), equalTo(user.uid));
      const employeeAppointmentsQuery = query(appointmentsRef, orderByChild('employee_id'), equalTo(user.uid));
      
      // Fetch client appointments
      const clientSnapshot = await get(clientAppointmentsQuery);
      const clientAppointmentsData = clientSnapshot.val();

      // Fetch employee appointments
      const employeeSnapshot = await get(employeeAppointmentsQuery);
      const employeeAppointmentsData = employeeSnapshot.val();
    
      // Combine and filter appointments
      const combinedAppointmentsData = { ...clientAppointmentsData, ...employeeAppointmentsData };

      const now = new Date();

        const userAppointments = Object.values(combinedAppointmentsData as Record<string, Appointment>)
        .filter((appointment: Appointment) => {
          const appointmentDateTime = parseDateTime(appointment.date, appointment.start_time);
          // console.log(appointmentDateTime);
          return appointmentDateTime < now;
        });
    
      setPastAppointments(userAppointments);
     }
   };
 
   if (user) {
     fetchAppointments();
   }
 }, [isFocused, user]);

 return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <FlatList
      data={pastAppointments}
      renderItem={({ item }) => (
        <Card
          name={item.employee.displayName}
          jobTitle={item.employee.role}
          date={item.date}
          duration={item.start_time + ' - ' + item.end_time}
          rating={item.employee.averageRating}
          image={item.employee.photoURL}
        />
      )}
      keyExtractor={item => item.appointment_id.toString()}
      contentContainerStyle={styles.scrollViewContainer}
    />
  </SafeAreaView>
 );
};

const styles = StyleSheet.create({
  container: {
   flexDirection: 'column',
  },
  title: {
   fontSize: 25,
   fontWeight: 'bold',
   marginTop: 20,
   marginBottom: 10,
   marginLeft: 20,
   alignSelf: 'center',
  },
  scrollViewContainer: {
   flexGrow: 1,
   justifyContent: 'flex-start',
   alignItems: 'center',
  },
 });

export default Past;