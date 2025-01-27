import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '@/store/themeStore';
import DateTimePicker from '@react-native-community/datetimepicker';

type DateRange = 'This Week' | 'Custom Range';

export const DateRangeSelector = ({ 
  onRangeChange 
}: { 
  onRangeChange: (startDate: Date, endDate: Date) => void 
}) => {
  const { colors } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange>('This Week');
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date()
  });

  const styles = StyleSheet.create({
    container: {
      marginVertical: 16,
      padding: 12,
      borderRadius: 8,
      backgroundColor: colors.card,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    text: {
      color: colors.text,
      fontSize: 16,
    },
    dropdown: {
      marginTop: 8,
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 8,
    },
    option: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    }
  });

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.header} 
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.text}>{selectedRange}</Text>
        <Ionicons 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={24} 
          color={colors.text} 
        />
      </Pressable>
      
      {isOpen && (
        <View style={styles.dropdown}>
          {/* Dropdown options implementation */}
        </View>
      )}
    </View>
  );
}; 