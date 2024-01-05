import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { AppointmentContext } from '../../contexts/AppointmentContext';
import Card from '../../components/profile/Card';

interface BarberProps {
 navigation: any;
}

const Barber: React.FC<BarberProps> = ({ navigation }) => {
 const [selectedBarber, setSelectedBarber] = useState(null);
 const { saveAppointmentDetails } = useContext(AppointmentContext);

 const barbers = [
  { name: 'Barber 1', jobTitle: 'Barber', date: 'Available', duration: '~60 mins', rating: 4.5 },
  { name: 'Barber 2', jobTitle: 'Barber', date: 'Available', duration: '~90 mins', rating: 4.0 },
  { name: 'Barber 3', jobTitle: 'Barber', date: 'Available', duration: '~120 mins', rating: 3.5 },
  { name: 'Barber 4', jobTitle: 'Barber', date: 'Available', duration: '~150 mins', rating: 3.0 },
  { name: 'Barber 5', jobTitle: 'Barber', date: 'Available', duration: '~180 mins', rating: 2.5 },
 ];

 const handleSelectBarber = (barber: any) => {
 setSelectedBarber(barber);
 saveAppointmentDetails({ employee_id: barber.barber_id });
 };

 return (
 <SafeAreaView>
  <View style={styles.headerContainer}>
    <Text style={styles.header}>
      Step 2: Choose a Barber
    </Text>
    <FontAwesomeIcon 
      icon={faChevronRight} 
      size={30} 
      color="grey" 
      style={{ position: 'absolute', right: 30, top: 30 }}
    />
  </View>
  <ScrollView contentContainerStyle={styles.scrollView}>
    {barbers.map((barber, index) => (
      <Card
        key={index}
        name={barber.name}
        jobTitle={barber.jobTitle}
        date={barber.date}
        duration={barber.duration}
        rating={barber.rating}
        show={false}
      />
    ))}
  </ScrollView>
 </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 scrollView: {
 width: '90%',
 justifyContent: 'flex-start',
 alignSelf: 'center',
 marginTop: 10,
 marginLeft: 75,
 paddingBottom: 100,
 },
 headerContainer: {
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 },
 header: {
 fontSize: 27,
 fontWeight: 'bold',
 marginLeft: 20,
 marginTop: 30,
 marginBottom: 20,
 },
});

export default Barber;