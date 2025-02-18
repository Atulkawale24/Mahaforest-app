import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {globalStyle} from '../../../styles/globalStyle';
import TopHeader from '../../../common-components/TopHeader';
import colors from '../../../constants/colors';
import fontFamily from '../../../constants/fontFamily';
import fontSize from '../../../constants/fontSize';
import NotificationCard from '../../../cards/NotificationCard';
import images from '../../../constants/images';

const Notification = ({navigation}) => {
  const notificationDetail = {
    title: 'Global Summit on Climate Change: Historic Agreement Reached',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc',
    image: images.notificationImg,
    date: 'Jan 09, 2025',
  };
  return (
    <View style={globalStyle.pageWrapper}>
      <TopHeader
        primaryScreen="Notification"
        onPress={() => navigation.goBack()}
        bgColor={colors.white}
      />
      <View style={globalStyle.screenWrapper}>
        <Text
          style={{
            fontFamily: fontFamily.latoRegular,
            fontSize: fontSize.textFontSize,
            marginTop: 5,
            color: colors.grey,
          }}>
          3 Results found:
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={(notification, index) => {
            return (
              <NotificationCard
                // key={services?.index}
                data={{
                  notification: notificationDetail,
                  navigation,
                  index: notification?.index,
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default Notification;
