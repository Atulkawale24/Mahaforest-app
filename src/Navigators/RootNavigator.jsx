import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UnAuthScreenNavigator from './UnAuthScreenNavigator';
import AuthScreenNavigator from './AuthScreenNavigator';
import {storage} from '../store/mmkvInstance';

// import BottomNavigator from './BottomNavigator';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const MOBILE_NO = storage.getNumber('MOBILE_NO');

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          [undefined, null, '']?.includes(MOBILE_NO)
            ? 'unAuthScreens'
            : 'authScreens'
        }
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="unAuthScreens" component={UnAuthScreenNavigator} />
        <Stack.Screen name="authScreens" component={AuthScreenNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
