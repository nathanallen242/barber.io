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
  const { colors } = useThemeStore();
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        variant === 'secondary' && [styles.buttonSecondary, { backgroundColor: 'black', borderColor: colors.border }],
        style
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          styles.text, 
          variant === 'secondary' && [styles.textSecondary, { color: colors.secondary }],
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
  buttonSecondary: {
    borderWidth: 1,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  textSecondary: {
    color: '#7A94FE',
  },
}); 