import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '@/store/themeStore';

import { IAvailability } from '@/types/availability.types';
import { ICategory } from '@/types/category.types';

import CalendarDateSelection from '@/components/availability/CalendarDateSelection';
import TimePickerRange from '@/components/availability/TimePickerRange';
import CategoryManager from '@/components/availability/CategoryManager';
import Notes from '@/components/availability/Notes';

const AvailabilityScreen: React.FC = () => {
  const { colors, typography } = useThemeStore();
  const insets = useSafeAreaInsets();

  // Example categories: you can make these dynamic
  const [categories, setCategories] = useState<ICategory[]>([
    { label: 'Meeting', color: '#FFB800' },
    { label: 'Hangout', color: '#9747FF' },
    { label: 'Cooking', color: '#FF4747' },
    { label: 'Other',   color: '#666666' },
    { label: 'Weekend', color: '#1F9254' },
  ]);

  // Overall availability state
  const [availability, setAvailability] = useState<IAvailability>({
    dates: [],
    startTime: new Date(),
    endTime: new Date(),
    category: 'Meeting',
    notes: '',
  });

  // Handle creation or deletion of categories
  const handleAddCategory = useCallback((cat: ICategory) => {
    setCategories(prev => {
      // If it already exists, skip
      if (prev.some(c => c.label === cat.label)) {
        return prev;
      }
      return [...prev, cat];
    });
  }, []);

  const handleDeleteCategory = useCallback((catLabel: string) => {
    setCategories(prev => prev.filter(c => c.label !== catLabel));
  }, []);

  // Only update selected dates without re-rendering everything
  const handleDatesChange = useCallback((dates: string[]) => {
    setAvailability(prev => ({
      ...prev,
      dates,
    }));
  }, []);

  // Similarly handle start/end times
  const handleChangeStart = useCallback((date: Date) => {
    setAvailability(prev => ({ ...prev, startTime: date }));
  }, []);

  const handleChangeEnd = useCallback((date: Date) => {
    setAvailability(prev => ({ ...prev, endTime: date }));
  }, []);

  // Select category
  const handleSelectCategory = useCallback((label: string) => {
    setAvailability(prev => ({
      ...prev,
      category: label,
    }));
  }, []);

  const handleChangeNotes = useCallback((text: string) => {
    setAvailability(prev => ({
      ...prev,
      notes: text,
    }));
  }, []);

  const handleSave = useCallback(() => {
    const formattedDates = availability.dates;
    const formattedStart = moment(availability.startTime).format('HH:mm');
    const formattedEnd   = moment(availability.endTime).format('HH:mm');

    const payload = {
      dates: formattedDates,
      startTime: formattedStart,
      endTime: formattedEnd,
      category: availability.category,
      notes: availability.notes,
    };

    console.log('Saving availability:', payload);
    // Make an API call or navigate away
  }, [availability]);

  return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background
          },
        ]}
      >
        <ScrollView 
        style={{
          backgroundColor: colors.background,
          flex: 1
        }}
        contentContainerStyle={{
          paddingVertical: insets.top - 20,
          paddingHorizontal: insets.left + 20,
        }}
        showsVerticalScrollIndicator={false}>

          {/* 1. Calendar Date Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { 
              color: colors.text,
              fontFamily: typography.fonts.light }]}>
              Select date range
            </Text>
            <CalendarDateSelection
              selectedDates={availability.dates}
              onDatesChange={handleDatesChange}
              minDate={moment()}
            />
          </View>

          {/* 2. Time Picker Range */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { 
              color: colors.text,
              fontFamily: typography.fonts.light }]}>
              Set time period
            </Text>
            <TimePickerRange
              startTime={availability.startTime}
              endTime={availability.endTime}
              onChangeStart={handleChangeStart}
              onChangeEnd={handleChangeEnd}
            />
          </View>

          {/* 3. Category Manager */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { 
              color: colors.text,
              fontFamily: typography.fonts.light 
             }]}>
              Tags
            </Text>
            <CategoryManager
              categories={categories}
              selectedCategory={availability.category}
              onSelectCategory={handleSelectCategory}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          </View>

          {/* 4. Notes Input */}
          <Notes
            notes={availability.notes}
            onChangeNotes={handleChangeNotes}
          />

          {/* 5. Save Button */}
          <Pressable
            style={[styles.saveButton, { backgroundColor: colors.button }]}
            onPress={handleSave}
          >
            <Text style={[{ 
              color: colors.text, 
              fontFamily: typography.fonts.medium,
              fontSize: typography.sizes.md  }]}>
              Save
            </Text>
          </Pressable>
        </ScrollView>
      </View>
  );
};

export default AvailabilityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  saveButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  }
});
