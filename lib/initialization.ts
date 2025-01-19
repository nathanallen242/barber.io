import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';

export async function prepareApp() {
  try {
    // Keep the splash screen visible while we fetch resources
    await SplashScreen.preventAutoHideAsync();
    
    // Pre-load fonts, make any API calls you need to do here
    const assets = [
      require('@/assets/icons/apple-icon.png'),
      require('@/assets/icons/facebook-icon.png'),
      require('@/assets/icons/google-icon.png'),
      require('@/assets/images/pfp.png')
    ];

    const assetPromises = assets.map(asset => Asset.loadAsync(asset));
    await Promise.all(assetPromises);

  } catch (e) {
    console.warn(e);
  }
} 