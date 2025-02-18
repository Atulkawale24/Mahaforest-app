import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';
import {dateMonthYearConverter} from '../helper/dateMonthYearConverter';

const TimeLineCard = ({stepsArray}) => {
  return (
    <View style={timelineStyle.timelineWrapper}>
      <View style={timelineStyle.countWrapper}>
        {/* <View style={timelineStyle.count}>
          <Text style={timelineStyle.countText}>1</Text>
        </View> */}
        <Text style={timelineStyle.milestoneText}>Milestone</Text>
      </View>
      <Text style={timelineStyle.approvalText}>Application Approval</Text>
      {stepsArray?.length > 0 && (
        <>
          {stepsArray?.map((ele, index) => {
            const date = ele?.split(' ')?.pop();
            return (
              <View style={timelineStyle.trackingWrapper} key={index}>
                <View style={timelineStyle.lineWrapper}>
                  <View style={timelineStyle.outerRing}>
                    <View style={timelineStyle.innerRing}></View>
                  </View>
                  {stepsArray?.length - 1 !== index && (
                    <View style={timelineStyle.line}></View>
                  )}
                </View>
                <View style={timelineStyle.trackCardWrapper} key={index}>
                  <Text style={timelineStyle.stageText}>{`Approval ${
                    index + 1
                  }`}</Text>
                  <Text style={timelineStyle.text}>{ele ?? '--'}</Text>
                  {/* <Pressable style={timelineStyle.statusWrapper}>
                <Text style={timelineStyle.statusText}>Approved</Text>
              </Pressable> */}
                  <Text style={timelineStyle.date}>{`${dateMonthYearConverter(
                    date,
                  )}`}</Text>
                </View>
              </View>
            );
          })}
        </>
      )}
    </View>
  );
};

export default TimeLineCard;
const timelineStyle = StyleSheet.create({
  timelineWrapper: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    elevation: 2,
    borderRadius: 10,
    marginTop: 20,
  },
  countWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  count: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: fontSize.textFontSize,
    color: colors.white,
    fontFamily: fontFamily.latoBold,
  },
  milestoneText: {
    fontSize: fontSize.secondaryFontSize,
    fontFamily: fontFamily.latoBold,
    color: colors.orange,
  },
  approvalText: {
    marginBottom: 20,
    fontSize: fontSize.inputFontSize,
    fontFamily: fontFamily.latoBold,
    color: colors.black,
  },
  trackCardWrapper: {
    marginBottom: 20,
  },
  stageText: {
    fontFamily: fontFamily.latoBold,
    fontSize: fontSize.textFontSize,
    color: colors.grey,
  },
  statusWrapper: {
    width: '70%',
    backgroundColor: 'lightgreen',
    paddingVertical: 2,
    paddingBottom: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 7,
  },
  statusText: {
    textAlign: 'center',
    fontSize: fontSize.labelFontSize,
    fontFamily: fontFamily.latoBold,
    color: colors.green,
  },
  date: {
    fontSize: fontSize.labelFontSize,
    color: colors.blue,
    fontFamily: fontFamily.latoRegular,
    fontWeight: '700',
  },
  trackingWrapper: {
    flexDirection: 'row',
    gap: 30,
  },
  lineWrapper: {
    position: 'relative',
  },
  line: {
    height: '100%',
    width: 2,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    position: 'absolute',
    top: 1,
    // marginLeft: 5,
    zIndexL: 1,
  },
  outerRing: {
    position: 'absolute',
    top: -2,
    left: -7,
    width: 17,
    height: 17,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  innerRing: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: colors.blue,
  },
  text: {
    width: '60%',
    fontFamily: fontFamily.latoRegular,
    fontSize: fontSize.textFontSize,
    color: colors.grey,
    marginVertical: 8,
  },
});
