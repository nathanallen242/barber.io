// EventCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeStore } from '@/store/themeStore';

interface EventCardProps {
  item: {
    name: string;
    time: string;
    description?: string;
    height: number;
    eventType: 'available' | 'unavailable' | 'appointment';
  };
  iconName: keyof typeof MaterialIcons.glyphMap;
}



const EventCard: React.FC<EventCardProps> = React.memo(({ item, iconName }) => {
  const { colors, sharedColors, typography } = useThemeStore();
  const backgroundColor = sharedColors.event[item.eventType].background;
  const iconBackgroundColor = item.eventType === 'available' 
    ? sharedColors.event.available.iconBackground 
    : item.eventType === 'unavailable' 
    ? sharedColors.event.unavailable.iconBackground
    : sharedColors.event.appointment.iconBackground

  return (
    <View style={[styles.eventCard, { backgroundColor }]}>
      <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
        <MaterialIcons name={iconName} size={24} color={colors.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.eventTitle, { color: colors.text, fontFamily: typography.fonts.medium }]}>
          {item.name}
        </Text>
        
        {item.description && (
          <Text style={[styles.serviceType, { color: colors.text, fontFamily: typography.fonts.regular }]}>
            {item.description}
          </Text>
        )}
        
        <View style={styles.detailsContainer}>
          <View style={styles.timeContainer}>
            <MaterialIcons name="access-time-filled" size={16} color={colors.text} />
            <Text style={[styles.timeText, { color: colors.text }]}>
              {item.time}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  eventCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 14,
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    marginLeft: 4,
  }
});

export default EventCard;
