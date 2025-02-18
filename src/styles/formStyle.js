import {StyleSheet} from 'react-native';
import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';

const formStyle = StyleSheet.create({
  languageChangerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  captchaWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 20,
    marginBottom: 20,
  },
  captcha: {
    width: '43%',
    height: 45,
  },
  captchaBg: {
    width: '100%',
    height: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'relative',
    flexDirection: 'row',
    // backgroundColor:"red"
  },
  captchaText: {
    position: 'absolute',
    color: colors.black,
    fontSize: fontSize.buttonFontSize,
    fontFamily: fontFamily.latoBold,
  },
  one: {
    top: 7,
    left: 7,
  },
  two: {
    top: 3,
    left: 30,
    color: colors.blue,
  },
  three: {
    top: 5,
    left: 50,
  },
  four: {
    top: 3,
    left: 72,
  },
  five: {
    right: 25,
    bottom: 12,
    color: colors.blue,
  },
  reloadButton: {
    marginTop: -5,
  },
  checkBoxLabel: {
    fontSize: fontSize.inputFontSize,
    fontFamily: fontFamily.devanagariRegular,
    color: colors.grey,
    marginBottom: 8,
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 7,
  },
  checkBox: {
    fontSize: 22,
    color: colors.grey,
  },
  checkBoxText: {
    fontSize: fontSize.inputFontSize,
    fontFamily: fontFamily.devanagariRegular,
    color: colors.grey,
  },
});
export default formStyle;
