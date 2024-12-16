import { Stack } from "expo-router";
import { 
  Poppins_300Light, 
  Poppins_400Regular, 
  Poppins_500Medium, 
  Poppins_700Bold, 
  useFonts 
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();
const assets = [
  require('../assets/icons/apple-icon.png'),
  require('../assets/icons/facebook-icon.png'),
  require('../assets/icons/google-icon.png'),
  require('../assets/images/illustration.png')
];

export default function RootLayout() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [fontsLoaded, error] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  useEffect(() => {
    async function loadAssets() {
      try {
        await Promise.all([
          ...assets.map(asset => Asset.loadAsync(asset)),
          Font.loadAsync({
            Poppins_300Light,
            Poppins_400Regular,
            Poppins_500Medium,
            Poppins_700Bold
          })
        ]);
        setAssetsLoaded(true);
      } catch (e) {
        console.error('Asset loading error', e);
      }
    }
    loadAssets();
  }, []);

  useEffect(() => {
    if ((fontsLoaded && assetsLoaded) || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, assetsLoaded, error]);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: 'transparent',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(home)" />
    </Stack>
  );
}
