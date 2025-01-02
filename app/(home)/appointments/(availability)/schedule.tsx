import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { Agenda, AgendaEntry, DateData } from 'react-native-calendars';
import EventCard from '@/components/booking/EventCard';
import { MaterialIcons } from '@expo/vector-icons';

// Extend the AgendaEntry type with our custom properties
interface CustomAgendaEntry extends AgendaEntry {
  name: string;
  time: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  description?: string;
  eventType: 'available' | 'unavailable' | 'appointment';
}

const Schedule: React.FC = () => {
  const { colors, typography } = useThemeStore();
  // Helper function to get today's date in 'YYYY-MM-DD' format
  const getToday = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (`0${today.getMonth() + 1}`).slice(-2); // Months are zero-indexed
    const day = (`0${today.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const today = getToday();

  // Update static events with our custom properties
  const staticEvents: CustomAgendaEntry[] = [
    {
      name: 'Haircuts Available',
      time: '09:00 AM - 10:00 AM',
      iconName: 'content-cut',
      description: 'Classic Haircut',
      height: 80,
      day: today,
      eventType: 'available',
    },
    {
        name: 'Haircuts Available',
        time: '10:00 AM - 11:00 AM',
        iconName: 'content-cut',
        description: 'Classic Haircut',
        height: 80,
        day: today,
        eventType: 'available',
    },
    {
        name: 'Haircuts Available',
        time: '11:00 AM - 12:00 PM',
        iconName: 'content-cut',
        description: 'Classic Haircut',
        height: 80,
        day: today,
        eventType: 'available',
    },
    {
        name: 'Haircuts Available',
        time: '1:00 PM - 2:00 PM',
        iconName: 'content-cut',
        description: 'Classic Haircut',
        height: 80,
        day: today,
        eventType: 'available',
    },
    {
        name: 'Unavailable',
        time: '2:00 PM - 3:00 PM',
        iconName: 'person-off',
        description: 'Time slot booked by an appointment',
        height: 80,
        day: today,
        eventType: 'appointment',
    },
    {
      name: 'Unavailable',
      time: '3:00 PM - 4:00 PM',
      iconName: 'work-off',
      description: 'Out of office',
      height: 80,
      day: today,
      eventType: 'unavailable',
    },
  ];

  // Initialize items with static events
  const [items, setItems] = useState<{ [key: string]: CustomAgendaEntry[] }>({
    [today]: staticEvents,
  });
  const [selectedDate, setSelectedDate] = useState<string>(today);

  // Load items for the month (no dynamic loading in this example)
  const loadItems = useCallback((day: DateData) => {
    // No dynamic loading; items are already initialized
    // If you have dynamic events, implement loading logic here
  }, []);

  // Update renderItem to pass all custom properties and color mapping
  const renderItem = useCallback((item: CustomAgendaEntry) => {
    return (
      <EventCard
        key={`${item.day}-${item.time}`}
        item={item}
        iconName={item.iconName || 'event'}
      />
    );
  }, []);

  // Render when there's no event for a selected date
  const renderEmptyDate = () => (
    <View style={styles.emptyDate}>
      <Text style={{ color: colors.text }}>No events for this day!</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Agenda
        calendarStyle={{
            backgroundColor: colors.background,
            fontFamily: typography.fonts.regular,
        }}
        items={items}
        hideExtraDays
        onRefresh={() => console.log('refreshing...')}
        loadItemsForMonth={loadItems}
        selected={selectedDate}
        scrollEnabled={true}
        showScrollIndicator={true}
        renderItem={renderItem}
        renderEmptyData={renderEmptyDate}
        minDate={'2024-12-31'}
        theme={{
          dayTextColor: colors.text,
          monthTextColor: colors.text,
          textSectionTitleColor: colors.text,
          calendarBackground: 'transparent',
          agendaDayTextColor: colors.text,
          agendaDayNumColor: colors.text,
          agendaTodayColor: colors.primary,
          agendaKnobColor: colors.text,
          dotColor: colors.secondary,
          textDayFontFamily: typography.fonts.light,
          textMonthFontFamily: typography.fonts.light,
          textDayHeaderFontFamily: typography.fonts.regular,
          reservationsBackgroundColor: 'transparent'
        } as any}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  eventList: {
    flex: 1,
  },
  timeSlot: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  timeText: {
    width: 60,
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  eventCard: {
    flex: 1,
    marginVertical: 15,
    borderRadius: 12,
    padding: 16,
    marginLeft: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  attendees: {
    flexDirection: 'row',
    position: 'absolute',
    right: 12,
    bottom: 12,
  },
  setScheduleButton: {
    backgroundColor: '#E75480',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyDate: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Schedule;