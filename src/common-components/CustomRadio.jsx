import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Controller} from 'react-hook-form';
import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';
import {customInputStyle} from './CustomInput';

const CustomRadio = ({
  control,
  rules,
  name,
  label,
  setValue,
  selectedValue,
  editable = true,
  options,
  fontFamily = 'Lato-Regular',
  trigger,
}) => {
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
            {options?.length > 0 && (
              <View style={radioStyle.radioWrapper}>
                {options?.map((ele, index) => {
                  return (
                    <Pressable
                      onPress={() => {
                        setValue(`${name}`, ele);
                        trigger(name);
                      }}
                      style={radioStyle.radioButtonWrapper}
                      key={index}>
                      <View style={radioStyle.outerCircle}>
                        {selectedValue === ele?.value && (
                          <View style={radioStyle.innerCircle}></View>
                        )}
                      </View>
                      <Text
                        style={[
                          radioStyle.radioLabel,
                          {
                            color:
                              selectedValue === ele?.value
                                ? colors.black
                                : colors.grey,
                          },
                        ]}>
                        {ele?.key}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
            {error && (
              <Text style={customInputStyle.errorText}>{error?.message}</Text>
            )}
          </View>
        </>
      )}
    />
  );
};

export default CustomRadio;
const radioStyle = StyleSheet.create({
  radioWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 50,
  },
  radioButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  outerCircle: {
    width: 18,
    height: 18,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: colors.blue,
  },
  radioLabel: {
    fontSize: fontSize.inputFontSize,
    color: colors.grey,
    fontFamily: fontFamily.devanagariRegular,
  },
});
