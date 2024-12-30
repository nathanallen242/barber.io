import React from 'react';
import {
  CalendarContainer,
  CalendarHeader,
  CalendarBody,
} from "@howljs/calendar-kit";
import { useThemeStore } from '@/store/themeStore';
import { darkCalendarTheme } from '@/theme/colors';

const Schedule: React.FC = () => {
  const handleDragCreateStart = (start: any) => {
    console.log("Started creating event at:", start);
    // You can use this to show a UI indicator that event creation has started
  };
  const handleDragCreateEnd = (event: any) => {
    console.log("New event:", event);
    // Here you would typically add the new event to your events array
    // and possibly open a modal for the user to add more details
  };

  const { mode } = useThemeStore();
  return (
    <CalendarContainer
      theme={darkCalendarTheme}
      scrollByDay
      hideWeekDays={[7]}
      allowDragToCreate={true}
      onDragCreateEventStart={handleDragCreateStart}
      onDragCreateEventEnd={handleDragCreateEnd}
      defaultDuration={60} // New events will be 1 hour long by default
      // ... other props
    >
      <CalendarHeader />
      <CalendarBody />
    </CalendarContainer>
  );
};

export default Schedule;
