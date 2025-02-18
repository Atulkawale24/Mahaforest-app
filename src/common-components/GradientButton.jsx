import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';

const GradientButton = ({onPress, text, color}) => {
  return (
    <LinearGradient
      colors={[
        color ? color : colors.darkOrange,
        color ? color : colors.orange,
      ]}
      style={gradientButtonStyle.linearGradient}>
      <Pressable onPress={onPress}>
        <Text style={gradientButtonStyle.buttonText}>{text}</Text>
      </Pressable>
    </LinearGradient>
  );
};

export default GradientButton;
var gradientButtonStyle = StyleSheet.create({
  linearGradient: {
    paddingHorizontal: 15,
    borderRadius: 5,
    zIndex: 1,
  },
  buttonText: {
    fontSize: fontSize.buttonFontSize,
    textAlign: 'center',
    color: colors.white,
    fontFamily: fontFamily.latoRegular,
    margin: 10,
  },
});
