import { StyleSheet, SafeAreaView, TextInput, ActivityIndicator, View, Text, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import { useState, useEffect, useRef, useCallback } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import { UserProfile } from "@/types/models";
import { supabase } from "@/server/supabase";
import { useThemeStore } from "@/store/themeStore";
import { useUserStore } from "@/store/userStore";
import filter from 'lodash.filter';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<UserProfile[]>([]);
  const [fullData, setFullData] = useState<UserProfile[]>([]);

  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const searchInputRef = useRef<TextInput>(null);
  const { fromSearchButton } = useLocalSearchParams();

  const { colors, typography } = useThemeStore();
  const { user } = useUserStore();
  const isBarber = user?.user_metadata.job_role === "barber"

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data: users, error: supabaseError } = await supabase
        .from(isBarber ? 'client_view' : 'barber_view')
        .select('*');

      if (supabaseError) {
        throw supabaseError;
      }

      setData(users || []);
      setFullData(users || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    const formattedQuery = searchQuery.toLowerCase();
    const filteredData = filter(fullData, (barber) => {
      return contains(barber, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = (barber: UserProfile, query: string) => {
    const first = barber.forename;
    const last = barber.surname;
    const email = barber.email.toLowerCase();
    return (first ? first.toLowerCase().includes(query) : false) || 
           (last ? last.toLowerCase().includes(query) : false) || 
           email.includes(query);
  };

  useEffect(() => {
    fetchUsers();
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
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <Text>Error in fetching data... Please check your internet connection!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background }}>
      <View style={{margin: 25}}>
        <View style={[styles.searchContainer, { backgroundColor: colors.border, borderColor: colors.border }]}>
            <Ionicons name="search" size={20} color={colors.icon} style={styles.searchIcon} />
            <TextInput
            ref={searchInputRef}
            placeholder="Search in our database..."
            placeholderTextColor={colors.text}
            selectionColor={colors.text}
            clearButtonMode="while-editing"
            style={[styles.searchBox, { color: colors.text, fontFamily: typography.fonts.light }]}
            autoCapitalize="none"
            autoCorrect={false}
            value={query}
            onChangeText={handleSearch}
            />
        </View>
        <FlatList
            data={data}
            keyExtractor={(item: any) => item.email}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.itemContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Image 
                source={{ uri: item.profile_picture }} 
                style={styles.thumbnail}
                />
                <View>
                <Text style={[styles.textName, { color: colors.text, fontFamily: typography.fonts.light }]}>{item.forename} {item.surname}</Text>
                <Text style={[styles.textEmail, { color: colors.text }]}>{item.email}</Text>
              </View>
            </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.centerContainer}>
                <Text style={{ 
                  color: colors.text, 
                  fontFamily: typography.fonts.medium, 
                  fontSize: typography.sizes.lg, 
                  }}>No results found.</Text>
              </View>
            }
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
  },
  itemContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,
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
  },
});
