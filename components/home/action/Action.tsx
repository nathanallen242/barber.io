import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ActionProps {
  icon: JSX.Element;
  title: string;
  description: string;
  onPress: () => void;
  backgroundColor?: string;
}

const Action: React.FC<ActionProps> = ({ icon, title, description, onPress, backgroundColor = '#FFFFFF' }) => {
  return (
    <TouchableOpacity style={[styles.actionContainer, { backgroundColor }]} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    borderRadius: 8,
    padding: 16,
    width: '45%',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Poppins_600SemiBold',
  },
  description: {
    fontSize: 12,
    fontFamily: 'Poppins_500Regular',
    color: '#808080',
  },
});

export default Action;