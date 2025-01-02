// /components/Notes.tsx
import React, { memo } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { useThemeStore } from '@/store/themeStore';

interface NotesProps {
  notes: string;
  onChangeNotes: (text: string) => void;
}

const Notes: React.FC<NotesProps> = ({ notes, onChangeNotes }) => {
  const { colors, typography } = useThemeStore();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text, fontFamily: typography.fonts.regular }]}>
        Additional Notes
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.card,
            fontFamily: typography.fonts.regular,
          },
        ]}
        value={notes}
        onChangeText={onChangeNotes}
        placeholder="Add extra context..."
        placeholderTextColor={colors.subtext}
        multiline
        submitBehavior='blurAndSubmit'
        returnKeyType="done"
      />
    </View>
  );
};

export default memo(Notes);

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    padding: 16,
    height: 120,
    textAlignVertical: 'top',
  },
});
