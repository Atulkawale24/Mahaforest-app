import {Alert, PermissionsAndroid} from 'react-native';

export const filePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Mahaforest External File Permission',
        message:
          'Mahaforest App needs access to your External File ' +
          'so you can upload Documents.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the External Storage');
    } else {
      console.log('External Storage permission denied');
    }
  } catch (error) {
    Alert.alert(error?.message);
  }
};
