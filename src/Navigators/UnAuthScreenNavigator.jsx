import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OtpVerification from '../screens/unAuth/OtpVerification';
import Login from '../screens/unAuth/Login';

const Stack = createStackNavigator();

const UnAuthScreenNavigator = () => {
  return (
      <Stack.Navigator
        initialRouteName={'login'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="otp-verification" component={OtpVerification} />
      </Stack.Navigator>
  );
};

export default UnAuthScreenNavigator;
