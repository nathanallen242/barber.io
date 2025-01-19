import React from 'react';
import { View, Text, Modal, TextInput, StyleSheet, Animated } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { Button } from '@/components/ui/Button';
import CategoryManager from '@/components/calendar/CategoryManager';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import { IAvailabilityEvent, ICategory } from '@/types/availability.types';
import TimePicker from '@/components/calendar/TimePicker';

export enum Mode {
    Create = 'CREATE',
    Update = 'Update'
}

interface CalendarModalProps {
    isVisible: boolean;
    onClose: () => void;
    draftEvent: IAvailabilityEvent | null;
    setDraftEvent: (event: IAvailabilityEvent | null) => void;
    onSave: (event: IAvailabilityEvent) => void;
    onDelete?: (event: IAvailabilityEvent) => void;
    mode: Mode;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
    isVisible,
    onClose,
    draftEvent,
    setDraftEvent,
    onSave,
    onDelete,
    mode
}) => {
    const { colors, sharedColors, typography } = useThemeStore();
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
    const [selectedDate, setSelectedDate] = React.useState<moment.Moment | null>
    (draftEvent?.start.dateTime ? moment(draftEvent.start.dateTime) : null);

    const handleDateSelect = (date: moment.Moment) => {
        setSelectedDate(date);
    };

    const handleSave = () => {
        if (draftEvent && selectedDate) {
            const startTime = draftEvent.start.dateTime ? new Date(draftEvent.start.dateTime) : new Date();
            const endTime = draftEvent.end.dateTime ? new Date(draftEvent.end.dateTime) : new Date();

            const eventStart = selectedDate.toDate();
            const eventEnd = selectedDate.toDate();

            eventStart.setHours(startTime.getHours(), startTime.getMinutes());
            eventEnd.setHours(endTime.getHours(), endTime.getMinutes());

            const event = {
                ...draftEvent,
                start: { dateTime: eventStart.toISOString() },
                end: { dateTime: eventEnd.toISOString() }
            } as IAvailabilityEvent;

            onSave(event);
            onClose();
        }
    };

    const handleDelete = () => {
        if (draftEvent && onDelete) {
            onDelete(draftEvent);
            onClose();
        }
    };

    const handleCategorySelect = (category: ICategory | null) => {
        if (draftEvent && category) {
            setDraftEvent({
                ...draftEvent,
                title: category.title,
                color: category.color,
                notes: category.notes,
            });
            setSelectedCategory(category?.label || null);
        }
    };

    const SectionTitle = ({ children }: { children: string }) => (
        <Text style={[styles.sectionTitle, { 
            fontFamily: typography.fonts.medium,
            color: sharedColors.gray
        }]}>
            {children}
        </Text>
    );

    return (
        <Modal
            transparent
            animationType="slide"
            visible={isVisible}
            onRequestClose={onClose}
        >
            <Animated.View style={styles.overlay}>
                <View style={[styles.modalContainer, { backgroundColor: sharedColors.white }]}>
                    {/* Header */}
                    <Text style={[styles.modalTitle, { 
                        fontFamily: typography.fonts.semiBold,
                        color: sharedColors.black
                    }]}>
                       {mode === Mode.Create ? 'Add Availability' : 'Update Availability'}
                    </Text>

                    {/* Time Section */}
                    <View style={[styles.section]}>
                        <SectionTitle>Select Date</SectionTitle>
                        <CalendarStrip
                            dateNameStyle={{
                                fontFamily: typography.fonts.light,
                                fontSize: typography.sizes.md,
                                textTransform: 'capitalize'
                            }}
                            dateNumberStyle={{
                                fontFamily: typography.fonts.bold,
                                fontSize: typography.sizes.lg
                            }}
                            style={{ height: 100, paddingBottom: 10 }}
                            scrollable
                            calendarHeaderStyle={{
                                fontFamily: typography.fonts.regular,
                                fontSize: typography.sizes.xl,
                                paddingBottom: 20
                            }}
                            iconContainer={{ flex: 0.1 }}
                            highlightDateNumberStyle={{ 
                                color: colors.primary,
                                fontFamily: typography.fonts.bold,
                                fontSize: typography.sizes.lg 
                            }}
                            highlightDateNameStyle={{ 
                                color: colors.primary,
                                fontFamily: typography.fonts.light,
                                fontSize: typography.sizes.md,
                                textTransform: 'capitalize' 
                            }}
                            minDate={new Date()}
                            maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                            useIsoWeekday={false}
                            useNativeDriver
                            selectedDate={selectedDate || undefined}
                            onDateSelected={handleDateSelect}
                        />
                    </View>

                    <View style={styles.section}>
                        <SectionTitle>Select Time Range</SectionTitle>
                        <TimePicker
                            startTime={draftEvent?.start.dateTime ? new Date(draftEvent.start.dateTime) : new Date()}
                            endTime={draftEvent?.end.dateTime ? new Date(draftEvent.end.dateTime) : new Date()}
                            onChangeStart={(date) => {
                                if (draftEvent) {
                                    setDraftEvent({
                                        ...draftEvent,
                                        start: { dateTime: date.toISOString() }
                                    });
                                }
                            }}
                            onChangeEnd={(date) => {
                                if (draftEvent) {
                                    setDraftEvent({
                                        ...draftEvent,
                                        end: { dateTime: date.toISOString() }
                                    });
                                }
                            }}
                        />
                    </View>

                    <View style={styles.section}>
                        <SectionTitle>Category</SectionTitle>
                        <CategoryManager
                            selectedCategory={selectedCategory}
                            onSelectCategory={handleCategorySelect}
                        />
                    </View>

                    {/* Title Section */}
                    <View style={styles.section}>
                        <SectionTitle>Title</SectionTitle>
                        <TextInput
                            placeholder="Enter availability title..."
                            value={draftEvent?.title}
                            onChangeText={(text) =>
                                draftEvent && setDraftEvent({ ...draftEvent, title: text })
                            }
                            style={[styles.input, { 
                                borderColor: sharedColors.gray,
                                fontFamily: typography.fonts.regular 
                            }]}
                            placeholderTextColor={sharedColors.gray}
                        />
                    </View>

                    {/* Notes Section */}
                    <View style={styles.section}>
                        <SectionTitle>Notes</SectionTitle>
                        <TextInput
                            placeholder="Add any additional notes..."
                            multiline
                            numberOfLines={3}
                            value={draftEvent?.notes}
                            onChangeText={(text) =>
                                draftEvent && setDraftEvent({ ...draftEvent, notes: text })
                            }
                            textAlignVertical="top"
                            style={[styles.input, styles.notesInput, { 
                                borderColor: sharedColors.gray,
                                fontFamily: typography.fonts.regular 
                            }]}
                            placeholderTextColor={sharedColors.gray}
                            autoCapitalize="sentences"
                            autoCorrect={true}
                            submitBehavior='blurAndSubmit'
                        />
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.buttonContainer}>
                        <Button 
                            variant="secondary"
                            children="Cancel" 
                            onPress={onClose}
                            style={styles.button} 
                        />
                        {mode === Mode.Update && onDelete && (
                            <Button
                                children="Delete"
                                onPress={handleDelete}
                                style={styles.button}
                            />
                        )}
                        <Button
                            children={mode === Mode.Create ? "Save" : "Update"}
                            onPress={handleSave}
                            style={styles.button}
                        />
                    </View>
                </View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        maxWidth: 400,
        borderRadius: 15,
        padding: 20,
    },
    modalTitle: {
        fontSize: 24,
        marginBottom: 15,
    },
    section: {
        paddingVertical: 5,
    },
    sectionTitle: {
        fontSize: 16,
        marginBottom: 8,
    },
    timeText: {
        fontSize: 14,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
    },
    notesInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    colorPicker: {
        gap: 15,
    },
    colorPreviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    colorPreview: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    hueSlider: {
        flex: 1,
        height: 12,
        borderRadius: 6,
    },
    colorPanel: {
        height: 100,
        borderRadius: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default React.memo(CalendarModal);
