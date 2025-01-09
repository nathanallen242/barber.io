import React from 'react';
import { View, Text, Modal, TextInput, StyleSheet } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { Button } from '@/components/ui/Button';
import ColorPicker, { Panel1, Preview, HueSlider } from 'reanimated-color-picker';
import CategoryManager from '@/components/calendar/CategoryManager';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import { IAvailabilityEvent, ICategory } from '@/types/availability.types';

interface CalendarModalProps {
    isVisible: boolean;
    onClose: () => void;
    draftEvent: IAvailabilityEvent | null;
    setDraftEvent: (event: IAvailabilityEvent | null) => void;
    onSave: (events: IAvailabilityEvent[]) => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
    isVisible,
    onClose,
    draftEvent,
    setDraftEvent,
    onSave,
}) => {
    const { colors, sharedColors, typography } = useThemeStore();
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
    const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);

    React.useEffect(() => {
        if (draftEvent?.start.date) {
            setSelectedDates([new Date(draftEvent.start.date)]);
        }
    }, [draftEvent]);

    const handleDateSelect = (date: moment.Moment) => {
        setSelectedDates(prev => {
            const dateStr = date.toDate().toDateString();
            const exists = prev.some(d => d.toDateString() === dateStr);
            
            if (exists) {
                return prev.filter(d => d.toDateString() !== dateStr);
            } else {
                return [...prev, date.toDate()].sort((a, b) => a.getTime() - b.getTime());
            }
        });
    };

    const handleSave = () => {
        if (draftEvent && selectedDates.length > 0) {
            const events = selectedDates.map((date, index) => ({
                ...draftEvent,
                id: `${Date.now()}-${index}`,
                start: { date: date.toISOString() },
                end: { date: date.toISOString() }
            } as IAvailabilityEvent));
            onSave(events);
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
            <View style={styles.overlay}>
                <View style={[styles.modalContainer, { backgroundColor: sharedColors.white }]}>
                    {/* Header */}
                    <Text style={[styles.modalTitle, { 
                        fontFamily: typography.fonts.semiBold,
                        color: sharedColors.black
                    }]}>
                        Add Availability
                    </Text>

                    {/* Time Section */}
                    <View style={[styles.section]}>
                        <SectionTitle>Select Date(s)</SectionTitle>
                        <CalendarStrip
                            markedDates={selectedDates}
                            markedDatesStyle={{ color: colors.primary }}
                            style={{ height: 60, paddingBottom: 10 }}
                            scrollable
                            calendarHeaderStyle={{
                                fontFamily: typography.fonts.regular,
                                fontSize: typography.sizes.lg,
                                paddingBottom: 20
                            }}
                            iconContainer={{ flex: 0.1 }}
                            minDate={new Date()}
                            maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                            useIsoWeekday={false}
                            useNativeDriver
                            onDateSelected={handleDateSelect}
                        />
                        {/* <Text style={[styles.timeText, { fontFamily: typography.fonts.regular }]}>
                            Start: {moment(draftEvent?.start?.dateTime).format("dddd, MMM DD at HH:mm a") || ''}
                        </Text>
                        <Text style={[styles.timeText, { fontFamily: typography.fonts.regular }]}>
                            End: {moment(draftEvent?.end?.dateTime ).format("dddd, MMM DD at HH:mm a")|| ''}
                        </Text> */}
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

                    {/* Color Section */}
                    <View style={styles.section}>
                        <SectionTitle>Color</SectionTitle>
                        <ColorPicker
                            style={styles.colorPicker}
                            value={draftEvent?.color || '#4285F4'}
                            onComplete={(selectedColor) => {
                                if (draftEvent && selectedColor?.hex) {
                                    setDraftEvent({
                                        ...draftEvent,
                                        color: selectedColor.hex,
                                    });
                                }
                            }}
                        >
                            <View style={styles.colorPreviewContainer}>
                                <Preview hideText={true} style={styles.colorPreview} />
                                <HueSlider style={styles.hueSlider} />
                            </View>
                            <Panel1 style={styles.colorPanel} />
                        </ColorPicker>
                    </View>
                    

                    {/* Action Buttons */}
                    <View style={styles.buttonContainer}>
                        <Button 
                            variant="secondary"
                            children="Cancel" 
                            onPress={onClose}
                            style={styles.button} 
                        />
                        <Button
                            children={`Save ${selectedDates.length > 1 ? `(${selectedDates.length} dates)` : ''}`}
                            onPress={handleSave}
                            style={styles.button}
                        />
                    </View>
                </View>
            </View>
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

export default CalendarModal;
