import React from 'react';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
} from '@howljs/calendar-kit';
import { TouchableOpacity } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { Feather } from '@expo/vector-icons';
import { darkCalendarTheme } from '@/theme/colors';

const Schedule: React.FC = () => {
  const [events, setEvents] = React.useState<any[]>([]);

  const handleDragCreateStart = (start: any) => {
    console.log('Started creating event at:', start);
  };
  const handleDragCreateEnd = (newEvent: any) => {
    console.log('New event:', newEvent);
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const { mode, colors } = useThemeStore();

  return (
    <>
    <CalendarContainer
      allowPinchToZoom
      theme={darkCalendarTheme}
      scrollByDay
      hideWeekDays={[7]}
      defaultDuration={60}
      events={events.map(event => ({ ...event, key: event.id }))} 
    >
      <CalendarHeader />
      <CalendarBody
      />
    </CalendarContainer>
    <TouchableOpacity>
        <Feather name="plus-circle"
        size={50} 
        color={colors.icon}
        style={{ position: 'absolute', bottom: 60, right: 30}} />
    </TouchableOpacity>
    </>
  );
};

export default Schedule;
