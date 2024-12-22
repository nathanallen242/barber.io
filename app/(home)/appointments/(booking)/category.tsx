import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
// import { useBookingStore } from '@/store/bookingStore';

interface Category {
  id: string;
  name: string;
  image: any;
}

const categories: Category[] = [
  { id: '1', name: 'Haircut', image: require('@/assets/images/illustration.png') },
  { id: '2', name: 'Shave', image: require('@/assets/images/illustration.png') },
  { id: '3', name: 'Coloring', image: require('@/assets/images/illustration.png') },
  { id: '4', name: 'Styling', image: require('@/assets/images/illustration.png') },
];

const CategorySelection: React.FC = () => {
//   const { setSelectedService } = useBookingStore();

//   const handleSelectCategory = (categoryId: string) => {
//     setSelectedService(categoryId);
//   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please select a category:</Text>
      <View style={styles.gridContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryBox}
            onPress={() => console.log(`Category selected: ${category.id}`)}
          >
            <ImageBackground
              source={category.image}
              style={styles.imageBackground}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay}>
                <Text style={styles.categoryText}>{category.name}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CategorySelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginVertical: 50,
    color: '#333',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryBox: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 10,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
