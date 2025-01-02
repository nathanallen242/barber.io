import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalProvider } from '@gorhom/portal';
import Toast from 'react-native-toast-message';
import { 
  Poppins_300Light, 
  Poppins_400Regular, 
  Poppins_500Medium, 
  Poppins_600SemiBold,
  Poppins_700Bold, 
  useFonts 
} from '@expo-google-fonts/poppins';
import { useThemeStore } from "@/store/themeStore";
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import { useEffect, useState, useCallback } from 'react';
import { View, StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

const assets = [
  require('@/assets/icons/apple-icon.png'),
  require('@/assets/icons/facebook-icon.png'),
  require('@/assets/icons/google-icon.png'),
  require('@/assets/images/illustration.png'),
  require('@/assets/images/pfp.png')
];

export default function RootLayout() {
  const { mode, colors } = useThemeStore();
  const [appIsReady, setAppIsReady] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [fontsLoaded, error] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  });
  
  useEffect(() => {
    async function prepare() {
      try {
        await Promise.all([
          ...assets.map(asset => Asset.loadAsync(asset)),
        ]);
        setAssetsLoaded(true);
      } catch (e) {
        console.error('Asset loading error', e);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if ((fontsLoaded && assetsLoaded) || error) {
      setAppIsReady(true);
    }
  }, [fontsLoaded, assetsLoaded, error]);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <View style={{ flex: 1, backgroundColor: colors.background }} onLayout={onLayoutRootView}>
          <StatusBar
            barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            backgroundColor={colors.background}
          />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: colors.background },
              headerTintColor: 'transparent',
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
          </Stack>
        <Toast />
        </View>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}