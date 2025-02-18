import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyle} from '../../../styles/globalStyle';
import colors from '../../../constants/colors';
import TopHeader from '../../../common-components/TopHeader';
import MyApplicationCard from '../../../cards/MyApplicationCard';
import TimeLineCard from '../../../cards/TimeLineCard';

const TrackingTimeLine = ({navigation, route}) => {
  const {application} = route?.params;
  const [stepsArray, setStepsArray] = useState([]);

  useEffect(() => {
    // Extracting steps dynamically
    const steps = Object.keys(application)
      .filter(key => key.startsWith('STEP') && application[key] !== null)
      .map(key => application[key]);
    setStepsArray(steps);
  }, []);

  return (
    <View style={globalStyle.pageWrapper}>
      <TopHeader
        primaryScreen="Track Application"
        secondaryScreen="MFD1001"
        onPress={() => navigation.goBack()}
        bgColor={colors.white}
      />
      <View style={globalStyle.screenWrapper}>
        <MyApplicationCard application={application} />
        <TimeLineCard stepsArray={stepsArray} />
      </View>
    </View>
  );
};

export default TrackingTimeLine;
