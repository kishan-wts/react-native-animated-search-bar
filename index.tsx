import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Text,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TextInputProps,
  ViewStyle,
  StyleProp,
  ImageSourcePropType,
  TextStyle,
  ImageStyle,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {scale} from './scaling';
import {normalizeText} from './normalized';

// Define Props type
type AnimatedSearchBarProps = TextInputProps & {
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
  fontFamily?:string | TextStyle;
  value?:string | TextInputProps;
  TextMessageStyleBold?: StyleProp<ViewStyle>;
  TextMessageStyle?: StyleProp<ViewStyle>;
  customTextInputStyle?: StyleProp<TextStyle>;
  SearchLabelTextStyle?: StyleProp<ViewStyle>;
  focusedBackgroundColor?: string;
  focusedBorderColor?: string;
  autoFocus?:boolean;
}

export default function AnimatedSearchBar({

  SearchImgSource = require('../react-native-animated-search-bar/assets/search.png'),
  SearchImgStyle,
  messageData = [],
  messageDelay = 200,
  messageTimeout = 1000,
  viewStyle,
  multiline = false,
  keyboardType = 'default',
  label,
  returnKeyType = 'done',
  hideClearButton = false,
  onReturnPress,
  callBackFunction = () => {},
  onPressSearchBar,
  clearButtonContainerStyle,
  clearBtnImageContainerViewStyle,
  clearImageSource = require('../react-native-animated-search-bar/assets/close.png'),
  clearBtnImgStyle,
  fontFamily,
  TextMessageStyleBold,
  TextMessageStyle,
  customTextInputStyle,
  SearchLabelTextStyle,
  focusedBackgroundColor = "#F2F8F8",
  focusedBorderColor = "#007377",
  autoFocus=true,
  value='',
  ...props

}: AnimatedSearchBarProps): JSX.Element {
  const [text, setText] = useState<string>('');    
  const [searchEnable, setSearchEnable] = useState<boolean>(false);
  const refInput = React.useRef<TextInput | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  // Preserve the last value typed before the input clears onBlur
  const lastTypedTextRef = useRef<string>('');
  
  const containerBackgroundColor = isFocused
    ? {
        backgroundColor: focusedBackgroundColor,
        borderColor: focusedBorderColor,
      }
    : null;
  const myFontStyle : TextStyle = { fontFamily: typeof fontFamily === 'string' ? fontFamily : undefined };
  
  const myCustomTextInputStyle :TextStyle = {
    width:!hideClearButton  ? '90%' : '100%',
    fontFamily: typeof fontFamily === 'string' ? fontFamily : undefined,

}

  function onFocus() {
    setIsFocused(true);
  }
  const messages = messageData || [];

  var showClearButton = false;
  if (
    hideClearButton == false &&
    value &&
    value?.length != 0 
  ) {
    showClearButton = true;
  }

  function onEndEditing() {
    if (onReturnPress) {
      onReturnPress();
    }
  }

  useEffect(() => {
    if (messageData.length > 0) {
      let charIndex = 0;
      let messageIndex = 0;
      let timeoutId: string | number | NodeJS.Timeout | undefined;

      const type = () => {
        if (charIndex < messages[messageIndex]?.length) {
          setText(prevText => {
            const newText = prevText + messages[messageIndex].charAt(charIndex);
            lastTypedTextRef.current = newText; // Store last typed value
            return newText;
          });
          charIndex++;
          timeoutId = setTimeout(type, messageDelay);
        } else {
          timeoutId = setTimeout(clearText, messageTimeout);
        }
      };

      const clearText = () => {
        setText('');
        charIndex = 0;
        messageIndex = (messageIndex + 1) % messages.length;
        timeoutId = setTimeout(type, messageDelay);
      };

      timeoutId = setTimeout(type, messageDelay);

      return () => clearTimeout(timeoutId);
    }
  }, [messageData]); // Effect runs when `messageData` changes

  // Trigger the callback function only after the search is enabled and the value is not empty
  useEffect(() => {
    if (searchEnable && value && value.length > 0) {
      callBackFunction(searchEnable);
    }
  }, [searchEnable, value, callBackFunction]);

  function onBlur() {
    if (value?.length === 0) {
      refInput.current?.clear();
      props.onChangeText?.('')
      setSearchEnable(false);
    }
    setIsFocused(false);
  }

  return (
    <TouchableOpacity
      onPress={onPressSearchBar}
      activeOpacity={1}
      style={[styles.mainContainer, viewStyle,containerBackgroundColor]}>
      <View style={styles.searchIconContainer}>
        <Image
          source={SearchImgSource}
          style={[styles.defaultIconStyle, SearchImgStyle]}
        />
      </View>
      {!searchEnable ? (
        <TouchableOpacity
          onPress={() => {
            onPressSearchBar ? onPressSearchBar() : setSearchEnable(true);
          }}
          style={{flexDirection: 'row', width: '80%'}}>
          <Text allowFontScaling={false} style={[styles.searchText,myFontStyle, SearchLabelTextStyle]}>
            Search{' '}
          </Text>
          <Text allowFontScaling={false}
            numberOfLines={1}
            style={[styles.messageStyleBold,myFontStyle, TextMessageStyleBold]}>
            {text}
            {messageData.length > 0 && (
              <Text allowFontScaling={false} style={[styles.messageStyle,myFontStyle, TextMessageStyle]}>
                |
              </Text>
            )}
          </Text>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
          }}>
          <TextInput
            allowFontScaling={false}
            ref={refInput}
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            multiline={multiline}
            keyboardType={keyboardType}
            autoFocus={autoFocus}
            style={[
              styles.textInputStyle,
              myCustomTextInputStyle,
              customTextInputStyle,
            ]}
            returnKeyType={returnKeyType}
            onEndEditing={onEndEditing}
            // clearButtonMode={hideClearButton ? undefined : 'always'}
            {...props}
            />

          {showClearButton ? (
            <TouchableOpacity
              style={[styles.eyeIconContainer, clearButtonContainerStyle]}
              onPress={() => {
                refInput?.current?.clear();
                props?.onChangeText?.('');
                setSearchEnable(false);
                callBackFunction(false);
              }}>
              <View
                style={[
                  styles.clearBtnImageContainer,
                  clearBtnImageContainerViewStyle,
                ]}>
                <Image
                  source={clearImageSource}
                  style={[styles.clearBtnImgStyle, clearBtnImgStyle]}
                />
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height:scale(40),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: scale(5),
    borderColor: '#E0E0E0',
    borderWidth: scale(1),
    paddingVertical: scale(8),
    backgroundColor: '#fff',
    paddingHorizontal: scale(12),
    overflow:'hidden',
  },
  searchIconContainer: {
    // width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
  },
  searchText:{
    color: '#999999',
    fontSize: normalizeText(14),
    lineHeight:scale(22),
    
  },
  messageStyle:{
    maxWidth: '90%',
    color: '#6C6C6C',
    fontSize: normalizeText(14),    
    lineHeight:scale(22) ,
    
  },
  messageStyleBold: {
    maxWidth: '90%',
    color: '#6C6C6C',
    fontWeight: 'bold',
    fontSize: normalizeText(14),
    lineHeight:scale(22),
    
  },
  textInputStyle:{
    fontSize: normalizeText(14),
    color: '#000',
    height:scale(40),
    lineHeight:scale(18),         
  },
  clearBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: scale(6),
    bottom: scale(12),
  },
  eyeIconContainer: {
    width: scale(36),
    height: scale(36),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  clearBtnImageContainer: {
    padding: scale(5),
    backgroundColor: '#C5C5C5',
    borderRadius: scale(10),
    marginRight:scale(10)
  },
  defaultIconStyle: {
    width: scale(20),
    height: scale(20),
    tintColor: '#6C6C6C',
  },
  clearBtnImgStyle: {
    width: scale(7),
    height: scale(7),
    tintColor: '#6C6C6C',
  },
});
