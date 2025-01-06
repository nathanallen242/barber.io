import { User } from '@supabase/supabase-js'

// Base interface for your public user table fields
export interface PublicUserFields {
    forename?: string
    surname?: string
    birth_date?: string
    country?: string
    phone_number?: string
    profile_picture?: string
    job_role?: string
  }
  
// PublicUser is just the fields + id
export interface PublicUser extends PublicUserFields {
    id: string
  }
  
// UserProfile combines Supabase User with your public fields
export interface UserProfile extends User, PublicUserFields {}
  
// UserView specific fields needed for the barber view
export interface UserView extends PublicUserFields {
    id: string
    email: string
    created_at: string
    updated_at: string
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
    barber_id: string;
    available: boolean;
    date: Date;
    start_time: Date;
    end_time: Date;
    period: string;
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

export interface AnnouncementData {
    id: string;
    title: string;
    description: string;
    image: string | number;
  }
