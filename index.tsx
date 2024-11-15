import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    Image,
    Text,
    KeyboardTypeOptions,
    ReturnKeyTypeOptions,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import {scale} from './scaling';
  import {normalizeText} from './normalized';
  
  // Define Props type
  export interface AnimatedSearchBarProps {
    SearchImgSource?: string;
    SearchImgStyle?: StyleProp<ViewStyle>;
    messageData?: string[];
    messageDelay?: number;
    messageTimeout?: number;
    viewStyle?: StyleProp<ViewStyle>;
    onChangeText?: (text: string) => void;
    multiline?: boolean;
    keyboardType?: KeyboardTypeOptions;
    Value?: string;
    label?: string;
    returnKeyType?: ReturnKeyTypeOptions;
    hideClearButton?: boolean;
    autoFocus?: boolean;
    onReturnPress?: () => void;
    callBackFunction?: (arg: any) => void;
    onPressSearchBar?: () => void;
    editable?: boolean;
    clearButtonContainerStyle?: StyleProp<ViewStyle>;
    clearBtnImageContainerViewStyle?: StyleProp<ViewStyle>;
    clearImageSource?: string;
    clearBtnImgStyle?: StyleProp<ViewStyle>;
    fontFamily?: String;
    TextMessageStyleBold?: StyleProp<ViewStyle>;
    TextMessageStyle?: StyleProp<ViewStyle>;
    customTextInputStyle?: StyleProp<ViewStyle>;
    SearchLabelTextStyle?: StyleProp<ViewStyle>;
  }
  
  const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = ({
    SearchImgSource = require('../animated-search-bar/assets/search.png'),
    SearchImgStyle,
    messageData = [],
    messageDelay = 200,
    messageTimeout = 1000,
    viewStyle,
    onChangeText = () => {},
    multiline = false,
    keyboardType = 'default',
    Value,
    label,
    returnKeyType = 'done',
    hideClearButton = false,
    autoFocus = true,
    onReturnPress,
    callBackFunction = () => {},
    onPressSearchBar,
    editable,
    clearButtonContainerStyle,
    clearBtnImageContainerViewStyle,
    clearImageSource = require('../animated-search-bar/assets/close.png'),
    clearBtnImgStyle,
    fontFamily = '',
    TextMessageStyleBold,
    TextMessageStyle,
    customTextInputStyle,
    SearchLabelTextStyle,
  }) => {
    const [text, setText] = useState<String>('');
    const [searchEnable, setSearchEnable] = useState<boolean>(false);
    const refInput = React.useRef<TextInput | null>(null);
  
    const messages = messageData || [];
  
    var showClearButton = false;
    if (
      hideClearButton == false &&
      Value &&
      Value.length != 0 &&
      Platform.OS == 'android'
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
  
        const type = () => {
          if (charIndex < messages[messageIndex]?.length) {
            setText(
              prevText => prevText + messages[messageIndex].charAt(charIndex),
            );
            charIndex++;
            setTimeout(type, messageDelay);
          } else {
            setTimeout(clearText, messageTimeout);
          }
        };
  
        const clearText = () => {
          setText('');
          charIndex = 0;
          messageIndex = (messageIndex + 1) % messages.length;
          setTimeout(type, messageDelay);
        };
  
        setTimeout(type, messageDelay);
  
        return () => clearTimeout(type);
      }
    }, []);
  
    // Trigger the callback function only after the search is enabled and the value is not empty
    useEffect(() => {
      if (searchEnable && Value && Value.length > 0) {
        callBackFunction(searchEnable);
      }
    }, [searchEnable, Value, callBackFunction]);
  
    function onBlur() {
      if (Value?.length == 0) {
        refInput.current?.clear();
        onChangeText('');
        setSearchEnable(false);
      }
    }
  
    return (
      <TouchableOpacity
        onPress={onPressSearchBar}
        activeOpacity={1}
        style={[styles.mainContainer, viewStyle]}>
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
            <Text style={[styles.searchText(fontFamily), SearchLabelTextStyle]}>
              Search{' '}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.messageStyleBold(fontFamily), TextMessageStyleBold]}>
              {text}
              {messageData.length > 0 && (
                <Text style={[styles.messageStyle(fontFamily), TextMessageStyle]}>
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
              ref={refInput}
              value={Value}
              onBlur={onBlur}
              multiline={multiline}
              keyboardType={keyboardType}
              placeholder={label ? `Enter ${label}` : ''}
              onChangeText={onChangeText}
              style={[
                styles.textInputStyle(hideClearButton, fontFamily),
                customTextInputStyle,
              ]}
              returnKeyType={returnKeyType}
              onEndEditing={onEndEditing}
              clearButtonMode={hideClearButton ? undefined : 'always'}
              autoFocus={autoFocus}
              editable={editable}
            />
  
            {showClearButton ? (
              <TouchableOpacity
                style={[styles.eyeIconContainer, clearButtonContainerStyle]}
                onPress={() => {
                  refInput?.current?.clear();
                  onChangeText('');
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
  
  export default AnimatedSearchBar;
  
  type Styles = {
    mainContainer: ViewStyle;
    searchIconContainer: ViewStyle;
    searchText: (fontFamily: String) => TextStyle;
    messageStyle: (fontFamily: String) => TextInput;
    messageStyleBold: (fontFamily: String) => TextStyle;
    textInputStyle: (hideClearBtn: boolean, fontFamily: String) => TextStyle;
    clearBtnContainer: ViewStyle;
    eyeIconContainer: ViewStyle;
    clearBtnImageContainer: ViewStyle;
    defaultIconStyle: ViewStyle;
    clearBtnImgStyle: ViewStyle;
  };
  
  const styles = StyleSheet.create<Styles>({
    mainContainer: {
      width: '100%',
      // height: 40,
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: scale(5),
      borderColor: '#E0E0E0',
      borderWidth: scale(1),
      paddingVertical: scale(8),
      backgroundColor: '#fff',
      paddingHorizontal: scale(12),
    },
    searchIconContainer: {
      // width: '15%',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: scale(10),
    },
    searchText: (fontFamily: String) => ({
      color: '#999999',
      fontSize: normalizeText(14),
      fontFamily: fontFamily || 'default-font-family',
    }),
    messageStyle: (fontFamily: String) => ({
      maxWidth: '90%',
      color: '#6C6C6C',
      fontSize: normalizeText(14),
      fontFamily: fontFamily || 'default-font-family',
    }),
    messageStyleBold: (fontFamily: String) => ({
      maxWidth: '90%',
      color: '#6C6C6C',
      fontWeight: 'bold',
      fontSize: normalizeText(14),
      fontFamily: fontFamily || 'default-font-family',
    }),
    textInputStyle: (hideClearBtn: boolean, fontFamily: String) => ({
      width: !hideClearBtn && Platform.OS == 'android' ? '90%' : '100%',
      fontSize: normalizeText(14),
      fontFamily: fontFamily || 'default-font-family',
      color: '#000',
    }),
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
    },
    defaultIconStyle: {
      width: scale(20),
      height: scale(20),
      tintColor: '#6C6C6C',
    },
    clearBtnImgStyle: {
      width: scale(10),
      height: scale(10),
      tintColor: '#6C6C6C',
    },
  });
  