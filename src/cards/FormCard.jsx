import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';
import publicServices from '../utilities/publicServices';

const FormCard = ({serviceType}) => {
  const [formDetail, setFormDetail] = useState([]);

  //filtering form detail as per service type
  useEffect(() => {
    const filteredService = publicServices.filter(
      (ele, ind) =>
        ele?.serviceType?.toLowerCase() === serviceType?.toLowerCase(),
    );
    setFormDetail(filteredService);
  }, [serviceType]);

  return (
    <View style={formCardStyle.cardWrapper}>
      <Text style={formCardStyle.formEngText}>
        {formDetail[0]?.serviceNameEng}
      </Text>
      <Text style={formCardStyle.formMarathiText}>
        {formDetail[0]?.serviceNameMarathi}
      </Text>
      <Text style={formCardStyle.formTypeText}>{formDetail[0]?.formType}</Text>
    </View>
  );
};

export default FormCard;
const formCardStyle = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    backgroundColor: '#EAF2FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.blue,
    padding: 15,
  },
  formEngText: {
    fontSize: fontSize.textFontSize,
    fontFamily: fontFamily.latoRegular,
    color: colors.blue,
  },
  formMarathiText: {
    fontSize: fontSize.textFontSize,
    fontFamily: fontFamily.devanagariRegular,
    color: colors.grey,
  },
  formTypeText: {
    fontSize: fontSize.textFontSize,
    fontFamily: fontFamily.devanagariMedium,
    color: colors.orange,
  },
});
