import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import colors from '../constants/colors';
import images from '../constants/images';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';

const NotificationCard = ({data}) => {
  const {notification, navigation} = data;
  return (
    <Pressable
      style={notificationCardStyle.notificationCardWrapper}
      onPress={() =>
        navigation.navigate('notification-detail', {
          notificationDetail: notification,
        })
      }>
      <View style={notificationCardStyle.notificationImageWrapper}>
        <Image
          source={images.notificationImg}
          resizeMode="stretch"
          style={notificationCardStyle.notificationImage}
        />
      </View>
      <ScrollView style={notificationCardStyle.notificationContentWrapper}>
        <Text style={notificationCardStyle.notificationTitle}>
          Global Summit on Climate Change: Historic Agreement Reached
        </Text>
        <Text style={notificationCardStyle.notificationDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus venenatis, lectus magna fringilla urna,
          porttitor
        </Text>
        <View style={notificationCardStyle.dateWrapper}>
          <View style={notificationCardStyle.dateCircle}></View>
          <Text style={notificationCardStyle.dateText}>Jun 9, 2025</Text>
        </View>
      </ScrollView>
    </Pressable>
  );
};

export default NotificationCard;
const notificationCardStyle = StyleSheet.create({
  notificationCardWrapper: {
    width: '100%',
    backgroundColor: colors.white,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 0.7,
    flexDirection: 'row',
    overflow: 'hidden',
    maxHeight: 130,
  },
  notificationImageWrapper: {
    width: '30%',
  },
  notificationImage: {
    width: '100%',
    height: '100%',
  },
  notificationContentWrapper: {
    width: '70%',
    height: '100%',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  notificationTitle: {
    fontSize: fontSize.labelFontSize,
    fontFamily: fontFamily.latoBold,
    color: colors.black,
  },
  notificationDescription: {
    fontSize: fontSize.textFontSize,
    fontFamily: fontFamily.latoRegular,
    color: colors.grey,
    marginVertical: 5,
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
});
