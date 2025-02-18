import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Controller} from 'react-hook-form';
import SelectDropdown from 'react-native-select-dropdown';
import fontFamily, {FONTFAMILY} from '../constants/fontFamily';
import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import Icon from '../constants/Icon';

const CustomMultiSelect = ({
  selectOptions,
  selectedValue,
  displayName,
  placeholder,
  onPress,
  dateIcon,
  disabled,
  value,
  isLoading = false, // isLoading prop from parent
  noDataAvailableMessage = '',
  label,
  boxType,
  state,
  onSelect,
}) => {
  return (
    <View style={{marginBottom: 20, position: 'relative'}}>
      <View style={[styles.customFormInputWrapper, {flexDirection: 'column'}]}>
        <Pressable
          style={styles.rightIconWrapper}
          onPress={!disabled && onPress}>
          {label && (
            <Text
              style={[
                styles.label,
                {color: disabled ? colors.grey : colors.black},
              ]}>
              {label}
            </Text>
          )}
          <View style={[styles.dropdownClickableContainer]}>
            {selectedValue?.length > 0 ? (
              <>
                <Text
                  style={[
                    styles.customFormInput,
                    {
                      color:
                        selectedValue?.length > 0 ? colors.black : colors.grey,
                      fontSize: boxType ? 18 : fontSize.inputFont,
                    },
                  ]}>
                  {selectedValue?.map((ele, index) => {
                    return (
                      <React.Fragment key={index}>
                        {displayName ? `${ele[displayName]}` : ele}{' '}
                        {index !== selectedValue.length - 1 && ', '}
                      </React.Fragment>
                    );
                  })}
                </Text>
              </>
            ) : (
              <Text
                style={{
                  color: colors.grey,
                  fontSize: fontSize.inputFontSize,
                }}>
                {placeholder}
              </Text>
            )}
            {dateIcon ? (
              <Icon
                type="FontAwesome"
                name="calendar"
                style={{color: colors.grey, fontSize: 24}}
              />
            ) : (
              <Icon
                type="Entypo"
                name="chevron-down"
                style={[
                  styles.caret,
                  {
                    fontSize: boxType ? 22 : 16,
                  },
                ]}
              />
            )}
          </View>
        </Pressable>
        {state && (
          <>
            {/* <View>
              <Text>option</Text>
            </View> */}

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                backgroundColor: colors.white,
                width: '100%',
                position: 'absolute',
                top: 70,
                zIndex: 1,
                borderRadius: 10,
                elevation: 2,
              }}>
              {selectOptions?.length > 0 ? (
                <>
                  {selectOptions?.map((option, ind) => {
                    return (
                      <Pressable
                        onPress={() => onSelect(option, ind)}
                        key={ind}
                        style={[
                          styles.dropdownItemStyle,
                          {
                            flexDirection: 'row',
                            gap: 20,
                          },
                        ]}>
                        <Icon
                          type="MaterialIcons"
                          name={
                            selectedValue?.find(
                              ele => ele[value] === option[value],
                            )
                              ? 'check-box'
                              : 'check-box-outline-blank'
                          }
                          style={{color: colors.grey, fontSize: 20}}
                        />
                        <Text style={styles.dropdownItemTxtStyle}>
                          {displayName ? option[displayName] : option}
                        </Text>
                      </Pressable>
                    );
                  })}
                </>
              ) : (
                <Text style={styles.noDataAvailable}>List not available</Text>
              )}
            </ScrollView>
          </>
        )}
      </View>
      {/* {error && <Text style={styles.errorText}>{error?.message}</Text>} */}
    </View>
  );
};

export default CustomMultiSelect;

const styles = StyleSheet.create({
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: fontSize.textFontSize,
    fontWeight: '500',
    color: colors.black,
    // textAlign: 'center',
  },
  noDataAvailable: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.black,
    textAlign: 'left',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    paddingBottom: 20,
  },
  errorText: {
    color: 'red',
    alignSelf: 'stretch',
  },
  placeHolderWrapper: {
    width: '100%',
    fontSize: fontSize.inputFontSize,
    fontFamily: fontFamily.latoRegular,
    // backgroundColor: COLORS.darkGreen,
  },
  label: {
    marginBottom: 5,
    fontSize: fontSize.labelFontSize,
    color: colors.black,
    fontFamily: fontFamily.latoRegular,
  },
  placeholder: {
    color: colors.black,
    fontSize: fontSize.labelFontSize,
    fontFamily: fontFamily.latoRegular,
  },
  customFormInputWrapper: {
    // borderWidth: 1,
    // borderColor: COLORS.secondary,
    padding: 3,
    // paddingRight: width > 350 ? 3 : 10,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropdownClickableContainer: {
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
  leftIcon: {
    color: colors.grey,
    fontSize: 18,
  },
  customFormInput: {
    fontSize: fontSize.inputFontSize,
    fontFamily: fontFamily.latoRegular,
    color: colors.blue,
    width: '76%',
  },
  caret: {
    color: colors.grey,
    fontSize: 16,
  },
  calenderIcon: {
    fontSize: 20,
    color: colors.grey,
  },
});
