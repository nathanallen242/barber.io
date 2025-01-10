import React, { useCallback, useState, memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { useThemeStore } from '@/store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import { screenDimensions } from '@/utils/screenDimensions';

interface TimePickerProps {
  startTime: Date;
  endTime: Date;
  onChangeStart: (date: Date) => void;
  onChangeEnd: (date: Date) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  startTime,
  endTime,
  onChangeStart,
  onChangeEnd,
}) => {
  const { colors, sharedColors, typography } = useThemeStore();

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleConfirmStart = useCallback((date: Date) => {
    onChangeStart(date);
    setShowStartPicker(false);
  }, [onChangeStart]);

  const handleConfirmEnd = useCallback((date: Date) => {
    onChangeEnd(date);
    setShowEndPicker(false);
  }, [onChangeEnd]);

  return (
    <View style={[styles.container, { backgroundColor: sharedColors.white }]}>
      <View style={styles.timeWrapper}>
        <Text style={[styles.label, { 
            color: colors.subtext,
            fontFamily: typography.fonts.regular }]}>From</Text>
        <Pressable onPress={() => setShowStartPicker(true)}>
          <Text style={[styles.timeText, { 
            color: sharedColors.black,
            fontFamily: typography.fonts.bold }]}>
            {moment(startTime).format('h:mm A')}
          </Text>
        </Pressable>
      </View>

      <Ionicons 
        name="arrow-forward" 
        color={sharedColors.black} 
        style={{
          paddingTop: screenDimensions.screenHeight * 0.02,
          paddingRight: screenDimensions.screenWidth * 0.05
        }}
        size={20} />

      <View style={styles.timeWrapper}>
        <Text style={[styles.label, { 
            color: colors.subtext,
            fontFamily: typography.fonts.regular }]}>To</Text>
        <Pressable onPress={() => setShowEndPicker(true)}>
          <Text style={[styles.timeText, { 
            color: sharedColors.black,
            fontFamily: typography.fonts.bold
           }]}>
            {moment(endTime).format('h:mm A')}
          </Text>
        </Pressable>
      </View>

      {/* Modals */}
      <DateTimePickerModal
        isVisible={showStartPicker}
        date={startTime}
        mode="time"
        onConfirm={handleConfirmStart}
        onCancel={() => setShowStartPicker(false)}
        is24Hour={true}
      />
      <DateTimePickerModal
        isVisible={showEndPicker}
        date={endTime}
        mode="time"
        onConfirm={handleConfirmEnd}
        onCancel={() => setShowEndPicker(false)}
        is24Hour={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  timeText: {
    fontSize: 30,
  },
  arrow: {
    fontSize: 18,
    marginHorizontal: 16,
  },
});

export default memo(TimePicker);