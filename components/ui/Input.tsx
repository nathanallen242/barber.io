import { StyleSheet, TextInput, View, Text, Dimensions, StyleProp, ViewStyle } from 'react-native';
import { useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  style?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  placeholder?: string;
}

export function Input({
  label,
  value,
  onChangeText,
  error,
  style,
  secureTextEntry,
  placeholder,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useThemeStore();

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        style={[
          [styles.input, { borderColor: colors.border}],
          isFocused && [styles.inputFocused, { borderColor: colors.border}],
          error && [styles.inputError, { borderColor: colors.border}]
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: screenHeight * 0.02,
  },
  label: {
    fontSize: Math.min(screenWidth * 0.035, 14),
    marginBottom: screenHeight * 0.01,
    color: '#333',
  },
  input: {
    height: screenHeight * 0.06,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: screenWidth * 0.04,
    fontSize: Math.min(screenWidth * 0.04, 16),
  },
  inputFocused: {
    borderWidth: 1,
    borderColor: '#7A94FE',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
}); 