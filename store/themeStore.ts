import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors, sharedColors } from '@/theme/colors';
import { ThemeColors, ThemeMode } from '@/theme/types';
import { Typography as TypographyT } from '@/theme/typography.types';
import { typography } from '@/theme/typography';

interface ThemeState {
  mode: ThemeMode;
  typography: TypographyT;
  colors: ThemeColors;
  sharedColors: typeof sharedColors;
  setThemeMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'dark',
      typography: typography,
      colors: darkColors,
      sharedColors: sharedColors,
      setThemeMode: (mode: ThemeMode) => {
        set({ 
          mode,
          colors: mode === 'light' ? lightColors : darkColors
        });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mode: state.mode }),
    }
  )
);