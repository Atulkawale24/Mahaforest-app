import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  BackHandler,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from 'react-native';
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
import {useFocusEffect} from '@react-navigation/native';

const Login = ({navigation}) => {
  const {control, handleSubmit, trigger} = useForm();
  const mobileNumber = storage.getNumber('MOBILE_NO');

  // const [inputText, setInputText] = useState('');
  // const [debounceTimer, setDebounceTimer] = useState(null);
  // useEffect(() => {
  //   storage.set('REGISTER_ID', 35);
  //   storage.set('MOBILE_NO', 8390958147);
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
        storage.set('REGISTER_ID', data?.REGISTER_ID);
        storage.set('MOBILE_NO', data?.MOBILE_NO);
      }
    },
  });

  const submit = data => {
    try {
      let formData = new FormData();
      formData.append('TOKENKEY', TOKEN_KEY);
      formData.append('SERVICEID', mobileNumber ? 2 : 1);
      formData.append('MOBILE_NO', data?.MOBILE_NO);
      mutate(formData);
    } catch (error) {
      Alert.alert(error?.message);
    }
  };

  // Handle back button press ONLY on the Home screen
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        BackHandler.exitApp(); // Exit the app
        return true; // Prevent default back button behavior
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // Cleanup the event listener
    }, []),
  );

  // const handleExitApp = () => {
  //   BackHandler.exitApp(); // Exit the app
  // };

  return (
    <>
      {isPending && <Loader />}
      <View style={loginStyle.wrapper}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
                  <Text style={loginStyle.text}>We will send a</Text>
                  <Text style={[loginStyle.text, loginStyle.otpText]}>
                    One Time Password (OTP)
                  </Text>
                  <Text style={loginStyle.text}>to this mobile number.</Text>
                </View>
                {/*==== Input Field ====*/}
                <CustomInput
                  control={control}
                  trigger={trigger}
                  name="MOBILE_NO"
                  maxLength={10}
                  keyboardType="numeric"
                  rules={{
                    required: 'Mobile Number is required',
                    minLength: {
                      value: 10,
                      message: 'Mobile Number must be 10 digits',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Mobile Number must be 10 digits',
                    },
                    pattern: {
                      value: /^[6789]\d{9}$/,
                      message: 'Enter a valid 10-digit mobile number',
                    },
                  }}
                  placeholder="Enter Mobile Number"
                />
                <GradientButton text="Login" onPress={handleSubmit(submit)} />
                <Text style={loginStyle.copyrightText}>
                  &#169; Content Owned by Maharashtra Forest Department,
                  Government of Maharashtra.
                </Text>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default Login;
