import { EventItem } from '@howljs/calendar-kit';

export interface ICategory {
    label: string;      // 'Available' | 'Unavailable'
    title?: string;      // e.g., 'Open for Bookings', 'Not Available'
    notes?: string;      // e.g., 'General availability for all services', 'Out of office'
    color: string;      // '#4CAF50' for available, '#9E9E9E' for unavailable
}

export interface IAvailabilityEvent extends EventItem {
    notes?: string;
}

export const DEFAULT_CATEGORIES: ICategory[] = [
    {
        label: 'Available',
        title: 'Open for Bookings',
        notes: 'General availability for all services',
        color: '#4CAF50'
    },
    {
        label: 'Unavailable',
        title: 'Not Available',
        notes: 'Out of office',
        color: '#9E9E9E'
    },
    {   label: 'Custom',
        color: '#F38064'
    }
];

