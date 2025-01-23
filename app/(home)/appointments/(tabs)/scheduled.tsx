import { StyleSheet, Text, ScrollView, ActivityIndicator, View, RefreshControl } from "react-native";
import { useUserStore } from "@/store/userStore";
import { useThemeStore } from '@/store/themeStore';
import { useState, useEffect } from "react";
import { supabase } from "@/server/supabase";
import { GetAppointmentRequest, GetAppointmentResponse } from "@/types/api";
import { Appointment as AppointmentInterface } from "@/types/models";
import Appointment from "@/components/home/appointments/Appointment";

export default function ScheduledAppts() {
  const [refreshing, setRefreshing] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const { colors } = useThemeStore();
  const { user } = useUserStore();
  const isBarber = user?.job_role === "barber";

  const fetchAppointments = async () => {
    try {
      setLoading(true);
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
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAppointments();
    setRefreshing(false);
  };

  const handleEdit = (id: string) => {
    console.log(`Edit appointment: ${id}`);
  };

  const handleCancel = (id: string) => {
    console.log(`Cancel appointment: ${id}`);
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      {loading && !refreshing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7A94FE" />
        </View>
      )}
      <ScrollView 
        contentContainerStyle={[
          styles.container,
          appointments.length === 0 && styles.emptyContainer
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        scrollEventThrottle={16}>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <Appointment
              key={appointment.id}
              appointment={appointment}
              onEdit={handleEdit}
              onCancel={handleCancel}
            />
          ))
        ) : (
          <Text style={[styles.title, { color: colors.text }]}>
            No scheduled appointments.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '40%',
    alignItems: 'center',
    zIndex: 999
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins_500Regular'
  }
});