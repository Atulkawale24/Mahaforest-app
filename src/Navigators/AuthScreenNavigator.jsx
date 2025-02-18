import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';
import * as Animatable from 'react-native-animatable';
import HomeScreenNavigator from './HomeScreenNavigator';
import Notification from '../screens/auth/notification/Notification';
import Profile from '../screens/auth/profile/Profile';
import Icon from '../constants/Icon';
import fontFamily from '../constants/fontFamily';
import images from '../constants/images';
import NotificationNavigator from './NotificationNavigator';
import TrackApplicationNavigator from './TrackApplicationNavigator';

const Tab = createBottomTabNavigator();

const AuthScreenNavigator = () => {
  const TabArr = [
    {
      route: 'home-screen',
      label: 'Home',
      //   type: 'Feather', // Must match a key in `Icons`
      icon: images.homeIcon,
      component: HomeScreenNavigator,
      color: colors.blue,
      alphaClr: colors.blue,
    },
    {
      route: 'track-application',
      label: 'Application Track',
      //   type: 'Feather', // Must match a key in `Icons`
      icon: images.applicationTrackIcon,
      component: TrackApplicationNavigator,
      color: colors.blue,
      alphaClr: colors.blue,
    },
    // {
    //   route: 'notification',
    //   label: 'Notification',
    //   //   type: 'Feather', // Must match a key in `Icons`
    //   icon: images.notificationIcon,
    //   component: NotificationNavigator,
    //   color: colors.blue,
    //   alphaClr: colors.blue,
    // },
    // {
    //   route: 'profile',
    //   label: 'Profile',
    //   //   type: 'Feather', // Must match a key in `Icons`
    //   icon: images.profileIcon,
    //   component: Profile,
    //   color: colors.blue,
    //   alphaClr: colors.blue,
    // },
  ];

  const TabButton = props => {
    const {item, onPress, accessibilityState, index} = props;
    const focused = accessibilityState.selected;
    // const viewRef = useRef(null);
    // const textViewRef = useRef(null);

    // useEffect(() => {
    //   if (focused) {
    //     // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
    //     // viewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    //     textViewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    //   } else {
    //     // viewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    //     textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    //   }
    // }, [focused]);

    return (
      <Pressable style={bottomTabStyle.tab} onPress={onPress}>
        <Image
          source={item?.icon}
          tintColor={focused ? colors.blue : colors.grey}
          style={bottomTabStyle.tabIcon}
        />
        <Text
          style={[
            bottomTabStyle.tabText,
            {color: focused ? colors.black : colors.grey},
          ]}>
          {item?.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        borderRadius: 10,
        // backgroundColor: theme.data === 'DARK' ? Color.black : Color.white,
      }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            width: '100%',
            height: 70,
            backgroundColor: colors.white,
            margin: 0,
            paddingHorizontal: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: props => (
                  <TabButton {...props} item={item} index={index} />
                ),
              }}
            />
          );
        })}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default AuthScreenNavigator;
const bottomTabStyle = StyleSheet.create({
  tab: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 11,
    marginTop: 10,
    fontFamily: fontFamily.latoBold,
  },
  tabIcon: {
    width: 17,
    height: 17,
  },
});
