import {Dimensions, PixelRatio} from 'react-native';

// Get screen width
const {width: SCREEN_WIDTH} = Dimensions.get('window');

// Based on iPhone 5s's scale
const scale = SCREEN_WIDTH / 320;

// Normalize text size
export function normalizeText(size: number): number {
  const newSize = size * scale;

  // Return the rounded size, adjusted for pixel density
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}
