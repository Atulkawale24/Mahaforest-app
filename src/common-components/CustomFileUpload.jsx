import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import colors from '../constants/colors';
import {customInputStyle} from './CustomInput';
import {pick, types} from '@react-native-documents/picker';
import Toast from 'react-native-toast-message';

const CustomFileUpload = ({
  control,
  rules,
  name,
  label,
  editable = true,
  note,
  setValue,
  fileName,
  trigger,
}) => {
  const selectFile = async () => {
    const result = await pick({
      type: [types.pdf],
    });
    if (Number(result[0]?.size) > 20000000) {
      Toast.show({
        type: 'error',
        text1: 'File size should be less than 20MB.',
      });
      return;
    }
    if (result.length > 0) {
      const obj = {
        name: result[0]?.name,
        uri: result[0]?.uri,
        type: result[0]?.type,
        fileName: name,
      };
      setValue(`${name}`, obj);
      trigger(name);
    }
  };

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <>
          <View style={customInputStyle.inputBoxWrapper}>
            {label && (
              <Text
                style={[
                  customInputStyle.label,
                  {color: editable ? colors.black : colors.grey},
                ]}>
                {label}
                {rules && <Text style={{color: 'red'}}>*</Text>}
              </Text>
            )}
            <View
              style={[
                customInputStyle.inputBox,
                customInputStyle.fileUploadBox,
              ]}>
              <Text style={customInputStyle.chooseFilePlaceholder}>
                {fileName ?? 'No file choosen'}
              </Text>
              <Pressable
                style={customInputStyle.chooseFileButton}
                onPress={() => {
                  selectFile();
                  trigger(name);
                }}>
                <Text style={customInputStyle.chooseFileText}>Choose File</Text>
              </Pressable>
            </View>
            {error && (
              <Text style={customInputStyle.errorText}>{error?.message}</Text>
            )}
            {note && (
              <Text style={customInputStyle.noteText}>
                {note ?? 'Choose Valid jpg, jpeg, png File'}
              </Text>
            )}
          </View>
        </>
      )}
    />
  );
};

export default CustomFileUpload;
