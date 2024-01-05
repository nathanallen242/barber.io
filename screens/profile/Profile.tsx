import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ProfileCard from '../../components/profile/ProfileCard';
import Setting from '../../components/profile/Setting';
import { AuthContext } from '../../contexts/AuthContext';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface ProfileProps {
  navigation: NavigationProp<ParamListBase>;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
 const { isAuthenticated, logout, user } = useContext(AuthContext);

 const handleClick = () => {
  if (!isAuthenticated) {
    Alert.alert(
      'Please Sign In',
      'You must be signed in to update your profile.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Up',
          onPress: () => navigation.navigate('Signup'),
        },
        {
          text: 'Log In',
          onPress: () => navigation.navigate('Login'),
        },
      ],
      { cancelable: true },
    );
  } else {
    navigation.navigate('Update');
  }
 };

 const handleLogout = async () => {
  // render alert before logging out
  Alert.alert(
   'Logout',
   'Are you sure you want to logout?',
   [
    {
     text: 'Cancel',
     style: 'cancel',
    },
    {
     text: 'OK',
     onPress: async () => {
      await logout();
      navigation.navigate('Profile');
     },
    },
   ],
   { cancelable: false },
  );
};

return (
  <>
   <View style={styles.header}>
    <Text style={styles.title}>Profile</Text>
   </View>
   <View style={styles.container}>
    <ProfileCard 
    name={user?.displayName ?? 'Guest'} 
    email={user?.email ?? 'guest@guest.com'}
    imageUrl={user?.photoURL}
    onClick={handleClick}
    />
    <View style={styles.settingsContainer}>
     {isAuthenticated ? (
      <>
       <Setting icon="user" name="Account" description="Change your account settings" />
       <Setting icon="credit-card" name="Payment" description="Change your payment settings" />
       <Setting icon="bell" name="Notifications" description="Manage your notification settings" />
       <Setting icon="sign-out" name="Logout" description="Log out of your account" onPress={handleLogout} />
      </>
     ) : (
      <>
       <Setting
        icon="user-plus"
        name="Register"
        description="Create a new account"
        onPress={() => navigation.navigate('Signup')} />
       <Setting 
        icon="sign-in" 
        name="Login" 
        description="Log in to your account" 
        onPress={() => navigation.navigate('Login')} />
      </>
     )}
    </View>
    <View style={styles.moreContainer}>
     <Text style={styles.moreText}>More</Text>
     <Setting icon="info-circle" name="About Us" description="Learn more about the app" />
     <Setting icon="life-ring" name="Help & Support" description="Get help with your account" />
    </View>
   </View>
  </>
);
};

// Rest of the code...

const styles = StyleSheet.create({
 header: {
   flexDirection: 'row',
   justifyContent: 'flex-start',
   alignItems: 'center',
   marginTop: 60,
   marginLeft: 40,
 },
 container: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'flex-start',
   alignItems: 'center',
 },
 title: {
   fontSize: 30,
   fontWeight: 'bold',
 },
 settingsContainer:{
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  padding: 20
 },
 moreContainer:{
  flex: 1,
  marginTop: 60,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  padding: 20,
 },
 moreText: {
  fontSize: 22,
  alignSelf: 'flex-start',
  marginLeft: 15,
  color: 'grey',
 },
});

export default Profile;