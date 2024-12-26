import { Link } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const SearchButton = () => {
  const { colors } = useThemeStore();
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
    backgroundColor: '#B0B0B0',
    borderRadius: 8,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIconButton: {
    marginRight: 8,
    color: '#3C3C3C',
  },
  searchText: {
    fontSize: 16,
    color: '#3C3C3C',   
    fontFamily: 'Poppins_300Light'
  }
});

export default SearchButton;