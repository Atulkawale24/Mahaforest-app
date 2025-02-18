import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/auth/home/Home';
import CattleKillForm from '../screens/auth/home/forms/CattleKillForm';
import HumanDeath from '../screens/auth/home/forms/HumanDeathForm';
import CropDamageForm from '../screens/auth/home/forms/CropDamageForm';
const Stack = createStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'home'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="cattle-kill-form" component={CattleKillForm} />
      <Stack.Screen name="human-death-form" component={HumanDeath} />
      <Stack.Screen name="crop-damage-form" component={CropDamageForm} />
    </Stack.Navigator>
  );
};

export default HomeScreenNavigator;
