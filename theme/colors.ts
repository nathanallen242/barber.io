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
    agenda: '#616060',
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
    agenda: '#555555',
  };
  
export const sharedColors: SharedColors = {
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
  event: {
    available: {
      background: '#73ab67',
      iconBackground: '#97ce8c'
    },
    unavailable: {
      background: '#5f5f5f',
      iconBackground: '#949494'
    },
    appointment: {
      background: '#6196db',
      iconBackground: '#83ace0'
    },
  }
}