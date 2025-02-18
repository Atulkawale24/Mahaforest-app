import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UnAuthScreenNavigator from './UnAuthScreenNavigator';
import AuthScreenNavigator from './AuthScreenNavigator';
import {storage} from '../store/mmkvInstance';

// import BottomNavigator from './BottomNavigator';

const Stack = createStackNavigator();

const RootNavigator = () => {
  // const REGISTER_ID = storage.getNumber('REGISTER_ID');

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={
        //   [undefined, null, '']?.includes(REGISTER_ID)
        //     ? 'unAuthScreens'
        //     : 'authScreens'
        // }
        initialRouteName={'unAuthScreens'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="unAuthScreens" component={UnAuthScreenNavigator} />
        <Stack.Screen name="authScreens" component={AuthScreenNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
