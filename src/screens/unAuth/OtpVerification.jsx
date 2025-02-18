import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '../../constants/colors';
import fontFamily from '../../constants/fontFamily';
import fontSize from '../../constants/fontSize';
import GradientButton from '../../common-components/GradientButton';
import {Controller, useForm} from 'react-hook-form';
import {communication} from '../../services/communication';
const {width, height} = Dimensions.get('window');
import {TOKEN_KEY} from '@env';
import {useMutation} from '@tanstack/react-query';
import {storage} from '../../store/mmkvInstance';
import Toast from 'react-native-toast-message';
import Loader from '../../common-components/Loader';

const OtpVerification = ({navigation, route}) => {
  const {MOBILE_NO, REGISTER_ID} = route?.params;
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const otpFields = ['otp1', 'otp2', 'otp3', 'otp4'];
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [showResendButton, setShowResendButton] = useState(false);
  const {control, handleSubmit} = useForm();
  // const [timer, setTimer] = useState(30);

  // Timer logic
  // useEffect(() => {
  //   if (timer === 0) {
  //     setShowResendButton(true);
  //     return;
  //   }
  //   const interval = setInterval(() => {
  //     setTimer(prevTimer => {
  //       if (prevTimer <= 1) {
  //         clearInterval(interval);
  //         setShowResendButton(true);
  //         return 0;
  //       }
  //       return prevTimer - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [timer]);

  //verify otp
  const {mutate, isError, isPending, error} = useMutation({
    mutationFn: communication.verifyOtp,
    onSuccess: data => {
      if (Number(data?.RESULT_CODE) === 1) {
        storage.set('MOBILE_NO', MOBILE_NO);
        storage.set('REGISTER_ID', REGISTER_ID);
        navigation.navigate('authScreens');
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Enter valid OTP',
        });
        return;
      }
    },
  });

  //resend otp
  // const {
  //   mutate: resendOtpMutate,
  //   isError: resendOtpError,
  //   isPending: resendOtpPending,
  // } = useMutation({
  //   mutationFn: communication.login,
  //   onSuccess: data => {
  //     if (Number(data?.RESULT_CODE) === 1) {
  //       setShowResendButton(true);
  //       setTimer(30);
  //     }
  //   },
  // });

  const verifyOtp = data => {
    try {
      const otpValue = Object.values(data).join('');
      let formData = new FormData();
      formData.append('OTP', otpValue);
      formData.append('TOKENKEY', TOKEN_KEY);
      formData.append('REGISTER_ID', REGISTER_ID);
      mutate(formData);
    } catch (error) {
      console.log(error?.message);
    }
  };
  //resend otp
  // const resendOtp = () => {
  //   try {
  //     let formData = new FormData();
  //     formData.append('TOKENKEY', TOKEN_KEY);
  //     formData.append('SERVICEID', 1);
  //     formData.append('MOBILE_NO', MOBILE_NO);
  //     resendOtpMutate(formData);
  //   } catch (error) {
  //     Alert.alert(error?.message);
  //   }
  // };
  return (
    <>
      {isPending && <Loader />}
      <View style={otpVerificationStyle?.otpWrapper} pointerEvents="auto">
        <Text style={otpVerificationStyle?.title}>Enter confirmation code</Text>
        <Text style={otpVerificationStyle?.text}>
          {`A 4-digit code was sent to ${MOBILE_NO}`}
        </Text>
        <View style={otpVerificationStyle?.otpBoxWrapper}>
          {otpFields.map((field, index) => (
            <View key={index}>
              <Controller
                control={control}
                name={field}
                // rules={{required: true}}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    style={[
                      otpVerificationStyle?.otpBox,
                      {
                        borderColor:
                          currentIndex === index ? colors.blue : colors.grey,
                      },
                    ]}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={value}
                    ref={
                      index === 0
                        ? firstInput
                        : index === 1
                        ? secondInput
                        : index === 2
                        ? thirdInput
                        : fourthInput
                    }
                    onChangeText={text => {
                      onChange(text);
                      if (text) {
                        setCurrentIndex(index + 1);
                        if (index === 0 && secondInput.current) {
                          secondInput.current.focus();
                        } else if (index === 1 && thirdInput.current) {
                          thirdInput.current.focus();
                        } else if (index === 2 && fourthInput.current) {
                          fourthInput.current.focus();
                        }
                      } else {
                        setCurrentIndex(index - 1);
                        if (index === 1 && firstInput.current) {
                          firstInput.current.focus();
                        } else if (index === 2 && secondInput.current) {
                          secondInput.current.focus();
                        } else if (index === 3 && thirdInput.current) {
                          thirdInput.current.focus();
                        }
                      }
                    }}
                  />
                )}
              />
            </View>
          ))}
        </View>
        <View style={otpVerificationStyle?.actionWrapper}>
          {/* {!showResendButton && (
          <Text style={otpVerificationStyle?.timerText}>{timer}</Text>
        )}
        {showResendButton && (
          <Pressable
            onPress={resendOtp}
            style={otpVerificationStyle?.resendOtpButton}>
            <Text style={otpVerificationStyle?.resendOtpText}>Resend code</Text>
          </Pressable>
        )} */}
          <GradientButton text="Continue" onPress={handleSubmit(verifyOtp)} />
        </View>
      </View>
    </>
  );
};

export default OtpVerification;
const otpVerificationStyle = StyleSheet.create({
  otpWrapper: {
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    color: colors.black,
    fontFamily: fontFamily.latoBold,
    fontSize: fontSize.secondaryFontSize,
  },
  text: {
    color: colors.grey,
    fontFamily: fontFamily.latoRegular,
    fontSize: fontSize.textFontSize,
    marginTop: 10,
    letterSpacing: 1.5,
    width: '50%',
    textAlign: 'center',
    lineHeight: 21,
  },
  otpBoxWrapper: {
    marginVertical: 50,
    flexDirection: 'row',
    gap: 10,
  },
  otpBox: {
    borderWidth: 1,
    borderColor: colors.grey,
    width: 50,
    textAlign: 'center',
    color: colors.black,
    borderRadius: 10,
    fontSize: 20,
  },
  actionWrapper: {
    marginTop: 40,
    width: '80%',
  },
  resendOtpButton: {
    marginBottom: 25,
  },
  resendOtpText: {
    fontFamily: fontFamily.latoBold,
    fontSize: fontSize.textFontSize,
    color: colors.blue,
    textAlign: 'center',
  },
  timerText: {
    fontSize: fontSize.secondaryFontSize,
    fontFamily: fontFamily.latoBold,
    color: colors.darkOrange,
    textAlign: 'center',
    marginBottom: 15,
  },
});
