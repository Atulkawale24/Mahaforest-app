import {
  View,
  Text,
  Pressable,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyle} from '../../../../styles/globalStyle';
import TopHeader from '../../../../common-components/TopHeader';
import colors from '../../../../constants/colors';
import FormCard from '../../../../cards/FormCard';
import formStyle from '../../../../styles/formStyle';
import CustomInput from '../../../../common-components/CustomInput';
import {useForm} from 'react-hook-form';
import fontFamily from '../../../../constants/fontFamily';
import CustomSelect from '../../../../common-components/CustomSelect';
import CustomDatePicker from '../../../../common-components/CustomDatePicker';
import CustomFileUpload from '../../../../common-components/CustomFileUpload';
import images from '../../../../constants/images';
import Icon from '../../../../constants/Icon';
import GradientButton from '../../../../common-components/GradientButton';
import {useMutation, useQuery} from '@tanstack/react-query';
import {communication} from '../../../../services/communication';
import {TOKEN_KEY} from '@env';
import {storage} from '../../../../store/mmkvInstance';
import Toast from 'react-native-toast-message';
import CustomMultiSelect from '../../../../common-components/CustomMultiSelect';
import {animalArray} from '../../../../utilities/animalArray';
import {fruitArray} from '../../../../utilities/fruitArray';
import {cropType} from '../../../../utilities/cropType';
import Loader from '../../../../common-components/Loader';
import CustomEngToMarathiInput from '../../../../common-components/CustomEngToMarathiInput';

const CropDamageForm = ({navigation, route}) => {
  const {serviceType} = route.params;
  const REGISTERED_ID = storage.getNumber('REGISTER_ID');
  const [isMarathiLanguage, setIsMarathiLanguage] = useState(false);
  const [dateStates, setDateStates] = useState({
    date: false,
    time: false,
  });
  const [captchaValue, setCaptchaValue] = useState([]);
  const [verifyCaptchaValue, setVerifyCaptchaValue] = useState(null);
  const [reloadCaptcha, setReloadCaptcha] = useState(false);
  const [districtId, setDistrictId] = useState(null);
  const [officeId, setOfficeId] = useState(null);
  const {control, handleSubmit, setValue, watch, trigger, setError} = useForm();
  const [selectedAnimal, setSelectedAnimal] = useState([]);
  const [selectedFruit, setSelectedFruit] = useState([]);
  const [handleMultiSelectError, setHandleMultiSelectError] = useState({
    animal: false,
    fruit: false,
  });

  //get captcha value
  useEffect(() => {
    const captchaVal = Math.floor(Math.random() * 100000);
    setVerifyCaptchaValue(captchaVal);
    const splittedVal = captchaVal?.toString()?.split('');
    if (splittedVal) {
      setCaptchaValue(splittedVal);
    }
  }, [reloadCaptcha]);

  const BANKPASSBOOK_COPY = watch('BANKPASSBOOK_COPY');
  const AADHAAR_COPY = watch('AADHAAR_COPY');
  const SATBARACOPY = watch('SATBARACOPY');
  const NOC_COPY = watch('NOC_COPY');
  const CMBWING = watch('CMBWING');
  const CMBDISTRICT = watch('CMBDISTRICT');
  const CMDROFFICE = watch('CMDROFFICE');
  const CMBVILLAGE = watch('CMBVILLAGE');
  const VILLAGETXT = watch('VILLAGETXT');
  const CROP_TYPE = watch('CROP_TYPE');

  //clearing value as per crop type
  useEffect(() => {
    if (Number(CROP_TYPE?.id) === 1) {
      setValue('CROP_NAME', '');
      setSelectedAnimal([]);
      setSelectedFruit([]);
    } else if (Number(CROP_TYPE?.id) === 2) {
      setSelectedAnimal([]);
      setSelectedFruit([]);
    } else {
      setValue('CROP_NAME', '');
    }
  }, [CROP_TYPE]);

  useEffect(() => {
    if (CMBWING) {
      setValue('CMBDISTRICT', '');
      setValue('CMBTALUKA', '');
      setValue('CMDROFFICE', '');
      setValue('CMBVILLAGE', '');
    }
  }, [CMBWING]);

  useEffect(() => {
    if (CMBDISTRICT) {
      setValue('CMBTALUKA', '');
      setValue('CMDROFFICE', '');
      setValue('CMBVILLAGE', '');
      setDistrictId(CMBDISTRICT?.DISTRICT_ID);
    }
  }, [CMBDISTRICT]);

  useEffect(() => {
    if (CMDROFFICE) {
      setValue('CMBVILLAGE', '');
      setOfficeId(CMDROFFICE?.OF_ID);
    }
  }, [CMDROFFICE]);

  // Fetch wing list
  const {
    data: wingList,
    isPending,
    error,
  } = useQuery({
    queryKey: ['wing-list'],
    queryFn: () => communication.getMasterData({TOKEN_KEY, MASTERID: 1}),
  });

  // Fetch district list
  const {
    data: districtList,
    isPending: isDistrictPending,
    error: isDistrictError,
  } = useQuery({
    queryKey: ['district-list'],
    queryFn: () => communication.getMasterData({TOKEN_KEY, MASTERID: 2}),
  });
  // Fetch taluka list
  const {
    data: talukaList,
    isPending: isTalukaPending,
    error: isTalukaError,
  } = useQuery({
    queryKey: ['taluka-list', districtId],
    queryFn: () =>
      communication.getMasterData({
        TOKEN_KEY,
        MASTERID: 3,
        CMBDISTRICT: CMBDISTRICT?.DISTRICT_ID,
      }),
    enabled: !!districtId,
  });

  // Fetch office list
  const {
    data: officeList,
    isPending: isOfficePending,
    error: isOfficeError,
  } = useQuery({
    queryKey: ['office-list', districtId],
    queryFn: () =>
      communication.getMasterData({
        TOKEN_KEY,
        MASTERID: 4,
        CMBWING: CMBWING?.WING_ID,
        CMBDISTRICT: CMBDISTRICT?.DISTRICT_ID,
      }),
    enabled: !!districtId,
  });

  // Fetch village list
  const {
    data: villageList,
    isPending: isVillagePending,
    error: isVillageError,
  } = useQuery({
    queryKey: ['village-list', officeId],
    queryFn: () =>
      communication.getMasterData({
        TOKEN_KEY,
        MASTERID: 5,
        CMBWING: CMBWING?.WING_ID,
        CMBOFFICE: CMDROFFICE?.OF_ID,
      }),
    enabled: !!officeId,
  });

  //submit crop damage form
  const {
    mutate,
    isError,
    isPending: isSubmissionPending,
    error: isSubmissionError,
  } = useMutation({
    mutationFn: communication.submitCropDamageForm,
    onSuccess: data => {
      if (Number(data?.RESULT_CODE) === 1) {
        Toast.show({
          type: 'success',
          text1: `${data?.RESULT_MESSAGE}`,
        });
        navigation.navigate('home');
      } else if (Number(data?.RESULT_CODE) === 2) {
        // const serverErrors = data.RESULT_DATA;
        // // Loop through server errors and assign them to form fields
        // Object.keys(serverErrors).forEach(field => {
        //   setError(field, {
        //     type: 'server',
        //     message: serverErrors[field], // Display server validation message
        //   });
        // });
        Toast.show({
          type: 'error',
          text1: `${data?.RESULT_MESSAGE}`,
        });
      } else {
        navigation.navigate('home');
        Toast.show({
          type: 'error',
          text1: `${data?.RESULT_MESSAGE}`,
        });
      }
    },
  });
  const submitForm = data => {
    try {
      if (selectedAnimal?.length === 0 && Number(data?.CROP_TYPE?.id) === 3) {
        Toast.show({
          type: 'error',
          text1: 'Wild Animal is required',
        });
        return;
      }
      if (selectedFruit?.length === 0 && Number(data?.CROP_TYPE?.id) === 3) {
        Toast.show({
          type: 'error',
          text1: 'Fruit is required',
        });
        return;
      }

      if (!CMBVILLAGE?.VILLAGE_ID && !VILLAGETXT) {
        Toast.show({
          type: 'error',
          text1: 'Village Name is required',
        });
        return;
      }
      const date = `${
        new Date(data?.FINCIDENT_DATE)?.getDate() < 10
          ? `0${new Date(data?.FINCIDENT_DATE)?.getDate()}`
          : `${new Date(data?.FINCIDENT_DATE)?.getDate()}`
      }/${
        new Date(data?.FINCIDENT_DATE)?.getMonth() + 1 < 10
          ? `0${new Date(data?.FINCIDENT_DATE)?.getMonth() + 1}`
          : new Date(data?.FINCIDENT_DATE)?.getMonth() + 1
      }/${new Date(data?.FINCIDENT_DATE)?.getFullYear()}`;

      let formData = new FormData();
      if (![undefined, null, '']?.includes(data)) {
        formData.append('TOKENKEY', TOKEN_KEY);
        formData.append('REGISTERED_ID', REGISTERED_ID);
        formData.append('APPLICANT_NAME', data?.APPLICANT_NAME); //marathi
        formData.append('MOBILE_NO', data?.MOBILE_NO);
        formData.append('AADHAAR_NO', data?.AADHAAR_NO);
        formData.append('CROP_TYPE', data?.CROP_TYPE?.id);
        //crop type is pic then this condition will run
        if (Number(data?.CROP_TYPE?.id) === 2) {
          formData.append('CROP_NAME', data?.CROP_NAME);
        }
        formData.append('CROP_FARMER', data?.CROP_FARMER);
        formData.append('ADDRESS', data?.ADDRESS); //marathi
        formData.append('CMBWING', data?.CMBWING?.WING_ID);
        formData.append('CMBDISTRICT', data?.CMBDISTRICT?.DISTRICT_ID);
        formData.append('CMBTALUKA', data?.CMBTALUKA?.TALUKA_ID);
        formData.append('CMDROFFICE', data?.CMDROFFICE?.OF_ID);
        formData.append('FINCIDENT_DATE', date);
        formData.append('BANK_NAME', data?.BANK_NAME);
        formData.append('BANKHOLDER_NAME', data?.BANKHOLDER_NAME); //marathi
        formData.append('ACCOUNT_NO', data?.ACCOUNT_NO);
        formData.append('IFSC_CODE', data?.IFSC_CODE);
        formData.append('BANKPASSBOOK_COPY', BANKPASSBOOK_COPY);
        formData.append('AADHAAR_COPY', AADHAAR_COPY);
        formData.append('NOC_COPY', NOC_COPY);
        formData.append('SATBARACOPY', SATBARACOPY);
        //crop type is falzad then this condition will run
        if (Number(data?.CROP_TYPE?.id) === 3) {
          if (selectedAnimal?.length > 0) {
            selectedAnimal?.forEach((ele, ind) => {
              formData.append('CMBWILDANIMAL', ele?.id);
            });
          }
          if (selectedFruit?.length > 0) {
            selectedFruit?.forEach((ele, ind) => {
              formData.append('CMBFRUITNAME', ele?.id);
            });
          }
        }
        if (data?.VILLAGETXT) {
          formData.append('VILLAGETXT', data?.VILLAGETXT);
        } else {
          formData.append('CMBVILLAGE', data?.CMBVILLAGE?.VILLAGE_ID);
        }
      }
      mutate(formData);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  };
  return (
    <>
      {(isPending || isSubmissionPending) && <Loader />}
      <View style={globalStyle.pageWrapper}>
        <TopHeader
          primaryScreen="Home"
          secondaryScreen="Public Services"
          onPress={() => navigation.goBack()}
          bgColor={colors.white}
        />
        <View style={[globalStyle.screenWrapper, {flex: 0.97}]}>
          <FormCard serviceType={serviceType} />
          {/* <View style={formStyle.languageChangerWrapper}>
            <Text style={formStyle.languageText}>
              मराठी मध्ये लिहीण्याकरीता (अ) यावर क्लिक करा
            </Text>
            <Pressable onPress={() => setIsMarathiLanguage(!isMarathiLanguage)}>
              <Text
                style={[
                  formStyle.languageChanger,
                  {color: isMarathiLanguage ? colors.blue : colors.grey},
                ]}>
                अ?
              </Text>
            </Pressable>
          </View> */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                globalStyle.globalCardWrapper,
                {marginTop: 20, width: '100%', flex: 1},
              ]}>
              <View
                style={[
                  globalStyle.globalCardTitleWrapper,
                  {justifyContent: 'center'},
                ]}>
                <View
                  style={[
                    globalStyle.globalCardTitleOuterCircle,
                    {backgroundColor: colors.orange},
                  ]}>
                  <View style={globalStyle.globalCardTitleInnerCircle}></View>
                </View>
                <Text style={globalStyle.globalCardTitle}>
                  Basic Information (मूलभूत माहिती)
                </Text>
              </View>
              <CustomEngToMarathiInput
                control={control}
                trigger={trigger}
                name="APPLICANT_NAME"
                setValue={setValue}
                rules={{
                  required: 'Applicant Name is required',
                }}
                placeholder="अर्जदाराचे पूर्ण नाव"
                label="Applicant Full Name"
                maxLength={100}
                fontFamily={fontFamily.devanagariRegular}
              />
              <CustomInput
                control={control}
                trigger={trigger}
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
                  pattern: {
                    value: /^[6789]\d{9}$/,
                    message: 'Enter a valid 10-digit mobile number',
                  },
                }}
                placeholder="मोबाईल क्रमांक"
                label="Mobile Number"
                maxLength={10}
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
              />
              <CustomInput
                control={control}
                trigger={trigger}
                name="AADHAAR_NO"
                keyboardType="numeric"
                rules={{
                  required: 'Aadhar Number is required',
                  minLength: {
                    value: 12,
                    message: 'Aadhar Number must be 12 digit',
                  },
                  maxLength: {
                    value: 12,
                    message: 'Aadhar Number must be 12 digit',
                  },
                  pattern: {
                    value: /^\d{12}$/,
                    message: 'Enter a valid 12-digit Aadhaar number',
                  },
                }}
                placeholder="आधार क्रमांक"
                label="Aadhaar Number"
                maxLength={12}
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
              />
              <CustomSelect
                control={control}
                trigger={trigger}
                name="CROP_TYPE"
                displayName="key"
                selectOptions={cropType ?? []}
                rules={{
                  required: 'Crop Type is required',
                }}
                placeholder="नुकसानीचा प्रकार निवडा"
                label="Crop Type"
              />
              {Number(CROP_TYPE?.id) === 2 && (
                <CustomEngToMarathiInput
                  control={control}
                  trigger={trigger}
                  name="CROP_NAME"
                  setValue={setValue}
                  rules={{
                    required: 'Crop Name is required',
                  }}
                  placeholder="पिकाचे नाव प्रविष्ट करा"
                  label="Crop Name"
                  maxLength={100}
                  fontFamily={fontFamily.devanagariRegular}
                />
              )}
              {Number(CROP_TYPE?.id) === 3 && (
                <>
                  <CustomMultiSelect
                    placeholder="प्राण्याचे नाव"
                    label="Wild Animal(Select one or multiple)"
                    displayName="key"
                    value="id"
                    selectOptions={animalArray ?? []}
                    selectedValue={selectedAnimal}
                    state={handleMultiSelectError?.animal}
                    onPress={() =>
                      setHandleMultiSelectError({
                        ...handleMultiSelectError,
                        animal: !handleMultiSelectError.animal,
                      })
                    }
                    onSelect={ele =>
                      setSelectedAnimal(
                        prev =>
                          prev.some(item => item.id === ele.id)
                            ? prev.filter(item => item.id !== ele.id) // Remove if exists
                            : [...prev, ele], // Add if not exists
                      )
                    }
                    fontFamily={
                      isMarathiLanguage
                        ? fontFamily.devanagariRegular
                        : fontFamily.latoRegular
                    }
                  />
                  <CustomMultiSelect
                    placeholder="फळाचे नाव"
                    label="Fruit Name(Select one or multiple)"
                    displayName="key"
                    value="id"
                    selectOptions={fruitArray ?? []}
                    selectedValue={selectedFruit}
                    state={handleMultiSelectError?.fruit}
                    onPress={() =>
                      setHandleMultiSelectError({
                        ...handleMultiSelectError,
                        fruit: !handleMultiSelectError.fruit,
                      })
                    }
                    onSelect={ele =>
                      setSelectedFruit(
                        prev =>
                          prev.some(item => item.id === ele.id)
                            ? prev.filter(item => item.id !== ele.id) // Remove if exists
                            : [...prev, ele], // Add if not exists
                      )
                    }
                    fontFamily={
                      isMarathiLanguage
                        ? fontFamily.devanagariRegular
                        : fontFamily.latoRegular
                    }
                  />
                </>
              )}
              <CustomEngToMarathiInput
                control={control}
                trigger={trigger}
                name="CROP_FARMER"
                setValue={setValue}
                rules={{
                  required: 'Former Name is required',
                }}
                placeholder="शेतकऱ्याचे नाव"
                label="Name of the farmer"
                maxLength={100}
                fontFamily={fontFamily.devanagariRegular}
              />
              <CustomSelect
                control={control}
                trigger={trigger}
                name="CMBWING"
                displayName="WING_NAME"
                selectOptions={wingList?.RESULT_DATA ?? []}
                rules={{
                  required: 'Forest Wing is required',
                }}
                placeholder="विंग निवडा"
                label="Forest Wing(विंग)"
              />
              <CustomSelect
                control={control}
                trigger={trigger}
                name="CMBDISTRICT"
                displayName="DISTRICT_NAME"
                selectOptions={districtList?.RESULT_DATA ?? []}
                rules={{
                  required: 'District is required',
                }}
                placeholder="जिल्हा निवडा"
                label="District"
              />
              <CustomSelect
                control={control}
                trigger={trigger}
                name="CMBTALUKA"
                displayName="TALUKA_NAME"
                selectOptions={talukaList?.RESULT_DATA ?? []}
                rules={{
                  required: 'Taluka is required',
                }}
                placeholder="तालुका निवडा"
                label="Taluka"
              />
              <CustomSelect
                control={control}
                trigger={trigger}
                name="CMDROFFICE"
                displayName="OF_NAME"
                selectOptions={officeList?.RESULT_DATA ?? []}
                rules={{
                  required: 'Range is required',
                }}
                placeholder="वनपरिक्षेत्र निवडा"
                label="Range(वनपरिक्षेत्र)"
              />
              {/* {[undefined, null, '']?.includes(VILLAGETXT) && ( */}
              <CustomSelect
                control={control}
                trigger={trigger}
                name="CMBVILLAGE"
                displayName="VILLAGE_NAME"
                selectOptions={villageList?.RESULT_DATA ?? []}
                // rules={{
                //   required: CMBVILLAGE ? false : 'Village is required',
                // }}
                placeholder="गाव निवडा"
                label="Village(If Village not exist then enter village name)"
              />
              {/* )} */}
              {/* {[undefined, null, '']?.includes(CMBVILLAGE) && ( */}
              <CustomInput
                control={control}
                trigger={trigger}
                name="VILLAGETXT"
                // rules={{
                //   required: ![undefined, null, '']?.includes(CMBVILLAGE)
                //     ? false
                //     : 'Village is required',
                // }}
                placeholder="गाव निवडा"
                label="Village Name"
                maxLength={50}
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
              />
              {/* )} */}
              <CustomEngToMarathiInput
                control={control}
                trigger={trigger}
                name="ADDRESS"
                setValue={setValue}
                rules={{
                  required: 'Address is required',
                }}
                placeholder="पत्ता प्रविष्ट करा"
                label="Address"
                maxLength={250}
                fontFamily={fontFamily.devanagariRegular}
              />
              <CustomDatePicker
                control={control}
                trigger={trigger}
                name="FINCIDENT_DATE"
                modalState={dateStates?.date}
                openModal={() => setDateStates(prev => ({...prev, date: true}))}
                closeModal={() =>
                  setDateStates(prev => ({...prev, date: false}))
                }
                rules={{
                  required: 'Incident Date is required',
                }}
                placeholder="घटनेची तारीख dd/mm/yyyy मधील तारीख"
                label="Incident Date"
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
              />
            </View>
            {/*======Bank Details======*/}
            <View
              style={[
                globalStyle.globalCardWrapper,
                {marginTop: 20, width: '100%', flex: 1},
              ]}>
              <View
                style={[
                  globalStyle.globalCardTitleWrapper,
                  {justifyContent: 'center'},
                ]}>
                <View
                  style={[
                    globalStyle.globalCardTitleOuterCircle,
                    {backgroundColor: colors.orange},
                  ]}>
                  <View style={globalStyle.globalCardTitleInnerCircle}></View>
                </View>
                <Text style={globalStyle.globalCardTitle}>
                  Bank Details (बँक तपशील)
                </Text>
              </View>
              <CustomInput
                control={control}
                trigger={trigger}
                name="BANK_NAME"
                rules={{
                  required: 'Bank Name is required',
                }}
                placeholder="बँकेचे नाव"
                label="Bank Name(Only English Alphabets)"
                maxLength={20}
              />
              <CustomEngToMarathiInput
                control={control}
                trigger={trigger}
                name="BANKHOLDER_NAME"
                setValue={setValue}
                rules={{
                  required: 'Bank Holder Name is required',
                }}
                placeholder="खातेधारकाचे नाव"
                label="Account Holder Name"
                maxLength={100}
                fontFamily={fontFamily.devanagariRegular}
              />
              <CustomInput
                control={control}
                trigger={trigger}
                keyboardType="numeric"
                name="ACCOUNT_NO"
                rules={{
                  required: 'Account Number is required',
                  pattern: {
                    value: /^\d{9,18}$/,
                    message: 'Enter a valid account number',
                  },
                }}
                minLength={9}
                maxLength={18}
                placeholder="खाते क्रमांक"
                label="Account Number"
              />
              <CustomInput
                control={control}
                trigger={trigger}
                name="IFSC_CODE"
                rules={{
                  required: 'IFSC Code is required',
                  pattern: {
                    value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                    message: 'Invalid IFSC Code format',
                  },
                  minLength: {
                    value: 11,
                    message: 'IFSC Code must be 11 characters',
                  },
                  maxLength: {
                    value: 11,
                    message: 'IFSC Code must be 11 characters',
                  },
                }}
                placeholder="IFSC कोड"
                label="IFSC Code"
              />
            </View>
            {/*======Documents Required======*/}
            <View
              style={[
                globalStyle.globalCardWrapper,
                {marginTop: 20, width: '100%', flex: 1},
              ]}>
              <View
                style={[
                  globalStyle.globalCardTitleWrapper,
                  {justifyContent: 'center'},
                ]}>
                <View
                  style={[
                    globalStyle.globalCardTitleOuterCircle,
                    {backgroundColor: colors.orange},
                  ]}>
                  <View style={globalStyle.globalCardTitleInnerCircle}></View>
                </View>
                <Text style={globalStyle.globalCardTitle}>
                  Documents Required (आवश्यक कागदपत्)
                </Text>
              </View>
              <CustomFileUpload
                control={control}
                trigger={trigger}
                setValue={setValue}
                fileName={BANKPASSBOOK_COPY?.name}
                name="BANKPASSBOOK_COPY"
                label="Bank Passbook Copy (बँक पासबुक कॉपी)"
                note="Choose Valid .pdf file with a maximum size of 20MB."
                rules={{
                  required: 'Passbook Copy is required',
                }}
              />
              <CustomFileUpload
                control={control}
                trigger={trigger}
                setValue={setValue}
                fileName={AADHAAR_COPY?.name}
                name="AADHAAR_COPY"
                label="Aadhar Copy (आधार कॉपी)"
                note="Choose Valid .pdf file with a maximum size of 20MB."
                rules={{
                  required: 'Aadhar Copy is required',
                }}
              />
              <CustomFileUpload
                control={control}
                trigger={trigger}
                setValue={setValue}
                fileName={NOC_COPY?.name}
                name="NOC_COPY"
                label="NOC Copy (एनओसी कॉपी)"
                note="Choose Valid .pdf file with a maximum size of 20MB."
                rules={{
                  required: 'NOC Copy is required',
                }}
              />
              <CustomFileUpload
                control={control}
                trigger={trigger}
                setValue={setValue}
                fileName={SATBARACOPY?.name}
                name="SATBARACOPY"
                label="7/12 Copy (7/12 कॉपी)"
                note="Choose Valid .pdf file with a maximum size of 20MB."
                rules={{
                  required: '7/12 Copy is required',
                }}
              />
            </View>
            <View
              style={[
                globalStyle.globalCardWrapper,
                {marginTop: 20, width: '100%', flex: 1},
              ]}>
              <CustomInput
                control={control}
                trigger={trigger}
                name="captcha"
                keyboardType="numeric"
                rules={{
                  required: 'Captch is required',
                  validate: val => {
                    if (Number(verifyCaptchaValue) != Number(val)) {
                      return 'Inter valid captcha';
                    }
                  },
                }}
                placeholder="कॅप्चा प्रविष्ट करा"
                label="Captcha (कॅप्चा)"
              />
              <View style={formStyle.captchaWrapper}>
                <View style={formStyle.captcha}>
                  <ImageBackground
                    source={images.captchaImg}
                    style={formStyle.captchaBg}>
                    <Text style={[formStyle.captchaText, formStyle.one]}>
                      {captchaValue[0]}
                    </Text>
                    <Text style={[formStyle.captchaText, formStyle.two]}>
                      {captchaValue[1]}
                    </Text>
                    <Text style={[formStyle.captchaText, formStyle.three]}>
                      {captchaValue[2]}
                    </Text>
                    <Text style={[formStyle.captchaText, formStyle.four]}>
                      {captchaValue[3]}
                    </Text>
                    <Text style={[formStyle.captchaText, formStyle.five]}>
                      {captchaValue[4]}
                    </Text>
                  </ImageBackground>
                </View>
                <Pressable
                  onPress={() => setReloadCaptcha(!reloadCaptcha)}
                  style={formStyle.reloadButton}>
                  <Icon
                    type="Ionicons"
                    name="reload"
                    style={{color: colors.blue}}
                  />
                </Pressable>
              </View>
              <GradientButton
                text="Submit"
                onPress={handleSubmit(submitForm)}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default CropDamageForm;
