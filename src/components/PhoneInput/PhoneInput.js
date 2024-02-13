import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {colors, fonts} from '../../constraints';
import {useTranslation} from 'react-i18next';

const PhoneNumberInput = ({value, setValue, valid, setValid, formData}) => {
  //
  const phoneInput = useRef(null);
  const {t} = useTranslation();
  const checkPhoneNumber = text => {
    const sanitizedText = text.replace(/[^0-9\+]/g, '');
    const checkValid = phoneInput.current?.isValidNumber(sanitizedText);
    setValid(checkValid);

    phoneInput.current?.setState({
      number: sanitizedText,
    });
    setValue({...formData, phoneNumber: sanitizedText});
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.wrapper}>
        <PhoneInput
          ref={phoneInput}
          // defaultValue={value}
          value={value}
          defaultCode="ES"
          layout="second"
          placeholder={t('Phone Number')}
          containerStyle={{
            borderLeftWidth: 1,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#DDDDE1',
            borderColor: '#E0E0E0',
            backgroundColor: '#F5F5F5',
            width: '100%',
            height: 50,
            borderRadius: 10,
          }}
          textContainerStyle={{
            borderRightWidth: 1,
            borderColor: '#E0E0E0',
            // color: 'red',
            backgroundColor: '#F5F5F5',
            borderTopEndRadius: 10,
            borderBottomEndRadius: 10,
            borderLeftWidth: 1,
          }}
          textInputStyle={{
            fontFamily: fonts.regular,
            height: 52,
          }}
          onChangeText={text => {
            checkPhoneNumber(text);
          }}
          disableArrowIcon
          onChangeFormattedText={text => {
            const sanitizedText = text.replace(/[^0-9\+]/g, '');
            setValue({...formData, phoneNumber: sanitizedText});
          }}
          countryPickerProps={{withAlphaFilter: false}}
        />
        {value && !valid && (
          <Text style={{top: 2, color: colors.red}}>
            {t('Enter a valid phone number')}
          </Text>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    justifyContent: 'center',
    marginBottom: 7,
  },
});

export default PhoneNumberInput;

{
  /* <PhoneNumberInput
title={'PHONE'}
valid={valid}
value={formData.phoneNumber}
setValid={setValid}
setValue={setFormData}
formData={formData}
/> */
}
