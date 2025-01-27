import { Typography } from "@/theme/typography.types";

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  subtext: string;
  border: string;
  notification: string;
  success: string;
  warning: string;
  error: string;
  icon: string;
  button: string;
  agenda: string;
}

export interface SharedColors {
  white: string;
  black: string;
  gray: string;
  event: {
    available: {
      background: string;
      iconBackground: string;
    };
    unavailable: {
      background: string;
      iconBackground: string;
    };
    appointment: {
      background: string;
      iconBackground: string;
    };
  };
}

export interface Theme {
  mode: ThemeMode;
  typography: Typography;
  colors: ThemeColors;
  sharedColors: SharedColors;
}


