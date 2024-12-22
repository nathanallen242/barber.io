import { 
    StyleSheet, 
    SafeAreaView, 
    TextInput, 
    ActivityIndicator, 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    FlatList 
  } from "react-native";
  import { useState, useEffect } from "react";
  import { Ionicons } from '@expo/vector-icons';
  import filter from 'lodash.filter';
  
  const API_URL = "https://randomuser.me/api/?results=20"; // Adjusted to fetch 20 barbers
  
  /* TODO: Overwrite with Supabase DB view query */
  
  export default function BarberSelection() {
    const [barbers, setBarbers] = useState<any[]>([]);
    const [fullBarbers, setFullBarbers] = useState<any[]>([]);
    const [selectedBarberId, setSelectedBarberId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
  
    useEffect(() => {
      const fetchBarbers = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const json = await response.json();
          setBarbers(json.results);
          setFullBarbers(json.results);
          setIsLoading(false);
        } catch (error: any) {
          console.error('Error fetching barbers:', error);
          setError(error);
          setIsLoading(false);
        }
      };
  
      fetchBarbers();
    }, []);
  
    const handleBarberPress = (barber: any) => {
      if (selectedBarberId === barber.login.uuid) {
        // Unselect barber if it's already selected
        setSelectedBarberId(null);
      } else {
        setSelectedBarberId(barber.login.uuid);
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
  
    const contains = (barber: any, query: any) => {
      const { first, last } = barber.name;
      const email = barber.email.toLowerCase();
      return (
        first.toLowerCase().includes(query) ||
        last.toLowerCase().includes(query) ||
        email.includes(query)
      );
    };
  
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>
      );
    }
  
    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>
            Error fetching barbers. Please check your internet connection!
          </Text>
        </View>
      );
    }
  
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              placeholder="Search for barbers..."
              placeholderTextColor="#888"
              selectionColor={'black'}
              clearButtonMode="always"
              style={styles.searchBox}
              autoCapitalize="none"
              autoCorrect={false}
              value={query}
              onChangeText={handleSearch}
            />
          </View>
  
          {/* Barber List */}
          <FlatList
            data={barbers}
            keyExtractor={(item: any) => item.login.uuid}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.barberItem,
                  selectedBarberId === item.login.uuid && styles.barberItemSelected,
                ]}
                onPress={() => handleBarberPress(item)}
              >
                {/* Barber Thumbnail */}
                <Image 
                  source={{ uri: item.picture.thumbnail }} 
                  style={styles.thumbnail}
                />
  
                {/* Barber Information */}
                <View style={styles.barberInfo}>
                  <Text style={styles.barberName}>{`${item.name.first} ${item.name.last}`}</Text>
                  <Text style={styles.barberEmail}>{item.email}</Text>
                </View>
  
                {/* Selection Indicator */}
                {selectedBarberId === item.login.uuid && (
                  <Ionicons name="checkmark-circle" size={24} color="#5500dc" />
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
      </SafeAreaView>
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
      backgroundColor: 'white',
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
  