import {View, Text, Image, Alert, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import loginStyle from '../../styles/loginStyle';
import images from '../../constants/images';
import {useForm} from 'react-hook-form';
import CustomInput from '../../common-components/CustomInput';
import GradientButton from '../../common-components/GradientButton';
import {TOKEN_KEY} from '@env';
import {communication} from '../../services/communication';
import {useMutation} from '@tanstack/react-query';
import {storage} from '../../store/mmkvInstance';
import Loader from '../../common-components/Loader';
import {engToMarathiConverter} from '../../helper/engToMarathiConverter';

const Login = ({navigation}) => {
  const {control, handleSubmit} = useForm();
  // const [inputText, setInputText] = useState('');
  // const [debounceTimer, setDebounceTimer] = useState(null);
  // useEffect(() => {
  //   storage.set('REGISTER_ID', 12);
  //   storage.set('MOBILE_NO', 8605948612);
  // }, []);

  // useEffect(() => {
  //   if (inputText.trim() === '') {
  //     setInputText(''); // Clear if input is empty
  //     return;
  //   }

  //   // Clear existing timer
  //   if (debounceTimer) clearTimeout(debounceTimer);

  //   // Set a new delay for translation
  //   const timer = setTimeout(() => {
  //     setInputText(engToMarathiConverter(inputText.toLowerCase()));
  //   }, 500);

  //   setDebounceTimer(timer);

  //   return () => clearTimeout(timer); // Cleanup
  // }, [inputText]);

  const {mutate, isError, isPending, error} = useMutation({
    mutationFn: communication.login,
    onSuccess: data => {
      if (Number(data?.RESULT_CODE) === 1) {
        navigation.navigate('otp-verification', {
          MOBILE_NO: data?.RESULT_DATA[0]?.MOBILE_NO,
          REGISTER_ID: data?.RESULT_DATA[0]?.REGISTER_ID,
        });
      } else if (
        data?.RESULT_MESSAGE?.toLowerCase() === 'mobile no. already exist'
      ) {
        navigation.navigate('authScreens');
      }
    },
  });

  const submit = data => {
    try {
      let formData = new FormData();
      formData.append('TOKENKEY', TOKEN_KEY);
      formData.append('SERVICEID', 1);
      formData.append('MOBILE_NO', data?.MOBILE_NO);
      mutate(formData);
    } catch (error) {
      Alert.alert(error?.message);
    }
  };
  return (
    <>
      {isPending && <Loader />}
      <View style={loginStyle.wrapper}>
        <View style={loginStyle.imageWrapper}>
          <Image
            source={images.loginImg}
            resizeMode="cover"
            style={loginStyle.loginImg}
          />
        </View>
        <View style={loginStyle.loginFormWrapper}>
          <View style={loginStyle.multiTextWrapper}>
            <Text style={loginStyle.headerText}>MAHARASHTRA</Text>
            <Text style={[loginStyle.headerText, loginStyle.portalText]}>
              FOREST PORTAL
            </Text>
          </View>
          <Text style={loginStyle.welcomeText}>Welcome!</Text>
          <View style={loginStyle.multiTextWrapper}>
            <Text style={loginStyle.text}>We have send you an</Text>
            <Text style={[loginStyle.text, loginStyle.otpText]}>
              One Time Password(OTP)
            </Text>
            <Text style={loginStyle.text}>on this mobile number.</Text>
          </View>
          {/*====eng to marathi translator===*/}
          {/* <TextInput
            placeholder="Type in English"
            value={inputText}
            onChangeText={setInputText}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              marginBottom: 10,
              color: '#000',
              paddingHorizontal: 10,
            }}
          /> */}
            <CustomInput
              control={control}
              name="MOBILE_NO"
              keyboardType="numeric"
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
            />
          <GradientButton text="Login" onPress={handleSubmit(submit)} />
          <Text style={loginStyle.copyrightText}>
            &#169; Content Owned by Maharashtra Forest Department, Government of
            Maharashtra.
          </Text>
        </View>
      </View>
    </>
  );
};

export default Login;
