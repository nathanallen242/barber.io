import { parse, format } from 'date-fns';
import { ref, onValue } from "@firebase/database";
import { FIREBASE_DB } from "../config/Firebase";

export const fetchBookedAppointments = (barberUID: string): Promise<Record<string, string[]>> => {
  const dbRef = ref(FIREBASE_DB, `/appointments`);
  let bookedAppointmentsMap: Record<string, string[]> = {};

  return new Promise((resolve) => {
    onValue(dbRef, (snapshot) => {
      const snapshotVal = snapshot.val();
      Object.values(snapshotVal).forEach((appointment: any) => {
        if (appointment.employee_id === barberUID) {
          const appointmentDayOfWeek = appointment.day_of_week; // Assuming day_of_week is already in the correct format (0 for Monday, etc.)
          // Parse the 24-hour time into a Date object
          const startTime24hr = parse(appointment.start_time, 'HH:mm', new Date());
          // Format the Date object into a 12-hour time string with AM/PM
          const startTime = format(startTime24hr, 'hh:mm a');
          if (!bookedAppointmentsMap[appointmentDayOfWeek]) {
            bookedAppointmentsMap[appointmentDayOfWeek] = [];
          }
          bookedAppointmentsMap[appointmentDayOfWeek].push(startTime);
        }
      });
      resolve(bookedAppointmentsMap);
    });
  });
};