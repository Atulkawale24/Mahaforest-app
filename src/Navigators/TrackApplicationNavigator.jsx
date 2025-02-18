import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TrackApplication from '../screens/auth/track-application/TrackApplication';
import TrackingTimeLine from '../screens/auth/track-application/TrackingTimeLine';
const Stack = createStackNavigator();

const TrackApplicationNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'track-application-list'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="track-application-list"
        component={TrackApplication}
      />
      <Stack.Screen name="track-my-application" component={TrackingTimeLine} />
    </Stack.Navigator>
  );
};

export default TrackApplicationNavigator;
