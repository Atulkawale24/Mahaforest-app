import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React from 'react';
import images from '../constants/images';
import fontSize from '../constants/fontSize';
import colors from '../constants/colors';
import fontFamily from '../constants/fontFamily';
import {storage} from '../store/mmkvInstance';

const UserProfileHeader = () => {
  const mobileNumber = storage.getNumber('MOBILE_NO')?.toString();

  return (
    <View style={userProfileStyle.profileWrapper}>
      <View style={userProfileStyle.userDetailWrapper}>
        <Text style={userProfileStyle.name}>{`Welcome`}</Text>
        <Text style={userProfileStyle.mobile}>{`${mobileNumber
          ?.split('')[6]
          .padStart('7', '*')}${mobileNumber?.substring('7')}`}</Text>
      </View>
      <Pressable style={userProfileStyle.userIconWrapper}>
        <Image
          source={images.userIcon}
          style={userProfileStyle.userIcon}
          resizeMode="stretch"
        />
      </Pressable>
    </View>
  );
};

export default UserProfileHeader;
const userProfileStyle = StyleSheet.create({
  profileWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  name: {
    fontSize: fontSize.textFontSize,
    color: colors.grey,
    fontFamily: fontFamily.latoRegular,
    marginBottom: 5,
  },
  mobile: {
    fontSize: fontSize.secondaryFontSize,
    color: colors.black,
    fontFamily: fontFamily.latoBold,
    letterSpacing: 1,
  },
  userIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  userIcon: {
    width: '100%',
    height: '100%',
  },
});
