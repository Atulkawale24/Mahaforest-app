import {Dimensions, StyleSheet} from 'react-native';
import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';
const {width, height} = Dimensions.get('window');

export const globalStyle = StyleSheet.create({
  pageWrapper: {
    width,
    flex: 1,
    backgroundColor: colors.bgColor,
    // paddingHorizontal: 15,
  },
  screenWrapper: {
    width,
    height: height / 1.25,
    paddingHorizontal: 15,
  },
  topHeaderWrapper: {
    width: '100%',
  },
  globalCardWrapper: {
    width: '93%',
    marginHorizontal: 'auto',
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: colors.grey,
    elevation: 1,
  },
  globalCardTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  globalCardTitleOuterCircle: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  globalCardTitleInnerCircle: {
    width: 7,
    height: 7,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  globalCardTitle: {
    fontSize: fontSize.textFontSize,
    fontFamily: fontFamily.latoRegular,
    color: colors.grey,
  },
});
