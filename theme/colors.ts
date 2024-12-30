import { ThemeColors, SharedColors } from "./types";
import { typography } from "./typography";

// Light Mode Colors
export const lightColors: ThemeColors = {
    primary: '#B0E2FF',      // Light Blue
    secondary: '#87CEFA',    // Sky Blue
    background: '#FFFFFF',   // White
    card: '#F0F8FF',         // Alice Blue
    text: '#000000',         // Black
    subtext: '#696969',      // Dim Gray
    border: '#B0C4DE',       // Light Steel Blue
    notification: '#FF3B30', // Red
    success: '#34C759',      // Green
    warning: '#FFCC00',      // Yellow
    error: '#FF3B30',        // Red
    icon: '#000000',
    button: '#054A72',
  };
  
  // Dark Mode Colors
  export const darkColors: ThemeColors = {
    primary: '#ADD8E6',      // Light Blue
    secondary: '#87CEFA',    // Sky Blue
    background: '#1E1E1E',   // Dark Gray
    card: '#2f3d4a',         // Dark Blue Grey-ish shade
    text: '#FFFFFF',         // White
    subtext: '#B0B0B0',      // Light Gray
    border: '#3C3C3C',       // Medium Dark Gray
    notification: '#FF453A', // Red
    success: '#32D74B',      // Green
    warning: '#FFD60A',      // Yellow
    error: '#FF453A',        // Red
    icon: '#FFFFFF',
    button: '#054A72',
  };
  
export const sharedColors: SharedColors = {
  white: '#FFFFFF',
  black: '#000000'
}

// Example calendar dark Theme
export const darkCalendarTheme = {
  colors: {
    primary: darkColors.primary,       // '#ADD8E6'
    onPrimary: darkColors.text,        // '#FFFFFF'
    background: darkColors.background, // '#1E1E1E'
    onBackground: darkColors.text,     // '#FFFFFF'
    border: darkColors.border,         // '#3C3C3C'
    text: darkColors.text,             // '#FFFFFF'
    surface: darkColors.card,          // '#2f3d4a'
    onSurface: darkColors.subtext,     // '#B0B0B0'
  },
  textStyle: {
    fontFamily: typography.fonts.regular,
  },
  hourTextStyle: {
    fontSize: 12,
    fontWeight: 'bold' as 'bold',
  },
  dayName: {
    fontSize: 14,
    fontFamily: typography.fonts.regular,
    color: darkColors.subtext,
  },
  dayNumber: {
    fontSize: 16,
    fontFamily: typography.fonts.bold,
    fontWeight: 'bold' as 'bold',
  },
  todayNumberContainer: {
    backgroundColor: darkColors.primary, // '#ADD8E6'
  },
  todayNumber: {
    color: darkColors.text, // '#FFFFFF'
  },
  eventContainerStyle: {
    borderRadius: 4,
  },
  eventTitleStyle: {
    fontSize: 12,
    fontWeight: 'bold' as 'bold',
    fontFamily: typography.fonts.bold,
  },
};
