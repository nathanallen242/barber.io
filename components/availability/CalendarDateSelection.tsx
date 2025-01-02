// /components/CalendarDateSelection.tsx
import React, { memo, useRef, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment, { Moment } from 'moment';
import { useThemeStore } from '@/store/themeStore';
import CustomDay from '@/components/availability/CustomDay';

interface CalendarDateSelectionProps {
  selectedDates: string[];
  onDatesChange: (dates: string[]) => void;
  minDate?: Moment;
}

const CalendarDateSelection: React.FC<CalendarDateSelectionProps> = ({
  selectedDates,
  onDatesChange,
  minDate,
}) => {
  const calendarRef = useRef<CalendarStrip>(null);
  const { colors, typography } = useThemeStore();

  // Add or remove a date from selection
  const handleDateSelection = useCallback((date: Moment) => {
    const dateStr = date.format('YYYY-MM-DD');
    const isSelected = selectedDates.includes(dateStr);
    if (isSelected) {
      onDatesChange(selectedDates.filter(d => d !== dateStr));
    } else {
      onDatesChange([...selectedDates, dateStr]);
    }
  }, [onDatesChange, selectedDates]);


  return (
    <View style={styles.container}>
      <CalendarStrip
        ref={calendarRef}
        dayComponent={props => {
          const momentDate = moment().startOf('day').add(props.date);
          const isSelected = selectedDates.includes(momentDate.format('YYYY-MM-DD'));
          return (
            <CustomDay
              date={momentDate} 
              selected={isSelected} 
              onDateSelect={() => handleDateSelection(momentDate)}
            />
          );
        }}
        scrollable
        style={styles.calendarStrip}
        calendarHeaderStyle={{ 
          color: colors.text, 
          fontFamily: typography.fonts.medium,
          fontSize: typography.sizes.xl 
        }}
        useNativeDriver
        iconStyle={{
            color: colors.icon
        }}
        minDate={minDate ?? moment()}
        useIsoWeekday={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  calendarStrip: {
    height: 120,
    width: 365,
    paddingVertical: 10,
  },
  calendarHeader: {
    paddingBottom: 10,
  },
});

export default memo(CalendarDateSelection);
