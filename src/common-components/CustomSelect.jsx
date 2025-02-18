import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Controller} from 'react-hook-form';
import SelectDropdown from 'react-native-select-dropdown';
import fontFamily, {FONTFAMILY} from '../constants/fontFamily';
import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import Icon from '../constants/Icon';

const CustomSelect = ({
  selectOptions,
  displayName,
  leftIconName,
  rightIcon,
  placeholder,
  control,
  rules,
  name,
  onPress,
  dateIcon,
  disabled,
  valueProp,
  isLoading = false, // isLoading prop from parent
  noDataAvailableMessage = '',
  label,
  boxType,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <View style={{marginBottom: 20}}>
          {/* <View style={styles.placeHolderWrapper}>
            <Text style={styles.label}>{placeholder}</Text>
          </View> */}
          <View
            style={[
              styles.customFormInputWrapper,
              // {
              //   width: ![undefined, null, '']?.includes(boxType)
              //     ? '40%'
              //     : '100%',
              //   height: boxType ? 20 : 35,
              // },
            ]}>
            {isLoading ? ( // Display loader when loading
              <ActivityIndicator size="large" color={colors.blue} />
            ) : selectOptions ? (
              <SelectDropdown
                disabled={disabled}
                data={selectOptions}
                onSelect={onChange}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <Pressable
                      style={styles.rightIconWrapper}
                      onPress={onPress}>
                      {label && (
                        <Text
                          style={[
                            styles.label,
                            {color: disabled ? colors.grey : colors.black},
                          ]}>
                          {label}
                        </Text>
                      )}
                      <View
                        style={[
                          styles.dropdownClickableContainer,
                          // {
                          //   height: '100%',
                          //   width: ![undefined, null, '']?.includes(boxType)
                          //     ? 120
                          //     : '100%',
                          //   borderWidth: boxType ? 0 : 1,
                          //   paddingVertical: boxType ? 2 : 5,
                          // },
                        ]}>
                        <Text
                          style={[
                            styles.customFormInput,
                            {
                              color: value ? colors.black : colors.grey,
                              fontSize: boxType ? 18 : fontSize.inputFont,
                            },
                          ]}>
                          {valueProp
                            ? valueProp
                            : value
                            ? displayName
                              ? value[displayName]
                              : value
                            : placeholder
                            ? placeholder
                            : 'Select an option'}
                        </Text>
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
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <>
                      {selectOptions?.length > 0 ? (
                        <View
                          style={[
                            styles.dropdownItemStyle,
                            {
                              backgroundColor: isSelected
                                ? '#D2D9DF'
                                : 'transparent',
                            },
                          ]}>
                          <Text style={styles.dropdownItemTxtStyle}>
                            {displayName ? item[displayName] : item}
                          </Text>
                        </View>
                      ) : (
                        <Text style={styles.noDataAvailable}>
                          List not available
                        </Text>
                      )}
                    </>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />
            ) : (
              <Text style={styles.noDataAvailable}>
                {noDataAvailableMessage}
              </Text> // Display when no data is available
            )}
          </View>
          {error && <Text style={styles.errorText}>{error?.message}</Text>}
        </View>
      )}
    />
  );
};

export default CustomSelect;

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
    textAlign: 'center',
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
