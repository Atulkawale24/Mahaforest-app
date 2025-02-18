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
import {lossOfLivestockArray} from '../../../../utilities/lossOfLivestockArray';
import {useMutation, useQuery} from '@tanstack/react-query';
import {communication} from '../../../../services/communication';
import {TOKEN_KEY} from '@env';
import {storage} from '../../../../store/mmkvInstance';
import Toast from 'react-native-toast-message';
import Loader from '../../../../common-components/Loader';
import {incidentDuration} from '../../../../utilities/incidentDuration';
import {incidentTime} from '../../../../utilities/incidentTime';
import {animalPrajati} from '../../../../utilities/animalPrajati';
import CustomEngToMarathiInput from '../../../../common-components/CustomEngToMarathiInput';

const CattleKillForm = ({navigation, route}) => {
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
  const {control, handleSubmit, setValue, watch, getValues} = useForm();
  // Fetch wing list
  const {
    data: wingList,
    isPending,
    error,
  } = useQuery({
    queryKey: ['wing-list'],
    queryFn: () => communication.getMasterData({TOKEN_KEY, MASTERID: 1}),
  });
  console.log('REGISTERED_ID', REGISTERED_ID);

  const BANKPASSBOOK_COPY = watch('BANKPASSBOOK_COPY');
  const AADHAAR_COPY = watch('AADHAAR_COPY');
  const SATBARACOPY = watch('SATBARACOPY');
  const CATTLE_COPY = watch('CATTLE_COPY');
  const GRAZING_COPY = watch('GRAZING_COPY');
  const PASHU_INJURY_TYPE = watch('PASHU_INJURY_TYPE');
  const CMBWING = watch('CMBWING');
  const CMBDISTRICT = watch('CMBDISTRICT');
  const CMBOFFICE = watch('CMBOFFICE');
  const CMBVILLAGE = watch('CMBVILLAGE');

  const [pashuInjuryType, setPashuInjuryType] = useState([]);
  useEffect(() => {
    if (CMBDISTRICT) {
      setDistrictId(CMBDISTRICT?.DISTRICT_ID);
    }
  }, [CMBDISTRICT]);

  useEffect(() => {
    if (CMBOFFICE) {
      setOfficeId(CMBOFFICE?.OF_ID);
    }
  }, [CMBOFFICE]);

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
        CMBOFFICE: CMBOFFICE?.OF_ID,
      }),
    enabled: !!officeId,
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

  const {
    mutate,
    isError,
    isPending: isSubmissionPending,
    error: isSubmissionError,
  } = useMutation({
    mutationFn: communication.submitCattleKillForm,
    onSuccess: data => {
      if (Number(data?.RESULT_CODE) === 1) {
        Toast.show({
          type: 'success',
          text1: `${data?.RESULT_MESSAGE}`,
        });
        navigation.navigate('home');
      } else {
        Toast.show({
          type: 'error',
          text1: `${data?.RESULT_MESSAGE}`,
        });
      }
    },
  });

  const submitForm = data => {
    try {
      if (pashuInjuryType?.length === 0) {
        Toast.show({
          type: 'error',
          text1: `Injury Type is required`,
        });
        return;
      }
      const date = `${
        new Date(data?.DINCIDENT_DATE)?.getDate() < 10
          ? `0${new Date(data?.DINCIDENT_DATE)?.getDate()}`
          : `${new Date(data?.DINCIDENT_DATE)?.getDate()}`
      }/${
        new Date(data?.DINCIDENT_DATE)?.getMonth() + 1 < 10
          ? `0${new Date(data?.DINCIDENT_DATE)?.getMonth() + 1}`
          : new Date(data?.DINCIDENT_DATE)?.getMonth() + 1
      }/${new Date(data?.DINCIDENT_DATE)?.getFullYear()}`;

      let formData = new FormData();
      if (![undefined, null, '']?.includes(data)) {
        formData.append('TOKENKEY', TOKEN_KEY);
        formData.append('REGISTERED_ID', REGISTERED_ID);
        formData.append('APPLICANT_NAME', data?.APPLICANT_NAME);
        formData.append('MOBILE_NO', data?.MOBILE_NO);
        formData.append('AADHAAR_NO', data?.AADHAAR_NO);
        formData.append('NAME_ANIMAL_OWNER', data?.NAME_ANIMAL_OWNER);
        formData.append('CMBWING', data?.CMBWING?.WING_ID);
        formData.append('CMBDISTRICT', data?.CMBDISTRICT?.DISTRICT_ID);
        formData.append('CMBTALUKA', data?.CMBTALUKA?.TALUKA_ID);
        formData.append('CMDROFFICE', data?.CMBOFFICE?.OF_ID);
        formData.append('ADDRESS', data?.ADDRESS);
        formData.append('ANIMAL_PRAJATI', data?.ANIMAL_PRAJATI?.id);
        formData.append('DINCIDENT_DATE', date);
        formData.append('INCIDENT_TIME', data?.INCIDENT_TIME);
        formData.append('INCIDENT_TIMEBTWN', data?.INCIDENT_TIMEBTWN);
        formData.append('INCIDENT_PLACE', data?.INCIDENT_PLACE);
        formData.append('BANK_NAME', data?.BANK_NAME);
        formData.append('BANKHOLDER_NAME', data?.BANKHOLDER_NAME);
        formData.append('ACCOUNT_NO', data?.ACCOUNT_NO);
        formData.append('IFSC_CODE', data?.IFSC_CODE);
        formData.append('BANKPASSBOOK_COPY', BANKPASSBOOK_COPY);
        formData.append('AADHAAR_COPY', AADHAAR_COPY);
        formData.append('SATBARACOPY', SATBARACOPY);
        if (data?.CMBVILLAGE?.VILLAGE_ID) {
          formData.append('CMBVILLAGE', data?.CMBVILLAGE?.VILLAGE_ID);
        }
        if (data?.VILLAGETXT) {
          formData.append('VILLAGETXT', data?.VILLAGETXT);
        }
        if (pashuInjuryType?.length > 0)
          pashuInjuryType?.forEach((ele, ind) => {
            formData.append('PASHU_INJURY_TYPE[]', ele);
          });
        if (CATTLE_COPY?.uri) {
          formData.append('CATTLE_COPY', CATTLE_COPY);
        }
        if (GRAZING_COPY?.uri) {
          formData.append('GRAZING_COPY', GRAZING_COPY);
        }
      }
      console.log('cattle kill', formData);
      // return;
      mutate(formData);
    } catch (error) {
      Alert.alert(error?.message);
    }
  };
  return (
    <>
      {isPending || (isSubmissionPending && <Loader />)}
      <View style={globalStyle.pageWrapper}>
        <TopHeader
          primaryScreen="Home"
          secondaryScreen="Public Services"
          onPress={() => navigation.goBack()}
          bgColor={colors.white}
        />
        <View style={[globalStyle.screenWrapper, {flex: 0.97}]}>
          <FormCard serviceType={serviceType} />
          <View style={formStyle.languageChangerWrapper}>
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
          </View>
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
                name="APPLICANT_NAME"
                setValue={setValue}
                rules={{
                  required: 'Applicant Name is required',
                }}
                placeholder="अर्जदाराचे पूर्ण नाव"
                label="Applicant Full Name (अर्जदाराचे पूर्ण नाव)*"
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
              />
              {/* <CustomInput
                control={control}
                name="APPLICANT_NAME"
                rules={{
                  required: 'Applicant Name is required',
                }}
                placeholder="अर्जदाराचे पूर्ण नाव"
                label="Applicant Full Name (अर्जदाराचे पूर्ण नाव)*"
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
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
                placeholder="मोबाईल नंबर"
                label="Mobile Number (मोबाईल नंबर)*"
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
              />
              <CustomInput
                control={control}
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
                }}
                placeholder="आधार क्रमांक"
                label="Aadhar Number (आधार क्रमांक)*"
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
              />
              <CustomEngToMarathiInput
                control={control}
                name="NAME_ANIMAL_OWNER"
                setValue={setValue}
                rules={{
                  required: 'Animal Owner Name is required',
                }}
                placeholder="प्राणी मालकाचे नाव"
                label="Name of animal owner (प्राणी मालकाचे नाव)*"
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
              />
              <CustomSelect
                control={control}
                name="CMBWING"
                displayName="WING_NAME"
                selectOptions={wingList?.RESULT_DATA ?? []}
                rules={{
                  required: 'Wing is required',
                }}
                placeholder="विंग निवडा"
                label="Wing(विंग)*"
              />
              <CustomSelect
                control={control}
                name="CMBDISTRICT"
                displayName="DISTRICT_NAME"
                selectOptions={districtList?.RESULT_DATA ?? []}
                rules={{
                  required: 'District is required',
                }}
                placeholder="जिल्हा निवडा"
                label="District(जिल्हा)*"
              />
              <CustomSelect
                control={control}
                name="CMBTALUKA"
                displayName="TALUKA_NAME"
                selectOptions={talukaList?.RESULT_DATA ?? []}
                rules={{
                  required: 'Taluka is required',
                }}
                placeholder="तालुका निवडा"
                label="Taluka(तालुका)*"
              />
              <CustomSelect
                control={control}
                name="CMBOFFICE"
                displayName="OF_NAME"
                selectOptions={officeList?.RESULT_DATA ?? []}
                rules={{
                  required: 'Range is required',
                }}
                placeholder="श्रेणी निवडा"
                label="Range(श्रेणी)*"
              />
              <CustomSelect
                control={control}
                name="CMBVILLAGE"
                displayName="VILLAGE_NAME"
                selectOptions={villageList?.RESULT_DATA ?? []}
                // rules={{
                //   required: 'Village is required',
                // }}
                placeholder="गाव निवडा"
                label="Village(गाव)* If Village not exist then enter village name
(गाव अस्तित्वात नसल्यास गावाचे नाव टाका)"
              />
              {/* {[undefined, null, '']?.includes(CMBVILLAGE) && ( */}
              <CustomInput
                control={control}
                name="VILLAGETXT"
                rules={{
                  required: 'Village is required',
                }}
                placeholder="गाव निवडा"
                label="Village (गाव)*"
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
              />
              {/* )} */}
              <CustomEngToMarathiInput
                control={control}
                name="ADDRESS"
                setValue={setValue}
                rules={{
                  required: 'Address is required',
                }}
                placeholder="पत्ता प्रविष्ट करा"
                label="Address (पत्ता)*"
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
              />
              <CustomSelect
                control={control}
                name="ANIMAL_PRAJATI"
                displayName="name"
                selectOptions={animalPrajati ?? []}
                rules={{
                  required: 'Animal Species is required',
                }}
                placeholder="प्राण्यांच्या प्रजाती निवडा"
                label="Animal Species(प्राण्यांच्या प्रजाती)*"
              />
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
                name="DINCIDENT_DATE"
                modalState={dateStates?.date}
                openModal={() => setDateStates(prev => ({...prev, date: true}))}
                closeModal={() =>
                  setDateStates(prev => ({...prev, date: false}))
                }
                rules={{
                  required: 'Incident Date is required',
                }}
                placeholder="घटनेची तारीख dd/mm/yyyy मधील तारीख"
                label="Incident Date (घटनेची तारीख)*"
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
              />
              <CustomSelect
                control={control}
                name="INCIDENT_TIME"
                selectOptions={incidentTime ?? []}
                rules={{
                  required: 'Incident Time is required',
                }}
                placeholder="घटनेची वेळ"
                label="Incident Time (घटनेची वेळ)*"
              />
              {/* <CustomDatePicker
                control={control}
                name="INCIDENT_TIME"
                mode="time"
                modalState={dateStates?.time}
                openModal={() => setDateStates(prev => ({...prev, time: true}))}
                closeModal={() =>
                  setDateStates(prev => ({...prev, time: false}))
                }
                rules={{
                  required: 'Incident Time is required',
                }}
                placeholder="घटनेची वेळ"
                label="Incident Time (घटनेची वेळ)*"
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
              /> */}
              <CustomSelect
                control={control}
                name="INCIDENT_TIMEBTWN"
                selectOptions={incidentDuration ?? []}
                rules={{
                  required: 'Duration is required',
                }}
                placeholder="घटनेचा कालावधी निवडा"
                label="Incident Duration(घटनेचा कालावधी)*"
              />
              <CustomEngToMarathiInput
                control={control}
                name="INCIDENT_PLACE"
                setValue={setValue}
                rules={{
                  required: 'Incident Place is required',
                }}
                placeholder="घटनेचे ठिकाण प्रविष्ट करा"
                label="Incident Place (घटनेचे ठिकाण)*"
                fontFamily={
                  isMarathiLanguage
                    ? fontFamily.devanagariRegular
                    : fontFamily.latoRegular
                }
              />
              <View style={formStyle.checkBoxMain}>
                <Text style={formStyle.checkBoxLabel}>
                  पशुधनाचे नुकसान कशामुळे झाले ?
                </Text>
                {lossOfLivestockArray?.map((ele, index) => {
                  return (
                    <Pressable
                      onPress={() =>
                        // setValue('PASHU_INJURY_TYPE', ele?.id)
                        setPashuInjuryType(
                          pashuInjuryType?.find((elem, ind) => elem === ele?.id)
                            ? pashuInjuryType?.filter(
                                (item, ind) => ind !== index,
                              )
                            : [...pashuInjuryType, ele?.id],
                        )
                      }
                      style={formStyle.checkBoxWrapper}
                      key={index}>
                      <Icon
                        type="MaterialCommunityIcons"
                        name={
                          pashuInjuryType?.find((elem, ind) => elem === ele?.id)
                            ? // PASHU_INJURY_TYPE === ele
                              'checkbox-marked'
                            : 'checkbox-blank-outline'
                        }
                        style={[
                          formStyle.checkBox,
                          {
                            color: pashuInjuryType?.find(
                              (elem, ind) => elem === ele?.id,
                            )
                              ? // PASHU_INJURY_TYPE === ele
                                colors.blue
                              : colors.grey,
                          },
                        ]}
                      />
                      <Text
                        style={[
                          formStyle.checkBoxText,
                          {
                            color:
                              PASHU_INJURY_TYPE === ele
                                ? colors.blue
                                : colors.grey,
                          },
                        ]}>
                        {ele?.type}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
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
                name="BANK_NAME"
                rules={{
                  required: 'Bank Name is required',
                }}
                placeholder="बँकेचे नाव"
                label="Bank Name (बँकेचे नाव)*(Only English Alphabets)*"
              />
              <CustomEngToMarathiInput
                control={control}
                name="BANKHOLDER_NAME"
                setValue={setValue}
                rules={{
                  required: 'Bank Holder Name is required',
                }}
                placeholder="खातेधारकाचे नाव"
                label="Account Holder Name (खातेधारकाचे नाव)*"
              />
              <CustomInput
                control={control}
                keyboardType="numeric"
                name="ACCOUNT_NO"
                rules={{
                  required: 'Account Number is required',
                }}
                placeholder="खाते क्रमांक"
                label="Account Number (खाते क्रमांक)*"
              />
              <CustomInput
                control={control}
                name="IFSC_CODE"
                rules={{
                  required: 'IFSC Code is required',
                }}
                placeholder="IFSC कोड"
                label="IFSC Code (IFSC कोड)*"
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
                setValue={setValue}
                fileName={BANKPASSBOOK_COPY?.name}
                name="BANKPASSBOOK_COPY"
                label="Bank Passbook Copy (बँक पासबुक कॉपी)*"
                note="Choose Valid .pdf File"
                rules={{
                  required: 'Passbook Copy is required',
                }}
              />
              <CustomFileUpload
                control={control}
                setValue={setValue}
                fileName={AADHAAR_COPY?.name}
                name="AADHAAR_COPY"
                label="Aadhar Copy (आधार कॉपी)*"
                note="Choose Valid .pdf File"
                rules={{
                  required: 'Aadhar Copy is required',
                }}
              />
              <CustomFileUpload
                control={control}
                setValue={setValue}
                fileName={SATBARACOPY?.name}
                name="SATBARACOPY"
                label="7/12 Copy (7/12 कॉपी)*"
                note="Choose Valid .pdf File"
                rules={{
                  required: '7/12 Copy is required',
                }}
              />
              <CustomFileUpload
                control={control}
                setValue={setValue}
                fileName={CATTLE_COPY?.name}
                name="CATTLE_COPY"
                label="Cattle Tag Certificate (कॅटल टॅग प्रमाणपत्र)"
                note="Choose Valid .pdf File"
                // rules={{
                //   required: 'Cattle Tag Certificate is required',
                // }}
              />
              <CustomFileUpload
                control={control}
                setValue={setValue}
                fileName={GRAZING_COPY?.name}
                name="GRAZING_COPY"
                label="Grazing License (चराईचा परवाना)"
                note="Choose Valid .pdf File"
                // rules={{
                //   required: 'Grazing Licence is required',
                // }}
              />
            </View>
            <View
              style={[
                globalStyle.globalCardWrapper,
                {marginTop: 20, width: '100%', flex: 1},
              ]}>
              <CustomInput
                control={control}
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
                label="Captcha (कॅप्चा)*"
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

export default CattleKillForm;
