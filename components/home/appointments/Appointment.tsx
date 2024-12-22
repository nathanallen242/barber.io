import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Appointment as AppointmentInterface } from '@/types/models';
import { screenDimensions } from '@/utils/screenDimensions';
const { screenWidth, screenHeight } = screenDimensions;

interface AppointmentProps {
  appointment: AppointmentInterface;
  onEdit?: (id: string) => void;
}

export default function Appointment({ appointment, onEdit }: AppointmentProps) {
    const { appointment_date, service_id } = appointment;
  
    // Parse the appointment date
    const dateObj = new Date(appointment_date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
    const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
    return (
      <View style={styles.parent}>
      <View style={styles.container}>
        {/* Date Section */}
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{formattedDate.split(' ')[0]}</Text>
          <Text style={styles.month}>{formattedDate.split(' ')[1]}</Text>
        </View>
  
        {/* Appointment Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{service_id}</Text>
          <Text style={styles.time}>{`${dayOfWeek}, ${formattedTime}`}</Text>
        </View>
  
        {/* Edit Button */}
        <TouchableOpacity onPress={() => onEdit && onEdit(appointment.id)} style={styles.editButton}>
          <Ionicons name="pencil-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    parent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F9FAFB',
      borderRadius: screenWidth * 0.02,
      padding: screenWidth * 0.03,
      marginBottom: screenHeight * 0.01,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: screenWidth * 0.02,
      shadowOffset: { width: 0, height: screenHeight * 0.002 },
      width: screenWidth * 0.8,
    },
    dateContainer: {
      backgroundColor: '#DCE6FF',
      borderRadius: screenWidth * 0.02,
      padding: screenWidth * 0.03,
      alignItems: 'center',
      justifyContent: 'center',
      width: screenWidth * 0.15,
      height: screenWidth * 0.15,
    },
    date: {
      fontSize: screenWidth * 0.04,
      fontFamily: 'Poppins_700Bold',
      color: '#1E3A8A',
    },
    month: {
      fontSize: screenWidth * 0.03,
      fontFamily: 'Poppins_700Bold',
      color: '#1E3A8A',
    },
    detailsContainer: {
      flex: 1,
      marginLeft: screenWidth * 0.04,
    },
    title: {
      fontSize: screenWidth * 0.045,
      fontFamily: 'Poppins_300Light',
      color: '#333',
    },
    time: {
      fontSize: screenWidth * 0.04,
      fontFamily: 'Poppins_300Light',
      color: '#0F172A',
      marginTop: screenHeight * 0.005,
    },
    editButton: {
      padding: screenWidth * 0.02,
    },
  });