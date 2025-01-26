import { Appointment } from "@/types/models";

export type GetAppointmentRequest = {
    user_id: string;
    role: 'client' | 'barber';
}

export type GetAppointmentResponse = {
    status_code: number;
    error_description?: string;
    appointments: Appointment[] | null;
}

export type CancelAppointmentRequest = {
    p_appointment_id: string;
}

export type CancelAppointmentResponse = {
    success: boolean;
    message?: string;  // on success
    error?: string;    // on failure
}

export type RescheduleAppointmentRequest = {
    p_appointment_id: string;
    p_new_date: Date;
    p_new_start_time: Date;
    p_new_end_time: Date;
}

export type RescheduleAppointmentResponse = {
    success: boolean;
    message?: string;
    error?: string;
}

/* Booking Appointments API Contract */
export type BookAppointmentRequest = {
    p_barber_id: string;
    p_client_id: string;
    p_service_id: string;
    p_barber_image_url: string;
    p_client_image_url: string;
    p_barber_forename?: string;
    p_barber_surname?: string;
    p_client_forename?: string;
    p_client_surname?: string;
    p_date: Date;
    p_start_time: Date;
    p_end_time: Date;
    p_price?: number;

}

export type BookAppointmentResponse = {
    success: boolean;
    message?: string;
    error?: string;
}