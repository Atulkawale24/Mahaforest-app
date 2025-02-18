import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import images from '../constants/images';
import fontSize from '../constants/fontSize';
import colors from '../constants/colors';
import fontFamily from '../constants/fontFamily';
import {storage} from '../store/mmkvInstance';
import LogOutBox from '../screens/auth/profile/LogOutBox';

const UserProfileHeader = ({navigation}) => {
  const mobileNumber = storage.getNumber('MOBILE_NO')?.toString();
  const [logOutState, setLogOutState] = useState(false);

  const logout = () => {
    navigation.navigate('unAuthScreens');
    setLogOutState(false);
  };
  return (
    <>
      <View style={userProfileStyle.profileWrapper}>
        <View style={userProfileStyle.userDetailWrapper}>
          <Text style={userProfileStyle.name}>{`Welcome`}</Text>
          <Text style={userProfileStyle.mobile}>{`${mobileNumber
            ?.split('')[6]
            .padStart('7', '*')}${mobileNumber?.substring('7')}`}</Text>
        </View>
        <Pressable
          style={userProfileStyle.userIconWrapper}
          onPress={() => setLogOutState(!logOutState)}>
          <Image
            source={images.userIcon}
            style={userProfileStyle.userIcon}
            resizeMode="stretch"
          />
        </Pressable>
      </View>
      {logOutState && (
        <LogOutBox
          onCancel={() => setLogOutState(!logOutState)}
          onLogout={logout}
          title="Log Out?"
          content="Are you sure you want to log out? You'll need to login again to use the app."
          cancelBtnText="Cancel"
          yesBtnText="Log out"
        />
      )}
    </>
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
    // elevation: 2,
  },
  userIcon: {
    width: '100%',
    height: '100%',
  },
});
