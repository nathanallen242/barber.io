import { StyleSheet, SafeAreaView, TextInput, ActivityIndicator, View, Text, Image, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import filter from 'lodash.filter';
import { Ionicons } from '@expo/vector-icons';

const API_ENDPOINT = "https://randomuser.me/api/?results=30";
/* TODO: Overwrite with supabase db view query*/

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [fullData, setFullData] = useState<any[]>([]);

  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const searchInputRef = useRef<TextInput>(null);
  const { fromSearchButton } = useLocalSearchParams();
  

  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const json = await response.json();
      setData(json.results);
      setFullData(json.results);
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    const formattedQuery = searchQuery.toLowerCase();
    const filteredData = filter(fullData, (user: any) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = (user: any, query: string) => {
    const { first, last } = user.name;
    const email = user.email.toLowerCase();
    return first.toLowerCase().includes(query) || last.toLowerCase().includes(query) || email.includes(query);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (fromSearchButton === 'true') {
        searchInputRef.current?.focus();
      }
    }, [fromSearchButton])
  );

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
        <Text>Error in fetching data... Please check your internet connection!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white' }}>
      <View style={{margin: 25}}>
        <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
            ref={searchInputRef}
            placeholder="Search for barbers in our database..."
            placeholderTextColor="#888"
            selectionColor={'black'}
            clearButtonMode="while-editing"
            style={styles.searchBox}
            autoCapitalize="none"
            autoCorrect={false}
            value={query}
            onChangeText={handleSearch}
            />
        </View>
        <FlatList
            data={data}
            keyExtractor={(item: any) => item.login.username}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer}>
                <Image 
                source={{ uri: item.picture.thumbnail }} 
                style={styles.thumbnail}
                />
                <View>
                <Text style={styles.textName}>{item.name.first} {item.name.last}</Text>
                <Text style={styles.textEmail}>{item.email}</Text>
                </View>
            </TouchableOpacity>
            )}
        />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'relative',
    marginRight: 8,
  },
  searchBox: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "600",
  },
  textEmail: {
    fontSize: 14,
    marginLeft: 10,
    color: "grey",
  },
});
