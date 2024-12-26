import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import CalendarStrip from 'react-native-calendar-strip';
import { Moment } from 'moment';

interface TimeSlot {
    time: string;
    available: boolean;
}

type TimePeriod = 'Morning' | 'Afternoon' | 'Night';

const timeSlots: Record<TimePeriod, TimeSlot[]> = {
    Morning: [
      { time: '08:00', available: true },
      { time: '08:30', available: true },
      { time: '09:00', available: false },
      { time: '09:30', available: true },
    ],
    Afternoon: [
      { time: '12:00', available: true },
      { time: '12:30', available: false },
      { time: '13:00', available: true },
      { time: '13:30', available: true },
    ],
    Night: [
      { time: '16:00', available: true },
      { time: '16:30', available: false },
      { time: '17:00', available: true },
      { time: '17:30', available: true },
    ],
  };

export default function DetailsSelection() {
    const { colors, typography } = useThemeStore();
    const [selectedDate, setSelectedDate] = useState<Moment>();
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('Morning');

    const handleDateSelected = (momentDate: Moment) => {
        setSelectedDate(momentDate);
        setSelectedTime(null);
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { 
                color: colors.text, 
                fontFamily: typography.fonts.regular,
                fontSize: typography.sizes.xxl }]}>Select your preferred availability.</Text>
             <View style={styles.header}>
                 {true && (
                    <Image
                    source={require('@/assets/images/pfp.png')}
                        style={styles.profileImage}
                    />
                )}
            </View>

                        {true && (
            <View style={styles.barberInfo}>
                <Text style={[styles.barberName, { color: colors.text }]}>Nathan Allen</Text>
                <Text style={[styles.barberSpecialty, { color: colors.subtext }]}>Barber</Text>
            </View>
            )}

          <CalendarStrip
            scrollable
            style={[styles.calendar, { backgroundColor: colors.border }]}
            calendarHeaderStyle={[{ color: colors.text, fontFamily: typography.fonts.regular, fontSize: typography.sizes.lg }]}
            dateNumberStyle={[styles.dateNumber, { color: colors.text }]}
            dateNameStyle={[styles.dateName, { color: colors.subtext }]}
            highlightDateNumberStyle={[styles.highlightDateNumber, { color: 'white' }]}
            highlightDateNameStyle={[styles.highlightDateName, { color: 'white' }]}
            disabledDateNameStyle={{ color: colors.subtext }}
            disabledDateNumberStyle={{ color: colors.subtext }}
            iconContainer={{ flex: 0.1 }}
            selectedDate={selectedDate}
            onDateSelected={handleDateSelected}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
            useIsoWeekday={false}
          />
    
          {/* Time Period Selector */}
          <View style={[
                styles.periodContainer, 
                { backgroundColor: colors.border }
            ]}>
            {(['Morning', 'Afternoon', 'Night'] as TimePeriod[]).map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && [
                    styles.selectedPeriodButton,
                    { backgroundColor: colors.card }
                ],
                  { backgroundColor: colors.border }
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Ionicons 
                  name={period === 'Morning' ? 'sunny' : period === 'Afternoon' ? 'partly-sunny' : 'moon'} 
                  size={16} 
                  color={selectedPeriod === period ? 'white' : 'black'} 
                />
                <Text style={[
                  styles.periodText,
                  { color: selectedPeriod === period ? 'white' : 'black' }
                ]}>{period}</Text>
              </TouchableOpacity>
            ))}
          </View>
    
          {/* Time Slots Grid */}
          <View style={styles.timeSlotsGrid}>
            {timeSlots[selectedPeriod].map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeSlot,
                  { 
                    backgroundColor: colors.card,
                    borderColor: colors.border 
                  },
                  selectedTime === slot.time && [
                    styles.selectedTimeSlot,
                    { 
                        backgroundColor: colors.primary,
                        borderColor: colors.primary 
                    }
                  ],
                  !slot.available && [
                    styles.unavailableTimeSlot,
                    { 
                        backgroundColor: 'lightgrey',
                        borderColor: 'grey'
                    }
                  ]
                ]}
                onPress={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
              >
                <Text style={[
                  styles.timeText,
                  { color: slot.available ? colors.text : colors.subtext }
                ]}>{slot.time}</Text>
              </TouchableOpacity>
            ))}

            {/* Appointment Confirmation */}
            <View style={{ marginTop: 15, alignItems: 'center', flex: 1}}>
                <TouchableOpacity 
                style={[styles.confirmButton, { backgroundColor: colors.primary }]} 
                onPress={() => console.log('Appointment confirmation button clicked!')}>
                    <Text style={styles.confirmButtonText}>Confirm & Pay</Text>
                </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    calendar: {
        height: 100,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 20,
    },
    dateNumber: {
        fontSize: 16,
        fontWeight: '600',
    },
    dateName: {
        fontSize: 12,
    },
    highlightDateNumber: {
        fontSize: 16,
        fontWeight: '600',
    },
    highlightDateName: {
        fontSize: 12,
        fontWeight: '600',
    },
    header: {
        alignItems: 'center',
        marginVertical: 15,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Poppins_500Regular',
        marginTop: 10,
        alignSelf: 'center'
    },
    profileImage: {
        width: 175,
        height: 175,
        borderRadius: 100,
        marginBottom: 10,
    },
    barberInfo: {
        alignItems: 'center',
        marginBottom: 30,
    },
    barberName: {
        fontSize: 23,
        fontFamily: 'Poppins_600SemiBold'
    },
    barberSpecialty: {
        fontSize: 20,
        fontFamily: 'Poppins_500Regular',
        color: 'gray',
    },
    periodContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 4,
        backgroundColor: '#F5F6FA',
        borderRadius: 25,
    },
    periodButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        gap: 8,
    },
    selectedPeriodButton: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    periodText: {
        fontSize: 14,
        fontFamily: 'Poppins_500Regular',
    },
    timeSlotsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
    },
    timeSlot: {
        width: '48%',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#F5F6FA',
    },
    selectedTimeSlot: {
        backgroundColor: '#4460F7',
        borderColor: '#4460F7',
    },
    unavailableTimeSlot: {
        backgroundColor: '#F5F6FA',
        borderColor: '#F5F6FA',
    },
    timeText: {
        fontSize: 16,
        fontFamily: 'Poppins_500Regular',
        color: '#1A1D1F',
    },
    confirmButton: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});