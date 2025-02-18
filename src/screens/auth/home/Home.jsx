import {View, Text, FlatList} from 'react-native';
import React, { useEffect } from 'react';
import {globalStyle} from '../../../styles/globalStyle';
import TopHeader from '../../../common-components/TopHeader';
import UserProfileHeader from '../../../common-components/UserProfileHeader';
import ServiceCard from '../../../cards/ServiceCard';
import publicServices from '../../../utilities/publicServices';
import { filePermission } from '../../../helper/filePermission';

const Home = ({navigation}) => {
  //get user storage permission
  useEffect(() => {
    filePermission();
  }, []);
  return (
    <View style={globalStyle.pageWrapper}>
      <TopHeader />
      <UserProfileHeader />
      <View style={[globalStyle.globalCardWrapper, {marginTop: 50}]}>
        <View style={globalStyle.globalCardTitleWrapper}>
          <View style={globalStyle.globalCardTitleOuterCircle}>
            <View style={globalStyle.globalCardTitleInnerCircle}></View>
          </View>
          <Text style={globalStyle.globalCardTitle}>Public Services</Text>
        </View>
        <FlatList
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
    </View>
  );
};

export default Home;
