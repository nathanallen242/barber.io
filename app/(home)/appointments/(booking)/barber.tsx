import { 
  StyleSheet, 
  TextInput, 
  ActivityIndicator, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  FlatList 
} from "react-native";
import { useState, useEffect } from "react";
import { UserProfile } from "@/types/models";
import { supabase } from "@/lib/supabase";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeStore } from "@/store/themeStore";
import { useBookingStore } from "@/store/bookingStore";
import filter from 'lodash.filter';

export default function BarberSelection() {
  const [barbers, setBarbers] = useState<UserProfile[]>([]);
  const [fullBarbers, setFullBarbers] = useState<UserProfile[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const { colors, typography } = useThemeStore();
  const setSelectedBarber = useBookingStore((state) => state.setSelectedBarber);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const { data: users, error: supabaseError } = await supabase
          .from('barber_view')
          .select('*');
  
        if (supabaseError) {
          throw supabaseError;
        }
        setBarbers(users || []);
        setFullBarbers(users || []);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleBarberPress = (barber: UserProfile) => {
    if (selectedBarberId === barber.email) {
      setSelectedBarberId('');
      setSelectedBarber(null);
    } else {
      setSelectedBarberId(barber.email || '');
      setSelectedBarber(barber);
      // console.log("Selected Barber:", JSON.stringify(barber, null, 2));
    }
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    const formattedQuery = searchQuery.toLowerCase();
    const filteredData = filter(fullBarbers, (barber) => {
      return contains(barber, formattedQuery);
    });
    setBarbers(filteredData);
  };

  const contains = (barber: UserProfile, query: string) => {
    const first = barber.forename;
    const last = barber.surname;
    const email = barber.email ? barber.email.toLowerCase() : '';
    return (first ? first.toLowerCase().includes(query) : false) || 
           (last ? last.toLowerCase().includes(query) : false) || 
           email.includes(query);
  };

  if (isLoading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <Text style={styles.errorText}>
          Error fetching barbers. Please check your internet connection!
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Text style={[
        styles.title, 
        { 
          color: colors.text, 
          fontFamily: typography.fonts.regular,
          fontSize: typography.sizes.xxl,
        }
      ]}>Select a barber near you.</Text>
      <View style={styles.container}>
        <View style={[styles.searchContainer]}>
          <Ionicons name="search" size={20} color={colors.icon} style={styles.searchIcon} />
          <TextInput
            placeholder="Search for barbers in our database..."
            placeholderTextColor={colors.text}
            selectionColor={colors.text}
            clearButtonMode="while-editing"
            style={[styles.searchBox, { 
              color: colors.text, 
              fontFamily: typography.fonts.light, 
              backgroundColor: colors.border, 
              borderColor: colors.border 
            }]}
            autoCapitalize="none"
            autoCorrect={false}
            value={query}
            onChangeText={handleSearch}
          />
        </View>

        <FlatList
          data={barbers}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.barberItem,
                { backgroundColor: colors.border },
                selectedBarberId === item.email && styles.barberItemSelected,
              ]}
              onPress={() => handleBarberPress(item)}
            >
              <Image 
                source={{ uri: item.profile_picture }} 
                style={styles.thumbnail}
              />

              <View style={styles.barberInfo}>
                <Text style={[styles.barberName, { 
                  color: colors.text, 
                  fontFamily: typography.fonts.light 
                }]}>{item.forename} {item.surname}</Text>
                <Text style={[styles.barberEmail, { color: colors.text }]}>{item.email}</Text>
              </View>

              {selectedBarberId === item.email && (
                <Ionicons name="checkmark-circle" size={24} color={colors.icon} />
              )}
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.centerContainer}>
              <Text style={styles.noResultsText}>No barbers found.</Text>
            </View>
          }
        />
      </View>
    </View>
  );
}
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: 'white',
    },
    container: {
      flex: 1,
      margin: 25,
    },
    title: {
      textAlign: 'center',
      marginTop: 30
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: 'red',
      fontSize: 16,
      textAlign: 'center',
    },
    noResultsText: {
      fontSize: 16,
      color: '#555',
      textAlign: 'center',
    },
    searchContainer: {
      position: 'relative',
      marginBottom: 20,
    },
    searchIcon: {
      position: 'absolute',
      left: 10,
      top: '50%',
      transform: [{ translateY: -10 }],
      zIndex: 1,
    },
    searchBox: {
      paddingHorizontal: 40,
      paddingVertical: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      fontSize: 16,
      backgroundColor: '#f9f9f9',
    },
    barberItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#f2f2f2',
      marginBottom: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
    },
    barberItemSelected: {
      backgroundColor: '#d0e8ff',
    },
    thumbnail: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    barberInfo: {
      flex: 1,
      marginLeft: 15,
    },
    barberName: {
      fontSize: 17,
      fontWeight: '600',
      color: '#333',
    },
    barberEmail: {
      fontSize: 14,
      color: '#777',
      marginTop: 4,
    },
  });
  