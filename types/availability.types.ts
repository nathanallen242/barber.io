import { EventItem } from '@howljs/calendar-kit';
import { Availability, Period } from '@/types/models';
import { format, parseISO } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { DateTimeType } from '@howljs/calendar-kit';
import { formatDate } from '@/utils/date';

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
    }
];


/**
 * The above function convert between availability data and event items in TypeScript.
 * @param {Availability} availability - The `availabilityToEventItem` function takes an `Availability`
 * object as a parameter and converts it into an `IAvailabilityEvent` object with specific properties.
 */
export const availabilityToEventItem = (availability: Availability): IAvailabilityEvent => ({
    id: availability.id,
    barber_id: availability.barber_id,
    title: availability.title,
    start: toDateTime(availability.start_time),
    end: toDateTime(availability.end_time),
    notes: availability.notes,
    color: availability.available ? '#4CAF50' : '#9E9E9E',
    category: availability.available ? 'Available' : 'Unavailable'
  });
  
/**
 * The function `eventItemToAvailability` converts an event item to an availability object in
 * TypeScript.
 * @param {IAvailabilityEvent} event - IAvailabilityEvent - an interface representing an availability
 * event with properties like id, start, end, category, title, and notes.
 * @param {string} barberId - The `barberId` parameter is a string representing the unique identifier
 * of a barber. It is used in the `eventItemToAvailability` function to associate the availability
 * event with a specific barber.
 * @returns The function `eventItemToAvailability` returns an object of type `Availability`.
 */
export const eventItemToAvailability = (
    event: IAvailabilityEvent, 
    barberId: string
  ): Availability => {
    const startTime = fromDateTime(event.start.dateTime ?? '')
    const endTime = fromDateTime(event.end.dateTime ?? '')
    const date = formatDate(startTime);
    // console.log('Start Date:', formatDate(startTime))
    return {
      id: event.id,
      barber_id: barberId,
      available: event.color === '#4CAF50',
      date: date,
      start_time: startTime,
      end_time: endTime,
      period: determinePeriod(new Date(date)),
      title: event.title || '',
      notes: event.notes || ''
    };
};
  
// Helper function to determine period based on time
export const determinePeriod = (date: Date): Period => {
    const hours = date.getHours();
    if (hours >= 5 && hours < 12) return Period.Morning;
    if (hours >= 12 && hours < 17) return Period.Afternoon;
    return Period.Night;
};

function toDateTime(date: Date | string | undefined | null, timeZone?: string): DateTimeType {
    if (!date) {
      throw new Error('Date is required for availability');
    }
    
    const validDate = new Date(date);
    if (isNaN(validDate.getTime())) {
      throw new Error('Invalid date provided');
    }
    
    return {
      dateTime: validDate.toISOString(),
      timeZone,
    };
}

function fromDateTime(dateTime: string, timeZone?: string): Date {
    if (!dateTime) {
      throw new Error("dateTime is required for conversion to Date");
    }
  
    try {
      const utcDate = parseISO(dateTime);
  
      if (timeZone) {
        const zonedDate = toZonedTime(utcDate, timeZone);
        return zonedDate;
      } else {
        return utcDate;
      }
    } catch (error) {
      console.warn(`Error parsing date: ${error}. Returning Invalid Date`);
      return new Date('invalid date');
    }
  }