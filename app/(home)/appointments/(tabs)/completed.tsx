import { StyleSheet, Text, ScrollView, ActivityIndicator, View } from "react-native";
import { useState } from "react";

export default function CompletedAppts() {
  const [refreshing, setRefreshing] = useState(Boolean);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.wrapper}>
      {refreshing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7A94FE" />
        </View>
      )}
      <ScrollView 
        contentContainerStyle={styles.container}
        onScroll={({ nativeEvent }) => {
          if (nativeEvent.contentOffset.y < -50) {
            !refreshing && handleRefresh();
          }
        }}
        scrollEventThrottle={16}>
        <Text style={styles.title}>No completed appointments.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '40%',
    alignItems: 'center',
    zIndex: 1
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins_500Regular'
  }
});