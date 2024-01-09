import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ServiceCard from '../../components/appointment/ServiceCard';
import { AppointmentContext } from '../../contexts/AppointmentContext';

interface ServicesProps {
 navigation: any;
}

interface Service {
  service_id: string;
}

const Services: React.FC<ServicesProps> = ({ navigation }) => {
 const [selectedService, setSelectedService] = useState<Service | null>(null);
 const { saveAppointmentDetails } = useContext(AppointmentContext);

 const handleSelectService = (service: any) => {
  if (!service) {
    return Alert.alert('Error', 'Please select a service!');
  }
  if (selectedService === service) {
    setSelectedService(null);
    saveAppointmentDetails({ service_id: null });
  } else {
  setSelectedService(service);
  saveAppointmentDetails({ service_id: service.service_id });
  console.log(service.service_id)
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
          imageUrl="https://example.com/image1.jpg"
          serviceName="Full Haircut"
          service_id="1"
          timeDuration={60}
          price={25}
          onSelectService={handleSelectService}
          isSelected={selectedService?.service_id === "1"}
        />
        <ServiceCard
          imageUrl="https://example.com/image2.jpg"
          serviceName="Lineup Only"
          service_id="2"
          timeDuration={60}
          price={15}
          onSelectService={handleSelectService}
          isSelected={selectedService?.service_id === "2"}
        />
        <ServiceCard
          imageUrl="https://example.com/image3.jpg"
          serviceName="Beard Shave"
          service_id="3"
          timeDuration={60}
          price={10}
          onSelectService={handleSelectService}
          isSelected={selectedService?.service_id === "3"}
        />
        <ServiceCard
          imageUrl="https://example.com/image4.jpg"
          serviceName="Eyebrow Trim"
          service_id="4"
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