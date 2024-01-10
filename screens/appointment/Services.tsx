import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ServiceCard from '../../components/appointment/ServiceCard';
import { AppointmentContext } from '../../contexts/AppointmentContext';
import { ref, get } from 'firebase/database';
import { FIREBASE_DB } from '../../config/FireBase';
import haircut from '../../assets/full-haircut.png';
import lineup from '../../assets/lineup.png';
import beard from '../../assets/beard-trim.png';
import eyebrow from '../../assets/eyebrow-trim.png';

interface ServicesProps {
 navigation: any;
}

export interface Service {
 service_id: string;
 service_name: string;
 price: number;
}

const Services: React.FC<ServicesProps> = ({ navigation }) => {
 const [selectedService, setSelectedService] = useState<Service | null>(null);
 const { appointmentDetails, saveAppointmentDetails } = useContext(AppointmentContext);
 const [services, setServices] = useState<Service[]>([]);

 useEffect(() => {
   const fetchServices = async () => {
     const snapshot = await get(ref(FIREBASE_DB, '/services'));
     const servicesData = snapshot.val();
     const servicesArray = Object.keys(servicesData).map((key) => ({
       service_id: key,
       service_name: servicesData[key].service_name,
       price: servicesData[key].price,
     }));
     setServices(servicesArray);
   };

   fetchServices();
 }, []);

 const handleSelectService = (service: Service) => {
   if (!service) {
     return Alert.alert('Error', 'Please select a service!');
   }
   if (selectedService && selectedService.service_id === service.service_id) {
     setSelectedService(null);
     saveAppointmentDetails({ service_id: null });
   } else {
     setSelectedService(service);
     saveAppointmentDetails({ service_id: service.service_id });
   }
 };

 const handleNavigate = () => {
   if (!selectedService) {
     return Alert.alert('Error', 'Please select a service!');
   } else {
     navigation.navigate('Schedule', { screen: 'Barber' });
   }
 }

 return (
   <SafeAreaView>
     <Text style={styles.header}>
       Step 1: Choose a Service
       <TouchableOpacity onPress={handleNavigate}>
         <FontAwesomeIcon 
           icon={faChevronRight} 
           size={30} 
           color={selectedService ? "blue" : "grey"} 
           style={{ position: 'absolute', right: -115, top: -25 }}
         />
       </TouchableOpacity>
     </Text>
     <ScrollView contentContainerStyle={styles.scrollView}>
       <View>
         {services.map((service) => (
           <ServiceCard
             key={service.service_id}
             image={service.service_name === 'haircut' ? haircut : service.service_name === 'Lineup' ? lineup : service.service_name === 'beard shave' ? beard : eyebrow}
             serviceName={service.service_name}
             timeDuration={60}
             price={service.price}
             service={service}
             onSelectService={handleSelectService}
             isSelected={selectedService?.service_id === service.service_id}
           />
         ))}
       </View>
     </ScrollView>
   </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 scrollView: {
   width: '90%',
   justifyContent: 'flex-start',
   alignSelf: 'center',
   marginTop: 20,
   marginLeft: 105,
   paddingBottom: 100,
 },
 header: {
   fontSize: 27,
   fontWeight: 'bold',
   marginLeft: 20,
   marginTop: 30,
   marginBottom: 20,
 },
});

export default Services;