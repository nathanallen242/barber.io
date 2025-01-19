import { format, parseISO } from 'date-fns';

/**
 * Formats a Date object or ISO string to 'YYYY-MM-DD'.
 * @param {string | Date} dateInput - The input date as a string or Date object.
 * @returns {string} - The formatted date string.
 */
export function formatDate(dateInput: string | Date): string {
    const date = typeof dateInput === 'string' ? parseISO(dateInput) : dateInput;
    return format(date, 'yyyy-MM-dd');
}
