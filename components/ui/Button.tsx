import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
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
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        variant === 'secondary' && styles.buttonSecondary,
        style
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          styles.text, 
          variant === 'secondary' && styles.textSecondary,
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
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 6,
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#7A94FE',
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