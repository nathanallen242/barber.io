type CancelAppointmentResponse = {
    success: boolean;
    message?: string;  // on success
    error?: string;    // on failure
}

type RescheduleAppointmentResponse = {
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