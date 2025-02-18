import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyle} from '../../../styles/globalStyle';
import TopHeader from '../../../common-components/TopHeader';
import colors from '../../../constants/colors';
import profileStyle from '../../../styles/profileStyle';
import images from '../../../constants/images';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../common-components/CustomInput';
import CustomFileUpload from '../../../common-components/CustomFileUpload';
import GradientButton from '../../../common-components/GradientButton';
import LogOutBox from './LogOutBox';
import {storage} from '../../../store/mmkvInstance';

const Profile = ({navigation}) => {
  const mobileNumber = storage.getNumber('MOBILE_NO')?.toString();

  const [logOutState, setLogOutState] = useState(false);
  const {control, handleSubmit, trigger} = useForm({
    defaultValues: {
      name: '',
      mobile: '',
    },
  });
  const logout = () => {
    navigation.navigate('unAuthScreens');
    setLogOutState(false);
  };

  return (
    <View style={globalStyle.pageWrapper}>
      <TopHeader
        primaryScreen="Profile"
        onPress={() => navigation.goBack()}
        bgColor={colors.white}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyle.screenWrapper}>
        <View style={profileStyle.profileCardWrapper}>
          <View style={profileStyle.profileImageWrapper}>
            <Image
              source={images.userIcon}
              resizeMode="stretch"
              style={profileStyle.profileImage}
            />
          </View>
          <View style={profileStyle.profileDetail}>
            <Text style={profileStyle.name}>John Doe</Text>
            <Text style={profileStyle.mobile}>{`${mobileNumber
              ?.split('')[6]
              .padStart('7', '*')}${mobileNumber?.substring('7')}`}</Text>
          </View>
        </View>
        <View style={[globalStyle.globalCardWrapper, {width: '100%'}]}>
          <Text style={profileStyle.title}>
            Update Profile (प्रोफाइल अपडेट करा)
          </Text>
          <CustomInput
            control={control}
            trigger={trigger}
            name="name"
            label="Full Name*"
            rules={{
              required: 'Full Name is required',
            }}
          />
          <CustomInput
            control={control}
            trigger={trigger}
            name="mobile"
            label="Mobile Number*"
            rules={{
              required: 'Mobile Number is required',
              minLength: {
                value: 10,
                message: 'Mobile Number must be 10 digit',
              },
              maxLength: {
                value: 10,
                message: 'Mobile Number must be 10 digit',
              },
            }}
            placeholder="Enter Mobile Number"
            maxLength={10}
            editable={false}
          />
          <CustomFileUpload
            control={control}
            trigger={trigger}
            name="file"
            label="Profile Photo*"
            note="Choose Valid jpg, jpeg, png File"
            rules={{
              required: 'File is required',
            }}
          />
          <GradientButton text="Update" color={colors.blue} />
        </View>
        <GradientButton
          text="Logout"
          color={colors.darkOrange}
          onPress={() => setLogOutState(!logOutState)}
        />
      </ScrollView>
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
    </View>
  );
};

export default Profile;
