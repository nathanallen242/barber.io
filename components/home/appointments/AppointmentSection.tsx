import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Appointment from '@/components/home/appointments/Appointment';
import { useThemeStore } from '@/store/themeStore';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'expo-router';
import { fetchAppointments, cancelAppointment } from '@/server/appointments';
import { 
  GetAppointmentRequest, 
} from "@/types/api";
import { supabase } from "@/server/client";
import { GetAppointmentResponse } from "@/types/api";
import { EditAppointmentModal } from '@/components/home/appointments/EditAppointment';
import { Appointment as AppointmentInterface } from '@/types/models';
import { useState, useEffect } from 'react';

export default function AppointmentsSection() {
  const router = useRouter();
  const colors = useThemeStore((state) => state.colors);
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentInterface | null>(null);
  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
  const isBarber = user?.job_role === "barber";

  const handleEdit = (id: string) => {
    const found = appointments.find((item) => item.id === id);
    if (!found) return;
  
    setSelectedAppointment(found);
    setEditModalVisible(true);
  };

  const handleCancel = (id: string) => {
    Alert.alert(
      "Confirm Cancellation",
      "Are you sure you want to cancel this appointment?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const response = await cancelAppointment({ p_appointment_id: id });
              
              if (response?.success) {
                Alert.alert("Success", "Appointment cancelled successfully");
              } else {
                Alert.alert("Error", response?.error ?? "Something went wrong");
              }
            } catch (error: any) {
              Alert.alert("Error", error.message ?? "An unknown error occurred");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const appointmentRequest: GetAppointmentRequest = {
        user_id: user!.id,
        role: isBarber ? 'barber' : 'client'
      }
      
      const { data, error } = await supabase
      .rpc('get_appointments', appointmentRequest) as
      { data: GetAppointmentResponse | null, error: any };

      if (error) {
        throw error;
      }

      setAppointments(data?.appointments || []);
      console.log(JSON.stringify(data?.appointments, null, 2))
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.textBlock}>
        <Text style={[styles.header, { color: colors.text }]}>Upcoming Appointments</Text>
        <TouchableOpacity onPress={() => router.push('/(home)/appointments/(tabs)/scheduled')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={appointments}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Appointment 
            appointment={item}
            onEdit={handleEdit}
            onCancel={handleCancel}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
      <EditAppointmentModal
        visible={editModalVisible}
        appointment={selectedAppointment}
        onClose={() => setEditModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontFamily: 'Poppins_300Light',
    marginLeft: 15,
  },
  listContainer: {
    paddingVertical: 8,
  },
  textBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
    marginBottom: 15,
  },
  viewAll: {
    fontFamily: 'Poppins_300Light',
    fontSize: 18,
    color: 'skyblue',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Poppins_300Light',
    textAlign: 'center',
  },
});
