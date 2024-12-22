import React from 'react';
import { View, StyleSheet } from 'react-native';
import Action from '@/components/home/action/Action'
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const ActionSection: React.FC = () => {
  const actions = [
    {
      icon: <MaterialIcons name="schedule" size={24} color="#537580" />,
      title: 'Book an Appointment',
      description: 'Find a licensed barber',
      backgroundColor: '#b5d2f5'
    },
    {
      icon: <MaterialIcons name="qr-code-2" size={24} color="#5a8a62" />,
      title: 'Appointment with QR',
      description: 'Queuing without the hustle',
      backgroundColor: '#b5f5c1'
    },
    {
      icon: <Entypo name="chat" size={24} color="#7a5e62" />,
      title: 'Request Consultation',
      description: 'Talk to registered professionals',
      backgroundColor: '#f2c8a2'
    },
    {
      icon: <Entypo name="location" size={24} color="#594346" />,
      title: 'Locate Professionals',
      description: 'Locate barbers near you',
      backgroundColor: '#f7c1c8'
    },
  ];

  return (
    <View style={styles.sectionContainer}>
      {actions.map((action, index) => (
        <Action key={index} {...action} onPress={() => { /* Handle press */ console.log(`${action.title} pressed`); }} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
  },
});

export default ActionSection;