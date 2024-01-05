import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

interface ServiceCardProps {
 imageUrl?: string;
 serviceName: string;
 timeDuration: number;
 price: number;
 service_id: string;
 onSelectService: (service: any) => void;
 isSelected: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ imageUrl, serviceName, timeDuration, price, service_id, onSelectService, isSelected }) => {
 return (
   <TouchableOpacity onPress={onSelectService} style={isSelected ? styles.selectedService : styles.unselectedService}>
     {imageUrl ? (
       <Image source={{ uri: imageUrl }} style={styles.image} />
     ) : (
       <View style={styles.placeholder} />
     )}
     <Text style={styles.serviceName}>{serviceName}</Text>
     <Text style={styles.timeDuration}>
      <FontAwesomeIcon icon={faClock} size={12} color="grey" /> {timeDuration} minutes
     </Text>
     <Text style={styles.price}>${price}</Text>
   </TouchableOpacity>
 );
};

const styles = StyleSheet.create({
 unselectedService: {
  borderRadius: 10,
  padding: 10,
  marginVertical: 10,
  backgroundColor: '#ffffff',
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  width: '70%',
 },
 selectedService: {
  borderRadius: 10,
  padding: 10,
  marginVertical: 10,
  backgroundColor: '#f0f0f0',
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  width: '70%',
 },
 image: {
  width: '100%',
  height: 150,
  resizeMode: 'cover',
 },
 placeholder: {
  width: '100%',
  height: 150,
  backgroundColor: 'grey',
 },
 serviceName: {
  fontSize: 22,
  fontWeight: 'bold',
  marginTop: 10,
 },
 timeDuration: {
  color: 'grey',
  marginTop: 5,
 },
 price: {
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 5,
 },
});

export default ServiceCard;