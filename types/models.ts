import { User } from '@supabase/supabase-js'

// Define the role type to match database constraints
export type UserRole = 'barber' | 'client'

// Base interface matching your database schema fields
export interface DBUserFields {
  forename?: string
  surname?: string
  phone_number?: string
  profile_picture?: string
  birth_date?: Date
  country?: string
  job_role?: UserRole
}

// Complete database user (includes all fields from your public.users table)
export interface DBUser extends DBUserFields {
  id: string
  email: string
  created_at: string
  updated_at: string
}

// UserProfile merges Supabase User with your custom fields
// Using Omit to re-define email as a PK (cannot be undefined)
export interface UserProfile extends Omit<User, 'email'>, DBUserFields {
  email: string
}


export interface Appointment {
  id: string; // UUID
  barber_id: string; // UUID
  client_id: string; // UUID
  service_id: string; // UUID
  appointment_date: Date; // DATE
  start_time: Date; // TIMESTAMP WITH TIME ZONE
  end_time: Date; // TIMESTAMP WITH TIME ZONE
  price?: number; // DOUBLE PRECISION
  status: number; // INTEGER
  client_image_url: string; // TEXT
  barber_image_url: string; // TEXT
}

export enum Period {
  Morning = "MORNING",
  Afternoon = "AFTERNOON",
  Night = "NIGHT"
}

export interface Availability {
    id: string
    barber_id: string;
    available: boolean;
    date: Date;
    start_time: Date;
    end_time: Date;
    period: Period;
}

export enum ServiceCategory {
  Haircut = "HAIRCUT",        // Regular cuts, fades, styling
  Grooming = "GROOMING",      // Beard trims, shaves, facial hair maintenance
  Treatment = "TREATMENT"     // Scalp treatments, hair treatments, deep conditioning
}

export interface Service {
    id: string
    category?: ServiceCategory
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
