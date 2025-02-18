import {View, Text, FlatList, BackHandler, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyle} from '../../../styles/globalStyle';
import TopHeader from '../../../common-components/TopHeader';
import UserProfileHeader from '../../../common-components/UserProfileHeader';
import ServiceCard from '../../../cards/ServiceCard';
import publicServices from '../../../utilities/publicServices';
import {filePermission} from '../../../helper/filePermission';
import {useFocusEffect} from '@react-navigation/native';
import LogOutBox from '../profile/LogOutBox';
import {communication} from '../../../services/communication';
import {useMutation} from '@tanstack/react-query';
import {storage} from '../../../store/mmkvInstance';
import {TOKEN_KEY} from '@env';
import Toast from 'react-native-toast-message';
const {height} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [showExitModal, setShowExitModal] = useState(false); // State for modal
  // const MOBILE_NO = storage.getNumber('MOBILE_NO');

  //Re-checking mobile number exist or not
  // const {mutate, isError, isPending, error} = useMutation({
  //   mutationFn: communication.login,
  //   onSuccess: data => {
  //     console.log('da', data);
  //     if (Number(data?.RESULT_CODE) === 0) {
  //       navigation.navigate('unAuthScreens');
  //       Toast.show({
  //         type: 'error',
  //         text1: data?.RESULT_MESSAGE ?? 'Mobile Number Not found Login Again!',
  //       });
  //     }
  //   },
  // });

  //get user storage permission
  useEffect(() => {
    filePermission();
  }, []);

  // //verify mobile number is exist or not
  // useEffect(() => {
  //   let formData = new FormData();
  //   formData.append('TOKENKEY', TOKEN_KEY);
  //   formData.append('SERVICEID', 2);
  //   formData.append('MOBILE_NO', MOBILE_NO);
  //   mutate(formData);
  // }, []);

  // Handle back button press ONLY on the Home screen
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        setShowExitModal(true); // Show exit modal
        return true; // Prevent default back button behavior
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // Cleanup the event listener
    }, []),
  );

  const handleExitApp = () => {
    BackHandler.exitApp(); // Exit the app
    setShowExitModal(false); // Close the modal
  };

  const closeExitModal = () => {
    setShowExitModal(false); // Close the modal
  };

  return (
    <View style={globalStyle.pageWrapper}>
      <TopHeader />
      <UserProfileHeader navigation={navigation} />
      <View
        style={[
          globalStyle.globalCardWrapper,
          {marginTop: 50, marginBottom: 155},
        ]}>
        <View style={globalStyle.globalCardTitleWrapper}>
          <View style={globalStyle.globalCardTitleOuterCircle}>
            <View style={globalStyle.globalCardTitleInnerCircle}></View>
          </View>
          <Text style={globalStyle.globalCardTitle}>Public Services</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={publicServices}
          renderItem={(services, index) => {
            return (
              <ServiceCard
                key={services?.index}
                data={{
                  serviceDetail: services?.item,
                  navigation,
                  index: services?.index,
                }}
              />
            );
          }}
        />
      </View>
      {showExitModal && (
        <LogOutBox
          onCancel={closeExitModal}
          onLogout={handleExitApp}
          title="Exit App"
          content="Are you sure you want to exit the app?"
          cancelBtnText="No"
          yesBtnText="Yes"
        />
      )}
    </View>
  );
};

export default Home;
