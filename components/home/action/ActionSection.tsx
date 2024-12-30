import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Action from '@/components/home/action/Action'
import { useThemeStore } from '@/store/themeStore';
import { useUserStore } from '@/store/userStore';
import { clientActions, barberActions } from '@/types/actions';

const ActionSection: React.FC = () => {
  const { user } = useUserStore();
  const { colors } = useThemeStore();
  const isBarber = user?.job_role === "barber"
  return (
    <>
      <Text style={[styles.title, { color: colors.text }]}>Quick Actions</Text>
      <View style={styles.sectionContainer}>
        {isBarber ? (
          barberActions.map((action, index) => (
            <Action key={index} {...action} onPress={() => { /* Handle press */ console.log(`${action.title} pressed`); }} />
          ))
        ) : (
          clientActions.map((action, index) => (
            <Action key={index} {...action} onPress={() => { /* Handle press */ console.log(`${action.title} pressed`); }} />
          ))
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  title: {
    fontFamily: 'Poppins_300Light',
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 10
  }
});

export default ActionSection;