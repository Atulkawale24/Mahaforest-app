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
import CustomRadio from '../../../../common-components/CustomRadio';
import {useMutation, useQuery} from '@tanstack/react-query';
import {communication} from '../../../../services/communication';
import {TOKEN_KEY} from '@env';
import {storage} from '../../../../store/mmkvInstance';
import {injuryTypes} from '../../../../utilities/injuryTypes';
import {ageArray} from '../../../../utilities/ageArray';
import {maritalStatus} from '../../../../utilities/maritalStatus';
import {
  nomineeType,
  nomineeTypeForFemaleMarried,
  nomineeTypeForMaleAndFemaleMarried,
  nomineeTypeForMaleAndFemaleUnmarried,
} from '../../../../utilities/nomineeType';
import {incidentTime} from '../../../../utilities/incidentTime';
import {incidentDuration} from '../../../../utilities/incidentDuration';
import Loader from '../../../../common-components/Loader';
import Toast from 'react-native-toast-message';
import CustomEngToMarathiInput from '../../../../common-components/CustomEngToMarathiInput';
import {genderArray} from '../../../../utilities/genderArray';

const HumanDeath = ({navigation, route}) => {
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
  const [filteredNominee, setFilteredNominee] = useState();

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
  const GENDER = watch('GENDER');
  const CMBWING = watch('CMBWING');
  const CMBDISTRICT = watch('CMBDISTRICT');
  const CMDROFFICE = watch('CMDROFFICE');
  const CMBVILLAGE = watch('CMBVILLAGE');
  const NOMINEE_TYPE = watch('NOMINEE_TYPE');
  const VILLAGETXT = watch('VILLAGETXT');
  const INJURY_TYPE = watch('INJURY_TYPE');
  const MARITAL_STATUS = watch('MARITAL_STATUS');

  useEffect(() => {
    if (
      ['male', 'female']?.includes(GENDER?.value?.toLowerCase()) &&
      MARITAL_STATUS?.value?.toLowerCase() === 'unmarried'
    ) {
      setFilteredNominee(nomineeTypeForMaleAndFemaleUnmarried);
    } else if (
      ['female']?.includes(GENDER?.value?.toLowerCase()) &&
      MARITAL_STATUS?.value?.toLowerCase() !== 'unmarried'
    ) {
      setFilteredNominee(nomineeTypeForFemaleMarried);
    } else {
      setFilteredNominee(nomineeTypeForMaleAndFemaleMarried);
    }
  }, [GENDER, MARITAL_STATUS]);

  useEffect(() => {
    if (Number(INJURY_TYPE?.id) !== 1) {
      setValue('NOMINEE_TYPE', '');
      setValue('NOMINEE_NAME', '');
      setValue('NOMINEE_RELATION', '');
    }
  }, [INJURY_TYPE]);

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

  useEffect(() => {
    if (Number(NOMINEE_TYPE?.id) !== 5) {
      setValue('NOMINEE_RELATION', NOMINEE_TYPE);
    }
  }, [NOMINEE_TYPE]);
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

  //submit human death form
  const {
    mutate,
    isError,
    isPending: isSubmissionPending,
    error: isSubmissionError,
  } = useMutation({
    mutationFn: communication.submitHumanDeathForm,
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
      if (!CMBVILLAGE?.VILLAGE_ID && !VILLAGETXT) {
        Toast.show({
          type: 'error',
          text1: 'Village Name is required',
        });
        return;
      }
      const date = `${
        new Date(data?.INJURED_DATE)?.getDate() < 10
          ? `0${new Date(data?.INJURED_DATE)?.getDate()}`
          : `${new Date(data?.INJURED_DATE)?.getDate()}`
      }/${
        new Date(data?.INJURED_DATE)?.getMonth() + 1 < 10
          ? `0${new Date(data?.INJURED_DATE)?.getMonth() + 1}`
          : new Date(data?.INJURED_DATE)?.getMonth() + 1
      }/${new Date(data?.INJURED_DATE)?.getFullYear()}`;

      let formData = new FormData();
      if (![undefined, null, '']?.includes(data)) {
        formData.append('TOKENKEY', TOKEN_KEY);
        formData.append('REGISTERED_ID', REGISTERED_ID);
        formData.append('APPLICANT_NAME', data?.APPLICANT_NAME); //marathi
        formData.append('MOBILE_NO', data?.MOBILE_NO);
        formData.append('AADHAAR_NO', data?.AADHAAR_NO);
        formData.append('INJURY_TYPE', data?.INJURY_TYPE?.id);
        formData.append('INJURED_NAME', data?.INJURED_NAME); //marathi
        formData.append('GENDER', data?.GENDER?.value);
        formData.append('INJURED_AGE', data?.INJURED_AGE);
        formData.append('MARITAL_STATUS', data?.MARITAL_STATUS?.value);
        formData.append('ADDRESS', data?.ADDRESS); //marathi
        if (Number(data?.INJURY_TYPE?.id) === 1) {
          formData.append('NOMINEE_TYPE', data?.NOMINEE_TYPE?.id);
          formData.append('NOMINEE_NAME', data?.NOMINEE_NAME); //marathi
          formData.append('NOMINEE_RELATION', data?.NOMINEE_RELATION?.type);
        }
        formData.append('CMBWING', data?.CMBWING?.WING_ID);
        formData.append('CMBDISTRICT', data?.CMBDISTRICT?.DISTRICT_ID);
        formData.append('CMBTALUKA', data?.CMBTALUKA?.TALUKA_ID);
        formData.append('CMDROFFICE', data?.CMDROFFICE?.OF_ID);
        formData.append('INJURED_DATE', date);
        formData.append('INJURED_TIME', data?.INJURED_TIME);
        formData.append('INJURED_TIMEBTWN', data?.INJURED_TIMEBTWN);
        formData.append('INCIDENT_PLACE', data?.INCIDENT_PLACE); //marathi
        formData.append('BANK_NAME', data?.BANK_NAME);
        formData.append('BANKHOLDER_NAME', data?.BANKHOLDER_NAME); //marathi
        formData.append('ACCOUNT_NO', data?.ACCOUNT_NO);
        formData.append('IFSC_CODE', data?.IFSC_CODE);
        formData.append('BANKPASSBOOK_COPY', BANKPASSBOOK_COPY);
        formData.append('AADHAAR_COPY', AADHAAR_COPY);
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
                maxLength={10}
                placeholder="मोबाईल क्रमांक"
                label="Mobile Number"
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
                label="Aadhar Number"
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
                name="INJURY_TYPE"
                displayName="type"
                selectOptions={injuryTypes ?? []}
                rules={{
                  required: 'Injury Type is required',
                }}
                placeholder="दुखापतीचा प्रकार निवडा"
                label="Type of Injury"
              />
              <CustomEngToMarathiInput
                control={control}
                trigger={trigger}
                name="INJURED_NAME"
                setValue={setValue}
                rules={{
                  required: 'Injured Person Name is required',
                }}
                placeholder="जखमी/मृत व्यक्तीचे नाव"
                label="Name of injured/ dead person"
                maxLength={100}
                fontFamily={fontFamily.devanagariRegular}
              />
              <CustomRadio
                control={control}
                trigger={trigger}
                setValue={setValue}
                selectedValue={GENDER?.value}
                displayName="key"
                name="GENDER"
                rules={{
                  required: 'Gender is required',
                }}
                label="Gender (लिंग)"
                options={genderArray ?? []}
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
              />
              <CustomSelect
                control={control}
                trigger={trigger}
                name="INJURED_AGE"
                selectOptions={ageArray ?? []}
                rules={{
                  required: 'Age is required',
                }}
                placeholder="वय निवडा"
                label="Age"
              />
              <CustomSelect
                control={control}
                trigger={trigger}
                name="MARITAL_STATUS"
                displayName="key"
                selectOptions={maritalStatus ?? []}
                rules={{
                  required: 'Marital Status is required',
                }}
                placeholder="वैवाहिक स्थिती निवडा"
                label=" Marital Status"
              />
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
              {Number(INJURY_TYPE?.id) === 1 && (
                <>
                  <CustomSelect
                    control={control}
                    trigger={trigger}
                    name="NOMINEE_TYPE"
                    displayName="type"
                    selectOptions={filteredNominee ?? []}
                    rules={{
                      required: 'Nominee Type is required',
                    }}
                    placeholder="Select Nominee"
                    label="Nominee Type"
                  />
                  <CustomEngToMarathiInput
                    control={control}
                    trigger={trigger}
                    name="NOMINEE_NAME"
                    setValue={setValue}
                    rules={{
                      required: 'Nominee Name is required',
                    }}
                    placeholder="वारसदाराचे नाव"
                    label="Nominee Name"
                    maxLength={100}
                    fontFamily={fontFamily.devanagariRegular}
                  />
                  {Number(NOMINEE_TYPE?.id) !== 5 ? (
                    <CustomSelect
                      control={control}
                      name="NOMINEE_RELATION"
                      displayName="type"
                      selectOptions={nomineeType ?? []}
                      // rules={{
                      //   required: 'Nominee Name is required',
                      // }}
                      placeholder="वारसदाराशी संबंध"
                      label="Nominee Relation"
                      disabled={true}
                    />
                  ) : (
                    <CustomEngToMarathiInput
                      control={control}
                      trigger={trigger}
                      name="NOMINEE_RELATION"
                      setValue={setValue}
                      rules={{
                        required: 'Nominee Relation is required',
                      }}
                      placeholder="नामनि संबंध"
                      label="Nominee Relation"
                      maxLength={100}
                      fontFamily={fontFamily.devanagariRegular}
                    />
                  )}
                </>
              )}
              {/* <CustomInput
                control={control}
                name="NOMINEE_RELATION"
                displayName="type"
                rules={{
                  required: 'Nominee Name is required',
                }}
                placeholder="नामनि संबंध"
                label="Nominee Relation (नामनि संबंध)*"
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
                editable={false}
              /> */}
              <CustomSelect
                control={control}
                trigger={trigger}
                name="CMBWING"
                displayName="WING_NAME"
                selectOptions={wingList?.RESULT_DATA ?? []}
                rules={{
                  required: 'Wing is required',
                }}
                placeholder="विंग निवडा"
                label="Forest Wing"
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
                //   required: VILLAGETXT ? false : 'Village is required',
                // }}
                placeholder="गाव निवडा"
                label="Village(गाव) If Village not exist then enter village name
(गाव अस्तित्वात नसल्यास गावाचे नाव टाका)"
              />
              {/* )} */}
              {/* {[undefined, null, '']?.includes(c) && ( */}
              <CustomInput
                control={control}
                trigger={trigger}
                name="VILLAGETXT"
                // rules={{
                //   required: ![undefined, null, '']?.includes(VILLAGETXT)
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
            </View>
            {/*======Incident Details======*/}
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
                  Incident Details (घटनेचे तपशील)
                </Text>
              </View>
              <CustomDatePicker
                control={control}
                trigger={trigger}
                name="INJURED_DATE"
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
              <CustomSelect
                control={control}
                trigger={trigger}
                name="INJURED_TIME"
                selectOptions={incidentTime ?? []}
                rules={{
                  required: 'Incident Time is required',
                }}
                placeholder="घटनेची वेळ"
                label="Incident Time"
              />
              <CustomSelect
                control={control}
                trigger={trigger}
                name="INJURED_TIMEBTWN"
                selectOptions={incidentDuration ?? []}
                rules={{
                  required: 'Duration is required',
                }}
                placeholder="घटनेचा कालावधी निवडा"
                label="Incident Duration"
              />
              <CustomEngToMarathiInput
                control={control}
                trigger={trigger}
                name="INCIDENT_PLACE"
                setValue={setValue}
                rules={{
                  required: 'Incident Place is required',
                }}
                placeholder="घटनेचे ठिकाण प्रविष्ट करा"
                label="Incident Place"
                maxLength={50}
                fontFamily={fontFamily.devanagariRegular}
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
                maxLength={20}
                label="Bank Name(Only English Alphabets)"
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
                label="Captcha"
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

export default HumanDeath;
