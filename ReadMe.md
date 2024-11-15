# Animated Search Bar

An animated-search-bar is a customizable and interactive React Native component for creating animated search bars with smooth transitions and advanced features. It is designed to enhance the user experience with a sleek UI and various configuration options.

# Features

* 🔍 Animated Search Bar: Expands and collapses smoothly.
* 💬 Dynamic Messages: Displays scrolling messages in the placeholder area.
* ✨ Highly Customizable: Supports custom styles, icons, fonts, and more.
* 🎛️ Advanced Options: Includes clear buttons, callbacks, keyboard types, and return key handling.

![](https://github.com/kishan-wts/react-native-animated-search-bar/blob/main/animated_search_bar.gif)
# Installation
```
npm i @dev-kd/react-native-animated-search-bar
```
or
```
yarn add @dev-kd/react-native-animated-search-bar
```
# How to Use
```
import React, { useState } from 'react';
import { View } from 'react-native';
import AnimatedSearchBar from 'animated-search-bar';

const App = () => {
  const [searchedText, setSearchedText] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AnimatedSearchBar
        messageData={[
              'Flights',
              'Trains',
              'Hotels',
              'Rooms',
              'Cabs',
              'Bus',
              'etc..',
            ]}
        onChangeText={v => {
        SetSearchedText(v);
        }}
      Value={searchedText}
      />
    </View>
  );
};

export default App;

```
# Customise
```
viewStyle={{
              width: '100%',
              height: scale(40),
              height: scale(40),
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: scale(5),
              borderColor: '#E0E0E0',
              borderWidth: scale(1),
              paddingVertical: scale(8),
              backgroundColor: '#fff',
              paddingHorizontal: scale(12),
            }}
            SearchLabelTextStyle={{
              color: '#999999',
              fontSize: normalizeText(14),
              fontFamily: FONTS.myFontRegular || 'default-font-family',
            }}
            TextMessageStyle={{
              maxWidth: '90%',
              color: '#6C6C6C',
              fontSize: scale(14),
              fontFamily: FONTS.myFontRegular || 'default-font-family',
            }}
            TextMessageStyleBold={{
              maxWidth: '90%',
              color: '#6C6C6C',
              fontWeight: 'bold',
              fontSize: scale(14),
              fontFamily: FONTS.myFontBold || 'default-font-family',
            }}
            customTextInputStyle={{height: scale(35)}}
```

| Prop Name| Type |	Default |	Description |
|----------|------|---------|-------------|
|`SearchImgSource`|	string	|assets/search.png	|Path to a custom search icon image.|
|`SearchImgStyle`	|StyleProp<ViewStyle>	|undefined|	Custom styles for the search icon.|
|`messageData`	| `string[ ]`	|`[ ]`	|Array of messages to display as scrolling placeholder text.|
|`messageDelay`	|number	|200	|Time delay (ms) between each character of a message.|
|`messageTimeout` |	number	|1000|	Time delay (ms) before transitioning to the next message.|
|`viewStyle`|StyleProp<ViewStyle>	|undefined	|Custom styles for the main search bar container.|
|`onChangeText`	|(text: string) => void|	() => {}|	Callback triggered when the text input value changes.|
|`multiline`|	boolean|	false|	Enables multiline text input.|
|`keyboardType`|	KeyboardTypeOptions	|'default'|	Type of keyboard to use for text input.|
|`Value`|	string|	undefined|	Current value of the search input.|
|`label`|	string|	`Enter ${label}`|	Placeholder text label.|
|`returnKeyType`|	ReturnKeyTypeOptions	|'done'|	Specifies the return key type on the keyboard.|
|`hideClearButton`	|boolean|	false|	Hides or shows the clear button.|
|`autoFocus`|	boolean|	true|	Automatically focuses the text input when it is rendered.|
|`onReturnPress`|	() => void|	undefined|	Callback triggered when the return key is pressed.|
|`callBackFunction` |	(arg: any) => void	|() => {}|	Callback triggered after enabling search with non-empty input.|
|`onPressSearchBar`	|() => void	|undefined|	Callback triggered when the search bar is pressed.|
|`editable`	|boolean	|true|	Specifies if the input is editable.|
|`clearButtonContainerStyle`	|StyleProp<ViewStyle>|	undefined|	Custom styles for the clear button container.|
|`clearImageSource`	|string|	assets/close.png|	Path to a custom clear button icon image.|
|`clearBtnImgStyle`	|StyleProp<ViewStyle>	|undefined	|Custom styles for the clear button icon.|
|`fontFamily`	|string	|''	|Custom font family for text input and messages.|
|`TextMessageStyleBold`	|StyleProp<ViewStyle>|	undefined	|Custom styles for bold message text.|
|`customTextInputStyle`	|StyleProp<ViewStyle>	|undefined	|Custom styles for the text input.|


