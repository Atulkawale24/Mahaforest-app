import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import React from 'react';
import TopHeader from '../../../common-components/TopHeader';
import {globalStyle} from '../../../styles/globalStyle';
import colors from '../../../constants/colors';
import fontSize from '../../../constants/fontSize';
import fontFamily from '../../../constants/fontFamily';

const NotificationDetail = ({navigation, route}) => {
  const {notificationDetail} = route.params;

  return (
    <View style={globalStyle.pageWrapper}>
      <TopHeader
        primaryScreen="Notification"
        secondaryScreen={notificationDetail?.title}
        onPress={() => navigation.goBack()}
        bgColor={colors.white}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyle.screenWrapper}>
        <Text style={notificationDetailStyle.title}>
          {notificationDetail?.title}
        </Text>
        <View style={notificationDetailStyle.dateWrapper}>
          <View style={notificationDetailStyle.dateCircle}></View>
          <Text style={notificationDetailStyle.dateText}>Jun 9, 2025</Text>
        </View>
        <View style={notificationDetailStyle.imageWrapper}>
          <Image
            source={notificationDetail?.image}
            resizeMode="stretch"
            style={notificationDetailStyle.image}
          />
        </View>
        <Text style={notificationDetailStyle.description}>
          {notificationDetail?.description}
        </Text>
      </ScrollView>
    </View>
  );
};

export default NotificationDetail;
const notificationDetailStyle = StyleSheet.create({
  title: {
    fontSize: fontSize.secondaryFontSize,
    color: colors.black,
    fontFamily: fontFamily.latoBold,
    marginBottom: 10,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  dateCircle: {
    width: 7,
    height: 7,
    borderRadius: 50,
    backgroundColor: colors.blue,
  },
  dateText: {
    fontSize: fontSize.textFontSize,
    fontFamily: fontFamily.latoRegular,
    color: colors.blue,
  },
  imageWrapper: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  description: {
    fontSize: fontSize.textFontSize,
    fontFamily: fontFamily.latoRegular,
    color: colors.black,
    marginVertical: 10,
  },
});
