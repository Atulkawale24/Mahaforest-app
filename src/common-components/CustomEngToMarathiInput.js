import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Controller} from 'react-hook-form';
import colors from '../constants/colors';
import {customInputStyle} from './CustomInput';
import {engToMarathiConverter} from '../helper/engToMarathiConverter';
import axios from 'axios';

const CustomEngToMarathiInput = ({
  control,
  rules,
  name,
  label,
  placeholder,
  keyboardType = 'default',
  editable = true,
  fontFamily = 'NotoSansDevanagari-Regular',
  numberOfLines = 1,
  setValue,
  trigger,
  maxLength,
}) => {
  const [focusedInput, setFocusedInput] = useState('');
  const [inputText, setInputText] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);

  //   useEffect(() => {
  //     if (inputText.trim() === '') {
  //       setInputText(''); // Clear if input is empty
  //       return;
  //     }

  //     // Clear existing timer
  //     if (debounceTimer) clearTimeout(debounceTimer);

  //     // Set a new delay for translation
  //     const timer = setTimeout(() => {
  //       const translatedText = engToMarathiConverter(inputText.toLowerCase());
  //       setValue(`${name}`, translatedText);
  //     }, 500);

  //     setDebounceTimer(timer);

  //     return () => clearTimeout(timer); // Cleanup
  //   }, [inputText]);

  const translateString = async text => {
    try {
      if (debounceTimer) clearTimeout(debounceTimer);

      const timer = setTimeout(async () => {
        // Mark this function as async
        try {
          if (![undefined, null, '']?.includes(text)) {
            const response = await axios.get(
              `https://inputtools.google.com/request?text=${text}&itc=mr-t-i0-und`,
            );
            const result = response.data[1][0][1][0]; // Extract Marathi text
            // setConvertedText(result);
            setValue(name, result); // Use the extracted result
          } else {
            setValue(name, ''); // Use the extracted result
          }
        } catch (error) {
          console.error('Translation error:', error);
        }
      }, 1500);

      setDebounceTimer(timer);
    } catch (error) {
      console.error('Debounce error:', error);
    }
  };

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <>
          <View style={customInputStyle.inputBoxWrapper}>
            {label && (
              <Text
                style={[
                  customInputStyle.label,
                  {color: editable ? colors.black : colors.grey},
                ]}>
                {label}
                {rules && <Text style={{color: 'red'}}>*</Text>}
              </Text>
            )}
            <TextInput
              control={control}
              name={name}
              rules={rules}
              value={value}
              multiline
              onChangeText={text => {
                onChange(text); // Update form field immediately
                translateString(text);
                // if (debounceTimer) clearTimeout(debounceTimer);
                // const timer = setTimeout(() => {
                //   const translatedText = engToMarathiConverter(
                //     text.toLowerCase(),
                //   );
                //   setValue(name, translatedText); // Update translated text
                // }, 1500);
                // setDebounceTimer(timer);
              }}
              onFocus={() => setFocusedInput(true)}
              onBlur={() => {
                setFocusedInput(false);
                trigger(name);
              }}
              placeholder={placeholder}
              keyboardType={keyboardType}
              editable={editable}
              maxLength={maxLength}
              style={[
                customInputStyle.inputBox,
                {
                  fontFamily: fontFamily,
                  borderWidth: focusedInput === name ? 1 : 0.5,
                  borderColor:
                    focusedInput === name ? colors.blue : colors.grey,
                },
              ]}
              placeholderTextColor={colors.grey}
            />
            {error && (
              <Text style={customInputStyle.errorText}>{error?.message}</Text>
            )}
          </View>
        </>
      )}
    />
  );
};

export default CustomEngToMarathiInput;
