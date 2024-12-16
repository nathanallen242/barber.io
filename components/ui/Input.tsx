import { StyleSheet, TextInput, View, Text, Dimensions } from 'react-native';
import { useState } from 'react';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  placeholder?: string;
}

export function Input({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry,
  placeholder,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
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
    borderColor: '#E5E5E5',
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
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
}); 