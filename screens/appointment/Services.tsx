import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ServiceCard from '../../components/appointment/ServiceCard';
import { AppointmentContext } from '../../contexts/AppointmentContext';
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
}

const Services: React.FC<ServicesProps> = ({ navigation }) => {
 const [selectedService, setSelectedService] = useState<Service | null>(null);
 const { appointmentDetails, saveAppointmentDetails } = useContext(AppointmentContext);

 const fullHaircut: Service = {
  service_id: "1",
  service_name: "Full Haircut",
 };
 
 const lineupOnly: Service = {
  service_id: "2",
  service_name: "Lineup Only",
 };
 
 const beardShave: Service = {
  service_id: "3",
  service_name: "Beard Shave",
 };
 
 const eyebrowTrim: Service = {
  service_id: "4",
  service_name: "Eyebrow Trim",
 };

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
        <ServiceCard
         image={haircut}
         serviceName="Full Haircut"
         service={fullHaircut}
         timeDuration={60}
         price={25}
         onSelectService={handleSelectService}
         isSelected={selectedService?.service_id === "1"}
        />
        <ServiceCard
         image={lineup}
         serviceName="Lineup Only"
         service={lineupOnly}
         timeDuration={60}
         price={15}
         onSelectService={handleSelectService}
         isSelected={selectedService?.service_id === "2"}
        />
        <ServiceCard
         image={beard}
         serviceName="Beard Shave"
         service={beardShave}
         timeDuration={60}
         price={10}
         onSelectService={handleSelectService}
         isSelected={selectedService?.service_id === "3"}
        />
        <ServiceCard
         image={eyebrow}
         serviceName="Eyebrow Trim"
         service={eyebrowTrim}
         timeDuration={60}
         price={10}
         onSelectService={handleSelectService}
         isSelected={selectedService?.service_id === "4"}
        />
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
  // textAlign: 'center',
  marginTop: 30,
  marginBottom: 20,
 },
});

export default Services;