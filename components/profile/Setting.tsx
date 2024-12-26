// components/SettingsItem.tsx
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { Ionicons } from '@expo/vector-icons';

interface SettingProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  hasSwitch?: boolean;
  hasArrow?: boolean;
  onPress?: () => void;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
}

export const Setting = ({
  icon,
  text,
  hasSwitch,
  hasArrow,
  onPress,
  switchValue,
  onSwitchChange
}: SettingProps) => {
  const { colors, typography } = useThemeStore();
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      disabled={hasSwitch}
    >
      <View style={styles.leftContent}>
        <Ionicons name={icon} size={24} color={colors.icon} />
        <Text style={[styles.text, { fontFamily: typography.fonts.regular, color: colors.text }]}>{text}</Text>
      </View>
      <View style={styles.rightContent}>
        {hasSwitch && (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={switchValue ? '#007AFF' : '#f4f3f4'}
          />
        )}
        {hasArrow && (
          <Ionicons name="chevron-forward" size={24} color={colors.icon} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E1E1E1',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});