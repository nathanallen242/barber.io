import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const screenDimensions = {
  screenWidth,
  screenHeight,
  // Add helper functions if needed
  min: (size: number, max: number) => Math.min(screenWidth * size, max),
};

export type ScreenDimensions = typeof screenDimensions; 