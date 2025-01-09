import React, { useRef, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import { Button } from '@/components/ui/Button';
import { useThemeStore } from '@/store/themeStore';
import { CalendarBody, 
    CalendarContainer, 
    CalendarHeader, 
    EventItem,
    CalendarKitHandle
} from '@howljs/calendar-kit';
import ColorPicker, { 
    Panel1,  
    Preview, 
    OpacitySlider, 
    HueSlider 
  } from 'reanimated-color-picker';
import Header from '@/components/calendar/Header';  
import Toast from 'react-native-toast-message';
import { useSharedValue } from 'react-native-reanimated';
import useCalendarTheme from '@/theme/calendarTheme';

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
  const [draftEvent, setDraftEvent] = React.useState<EventItem | null>(null);
  const [events, setEvents] = React.useState<EventItem[]>([]);

  const handleDragCreateStart = (start: any) => {
    Toast.show({
      type: 'info',
      text1: 'Creating new appointment availability!',
      text2: `Be sure to include all required fields for your clientele...`,
    });
  };

  const handleDragCreateEnd = (event: any) => {
    const generatedId = Date.now().toString();
    const newEvent: EventItem = {
        ...event,
        id: generatedId,
        title: '',
        color: '#4285F4',  // Example default color
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
        {isModalVisible && (
            <Modal
                transparent
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff', padding: 20, width: '80%', borderRadius: 8 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                    {draftEvent ? `New Event (ID: ${draftEvent.id})` : 'New Event'}
                    </Text>

                    {/* Pre-filled Start/End times */}
                    <Text>Start: {draftEvent?.start?.dateTime || ''}</Text>
                    <Text>End: {draftEvent?.end?.dateTime || ''}</Text>

                    {/* Title input */}
                    <TextInput
                    placeholder="Enter title..."
                    value={draftEvent?.title}
                    onChangeText={(text) =>
                        draftEvent && setDraftEvent({ ...draftEvent, title: text })
                    }
                    style={{ borderWidth: 1, borderColor: '#ccc', marginVertical: 10, padding: 8 }}
                    />

                    {/* Example Reanimated Color Picker */}
                    <ColorPicker
                    style={{ width: '70%', alignSelf: 'center', gap: 15, marginVertical: 20 }}
                    value={draftEvent?.color || 'red'}
                    onComplete={(selectedColor) => {
                        if (draftEvent && selectedColor?.hex) {
                        setDraftEvent({
                            ...draftEvent,
                            color: selectedColor.hex,
                        });
                        }
                    }}
                    >
                    <Preview />
                    <Panel1 />
                    <HueSlider />
                    <OpacitySlider />
                    </ColorPicker>

                    {/* Confirm button */}
                    <Button
                    children="Add Event"
                    onPress={() => {
                        if (draftEvent) {
                        setEvents([...events, draftEvent]);
                        // TODO: API operation to add availability to table for barber
                        }
                        setIsModalVisible(false);
                    }}
                    />

                    {/* Cancel button */}
                    <Button children="Cancel" onPress={() => setIsModalVisible(false)} />
                </View>
                </View>
            </Modal>
            )}
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