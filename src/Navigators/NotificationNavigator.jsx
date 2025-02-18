import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Notification from '../screens/auth/notification/Notification';
import NotificationDetail from '../screens/auth/notification/NotificationDetail';
const Stack = createStackNavigator();

const NotificationNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'notification-list'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="notification-list" component={Notification} />
      <Stack.Screen name="notification-detail" component={NotificationDetail} />
    </Stack.Navigator>
  );
};

export default NotificationNavigator;
