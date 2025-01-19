import { Service } from '@/types/models';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import services from '@/data/services';
import { useBookingStore } from '@/store/bookingStore';
import Offering from '@/components/booking/Offering';

export default function ServiceSelection() {
  const selectedService = useBookingStore((state) => state.selectedService);
  const setSelectedService = useBookingStore((state) => state.setSelectedService);
  const { colors, typography } = useThemeStore();
  const router = useRouter();

  const handlePress = (service: Service) => {
    if (selectedService === service) {
      setSelectedService(null);
    } else {
      setSelectedService(service);
    }
  };

  const handleLongPress = (id: string) => {
    router.push({ pathname: '/(home)/appointments/(booking)/services/[id]', params: { id } });
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[
          styles.title, 
          { 
            color: colors.text, 
            fontFamily: typography.fonts.regular,
            fontSize: typography.sizes.xxl,
          }]}>Choose a service that fits your needs.</Text>
        <View style={styles.listContainer}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              onPress={() => handlePress(service)}
              onLongPress={() => handleLongPress(service.id)}
            >
              <Offering
                id={service.id}
                name={service.name}
                price={service.price}
                isSelected={selectedService === service}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  listContainer: {
    flexGrow: 1,
  },
  pressableContainer: {
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
  },
  selectedContainer: {
    backgroundColor: '#DDE7FF',
  },
});
