import React, { createContext, useState, ReactNode } from 'react';
import { ref, set, remove } from 'firebase/database';
import { FIREBASE_DB } from '../config/FireBase';

interface Appointment {
 appointment_id: number;
 date_created: Date;
 client_id: string;
 employee_id: string;
 service_id: string | null;
 start_time: Date;
 end_time: Date;
 canceled: boolean;
 cancellation_reason?: string;
}

export interface AppointmentContextInterface {
 appointments: Appointment[];
 addAppointment: (appointment: Appointment) => void;
 saveAppointmentDetails: (appointment: Partial<Appointment>) => void;
 updateAppointment: (appointmentId: number, updatedAppointment: Appointment) => Promise<void>;
 removeAppointment: (appointmentId: number) => Promise<void>;
}

export const AppointmentContext = createContext<AppointmentContextInterface>({
 appointments: [],
 addAppointment: () => {},
 saveAppointmentDetails: () => {},
 updateAppointment: async () => {},
 removeAppointment: async () => {},
});

interface AppointmentProviderProps {
 children: ReactNode;
}

const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
 const [appointments, setAppointments] = useState<Appointment[]>([]);
 const [appointmentDetails, setAppointmentDetails] = useState<Partial<Appointment>>({});

 const saveAppointmentDetails = (details: Partial<Appointment>) => {
    setAppointmentDetails(details);
 };

 const addAppointment = async (appointment: Appointment) => {
  await set(ref(FIREBASE_DB, `appointments`), appointment);
  setAppointments(currentAppointments => [...currentAppointments, appointment]);
 };
 
 const updateAppointment = async (appointmentId: number, updatedAppointment: Appointment) => {
  await set(ref(FIREBASE_DB, `appointments/`), updatedAppointment);
  const updatedAppointments = appointments.map(appointment => 
   appointment.appointment_id === appointmentId ? updatedAppointment : appointment
  );
  setAppointments(updatedAppointments);
 };
 
 const removeAppointment = async (appointmentId: number) => {
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
 };

 return React.createElement(AppointmentContext.Provider, { value: contextValue }, children);
};

export default AppointmentProvider;