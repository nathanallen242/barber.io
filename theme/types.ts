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
}

export interface SharedColors {
  white: string;
  black: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  sharedColors: SharedColors;
}


