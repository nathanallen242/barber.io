import React, { createContext, useState, ReactNode } from 'react';
import { ref, get, set, remove, push } from 'firebase/database';
import { FIREBASE_DB } from '../config/FireBase';
import { BarberData } from 'screens/appointment/Barber';

export interface Appointment {
 appointment_id: string;
 client_id?: string;
 employee_id: string;
 employee: BarberData;
 service_id: string | null;
 day_of_week: string;
 date: string;
 start_time?: string;
 end_time?: string;
 location: string;
}

export interface AppointmentContextInterface {
 appointments: Appointment[];
 addAppointment: (appointment: Appointment) => void;
 saveAppointmentDetails: (appointment: Partial<Appointment>, employee_id?: string) => void;
 updateAppointment: (appointmentId: string, updatedAppointment: Appointment) => Promise<void>;
 removeAppointment: (appointmentId: string) => Promise<void>;
 appointmentDetails?: Partial<Appointment>;
}

export const AppointmentContext = createContext<AppointmentContextInterface>({
 appointments: [],
 addAppointment: () => {},
 saveAppointmentDetails: () => {},
 updateAppointment: async () => {},
 removeAppointment: async () => {},
 appointmentDetails: {},
});

interface AppointmentProviderProps {
 children: ReactNode;
}

const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
 const [appointments, setAppointments] = useState<Appointment[]>([]);
 const [appointmentDetails, setAppointmentDetails] = useState<Partial<Appointment>>({});

 const saveAppointmentDetails = async (appointment: Partial<Appointment>, employee_id?: string) => {
   if (employee_id) {
     const employeeRef = ref(FIREBASE_DB, `/employees/`);
     const barberSnapshot = await get(employeeRef);
     const barberData = barberSnapshot.val() as BarberData;
     setAppointmentDetails(prevState => ({ ...prevState, ...appointment, employee: barberData }));
   } else {
     setAppointmentDetails(prevState => ({ ...prevState, ...appointment }));
   }
 };

 const addAppointment = async (appointment: Appointment) => {
  const newAppointmentRef = push(ref(FIREBASE_DB, `appointments`));
  if (newAppointmentRef.key !== null) {
    appointment.appointment_id = newAppointmentRef.key; // Store the generated key as appointment_id
  } else {
    throw new Error("Key is null");
  }
  await set(newAppointmentRef, appointment);
  setAppointments(currentAppointments => [...currentAppointments, appointment]);
 };
 
 const updateAppointment = async (appointmentId: string, updatedAppointment: Appointment) => {
  const appointmentRef = ref(FIREBASE_DB, `appointments/`);
  await set(appointmentRef, updatedAppointment);
  const updatedAppointments = appointments.map(appointment => 
   appointment.appointment_id === appointmentId ? updatedAppointment : appointment
  );
  setAppointments(updatedAppointments);
 };
 
 const removeAppointment = async (appointmentId: string) => {
  await remove(ref(FIREBASE_DB, `appointments/`));
  const updatedAppointments = appointments.filter(appointment => 
   appointment.appointment_id !== appointmentId
  );
  setAppointments(updatedAppointments);
 };

 const contextValue: AppointmentContextInterface = {
  appointments,
  addAppointment,
  saveAppointmentDetails,
  updateAppointment,
  removeAppointment,
  appointmentDetails,
 };

 return React.createElement(AppointmentContext.Provider, { value: contextValue }, children);
};

export default AppointmentProvider;