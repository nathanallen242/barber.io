import { supabase } from "@/server/client";
import { Appointment } from "@/types/models";
import { 
    GetAppointmentRequest, 
    GetAppointmentResponse,
    CancelAppointmentRequest,
    CancelAppointmentResponse,
    RescheduleAppointmentRequest,
    RescheduleAppointmentResponse } from "@/types/api";

export const fetchAppointments = async (appointmentParams: GetAppointmentRequest) => {
    try {
        const { data, error } = await supabase.rpc('get_appointments', appointmentParams) as
            { data: GetAppointmentResponse | null, error: any };

        if (data?.error_description) {
            throw error;
        }

        if (data?.status_code === 200) {
            var appointments: Appointment[] = []
            if (data?.appointments != null) {
                appointments = data.appointments.map((appointment) => {
                    return {
                        id: appointment.id,
                        barber_id: appointment.barber_id,
                        client_id: appointment.client_id,
                        service_id: appointment.service_id,
                        appointment_date: new Date(appointment.appointment_date),
                        start_time: new Date(appointment.start_time),
                        end_time: new Date(appointment.end_time),
                        price: appointment.price,
                        status: appointment.status,
                        client_image_url: appointment.client_image_url,
                        barber_image_url: appointment.barber_image_url,
                        service_name: appointment.service_name,
                        client_forename: appointment.client_forename,
                        client_surname: appointment.client_surname,
                        barber_forename: appointment.barber_forename,
                        barber_surname: appointment.barber_surname,
                    };
                });   
            }
            return appointments;
        } else if (data?.status_code === 404) {
            throw new Error(data?.error_description);
        }
    } catch (error) {
        console.error("Booking error:", error);
    }
};

export const cancelAppointment = async (appointmentParams: CancelAppointmentRequest) => {
    try {
        const { data, error } = await supabase.rpc('cancel_appointment', appointmentParams) as
            { data: CancelAppointmentResponse, error: any };

        if (error) {
            throw new Error(error.message);
        }

        if (data?.success === false) {
            throw new Error(data.error);
        }

        return data;
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        };
    }
};

export const editAppointment = async (appointmentParams: RescheduleAppointmentRequest) => {
    try {
        const { data, error } = await supabase.rpc('reschedule_appointment', {
            p_appointment_id: appointmentParams.p_appointment_id,
            p_new_date: appointmentParams.p_new_date,
            p_new_start_time: appointmentParams.p_new_start_time,
            p_new_end_time: appointmentParams.p_new_end_time
        }) as { data: RescheduleAppointmentResponse, error: any };

        if (error) {
            throw new Error(error.message);
        }

        if (data?.success === false) {
            throw new Error(data.error);
        }

        return data;
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        };
    }
};


