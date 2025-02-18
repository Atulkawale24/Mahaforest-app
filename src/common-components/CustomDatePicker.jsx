import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import Icon from '../constants/Icon';
import {dateMonthYearConverter} from '../helper/dateMonthYearConverter';
import fontFamily from '../constants/fontFamily';

const CustomDatePicker = ({
  placeholder,
  control,
  rules,
  name,
  openModal,
  modalState,
  closeModal,
  dateTextStyle,
  fontFamily="Lato-Regular",
  placeholderShown = false,
  minimumDate,
  mode = 'date',
  maximumDate = '',
  disabled = false,
  label,
  style = {},
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {onChange, value}, fieldState: {error}}) => {
        // Parse the provided value as a date or time
        const parsedDate = !isNaN(new Date(value)) ? new Date(value) : null;

        // Fallback to default date or time based on mode
        const dateToShow = parsedDate || new Date();

        return (
          <View style={{marginBottom: 20}}>
            {label && (
              <Text
                style={[
                  datePickerStyle.label,
                  {color: disabled ? colors.grey : colors.black},
                ]}>
                {label}
              </Text>
            )}
            <Pressable
              style={[datePickerStyle.date, style]}
              onPress={openModal}>
              {placeholderShown && (
                <Text style={{color: colors.grey}}>{placeholder}</Text>
              )}
              <Text
                style={[
                  datePickerStyle.dateText,
                  dateTextStyle,
                  {
                    color: value ? colors.black : colors.grey,
                    fontFamily: fontFamily,
                  },
                ]}>
                {value
                  ? mode === 'date'
                    ? dateMonthYearConverter(dateToShow)
                    : `${dateToShow
                        .getHours()
                        .toString()
                        .padStart(2, '0')} : ${dateToShow
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}`
                  : placeholder}
              </Text>
              {mode === 'date' ? (
                <Icon
                  type="MaterialIcons"
                  name="date-range"
                  style={datePickerStyle.caret}
                />
              ) : (
                <Icon
                  type="MaterialIcons"
                  name="access-time-filled"
                  style={datePickerStyle.caret}
                />
              )}
            </Pressable>
            {error && (
              <Text style={datePickerStyle.errorText}>{error?.message}</Text>
            )}
            <DatePicker
              modal
              open={modalState}
              date={dateToShow}
              mode={mode}
              minimumDate={minimumDate ? new Date(minimumDate) : undefined}
              maximumDate={maximumDate ? new Date(maximumDate) : undefined}
              buttonColor={colors.blue}
              dividerColor={colors.blue}
              onConfirm={selectedDate => {
                closeModal();
                onChange(selectedDate);
              }}
              onCancel={() => {
                closeModal();
              }}
            />
          </View>
        );
      }}
    />
  );
};

export default CustomDatePicker;

export const datePickerStyle = StyleSheet.create({
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: colors.grey,
    color: colors.black,
    fontSize: fontSize.inputFontSize,
    fontFamily: fontFamily.latoRegular,
    minHeight: 45,
    borderRadius: 8,
  },
  label: {
    marginBottom: 5,
    fontSize: fontSize.labelFontSize,
    color: colors.black,
    fontFamily: fontFamily.latoRegular,
  },
  dateText: {
    fontSize: fontSize.inputFont,
    color: colors.black,
  },
  caret: {
    fontSize: 24,
    color: colors.grey,
  },
  errorText: {
    fontSize: 13,
    color: 'red',
    marginBottom: 5,
  },
});
