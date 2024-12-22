// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import Appointment from '@/components/home/appointments/Appointment';
// import { Appointment as AppointmentInterface } from '@/types/models';

// export default function AppointmentsSection() {
//     const appointments: AppointmentInterface[] = [
//         {
//             id: '1',
//             barber_id: '101',
//             client_id: '201',
//             service_id: 'Temple Fade',
//             appointment_date: '2023-10-19T16:30:00.000Z',
//             price: 45.99,
//             status: 1,
//         },
//         ];

//   const handleEdit = (id: string) => {
//     console.log(`Edit appointment for: ${id}`);
//   };

//   return (
//     <View>
//       <Text style={styles.header}>Upcoming</Text>
//       <FlatList
//         data={appointments}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Appointment appointment={item} onEdit={handleEdit} />
//         )}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     fontSize: 20,
//     fontFamily: 'Poppins_300Light',
//     marginLeft: 15,
//     marginBottom: 15,
//   },
//   listContainer: {
//     paddingHorizontal: 20,
//   },
// });

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Calendar,
  CalendarProvider,
  AgendaList,
} from 'react-native-calendars';
import Appointment from '@/components/home/appointments/Appointment';
import { Appointment as AppointmentInterface } from '@/types/models';

interface AppointmentItems {
  [date: string]: AppointmentInterface[];
}

interface MarkedDates {
  [date: string]: {marked: boolean};
}

const AppointmentsSection = () => {
  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
  const [items, setItems] = useState<any>({});

  useEffect(() => {
    const fetchAppointments = async () => {
      // Replace with your actual data fetching
      const mockAppointments: AppointmentInterface[] = [
        {
          id: '1',
          barber_id: '101',
          client_id: '201',
          service_id: 'Temple Fade',
          appointment_date: '2024-07-26T16:30:00.000Z',
          price: 45.99,
          status: 1,
        },
        {
          id: '2',
          barber_id: '102',
          client_id: '202',
          service_id: 'Haircut',
          appointment_date: '2024-07-27T10:00:00.000Z',
          price: 30,
          status: 1,
        },
        {
          id: '3',
          barber_id: '102',
          client_id: '202',
          service_id: 'Haircut',
          appointment_date: '2024-08-02T10:00:00.000Z',
          price: 30,
          status: 1,
        },
      ];
      setAppointments(mockAppointments);
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (appointments.length) {
      const formattedItems: AppointmentItems = appointments.reduce((acc: AppointmentItems, appointment) => {
        const dateString = appointment.appointment_date?.split('T')[0];
        if (!acc[dateString]) {
          acc[dateString] = [];
        }
        acc[dateString].push(appointment);
        return acc;
      }, {});
      setItems(formattedItems);
    }
  }, [appointments]);

  const initialDate = Object.keys(items)[0] || new Date().toISOString().split('T')[0];
  const getMarkedDates = (appointments: AppointmentInterface[]): MarkedDates => {
      const marked: MarkedDates = {};
      appointments.forEach(item => {
          marked[item.appointment_date?.split('T')[0]] = {marked: true};
      })
      return marked;
  }

  return (
    <View style={{marginBottom: 10}}>
      <Text style={styles.header}>Upcoming Appointments</Text>
      <CalendarProvider date={initialDate}>
          <Calendar
              firstDay={1}
              enableSwipeMonths
              hideExtraDays
              style={{ fontFamily: 'Poppins_300Light' }}
              headerStyle={{ fontFamily: 'Poppins_600SemiBold' }}
              markedDates={getMarkedDates(appointments)}
          />
      </CalendarProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontFamily: 'Poppins_300Light',
    marginLeft: 15,
    marginBottom: 15,
  },
  section: {
    textTransform: 'capitalize',
    padding: 10,
  },
});

export default AppointmentsSection;