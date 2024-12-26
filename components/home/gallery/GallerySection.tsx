import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import GalleryCard from '@/components/home/gallery/Gallery';
import { useThemeStore } from '@/store/themeStore';
import { Service } from '@/types/models';

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

  return (
    <View style={styles.container}>
      <View style={styles.textBlock}>
        <Text style={[styles.header, { color: colors.text }]}>Gallery</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      <FlatList
        data={services}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GalleryCard service={item} />}
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
  }
});