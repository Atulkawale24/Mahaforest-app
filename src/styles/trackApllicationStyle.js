import {StyleSheet} from 'react-native';
import fontSize from '../constants/fontSize';
import colors from '../constants/colors';
import fontFamily from '../constants/fontFamily';

const trackApplicationStyle = StyleSheet.create({
  title: {
    fontSize: fontSize.secondaryFontSize,
    color: colors.orange,
  },
  tableWrapper: {
    width: '100%',
    flex: 0.93,
    backgroundColor: colors.white,
    marginTop: 10,
    borderRadius: 10,
    elevation: 2,
    overflow: 'hidden',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.blue,
  },
  headerText: {
    color: colors.white,
    fontFamily: fontFamily.latoBold,
    fontSize: fontSize.textFontSize,
    width: 100,
  },
  dataWrapper: {
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  dataText: {
    color: colors.black,
    fontFamily: fontFamily.latoRegular,
    fontSize: fontSize.textFontSize,
    // width: 100,
  },
  srNo: {
    width: 80,
  },
  date: {
    width: 100,
  },
  applicationId: {
    width: 120,
  },
  applicationFor: {
    // width: 250,
    width: 170,
  },
  status: {
    width: 100,
  },
  action: {
    width: 70,
  },
  dataApplicationId: {
    width: 120,
    color: colors.blue,
    fontFamily: fontFamily.latoRegular,
    fontSize: fontSize.textFontSize,
    // borderBottomWidth: 1,
  },
});
export default trackApplicationStyle;
