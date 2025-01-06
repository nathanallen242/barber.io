import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import GalleryCard from '@/components/home/gallery/Gallery';
import { useThemeStore } from '@/store/themeStore';
import { Service } from '@/types/models';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

interface ServiceWithImage extends Service {
  image: string;
}

export default function GallerySection() {
  const services: ServiceWithImage[] = [
    {
      id: '1',
      category: 'Taper Fade',
      description: '45 mins',
      name: 'Haircut',
      price: 90,
      image: require('@/assets/ads/portfolio.jpg'),
    },
    {
      id: '2',
      category: 'Bald Fade',
      description: '60 mins',
      name: 'Massage',
      price: 60,
      image: require('@/assets/ads/portfolio.jpg'),
    },
    {
      id: '3',
      category: 'Shadow Fade',
      description: '45 mins',
      name: 'Haircut',
      price: 90,
      image: require('@/assets/ads/portfolio.jpg'),
    },
    {
      id: '4',
      category: 'Eyebrow Line-up',
      description: '45 mins',
      name: 'Haircut',
      price: 90,
      image: require('@/assets/ads/portfolio.jpg'),
    },
    {
      id: '5',
      category: 'Beard Line-up',
      description: '45 mins',
      name: 'Haircut',
      price: 90,  
      image: require('@/assets/ads/portfolio.jpg'),
    },
  ];

  const { colors } = useThemeStore();
  const router = useRouter();

  const renderItem = ({ item }: { item: ServiceWithImage }) => (
    <View style={styles.cardContainer}>
      <GalleryCard service={item} />
      <View style={styles.infoContainer}>
        <View style={styles.leftContent}>
          <View style={styles.serviceRow}>
            <Text style={[styles.serviceName, { color: colors.text }]}>
              {item.category}
            </Text>
          </View>
          
          <View style={styles.timeRow}>
            <MaterialIcons 
              name="access-time" 
              size={18} 
              color={colors.text} 
            />
            <Text style={[styles.timeText, { color: colors.text }]}>
              {item.description}
            </Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Ionicons 
            name="pricetag-outline" 
            size={18} 
            color={colors.text} 
          />
          <Text style={[styles.priceText, { color: colors.text }]}>
            ${item.price}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.textBlock}>
        <Text style={[styles.header, { color: colors.text }]}>Gallery</Text>
        <TouchableOpacity onPress={() => router.push('/(home)/gallery')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={services}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  header: {
    fontSize: 20,
    fontFamily: 'Poppins_300Light',
    marginLeft: 15,
  },
  listContainer: {
    paddingLeft: 16,
    gap: 15
  },
  separator: {
    width: 1,
    backgroundColor: '#ddd', 
    marginHorizontal: 8,
  },
  textBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
    marginBottom: 15,
  },
  viewAll: {
    fontFamily: 'Poppins_300Light',
    fontSize: 18,
    color: 'skyblue',
  },
  cardContainer: {
    marginRight: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  leftContent: {
    flex: 1,
    marginRight: 8,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Poppins_300Light',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(135, 206, 235, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    marginLeft: 4,
  }
});