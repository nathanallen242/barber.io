import React, { useRef, useCallback } from 'react';
import uuid from 'react-native-uuid';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { useThemeStore } from '@/store/themeStore';
import { useUserStore } from '@/store/userStore';
import { useAvailabilityStore } from '@/store/availabilityStore';
import {  
  eventItemToAvailability, 
  IAvailabilityEvent } from '@/types/availability.types';
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
import { fetchAvailability } from '@/server/availability';
import { Mode } from '@/components/calendar/CalendarModal';

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
  const user = useUserStore((state) => state.user);
  const colors = useThemeStore((state) => state.colors);
  const calendarTheme = useCalendarTheme();
  const calendarRef = useRef<CalendarKitHandle>(null);
  const currentDate = useSharedValue(INITIAL_DATE);
  const { bottom: safeBottom } = useSafeAreaInsets();

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<Mode>(Mode.Create);
  const [draftEvent, setDraftEvent] = React.useState<IAvailabilityEvent | null>(null);

  const { 
    getCalendarEvents,
    addEvent,
    updateEvent,
    deleteEvent
  } = useAvailabilityStore();
  const calendarEvents = getCalendarEvents();

  const handleDragCreateStart = (event: any) => {
    console.log(event)
    Toast.show({
      type: 'info',
      text1: 'Creating new appointment availability!',
      text2: `Be sure to include all required fields for your clientele...`,
    });
  };

  const handleDragCreateEnd = (event: any) => {
    setModalMode(Mode.Create);
    const defaultColor = '#4285F4'
    const newEvent: IAvailabilityEvent = {
        ...event,
        id: uuid.v4(),
        title: '',
        color: defaultColor,
        notes: '',
    };
    setDraftEvent(newEvent);
    setIsModalVisible(true);
  };

  const handlePressEvent = (event: IAvailabilityEvent) => {
    setModalMode(Mode.Update);
    setDraftEvent(event);
    setIsModalVisible(true);
  };

  const handleDeleteEvent = (event: IAvailabilityEvent) => {
    try {
        deleteEvent(event.id);
        Toast.show({
            type: 'success',
            text1: 'Availability deleted successfully',
        });
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Failed to delete availability',
            text2: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
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

  /* Only saves a single event to Zustand; confirmation button within Header.tsx will confirm
     using Supabase SDK 
  */
  const handleSave = async (event: IAvailabilityEvent) => {
    try {
      const availability = eventItemToAvailability(event, user!.id);
          
      if (modalMode === Mode.Create) {
          addEvent(availability);
          Toast.show({
              type: 'success',
              text1: 'Availability added successfully',
          });
        } else {
            updateEvent(availability.id, availability);
            Toast.show({
                type: 'success',
                text1: 'Availability updated successfully',
            });
        }
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: modalMode === Mode.Create
                ? 'Failed to add availability'
                : 'Failed to update availability',
            text2: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
  };

  const handleRefresh = useCallback(async () => {
    if (user?.id) {
      try {
        console.log('Refreshing availability events...')
        await fetchAvailability(user.id);
      } catch (error) {
        console.log(error)
        Toast.show({
          type: 'error',
          text1: 'Failed to refresh availabilities',
          text2: error instanceof Error ? error.message : 'Unknown error occurred'
        });
      }
    }
  }, [user?.id]);

  React.useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);


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
            events={calendarEvents}
            overlapType='no-overlap'
            onPressEvent={handlePressEvent}
            minDate={MIN_DATE}
            onChange={handleDateChange}
            onDateChanged={handleDateChange}
            defaultDuration={60}
            dragStep={60}
            allowDragToEdit={false}
            allowDragToCreate={true}
            onDragCreateEventStart={handleDragCreateStart}
            onDragCreateEventEnd={handleDragCreateEnd}
            useHaptic
            scrollToNow
            spaceFromBottom={safeBottom}
            allowPinchToZoom
            onRefresh={handleRefresh}
            >
        <CalendarHeader
           />
        <CalendarBody />
        </CalendarContainer>
        
        <CalendarModal
            isVisible={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
              setModalMode(Mode.Create);
              setDraftEvent(null);
          }}
            draftEvent={draftEvent}
            setDraftEvent={setDraftEvent}
            onSave={handleSave}
            onDelete={handleDeleteEvent}
            mode={modalMode}
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