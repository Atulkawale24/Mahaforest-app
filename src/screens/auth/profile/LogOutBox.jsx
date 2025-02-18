import {View, Text, Modal, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../../../constants/colors';
import fontFamily from '../../../constants/fontFamily';
import fontSize from '../../../constants/fontSize';

const LogOutBox = ({onCancel, onLogout}) => {
  return (
    <Modal transparent>
      <View style={modalStyle.modalWrapper}>
        <View style={modalStyle.logoutBox}>
          <Text style={modalStyle.title}>Log Out?</Text>
          <Text style={modalStyle.description}>
            Are you sure you want to log out? You'll need to login again to use
            the app.
          </Text>
          <View style={modalStyle.buttonGroup}>
            <Pressable
              style={[modalStyle.button, modalStyle.cancelButton]}
              onPress={onCancel}>
              <Text
                style={[modalStyle.buttonText, modalStyle.cancelButtonText]}>
                Cancel
              </Text>
            </Pressable>
            <Pressable style={modalStyle.button} onPress={onLogout}>
              <Text style={modalStyle.buttonText}>Log out</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogOutBox;
const modalStyle = StyleSheet.create({
  modalWrapper: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  logoutBox: {
    width: '80%',
    marginHorizontal: 'auto',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    elevation: 100,
  },
  title: {
    textAlign: 'center',
    fontFamily: fontFamily.latoBold,
    fontSize: fontSize.textFontSize,
    color: colors.black,
  },
  description: {
    textAlign: 'center',
    fontFamily: fontFamily.latoRegular,
    color: colors.grey,
    fontSize: fontSize.textFontSize,
    marginVertical: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: colors.darkOrange,
    width: '45%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.darkOrange,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: fontSize.textFontSize,
    fontFamily: fontFamily.latoRegular,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor: colors.blue,
  },
  cancelButtonText: {
    color: colors.blue,
  },
});
