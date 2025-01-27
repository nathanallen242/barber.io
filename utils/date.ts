import { format, parseISO } from 'date-fns';

/**
 * Formats a Date object or ISO string to a Date object in the format YYYY-MM-DD.
 * @param {string | Date} dateInput - The input date as a string or Date object.
 * @returns {Date} - The formatted Date object.
 */
export function formatDate(dateInput: string | Date): Date {
  const date = typeof dateInput === 'string' ? parseISO(dateInput) : dateInput;
  const formattedDate = format(date, 'yyyy-MM-dd');
  return parseISO(formattedDate);
}
