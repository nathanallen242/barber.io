import React, { useCallback } from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeStore } from '@/store/themeStore';
import { ThemeMode } from '@/theme/types';
import { screenDimensions } from '@/utils/screenDimensions';
import { sharedColors } from '@/theme/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface ThemeToggleProps {
  style?: StyleProp<ViewStyle>;
}

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const ThemeToggle: React.FC<ThemeToggleProps> = ({ style }) => {
  const { mode, setThemeMode, colors } = useThemeStore();
  const isLight = mode === 'light'

  const toggleTheme = useCallback(() => {
    const nextMode = mode === 'light' ? 'dark' : 'light';
    console.log('Current mode:', mode)
    setThemeMode(nextMode);
    console.log('Next mode:', nextMode)
  }, [mode, setThemeMode]);

  const getIconName = useCallback((): IoniconName => {
    return isLight ? 'moon-outline' : 'sunny-outline';
  }, [isLight]);

  return (
    <TouchableOpacity onPress={toggleTheme} style={style}>
      <Ionicons
        name={getIconName()}
        size={screenDimensions.screenWidth * 0.06}
        color={colors.icon}
      />
    </TouchableOpacity>
  );
};

export default React.memo(ThemeToggle);