import {Dimensions, StyleSheet} from 'react-native';
import colors from '../constants/colors';
import fontFamily from '../constants/fontFamily';
import fontSize from '../constants/fontSize';
const {width, height} = Dimensions.get('window');
const loginStyle = StyleSheet.create({
  wrapper: {
    width: width,
    flex: 1,
    backgroundColor: colors.white,
  },
  imageWrapper: {
    width: '100%',
    height: height / 3.2,
  },
  loginImg: {
    width: '100%',
    height: '100%',
  },
  loginFormWrapper: {
    paddingHorizontal: 25,
    paddingTop: 50,
    // flex: 0.9,
    // zIndex: 55,
    height: height / 1.5,
    backgroundColor: colors.white,
  },
  multiTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 25,
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
  welcomeText: {
    color: colors.black,
    fontSize: 24,
    fontFamily: fontFamily.latoBold,
    marginBottom: 20,
  },
  text: {
    fontSize: fontSize.textFontSize,
    color: colors.grey,
    fontFamily: fontFamily.latoRegular,
  },
  otpText: {
    color: colors.black,
  },
  copyrightText: {
    textAlign: 'center',
    marginTop: 'auto',
    fontSize: fontSize.textFontSize,
    fontFamily: fontFamily.latoRegular,
    color: colors.grey,
    // zIndex: 1,
    bottom: 0,
  },
});
export default loginStyle;
