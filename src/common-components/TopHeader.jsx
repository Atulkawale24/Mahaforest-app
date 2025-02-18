import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import fontFamily from '../constants/fontFamily';
import fontSize from '../constants/fontSize';
import colors from '../constants/colors';
import Icon from '../constants/Icon';

const TopHeader = props => {
  const {primaryScreen, secondaryScreen, onPress, bgColor} = props;
  return (
    <View
      style={[
        topHeaderStyle.topHeaderWrapper,
        {backgroundColor: bgColor ? bgColor : 'transparent'},
      ]}>
      <View style={topHeaderStyle.multiTextWrapper}>
        <Text style={topHeaderStyle.headerText}>MAHARASHTRA</Text>
        <Text style={[topHeaderStyle.headerText, topHeaderStyle.portalText]}>
          FOREST PORTAL
        </Text>
      </View>
      {primaryScreen && (
        <View
          style={[
            topHeaderStyle.headerNavigationWrapper,
            {
              marginBottom: primaryScreen ? 15 : 0,
              marginTop: primaryScreen ? 10 : 0,
            },
          ]}>
          <Pressable onPress={onPress} style={topHeaderStyle.headerNavigation}>
            <Icon
              type="MaterialIcons"
              name="arrow-back-ios"
              color={colors.blue}
              size={18}
            />
            <Text style={topHeaderStyle.primaryScreenText}>
              {primaryScreen}
            </Text>
          </Pressable>
          {secondaryScreen && (
            <Text
              style={
                topHeaderStyle.secondaryScreenText
              }>{`/ ${secondaryScreen}`}</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default TopHeader;
const topHeaderStyle = StyleSheet.create({
  topHeaderWrapper: {
    width: '100%',
    marginBottom: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  multiTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },
  headerText: {
    fontFamily: fontFamily.latoBold,
    fontSize: fontSize.primaryFontSize,
    color: colors.orange,
    textTransform: 'uppercase',
  },
  portalText: {
    color: colors.blue,
  },
  headerNavigationWrapper: {
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 5,
  },
  headerNavigation: {
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 5,
  },
  primaryScreenText: {
    fontSize: fontSize.textFontSize,
    color: colors.blue,
    fontFamily: fontFamily.latoBold,
  },
  secondaryScreenText: {
    width: '80%',
    fontSize: fontSize.textFontSize,
    color: colors.grey,
    fontFamily: fontFamily.latoRegular,
  },
});
