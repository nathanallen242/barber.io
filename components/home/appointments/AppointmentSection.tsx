import { View, Text, StyleSheet, FlatList } from 'react-native';
import Appointment from '@/components/home/appointments/Appointment';
import { Appointment as AppointmentInterface } from '@/types/models';

export default function AppointmentsSection() {
  const appointments: AppointmentInterface[] = [
    {
      id: '1',
      barber_id: '101',
      client_id: '201',
      service_id: 'Dr. Marcus Horizon',
      appointment_date: '2024-01-26T10:30:00.000Z',
      price: 45.99,
      status: 1,
    },
    {
      id: '2',
      barber_id: '102',
      client_id: '201',
      service_id: 'Dr. Merry John',
      appointment_date: '2024-01-26T10:30:00.000Z',
      price: 45.99,
      status: 1,
    },
  ];

  const handleEdit = (id: string) => {
    console.log(`Edit appointment: ${id}`);
  };

  const handleCancel = (id: string) => {
    console.log(`Cancel appointment: ${id}`);
  };

  return (
    <View>
      <View style={styles.textBlock}>
        <Text style={styles.header}>Upcoming Appointments</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      <FlatList
        data={appointments}
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
  }
});
