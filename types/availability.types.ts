// /types/availability.types.ts

export interface IAvailability {
    dates: string[];          // Storing selected dates as ISO strings: 'YYYY-MM-DD'
    startTime: Date;
    endTime: Date;
    category: string;         // Category name, e.g. 'Meeting', 'Hangout', etc.
    notes: string;
  }
  