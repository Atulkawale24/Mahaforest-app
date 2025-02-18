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
import fontFamily from '../../../constants/fontFamily';
import fontSize from '../../../constants/fontSize';
import LogOutBox from './LogOutBox';

const Profile = ({navigation}) => {
  const mobileNumber = '8605948612';
  const [logOutState, setLogOutState] = useState(false);
  const {control, handleSubmit} = useForm({
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
            name="name"
            label="Full Name*"
            rules={{
              required: 'Full Name is required',
            }}
          />
          <CustomInput
            control={control}
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
            editable={false}
          />
          <CustomFileUpload
            control={control}
            name="file"
            label="Passport Photo*"
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
        />
      )}
    </View>
  );
};

export default Profile;
