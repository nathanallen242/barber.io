import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { useUserStore } from '@/store/userStore';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { Availability, Period } from '@/types/models';
import type { BookAppointmentRequest, BookAppointmentResponse } from '@/types/api';
import CalendarStrip from 'react-native-calendar-strip';
import { useBookingStore } from '@/store/bookingStore';
import { Moment } from 'moment';
import Toast from 'react-native-toast-message';
import moment from 'moment';

export default function DetailsSelection() {
  const router = useRouter();
  const { colors, typography } = useThemeStore();
  const { user } = useUserStore();

  const [selectedDate, setSelectedDate] = useState<Moment>();
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(Period.Morning);
  const [isLoading, setIsLoading] = useState(false);

  const selectedBarber = useBookingStore((state) => state.selectedBarber);
  const selectedService = useBookingStore((state) => state.selectedService);
  const clearBooking = useBookingStore((state) => state.clearBooking)
  const [barberAvailability, setBarberAvailability] = useState<Availability[]>([]);

  // 1. When user selects a date in the calendar, store it in state
  const handleDateSelected = (momentDate: Moment) => {
    setSelectedDate(momentDate);
    setSelectedTime(null);
  };

  // 2. Fetch barber availability via Supabase RPC
  // TODO: Abstract to lib folder and call as RPC name
  useEffect(() => {
    const fetchBarberAvailability = async () => {
      const { data, error } = await supabase
        .rpc('get_barber_availability', { p_barber_id: selectedBarber?.id });
      if (error) {
        console.error('Error fetching barber availability:', error);
      } else {
        setBarberAvailability(data);
        // console.log('Barber Availability:', JSON.stringify(data, null, 2));
      }
    };

    if (selectedBarber) {
      fetchBarberAvailability();
    }
  }, [selectedBarber]);

  // 3) Filter the availability by selected date and period
  const filteredSlots = barberAvailability.filter((slot) => {
    if (!selectedDate) return false;
    // Compare slot.date (a Date) with selectedDate (a Moment) by day
    const sameDay = moment(slot.date).isSame(selectedDate, 'day');
    const samePeriod = slot.period === selectedPeriod;
    return sameDay && samePeriod;
  });

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime || !selectedBarber?.id || !user?.id || !selectedService?.id) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select all required booking details"
      });
      return;
    }

    setIsLoading(true);

    const startTime = new Date(selectedTime);
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);

    const bookingRequest: BookAppointmentRequest = {
      p_barber_id: selectedBarber.id,
      p_client_id: user.id,
      p_service_id: selectedService.id,
      p_barber_image_url: selectedBarber.profile_picture || '',
      p_client_image_url: user.profile_picture || '',
      p_date: new Date(selectedDate.format('YYYY-MM-DD')),
      p_start_time: startTime,
      p_end_time: endTime,
      p_price: selectedService.price || 0
    };

    // console.log(JSON.stringify(bookingRequest, null, 2))
    // setIsLoading(false);
    try {
      const { data, error } = await supabase
        .rpc('book_appointment', bookingRequest) as 
        { data: BookAppointmentResponse | null, error: any };

      if (error) {
        throw error;
      }

      if (data?.success) {
        Toast.show({
          type: "success",
          text1: data.message || "Appointment booked successfully!"
        });
        clearBooking();
        router.replace('/home');
      } else {
        throw new Error(data?.error || "Failed to book appointment");
      }
    } catch (error) {
      console.error('Booking error:', error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error instanceof Error ? error.message : "An unexpected error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
            fontFamily: typography.fonts.regular,
            fontSize: typography.sizes.xxl,
          },
        ]}
      >
        Select your preferred availability.
      </Text>

      <View style={styles.header}>
        {true && (
          <Image
            source={{ uri: selectedBarber?.profile_picture }}
            style={styles.profileImage}
          />
        )}
      </View>

      {true && (
        <View style={styles.barberInfo}>
          <Text style={[styles.barberName, { color: colors.text }]}>{selectedBarber?.forename} {selectedBarber?.surname}</Text>
          <Text style={[styles.barberSpecialty, { color: colors.subtext }]}>
          {selectedBarber?.job_role ? (selectedBarber.job_role as string).charAt(0).toUpperCase() + (selectedBarber.job_role as string).slice(1) : ""}
        </Text>
        </View>
      )}

      <CalendarStrip
        scrollable
        style={[styles.calendar, { backgroundColor: colors.border }]}
        calendarHeaderStyle={{
          color: colors.text,
          fontFamily: typography.fonts.regular,
          fontSize: typography.sizes.lg,
        }}
        dateNumberStyle={[styles.dateNumber, { color: colors.text }]}
        dateNameStyle={[styles.dateName, { color: colors.subtext }]}
        highlightDateNumberStyle={[styles.highlightDateNumber, { color: colors.primary }]}
        highlightDateNameStyle={[styles.highlightDateName, { color: colors.primary }]}
        disabledDateNameStyle={{ color: colors.subtext }}
        disabledDateNumberStyle={{ color: colors.subtext }}
        iconContainer={{ flex: 0.1 }}
        selectedDate={selectedDate}
        onDateSelected={handleDateSelected}
        minDate={new Date()}
        maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
        useIsoWeekday={false}
        useNativeDriver
      />

      {/* Period Selector */}
      <View style={[styles.periodContainer, { backgroundColor: colors.border }]}>
        {([Period.Morning, Period.Afternoon, Period.Night] as Period[]).map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && [
                styles.selectedPeriodButton,
                { backgroundColor: colors.card },
              ],
              { backgroundColor: colors.border },
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Ionicons
              name={
                period === Period.Morning
                  ? 'sunny'
                  : period === Period.Afternoon
                  ? 'partly-sunny'
                  : 'moon'
              }
              size={16}
              color={selectedPeriod === period ? colors.primary : 'white'}
            />
            <Text
              style={[
                styles.periodText,
                { color: selectedPeriod === period ? colors.primary : 'white' },
              ]}
            >
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Time Slots for the Filtered Availabilities */}
      <View style={styles.timeSlotsGrid}>
        {filteredSlots.map((slot) => {
          // Turn the ISO string into local time if needed
          const displayTime = new Date(slot.start_time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.timeSlot,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
                selectedTime === slot.start_time && [
                  styles.selectedTimeSlot,
                  {
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                  },
                ],
                !slot.available && [
                  styles.unavailableTimeSlot,
                  {
                    backgroundColor: 'lightgrey',
                    borderColor: 'grey',
                  },
                ],
              ]}
              onPress={() => slot.available && setSelectedTime(slot.start_time)}
              disabled={!slot.available}
            >
              <Text
                style={[
                  styles.timeText,
                  { color: slot.available ? colors.text : colors.subtext },
                ]}
              >
                {displayTime}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Confirmation Button */}
      <View style={{ marginTop: 30, alignItems: 'center', flex: 1, paddingBottom: 25 }}>
      <TouchableOpacity
        style={[
          styles.confirmButton,
          { backgroundColor: colors.primary },
          isLoading && { opacity: 0.7 }
        ]}
        onPress={handleConfirm}
        disabled={isLoading}
      >
        <Text style={styles.confirmButtonText}>
          {isLoading ? "Booking..." : "Confirm"}
        </Text>
      </TouchableOpacity>
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
        textTransform: 'capitalize'
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