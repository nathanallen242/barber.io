import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { AppointmentContext } from '../../contexts/AppointmentContext';
import { User } from '../../contexts/AuthContext';
import { FIREBASE_DB } from '../../config/Firebase';
import { ref, get } from 'firebase/database';
import Card from '../../components/profile/Card';

interface BarberProps {
 navigation: any;
}

export interface DayAvailability {
 from: string;
 to: string;
}

export interface BarberData {
 averageRating: number;
 displayName: string;
 email: string;
 phoneNumber: string;
 photoURL: string;
 role: string;
 uid: string;
 availability: Record<string, DayAvailability>;
}

export const defaultBarberData: BarberData = {
 averageRating: 0,
 displayName: '',
 email: '',
 phoneNumber: '',
 photoURL: '',
 role: '',
 uid: '',
 availability: {},
};

// Type guard to check if a User is a BarberData
function isBarberData(user: User): user is BarberData {
    return user.role === 'barber';
  }

const Barber: React.FC<BarberProps> = ({ navigation }) => {
 const [selectedBarber, setSelectedBarber] = useState<BarberData | null>(null);
 const [barbers, setBarbers] = useState<BarberData[]>([]);
 const { saveAppointmentDetails } = useContext(AppointmentContext);
    
 useEffect(() => {
  get(ref(FIREBASE_DB, '/employees')).then((snapshot) => {
   if (snapshot.exists()) {
     const data = snapshot.val();
     const barbersData = Object.values(data as Record<string, User>).filter(isBarberData);
     setBarbers(barbersData);
   } else {
     console.log("No data available");
   }
  }).catch((error) => {
   console.error(error);
  });
 }, []);
   

 const handleSelectBarber = async (barber: BarberData) => {
  const barberData = (await get(ref(FIREBASE_DB, `/employees/${barber.uid}`))).val() as BarberData;
  if (barberData) {
  setSelectedBarber(barberData);
  saveAppointmentDetails({ employee_id: barberData.uid }, barberData.uid);
  } else {
  console.error(`No data available for employee_id: ${barber.uid}`);
  }
 };

 const handleNavigate = () => {
 if (selectedBarber) {
    navigation.navigate('Schedule', { screen: 'Availability', params: { barber: selectedBarber } });
 } else {
    Alert.alert('Please select a barber!');
 }
 };

 return (
  <SafeAreaView>
    <View style={styles.headerContainer}>
      <Text style={styles.header}>
        Step 2: Choose a Barber
      </Text>
      <TouchableOpacity onPress={handleNavigate} style={{ padding: 10}}>
        <FontAwesomeIcon 
          icon={faChevronRight} 
          size={50} 
          color={selectedBarber ? "blue" : "grey"} 
          style={{ position: 'absolute', right: 15, top: -10 }}
        />
      </TouchableOpacity>
    </View>
    <ScrollView contentContainerStyle={styles.scrollView}>
      {barbers && barbers.map((barber, index) => {
        const duration = Object.entries(barber.availability)
          .map(([day, availability]) => `${availability.from} - ${availability.to}`)
          .join(', ');
        return (
          <Card
            key={index}
            name={barber.displayName}
            jobTitle={barber.role}
            date={barber.email || ''}
            duration={duration}
            rating={barber.averageRating}
            image={barber.photoURL}
            onSelect={() => handleSelectBarber(barber)}
            show={false}
          />
        );
      })}
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