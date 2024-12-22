import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useBookingStore } from '@/store/bookingStore';

interface TimeSlot {
    time: string;
    available: boolean;
}

interface Day {
    day: number;
    dayOfWeek: string;
}

const days: Day[] = [
    { day: 17, dayOfWeek: 'Sun' },
    { day: 18, dayOfWeek: 'Mon' },
    { day: 19, dayOfWeek: 'Tue' },
    { day: 20, dayOfWeek: 'Wed' },
    { day: 21, dayOfWeek: 'Thu' },
];

const timeSlots: TimeSlot[] = [
    { time: '10:00 am', available: true },
    { time: '11:00 am', available: false },
    { time: '01:30 pm', available: true },
    { time: '03:00 pm', available: true },
    { time: '07:00 pm', available: true },
    { time: '05:00 pm', available: false },
];

export default function DetailsSelection() {
    const { selectedBarber } = useBookingStore();
    const [selectedDay, setSelectedDay] = useState<number | null>(20);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const handleDayPress = (day: number) => {
        setSelectedDay(day);
    };

    const handleTimePress = (time: string) => {
        setSelectedTime(time);
    };

    const handleConfirmPress = () => {
        if (selectedDay && selectedTime) {
            // Logic to confirm and pay, e.g. navigate or call api
            console.log(`Booking Confirmed for Day: ${selectedDay}, Time: ${selectedTime}`);
        } else {
            console.log('Please select a day and time.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select date & time:</Text>
            <View style={styles.header}>
                {true && ( // Display image if available
                    <Image
                    source={require('@/assets/images/pfp.png')}
                        style={styles.profileImage}
                    />
                )}
            </View>

                        {true && (
            <View style={styles.barberInfo}>
                <Text style={styles.barberName}>Nathan Allen</Text>
                <Text style={styles.barberSpecialty}>Barber</Text>
            </View>
            )}

            <View style={styles.daySelection}>
                <Text style={styles.dayLabel}>Day</Text>
                <View style={styles.daysContainer}>
                    {days.map((day) => (
                        <TouchableOpacity
                            key={day.day}
                            style={[styles.dayButton, selectedDay === day.day && styles.selectedDayButton]}
                            onPress={() => handleDayPress(day.day)}
                        >
                            <Text style={styles.dayNumber}>{day.day}</Text>
                            <Text style={styles.dayOfWeek}>{day.dayOfWeek}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.availability}>
                <Text style={styles.availabilityLabel}>Availability</Text>
                <View style={styles.timeSlotsContainer}>
                    {timeSlots.map((slot) => (
                        <TouchableOpacity
                            key={slot.time}
                            style={[
                                styles.timeSlot,
                                !slot.available && styles.timeSlotUnavailable,
                                selectedTime === slot.time && styles.selectedTimeSlot
                            ]}
                            onPress={() => slot.available && handleTimePress(slot.time)}
                            disabled={!slot.available}
                        >
                            <Text style={[styles.timeText, !slot.available && styles.unavailableText]}>{slot.time}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPress}>
                <Text style={styles.confirmButtonText}>Confirm & Pay</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    header: {
        alignItems: 'center', // Center content horizontally
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
    daySelection: {
        marginBottom: 20,
    },
    dayLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayButton: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: 50,
    },
    selectedDayButton: {
        backgroundColor: '#ddd',
    },
    dayNumber: {
        fontSize: 16,
    },
    dayOfWeek: {
        fontSize: 12,
        color: 'gray',
    },
    availability: {
        marginBottom: 30,
    },
    availabilityLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    timeSlotsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    timeSlot: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 8,
        marginRight: 10,
        marginBottom: 10,
    },
    selectedTimeSlot: {
        backgroundColor: '#ddd',
    },
    timeSlotUnavailable: {
        opacity: 0.5,
    },
    timeText: {
        fontSize: 16,
    },
    unavailableText: {
        color: 'gray'
    },
    confirmButton: {
        backgroundColor: '#7A94FE', // Example color
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