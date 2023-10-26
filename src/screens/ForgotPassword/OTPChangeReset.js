import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import Layout from '../../components/Layout';
import AppTextInput from '../../components/FloatingLabelInput';

import {BakcButton} from '../../assets/images/svg';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import AuthHeader from '../../components/AuthHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import OTPComponent from '../../components/OtpComponent';
import {colors} from '../../constraints';
import {BaseButton} from '../../components/BaseButton';
import {ToastMessage} from '../../utils/Toast';
import {useTranslation} from 'react-i18next';
const OTPChangeReset = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  // console.log(value);
  const route = useRoute();
  const {OTP} = route?.params;
  // const [isLoading, setIsLoading] = useState(false);
  const validateForm = useMemo(() => {
    const valueValid = value.length === 4;
    return valueValid;
  }, [value]);
  const handleVerify = receivedOtp => {
    // console.log(receivedOtp, 'receivedOtp');
    // console.log(value, 'value');
    // setIsLoading(true);
    if (OTP === parseInt(value)) {
      // ToastMessage('Ok Invalid OTP');
      navigation.navigate('UpdatePassword');
      // setIsLoading(false);
    } else {
      // setIsLoading(false);
      ToastMessage('Invalid OTP');
    }
  };

  const {t, i18n} = useTranslation();

  const toggleLanguage = async () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('es'); // Switch to Spanish
    } else {
      i18n.changeLanguage('en'); // Switch to English
    }
  };
  return (
    <Layout>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={colors.backgroundColor}
        // translucent={true}
      />
      <AuthHeader title={t('resetpass3')} subTitle={t('resetpass4')} />
      <OTPComponent value={value} setValue={setValue} />
      <Text style={[{marginVertical: 40}]}>Resend in 00.30</Text>
      <BaseButton
        title={'Continue'}
        defaultStyle={{}}
        disabled={!validateForm}
        onPress={handleVerify}
        // onPress={() => toggleLanguage()}
      />
    </Layout>
  );
};

export default OTPChangeReset;

const styles = StyleSheet.create({});
