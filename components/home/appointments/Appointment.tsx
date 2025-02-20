import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { useThemeStore } from '@/store/themeStore';
import { useUserStore } from '@/store/userStore';
import { screenDimensions } from '@/utils/screenDimensions';
import { Appointment as AppointmentInterface } from '@/types/models';

interface AppointmentProps {
  appointment: AppointmentInterface;
  onEdit?: (id: string) => void;
  onCancel?: (id: string) => void;
  disabled?: boolean;
}

export default function Appointment({ appointment, onEdit, onCancel, disabled = false }: AppointmentProps) {
  const { appointment_date } = appointment;
  const dateObj = new Date(appointment_date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('default', { month: 'short' });
  const time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const { colors, typography } = useThemeStore();
  const user = useUserStore((state) => state.user);
  const isBarber = user?.user_metadata.job_role === 'barber'

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.topContainer}>
        <Image
          source={{ uri: isBarber ? appointment.client_image_url : appointment.barber_image_url }} 
          style={styles.profileImage}
          contentFit="contain"
          transition={1000}
        />
        <View style={styles.dateContainer}>
          <Text style={[styles.day, { color: colors.text, fontFamily: typography.fonts.regular }]}>{day}</Text>
          <Text style={[styles.month, { color: colors.subtext, fontFamily: typography.fonts.medium }]}>{month}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.name, { 
          color: colors.text,
          fontFamily: typography.fonts.medium}]}>
          {isBarber ? `${appointment.client_forename} ${appointment.client_surname}` : `${appointment.barber_forename} ${appointment.barber_surname}`}
            </Text>
        <Text style={[styles.specialty, { 
          color: colors.text,
          fontFamily: typography.fonts.regular }]}>
            {isBarber ? 'Client': 'Barber'}
            </Text>
        <Text style={[styles.time, { 
          color: colors.subtext,
          fontFamily: typography.fonts.light }]}>{time}</Text>
      </View>

      <View style={styles.actions}>
        {!disabled && (
          <>
            <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]} 
              onPress={() => onEdit?.(appointment.id)}
            >
              <Feather name="edit" size={20} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.cancelButton]} 
              onPress={() => onCancel?.(appointment.id)}
            >
              <Ionicons name="close" size={20} color="#FF5252" />
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity 
          style={[styles.actionButton, styles.calendarButton]}
          onPress={() => Alert.alert("Coming soon!")}>
          <Ionicons name="calendar-outline" size={20} color="#2196F3" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  dateContainer: {
    alignItems: 'flex-start',
    marginTop: screenDimensions.screenHeight * -0.075
  },
  day: {
    fontSize: 24,
    lineHeight: 28,
  },
  month: {
    fontSize: 16,
  },
  infoContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#E8F5E9',
  },
  cancelButton: {
    backgroundColor: '#FFEBEE',
  },
  calendarButton: {
    backgroundColor: '#E3F2FD',
  }
});