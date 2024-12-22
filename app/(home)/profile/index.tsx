// profile/index.tsx
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const router = useRouter();
    
    return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.imageContainer}>
      <Image
        source={{ uri: 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png' }} // Replace with actual image source
        style={styles.profileImage}
      />
      </View>

      {/* User Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>'User Name'</Text>
        <Text style={styles.email}>'user@example.com'</Text>
        {/* Add more profile information here */}
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  imageContainer: {
    marginBottom: 20,
    marginTop: 20
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Make it a circle
  },
  infoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  button: {
    backgroundColor: '#007AFF', // Example button color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});