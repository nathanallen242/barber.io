import { Link } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchButton = () => {
  return (
    <Link href="/search?fromSearchButton=true" asChild push>
      <TouchableOpacity style={styles.searchButton}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIconButton} />
        <Text style={styles.searchText}>Search for barbers nearby...</Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIconButton: {
    marginRight: 8,
  },
  searchText: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Poppins_300Light'
  }
});

export default SearchButton;