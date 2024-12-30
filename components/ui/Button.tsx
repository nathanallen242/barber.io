import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import type { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({ 
  variant = 'primary', 
  onPress, 
  children,
  style,
  textStyle,
}: ButtonProps): JSX.Element {
  const { colors, typography } = useThemeStore();

  return (
    <TouchableOpacity 
      style={[
        styles.button,
        {
          backgroundColor: colors.button,
          borderColor: colors.border,
          borderWidth: 1
        },
        style
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          {
            fontFamily: typography.fonts.regular,
            color: colors.text
          },
          textStyle
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 6,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
  },
});