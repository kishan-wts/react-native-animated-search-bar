import {
  TextInput,
  TextInputProps,
  ViewStyle,
  StyleProp,
  ImageSourcePropType,
  TextStyle,
  ImageStyle,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
} from "react-native";
import React from "react";

export type AnimatedSearchBarRef = TextInput;

export type AnimatedSearchBarProps = TextInputProps & {
  SearchImgSource?: ImageSourcePropType;
  SearchImgStyle?: StyleProp<ImageStyle>;
  messageData?: string[];
  messageDelay?: number;
  messageTimeout?: number;
  viewStyle?: StyleProp<ViewStyle>;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  hideClearButton?: boolean;
  onReturnPress?: () => void;
  callBackFunction?: (arg: any) => void;
  onPressSearchBar?: () => void;
  clearButtonContainerStyle?: StyleProp<ViewStyle>;
  clearBtnImageContainerViewStyle?: StyleProp<ViewStyle>;
  clearImageSource?: ImageSourcePropType;
  clearBtnImgStyle?: StyleProp<ImageStyle>;
  fontFamily?: string;
  value?: string;
  TextMessageStyleBold?: StyleProp<TextStyle>;
  TextMessageStyle?: StyleProp<TextStyle>;
  customTextInputStyle?: StyleProp<TextStyle>;
  SearchLabelTextStyle?: StyleProp<TextStyle>;
  focusedBackgroundColor?: string;
  focusedBorderColor?: string;
  autoFocus?: boolean;
};

declare const AnimatedSearchBar: React.ForwardRefExoticComponent<
  AnimatedSearchBarProps & React.RefAttributes<AnimatedSearchBarRef>
>;

export default AnimatedSearchBar;
