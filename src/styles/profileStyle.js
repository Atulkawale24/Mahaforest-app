import {StyleSheet} from 'react-native';
import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';

const profileStyle = StyleSheet.create({
  profileCardWrapper: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.blue,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  profileImageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: fontSize.secondaryFontSize,
    fontFamily: fontFamily.latoBold,
    color: colors.white,
    marginBottom: 8,
  },
  mobile: {
    fontSize: fontSize.textFontSize,
    fontFamily: fontFamily.latoRegular,
    color: colors.white,
  },
  title: {
    fontSize: fontSize.secondaryFontSize,
    textAlign: 'center',
    fontFamily: fontFamily.latoBold,
    color: colors.black,
    marginBottom: 20,
  },
});
export default profileStyle;
