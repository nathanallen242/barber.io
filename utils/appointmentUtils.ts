import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { FIREBASE_DB } from '../config/Firebase';
import { Appointment } from '../contexts/AppointmentContext';
import { parseDateTime } from '../components/schedule/Upcoming';

export async function fetchUpcomingAppointments(user: any): Promise<Appointment[]> {
 const appointmentsRef = ref(FIREBASE_DB, '/appointments');
 if (!user) throw new Error("User is not defined");

 const clientAppointmentsQuery = query(appointmentsRef, orderByChild('client_id'), equalTo(user.uid));
 const employeeAppointmentsQuery = query(appointmentsRef, orderByChild('employee_id'), equalTo(user.uid));

 const clientSnapshot = await get(clientAppointmentsQuery);
 const clientAppointmentsData = clientSnapshot.val();

 const employeeSnapshot = await get(employeeAppointmentsQuery);
 const employeeAppointmentsData = employeeSnapshot.val();

 const combinedAppointmentsData = { ...clientAppointmentsData, ...employeeAppointmentsData };

 const now = new Date();
 const userAppointments = Object.values(combinedAppointmentsData as Record<string, Appointment>)
 .filter((appointment: Appointment) => {
   const appointmentDateTime = parseDateTime(appointment.date, appointment.start_time);
   return appointmentDateTime > now;
 });

 return userAppointments;
}

export async function fetchPastAppointments(user: any): Promise<Appointment[]> {
 const appointmentsRef = ref(FIREBASE_DB, '/appointments');
 if (!user) throw new Error("User is not defined");

 const clientAppointmentsQuery = query(appointmentsRef, orderByChild('client_id'), equalTo(user.uid));
 const employeeAppointmentsQuery = query(appointmentsRef, orderByChild('employee_id'), equalTo(user.uid));

 const clientSnapshot = await get(clientAppointmentsQuery);
 const clientAppointmentsData = clientSnapshot.val();

 const employeeSnapshot = await get(employeeAppointmentsQuery);
 const employeeAppointmentsData = employeeSnapshot.val();

 const combinedAppointmentsData = { ...clientAppointmentsData, ...employeeAppointmentsData };

 const now = new Date();
 const userAppointments = Object.values(combinedAppointmentsData as Record<string, Appointment>)
 .filter((appointment: Appointment) => {
   const appointmentDateTime = parseDateTime(appointment.date, appointment.start_time);
   return appointmentDateTime <= now;
 });

 return userAppointments;
}