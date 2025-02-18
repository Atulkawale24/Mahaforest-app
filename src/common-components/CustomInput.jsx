import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Controller} from 'react-hook-form';
import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';

const CustomInput = ({
  control,
  rules,
  name,
  label,
  placeholder,
  keyboardType = 'default',
  editable = true,
  fontFamily = 'Lato-Regular',
  numberOfLines = 1,
  trigger,
  maxLength,
  minLength,
}) => {
  const [focusedInput, setFocusedInput] = useState('');

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
              // control={control}
              // name={name}
              // rules={rules}
              onChangeText={onChange}
              onFocus={() => setFocusedInput(name)}
              onBlur={() => {
                setFocusedInput('');
                trigger(name);
              }}
              placeholder={placeholder}
              keyboardType={keyboardType}
              editable={editable}
              maxLength={maxLength}
              minLength={minLength}
              multiline
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

export default CustomInput;
export const customInputStyle = StyleSheet.create({
  inputBoxWrapper: {
    marginBottom: 20,
  },
  inputBox: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: colors.grey,
    color: colors.black,
    fontSize: fontSize.inputFontSize,
    fontFamily: fontFamily.latoRegular,
    minHeight: 45,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 12,
    marginTop: 5,
    color: colors.darkOrange,
    fontFamily: fontFamily.latoBold,
  },
  label: {
    marginBottom: 5,
    fontSize: fontSize.labelFontSize,
    color: colors.black,
  },
  fileUploadBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chooseFilePlaceholder: {
    fontSize: fontSize.inputFontSize,
    color: colors.grey,
    fontFamily: fontFamily.latoRegular,
  },
  chooseFileButton: {
    borderWidth: 0.5,
    borderColor: colors.blue,
    backgroundColor: colors.cardBg,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  chooseFileText: {
    color: colors.blue,
    fontSize: fontSize.inputFontSize,
    fontFamily: fontFamily.latoRegular,
  },
  noteText: {
    fontFamily: fontFamily.latoRegular,
    fontSize: fontSize.textFontSize,
    color: colors.grey,
    marginTop: 10,
    paddingBottom: 3,
  },
});
