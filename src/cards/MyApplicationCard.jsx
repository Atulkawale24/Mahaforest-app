import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import colors from '../constants/colors';
import fontFamily from '../constants/fontFamily';
import fontSize from '../constants/fontSize';
import {dateMonthYearConverter} from '../helper/dateMonthYearConverter';

const MyApplicationCard = ({application}) => {
  return (
    <View style={myApplicationCardStyle.cardWrapper}>
      <View style={myApplicationCardStyle.dateWrapper}>
        <Text style={myApplicationCardStyle.dateText}>
          {application?.APPLICATION_DATE &&
            dateMonthYearConverter(application?.APPLICATION_DATE)}
        </Text>
        {/* <Pressable style={myApplicationCardStyle.statusWrapper}>
          <Text style={myApplicationCardStyle.statusText}>Approved</Text>
        </Pressable> */}
      </View>
      <Text style={myApplicationCardStyle.applicationId}>
        {/* Application Id: {application?.APPLICATION_NO?.split('/')?.pop()} */}
        Application ID: {application?.APPLICATION_NO}
      </Text>
      {/* <Text style={myApplicationCardStyle.applicationTypeEng}>
        COMPENSATION TO BE SANCTIONED FOR CATTLE KILL CAUSE BY WILDLIFE
      </Text>
      <Text style={myApplicationCardStyle.applicationTypeMarathi}>
        (वन्यप्राण्यांच्या हल्ल्यामुळे झालेल्या पशु नुकसानीची नुकसान)
      </Text> */}
    </View>
  );
};

export default MyApplicationCard;
const myApplicationCardStyle = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    // elevation: 2,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 12,
    color: colors.blue,
    fontFamily: fontFamily.latoBold,
    marginBottom: 10,
  },
  statusWrapper: {
    backgroundColor: colors.green,
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 50,
  },
  statusText: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fontFamily.latoRegular,
  },
  applicationId: {
    fontSize: fontSize.textFontSize,
    color: colors.black,
    fontFamily: fontFamily.latoRegular,
    marginVertical: 2,
  },
  applicationTypeEng: {
    fontSize: fontSize.textFontSize,
    fontFamily: fontFamily.latoRegular,
    color: colors.orange,
    textTransform: 'uppercase',
    marginTop: 10,
  },
  applicationTypeMarathi: {
    fontSize: fontSize.textFontSize,
    fontFamily: fontFamily.devanagariRegular,
    color: colors.grey,
  },
});
