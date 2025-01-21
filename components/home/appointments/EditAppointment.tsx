import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Button, Alert } from 'react-native';
import { Appointment } from '@/types/models';
import { editAppointment } from '@/lib/appointments';
import { RescheduleAppointmentRequest } from '@/types/api';
import TimePicker from '@/components/calendar/TimePicker';

interface EditAppointmentModalProps {
  visible: boolean;
  appointment: Appointment | null;
  onClose: () => void;
}

export function EditAppointmentModal({
  visible,
  appointment,
  onClose,
}: EditAppointmentModalProps) {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  useEffect(() => {
    if (appointment) {
      setStartTime(appointment.start_time);
      setEndTime(appointment.end_time);
    }
  }, [appointment]);

  const handleSave = async () => {
    if (!appointment || !startTime || !endTime) return;

    const request: RescheduleAppointmentRequest = {
      p_appointment_id: appointment.id,
      p_new_date: appointment.appointment_date,
      p_new_start_time: startTime,
      p_new_end_time: endTime
    };

    try {
      const response = await editAppointment(request);
      if (response.success) {
        Alert.alert("Success", "Appointment rescheduled successfully");
        onClose();
      } else {
        Alert.alert("Error", response.error ?? "Something went wrong");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message ?? "An unknown error occurred");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={false}
    >
      <View style={{ padding: 20 }}>
        <Text>Edit Appointment</Text>

        <Text>Date (Locked): {appointment?.appointment_date.toDateString()}</Text>
        
        <Text>Start Time: {startTime?.toLocaleTimeString()}</Text>
    
        <Button title="Select New Start Time" onPress={() => {
          /* open time picker */
        }} />

        <Text>End Time: {endTime?.toLocaleTimeString()}</Text>
        <Button title="Select New End Time" onPress={() => {
          /* open time picker */
        }} />

        <View style={{ marginTop: 20 }}>
          <Button title="Save Changes" onPress={handleSave} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}
