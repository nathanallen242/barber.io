import { typography } from './typography';
import { lightColors, darkColors } from './colors';
import { useThemeStore } from '@/store/themeStore';

const useCalendarTheme = () => {
  const { mode } = useThemeStore();

  return {
    colors: {
      primary: mode === 'light' ? lightColors.primary : darkColors.primary,
      onPrimary: mode === 'light' ? lightColors.secondary : darkColors.secondary,
      background: mode === 'light' ? lightColors.background : darkColors.background,
      onBackground: mode === 'light' ? '#333333' : '#FFFFFF',
      border: mode === 'light' ? lightColors.border : darkColors.border,
      text: mode === 'light' ? lightColors.text : darkColors.text,
      surface: mode === 'light' ? '#ffffff' : '#2f3d4a',
      onSurface: mode === 'light' ? '#666666' : '#B0B0B0',
    },
    textStyle: {
      fontFamily: typography.fonts.regular,
    },
    hourTextStyle: {
      fontSize: 12,
      fontFamily: typography.fonts.light,
    },
    dayName: {
      fontSize: 14,
      color: mode === 'light' ? lightColors.secondary : darkColors.secondary,
    },
    dayNumber: {
      fontSize: 16,
      fontFamily: typography.fonts.semiBold,
    },
    todayNumber: {
      color: '#ffffff',
    },
    eventContainerStyle: {
      borderRadius: 4,
    },
    eventTitleStyle: {
      fontSize: 10,
      fontFamily: typography.fonts.bold,
    },
  };
};

export default useCalendarTheme;