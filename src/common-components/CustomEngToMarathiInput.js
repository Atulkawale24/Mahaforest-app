import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Controller} from 'react-hook-form';
import colors from '../constants/colors';
import {customInputStyle} from './CustomInput';
import {engToMarathiConverter} from '../helper/engToMarathiConverter';

const CustomEngToMarathiInput = ({
  control,
  rules,
  name,
  label,
  placeholder,
  keyboardType = 'default',
  editable = true,
  fontFamily = 'Lato-Regular',
  numberOfLines = 1,
  setValue,
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
              </Text>
            )}
            <TextInput
              control={control}
              name={name}
              rules={rules}
              value={value}
              onChangeText={text => {
                onChange(text); // Update form field immediately

                if (debounceTimer) clearTimeout(debounceTimer);
                const timer = setTimeout(() => {
                  const translatedText = engToMarathiConverter(
                    text.toLowerCase(),
                  );
                  setValue(name, translatedText); // Update translated text
                }, 1500);
                setDebounceTimer(timer);
              }}
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
              placeholder={placeholder}
              keyboardType={keyboardType}
              editable={editable}
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
