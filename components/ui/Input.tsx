import { StyleSheet, TextInput, View, Text, Dimensions, StyleProp, ViewStyle, TextInputProps } from 'react-native';
import { useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { Ionicons } from '@expo/vector-icons';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  style?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  placeholder?: string;
  iconName?: keyof typeof Ionicons.glyphMap;  // e.g. "person", "mail", etc.
  props?: TextInputProps;
  disabled?: boolean;
}

export function Input({
  label,
  value,
  onChangeText,
  error,
  style,
  secureTextEntry,
  iconName,
  props,
  disabled = false
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { colors, typography } = useThemeStore();

  return (
    <View style={[styles.container, style]}>
      <Text 
        style={[
          styles.label, 
          { 
            fontFamily: typography.fonts.regular, 
            color: disabled ? '#999' : colors.text 
          }
        ]}
      >
        {label}
      </Text>
      <View
        style={[
          [
            styles.iconInputContainer, 
            { 
              backgroundColor: colors.border,
              borderColor: colors.border,
            }
          ],
          isFocused && !disabled && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        {iconName && (
          <>
            <Ionicons
              name={iconName}
              size={20}
              color={disabled ? '#999' : colors.icon}
              style={{ 
                marginRight: 8,
              }}
            />
            <View style={[
              styles.separator
            ]} />
          </>
        )}
        <TextInput
          {...props}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          style={[
            styles.textInput, 
            { 
              color: disabled ? '#999' : colors.text,
            }
          ]}
          onFocus={() => !disabled && setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
        />
      </View>
      {error && (
        <Text
          style={[
            styles.errorText,
            { color: colors.error, fontFamily: typography.fonts.regular },
          ]}
        >
          {error}
        </Text>
      )}
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
  },
  iconInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: screenHeight * 0.06,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: screenWidth * 0.02,
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#999',
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: Math.min(screenWidth * 0.04, 16),
    height: '100%',
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