import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { Ionicons } from '@expo/vector-icons';

interface OfferingProps {
  id: string;
  name: string;
  price: number;
  duration: number;
  rating: number;
  ratingCount: string;
  imageSource?: any;
  isSelected: boolean;
}

const Offering: React.FC<OfferingProps> = ({ id, name, price, imageSource, isSelected, duration, rating, ratingCount }) => {
  const { colors, typography } = useThemeStore();
  return (
    <View style={[
      [styles.container, { backgroundColor: colors.border }], 
      isSelected && styles.selectedContainer
    ]}>
      <Image 
        source={require('@/assets/images/pfp.png')}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <Text style={[styles.serviceName,
          { 
          fontFamily: typography.fonts.medium, 
          color: colors.text }]}>{name}</Text>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={[styles.rating, { color: colors.text }]}>{rating}</Text>
          <Text style={[styles.ratingCount, { color: colors.subtext }]}>({ratingCount})</Text>
          <Text style={[styles.duration, { color: colors.subtext }]}>{duration} min</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: colors.text }]}>${price}</Text>
          <View style={[styles.selectButton, { backgroundColor: colors.secondary }]}>
            <Ionicons 
              name={isSelected ? "remove" : "add"} 
              size={24} 
              color={colors.icon}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Offering;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 16,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  selectedContainer: {
    borderColor: '#6B4EFF',
    borderWidth: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  serviceName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    marginRight: 2,
    fontFamily: 'Poppins_400Regular',
  },
  ratingCount: {
    color: '#666',
    marginRight: 8,
    fontFamily: 'Poppins_300Light',
  },
  duration: {
    color: '#666',
    fontFamily: 'Poppins_300Light',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#6B4EFF',
  },
  selectButton: {
    backgroundColor: '#6B4EFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  }
});