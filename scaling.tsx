import { Dimensions } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Use a standard width and height (based on iPhone 11 dimensions or similar)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/**
 * Scales a size based on screen width.
 * @param size - The size to scale (e.g., font size, padding, margin).
 * @returns The scaled size.
 */
const scale = (size: number): number => (width / BASE_WIDTH) * size;

/**
 * Scales a size based on screen height.
 * @param size - The size to scale (e.g., vertical spacing).
 * @returns The scaled size.
 */
const verticalScale = (size: number): number => (height / BASE_HEIGHT) * size;

/**
 * Scales a size with a moderate scaling factor.
 * @param size - The size to scale.
 * @param factor - The scaling factor, default is 0.5.
 * @returns The moderately scaled size.
 */
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
