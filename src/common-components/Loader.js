import {View, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import colors from '../constants/colors';

const Loader = () => {
  return (
    <View style={loaderStyle.loaderWrapper}>
      <View style={loaderStyle.lottieViewWrapper}>
        <LottieView
          source={require('../assets/lottie-anim/loader-json.json')}
          style={{
            width: 150,
            height: 150,
          }}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

export default Loader;

const loaderStyle = StyleSheet.create({
  loaderWrapper: {
    zIndex: 66,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  lottieViewWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
