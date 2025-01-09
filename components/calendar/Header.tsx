/* https://github.com/howljs/react-native-calendar-kit/blob/main/apps/example/components/Header.tsx */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { FC } from 'react';
import React, { useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';

interface HeaderProps {
  currentDate: SharedValue<string>;
  onPressToday?: () => void;
  onPressPrevious?: () => void;
  onPressNext?: () => void;
}

const Header: FC<HeaderProps> = ({
  currentDate,
  onPressToday,
  onPressPrevious,
  onPressNext,
}) => {
  const { colors, typography } = useThemeStore();
  const [ title, setTitle ] = useState('');

  const updateTitle = (date: string) => {
    const formatted = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
    setTitle(formatted);
  };

  useAnimatedReaction(
    () => currentDate.value,
    (value) => {
      runOnJS(updateTitle)(value);
    },
    []
  );

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: colors.background },
      ]}>
      <View style={styles.headerRightContent}>
        <View style={styles.navigation}>
          <TouchableOpacity hitSlop={8} onPress={onPressPrevious}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color={colors.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity hitSlop={8} onPress={onPressNext}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={colors.icon}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.headerTitle, { color: colors.text, fontFamily: typography.fonts.semiBold }]}>
          {title}
        </Text>
        <View style ={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-around' }}>
        <TouchableOpacity
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          activeOpacity={0.6}
          onPress={() => console.log('Confirm event creation before navigating from screen...')}>
          <MaterialCommunityIcons
            name="sticker-check-outline"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          activeOpacity={0.6}
          onPress={onPressToday}>
          <MaterialCommunityIcons
            name="calendar"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  headerRightContent: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    flexShrink: 1,
  },
  headerTitle: { flexGrow: 1, flexShrink: 1, fontSize: 20, paddingLeft: 10 },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});