import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import colors from '../constants/colors';
import Icon from '../constants/Icon';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';

const ServiceCard = ({data}) => {
  const {serviceDetail, navigation, index} = data;

  return (
    <View style={serviceCardWrapperStyle.serviceCardWrapper}>
      <View style={serviceCardWrapperStyle.formCount}>
        <Text style={serviceCardWrapperStyle.formCountText}>{index + 1}</Text>
      </View>
      <View style={serviceCardWrapperStyle.contentWrapper}>
        <Text style={serviceCardWrapperStyle.engText}>
          {serviceDetail?.serviceNameEng}
        </Text>
        <Text style={serviceCardWrapperStyle.marathiText}>
          {serviceDetail?.serviceNameMarathi}
        </Text>
      </View>
      <Pressable
        onPress={() =>
          navigation?.navigate(serviceDetail?.url, {
            serviceType: serviceDetail?.serviceType,
          })
        }>
        <Icon
          type="MaterialIcons"
          name="arrow-forward-ios"
          color={colors.blue}
          size={18}
        />
      </Pressable>
    </View>
  );
};

export default ServiceCard;
const serviceCardWrapperStyle = StyleSheet.create({
  serviceCardWrapper: {
    width: '100%',
    padding: 10,
    backgroundColor: colors.cardBg,
    borderRadius: 10,
    // elevation: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
    marginTop: 20,
  },
  formCount: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formCountText: {
    fontSize: fontSize.textFontSize,
    fontFamily: fontFamily.latoRegular,
    color: colors.white,
  },
  contentWrapper: {
    width: '75%',
  },
  engText: {
    fontSize: fontSize.buttonFontSize,
    fontFamily: fontFamily.latoRegular,
    color: colors.blue,
  },
  marathiText: {
    fontSize: fontSize.textFontSize,
    fontFamily: fontFamily.latoRegular,
    color: colors.grey,
    marginTop: 5,
  },
});
