import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Card from '../components/profile/Card';

const Schedule: React.FC = () => {
 // TODO: Display a list of appointments for each user from database
 return (
   <ScrollView>
     <Card
       name="John Doe"
       jobTitle="Software Engineer"
       date="Tuesday, 2 January"
       duration="00:00 - 00:00"
       rating={4.5}
     />
     <TouchableOpacity onPress={() => console.log('View Appointment Details pressed!')}>
       <Text style={styles.viewDetailsButton}>View Appointment Details</Text>
     </TouchableOpacity>

     <Card
       name="Jane Smith"
       jobTitle="Data Scientist"
       date="Wednesday, 3 January"
       duration="01:00 - 02:00"
       rating={4.0}
     />
     <TouchableOpacity onPress={() => console.log('View Appointment Details pressed!')}>
       <Text style={styles.viewDetailsButton}>View Appointment Details</Text>
     </TouchableOpacity>

     {/* Add more cards and buttons as needed */}
   </ScrollView>
 );
};

const styles = StyleSheet.create({
 viewDetailsButton: {
   backgroundColor: '#007BFF',
   padding: 10,
   borderRadius: 5,
   alignItems: 'center',
   marginTop: 10,
   color: '#fff',
   fontSize: 16,
 },
});

export default Schedule;