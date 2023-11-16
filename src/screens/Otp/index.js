import {StyleSheet, Text, Image, View, ScrollView} from 'react-native';
import React, {useState, useMemo} from 'react';
import Layout from '../../components/Layout';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import {BakcButton} from '../../assets/images/svg';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import AuthHeader from '../../components/AuthHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import OTPComponent from '../../components/OtpComponent';
import {ToastMessage} from '../../utils/Toast';
import TimerComp from '../../components/TimerComp/TimerComp';
import ApiRequest from '../../Services/ApiRequest';
import {useTranslation} from 'react-i18next';
const OtpVerified = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const route = useRoute();
  const {OTP, account_Type, phone, formData, state, city, country, area} =
    route?.params;
  console.log(phone);

  const formatPhoneNumber = phoneNumber => {
    if (phoneNumber.startsWith('+')) {
      const countryCode = phoneNumber.substring(0, 3);
      const last4Digits = phoneNumber.slice(-4);
      const formattedNumber = `${countryCode}xxxxxxx${last4Digits}`;
      return formattedNumber;
    } else {
      return phoneNumber;
    }
  };

  // Example usage:
  // const phoneNumber1 = phone;
  const formattedNumber1 = formatPhoneNumber(phone);
  console.log(formattedNumber1, 'llll');

  // const phoneNumber2 = '1234567890';
  // const formattedNumber2 = formatPhoneNumber(phoneNumber2);
  // console.log(formattedNumber2); // Output: 1234567890

  const validateForm = useMemo(() => {
    const valueValid = value.length === 4;
    return valueValid;
  }, [value]);
  const handleVerify = receivedOtp => {
    if (OTP === parseInt(value)) {
      // ToastMessage('Ok Invalid OTP');
      navigation.navigate('ShareAddress', {
        formData: formData,
        account_Type: account_Type,
        phone: phone,
        city: city,
        state: state,
        country: country,
        area: area,
      });
      // setIsLoading(false);
    } else {
      // setIsLoading(false);
      ToastMessage('Invalid OTP');
    }
  };

  const handleOTP = async () => {
    try {
      const res = await ApiRequest({
        type: 'send_otp',
        phone: phone,
        // hash: '',
      });
      const resp = res?.data;
      console.log('resp', resp);
    } catch (error) {
      console.log(error);
    }
  };
  const handleResendOtp = () => {
    // Logic for resending OTP goes here
  };
  const [remainingTime, setRemainingTime] = useState(0);
  // console.log(remainingTime, 'remainingTime');
  const {t} = useTranslation();
  return (
    <Layout>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={colors.backgroundColor}
        // translucent={true}
      />
      <AuthHeader
        title={'Verify Your Account!'}
        subTitle={`We send a code on your phone number ${formattedNumber1}`}
      />
      <OTPComponent value={value} setValue={setValue} />
      {/* <Text style={[{marginVertical: 40}]}>Resend in 00.30</Text> */}
      <TimerComp
        onResendOtp={handleOTP}
        setRemainingTime={setRemainingTime}
        remainingTime={remainingTime}
      />
      <BaseButton
        title={t('Continue')}
        defaultStyle={{}}
        onPress={handleVerify}
        disabled={!validateForm || remainingTime > 0}
      />
    </Layout>
  );
};

export default OtpVerified;

const styles = StyleSheet.create({});
