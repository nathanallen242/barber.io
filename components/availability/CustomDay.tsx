// /components/CustomDay.tsx
import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Moment } from 'moment';
import { useThemeStore } from '@/store/themeStore';

interface CustomDayProps {
  date: Moment;
  selected: boolean;
  onDateSelect: () => void;
}

const CustomDay: React.FC<CustomDayProps> = ({ date, selected, onDateSelect }) => {
  const { colors, typography } = useThemeStore();
  console.log('Formatted Date:', date.format('D')); // Debugging line

  return (
    <TouchableOpacity
      onPress={onDateSelect}
      style={[
        styles.dayContainer,
        selected && [styles.selectedDay, { backgroundColor: colors.primary }]
      ]}
    >
      <Text style={[
        styles.dayName,
        { color: selected ? colors.button : colors.subtext },
        { fontFamily: typography.fonts.regular }
      ]}>
        {date.format('ddd')}
      </Text>
      <View style={[
        styles.dateContainer,
        selected && { backgroundColor: colors.primary }
      ]}>
        <Text style={[
          styles.dateNumber,
          { color: selected ? colors.button : colors.text },
          { fontFamily: typography.fonts.medium }
        ]}>
          {date.format('D')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    width: 50, // Fixed width to fit calendar strip
    height: 80, // Fixed height to fit calendar strip
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  dateContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  selectedDay: {
    borderRadius: 8,
  },
  dayName: {
    fontSize: 12,
    textAlign: 'center',
  },
  dateNumber: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default memo(CustomDay);
