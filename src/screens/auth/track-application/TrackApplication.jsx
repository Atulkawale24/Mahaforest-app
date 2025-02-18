import {View, Text, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {globalStyle} from '../../../styles/globalStyle';
import TopHeader from '../../../common-components/TopHeader';
import colors from '../../../constants/colors';
import trackApplicationStyle from '../../../styles/trackApllicationStyle';
import Icon from '../../../constants/Icon';
import {useQuery} from '@tanstack/react-query';
import {communication} from '../../../services/communication';
import {TOKEN_KEY} from '@env';
import {dateMonthYearConverter} from '../../../helper/dateMonthYearConverter';
import fontFamily from '../../../constants/fontFamily';
import fontSize from '../../../constants/fontSize';
import Loader from '../../../common-components/Loader';

const TrackApplication = ({navigation}) => {
  // Fetch wing list
  const {
    data: applicationList,
    isPending,
    error,
  } = useQuery({
    queryKey: ['application-list', TOKEN_KEY],
    queryFn: () =>
      communication.getApplicationList({TOKENKEY: TOKEN_KEY, REGISTER_ID: 26}),
  });

  return (
    <>
      {isPending && <Loader />}
      <View style={globalStyle.pageWrapper}>
        <TopHeader
          primaryScreen="Track Application"
          onPress={() => navigation.goBack()}
          bgColor={colors.white}
        />
        <View style={globalStyle.screenWrapper}>
          <Text style={trackApplicationStyle.title}>
            MY APPLICATIONS (माझे अर्ज)
          </Text>
          <View style={trackApplicationStyle.tableWrapper}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <View>
                <View style={trackApplicationStyle.headerWrapper}>
                  <Text
                    style={[
                      trackApplicationStyle.headerText,
                      trackApplicationStyle.srNo,
                    ]}>
                    Sr. No.
                  </Text>
                  <Text
                    style={[
                      trackApplicationStyle.headerText,
                      trackApplicationStyle.date,
                    ]}>
                    Date
                  </Text>
                  <Text
                    style={[
                      trackApplicationStyle.headerText,
                      trackApplicationStyle.applicationId,
                    ]}>
                    ApplicationId
                  </Text>
                  <Text
                    style={[
                      trackApplicationStyle.headerText,
                      trackApplicationStyle.applicationFor,
                    ]}>
                    Applicant Name
                  </Text>
                  {/* <Text
                  style={[
                    trackApplicationStyle.headerText,
                    trackApplicationStyle.applicationFor,
                  ]}>
                  Application For
                </Text>
                <Text
                  style={[
                    trackApplicationStyle.headerText,
                    trackApplicationStyle.status,
                  ]}>
                  Status
                </Text> */}
                  <Text
                    style={[
                      trackApplicationStyle.headerText,
                      trackApplicationStyle.action,
                    ]}>
                    Action
                  </Text>
                </View>
                <ScrollView
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}
                  style={{maxHeight: 600}} // Limit vertical height to enable scrolling
                >
                  {applicationList?.RESULT_DATA?.length > 0 ? (
                    <>
                      {applicationList?.RESULT_DATA?.map(
                        (application, index) => {
                          return (
                            <View
                              style={trackApplicationStyle.dataWrapper}
                              key={index}>
                              <Text
                                style={[
                                  trackApplicationStyle.dataText,
                                  trackApplicationStyle.srNo,
                                ]}>
                                {index + 1}
                              </Text>
                              <Text
                                style={[
                                  trackApplicationStyle.dataText,
                                  trackApplicationStyle.date,
                                ]}>
                                {application?.APPLICATION_DATE &&
                                  dateMonthYearConverter(
                                    application?.APPLICATION_DATE,
                                  )}
                              </Text>
                              {/* <View
                    style={[
                      trackApplicationStyle.date,
                      trackApplicationStyle.applicationId,
                    ]}> */}
                              <Pressable>
                                <Text
                                  style={[
                                    trackApplicationStyle.date,
                                    trackApplicationStyle.dataApplicationId,
                                  ]}>
                                  {application?.APPLICATION_NO?.split(
                                    '/',
                                  )?.pop()}
                                </Text>
                              </Pressable>
                              <Text
                                style={[
                                  trackApplicationStyle.dataText,
                                  trackApplicationStyle.applicationFor,
                                  {color: colors.orange},
                                ]}>
                                {application?.APPLICANT_NAME ?? '--'}
                              </Text>
                              {/* </View> */}
                              {/* <Text
                    style={[
                      trackApplicationStyle.dataText,
                      trackApplicationStyle.applicationFor,
                      {color: colors.orange},
                    ]}>
                    Compensation to be sanctioned for Cattle kill Caused by
                    wildlife
                  </Text>
                  <View
                    style={[
                      trackApplicationStyle.dataText,
                      trackApplicationStyle.status,
                    ]}>
                    <Text
                      style={{
                        backgroundColor: 'blue',
                        textAlign: 'center',
                        borderRadius: 20,
                        color: colors.orange,
                      }}>
                      Submitted
                    </Text>
                  </View> */}
                              <Text
                                style={[
                                  trackApplicationStyle.dataText,
                                  trackApplicationStyle.action,
                                ]}>
                                <Pressable
                                  onPress={() =>
                                    navigation.navigate(
                                      'track-my-application',
                                      {
                                        application,
                                      },
                                    )
                                  }>
                                  <Icon
                                    type="AntDesign"
                                    name="eyeo"
                                    size={22}
                                    color={colors.grey}
                                  />
                                </Pressable>
                              </Text>
                            </View>
                          );
                        },
                      )}
                    </>
                  ) : (
                    <Text
                      style={{
                        marginTop: 70,
                        marginLeft: 105,
                        fontFamily: fontFamily.latoRegular,
                        fontSize: fontSize.textFontSize,
                        color: colors.black,
                      }}>
                      Application Not Available
                    </Text>
                  )}
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </>
  );
};

export default TrackApplication;
