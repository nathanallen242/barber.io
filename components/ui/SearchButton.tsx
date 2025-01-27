import { Link } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const SearchButton = () => {
  const { colors } = useThemeStore();
  return (
    <Link href="/search?fromSearchButton=true" asChild push>
      <TouchableOpacity>
        <View style={[styles.contentContainer, { backgroundColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.icon} style={styles.searchIconButton} />
          <Text style={[styles.searchText, { color: colors.text }]}>
            Search for users nearby...
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    margin: 16,
  },
  searchIconButton: {
    marginRight: 8,
  },
  searchText: {
    fontSize: 16,
    color: '#3C3C3C',   
    fontFamily: 'Poppins_300Light'
  }
});

export default SearchButton;