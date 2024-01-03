import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface SettingProps {
 name: string;
 description: string;
 icon: string;
}

const Setting: React.FC<SettingProps> = ({ icon, name, description }) => {
 return (
  <TouchableOpacity style={styles.settingContainer}>
    <View style={styles.iconContainer}>
      <FontAwesome name={icon}size={20} color="#000" />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    <View>
      <FontAwesome name="chevron-right" size={20} color="#000" />
    </View>
  </TouchableOpacity>
 );
};

const styles = StyleSheet.create({
 settingContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 15,
  backgroundColor: '#f0f0f0',
 },
 iconContainer: {
  backgroundColor: '#e0e0e0',
  borderRadius: 50,
  padding: 5,
 },
 textContainer: {
  flex: 1,
  marginLeft: 10,
  marginTop: 10,
 },
 name: {
  fontWeight: 'bold',
  fontSize: 18,
 },
 description: {
  color: 'grey',
  fontSize: 16,
  marginTop: 5,
 },
});

export default Setting;