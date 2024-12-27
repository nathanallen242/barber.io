import { User } from '@supabase/supabase-js'

export interface PublicUser {
    id: string
    forename?: string
    surname?: string
    birth_date?: string
    country?: string
    phone_number?: string
    profile_picture?: string
    job_role?: string
}

export interface Appointment {
    id: string
    barber_id: string
    client_id: string
    service_id: string
    appointment_date: string
    price?: number
    status: number
}

export interface Availability {
    id: string
    barber_id: string
    date: string
    is_booked: boolean
    start_time: string
    end_time: string
}

export interface Service {
    id: string
    category?: string
    description?: string
    name: string
    price: number
}

export interface Notification {
    id: string
    body?: string
    created_at: string
    delivery_method: string
    is_read: boolean
    title: string
    type: string
}

export interface UserProfile extends User, PublicUser {}