import React, { useRef, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { useThemeStore } from '@/store/themeStore';
import { CalendarBody, 
    CalendarContainer, 
    CalendarHeader, 
    CalendarKitHandle
} from '@howljs/calendar-kit';
import Header from '@/components/calendar/Header';  
import Toast from 'react-native-toast-message';
import { useSharedValue } from 'react-native-reanimated';
import useCalendarTheme from '@/theme/calendarTheme';
import CalendarModal from '@/components/calendar/CalendarModal';
import { IAvailabilityEvent } from '@/types/availability.types';

// TODO: Investigate error; likely due to imported libraries relying internally on react-native-reanimated
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default; temporarily disabled
});

// Date constants for the CalendarKit
const MIN_DATE = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate(),
).toISOString();

const INITIAL_DATE = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate()
).toISOString();

const Schedule: React.FC = () => {
  const { colors } = useThemeStore();
  const calendarTheme = useCalendarTheme();
  const calendarRef = useRef<CalendarKitHandle>(null);
  const currentDate = useSharedValue(INITIAL_DATE);
  const { bottom: safeBottom } = useSafeAreaInsets();

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [draftEvent, setDraftEvent] = React.useState<IAvailabilityEvent | null>(null);
  const [events, setEvents] = React.useState<IAvailabilityEvent[]>([]);

  const handleDragCreateStart = (event: any) => {
    console.log(event)
    Toast.show({
      type: 'info',
      text1: 'Creating new appointment availability!',
      text2: `Be sure to include all required fields for your clientele...`,
    });
  };

  const handleDragCreateEnd = (event: any) => {
    console.log(event)
    const generatedId = Date.now().toString();
    const newEvent: IAvailabilityEvent = {
        ...event,
        id: generatedId,
        title: '',
        color: '#4285F4', // default
        notes: '',
    };
    setDraftEvent(newEvent);
    setIsModalVisible(true);
  };

  const handleDateChange = useCallback((date: string) => {
    currentDate.value = date;
  }, []);

  const _onPressToday = useCallback(() => {
    calendarRef.current?.goToDate({
      date: new Date().toISOString(),
      animatedDate: true,
      hourScroll: true,
    });
  }, []);

  const onPressPrevious = useCallback(() => {
    calendarRef.current?.goToPrevPage();
  }, []);

  const onPressNext = useCallback(() => {
    calendarRef.current?.goToNextPage();
  }, []);

  /* Only saves events to Zustand; confirmation button within Header.tsx will confirm
     using Supabase SDK 
  */
  const handleSave = (newEvents: IAvailabilityEvent[]) => {
    setEvents(prev => [...prev, ...newEvents]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        currentDate={currentDate}
        onPressToday={_onPressToday}
        onPressPrevious={onPressPrevious}
        onPressNext={onPressNext}
      />
        <CalendarContainer
            ref={calendarRef}
            theme={calendarTheme}
            events={events}
            overlapType='no-overlap'
            onPressEvent={(event) => {
                console.log('Event pressed:', event);
            }}
            minDate={MIN_DATE}
            onChange={handleDateChange}
            onDateChanged={handleDateChange}
            defaultDuration={60}
            dragStep={60}
            allowDragToEdit={true}
            allowDragToCreate={true}
            onDragCreateEventStart={handleDragCreateStart}
            onDragCreateEventEnd={handleDragCreateEnd}
            useHaptic
            scrollToNow
            spaceFromBottom={safeBottom}
            allowPinchToZoom
            onRefresh={() => console.log('refreshing...')}
            >
        <CalendarHeader
           />
        <CalendarBody />
        </CalendarContainer>
        
        <CalendarModal
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            draftEvent={draftEvent}
            setDraftEvent={setDraftEvent}
            onSave={handleSave}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  }
});

export default Schedule;