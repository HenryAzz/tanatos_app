import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState, useMemo} from 'react';
import Layout from '../../components/Layout';
import AuthHeader from '../../components/AuthHeader';
import PhoneNumberInput from '../../components/PhoneInput';
import {BaseButton} from '../../components/BaseButton';
import {useNavigation} from '@react-navigation/native';
import ApiRequest from '../../Services/ApiRequest';
import {isValidNumber} from 'react-native-phone-number-input';
import {colors} from '../../constraints';
import {useTranslation} from 'react-i18next';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    phoneNumber: '',
  });

  const [valid, setValid] = useState(true);

  useMemo(() => {
    const isFormFilled = data.phoneNumber && valid;
    setValid(!isFormFilled);
  }, [data.phoneNumber]);

  // useMemo(() => {
  //   const isFormFilled =
  //     formData.fName.trim() &&
  //     formData.lastName.trim() &&
  //     formData.phoneNo &&
  //     formData.address &&
  //     formData.password &&
  //     formData.email &&
  //     valid;
  //   setdisabled(!isFormFilled);
  // }, [formData]);

  const [isLoading, setIsLoading] = useState(false);
  const handleOTP = async () => {
    try {
      setIsLoading(true);
      const res = await ApiRequest({
        type: 'send_otp',
        phone: data.phoneNumber,
      });
      const resp = res?.data;
      console.log(resp);
      if (resp.code) {
        navigation.navigate('OTPChangeReset', {OTP: resp?.code});

        // navigation.navigate('OtpVerified', {
        //   OTP: resp?.code.code,
        // });

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const {t, i18n} = useTranslation();

  return (
    <Layout>
      <View style={{width: '100%'}}>
        <AuthHeader title={t('resetpass1')} subTitle={t('resetpass2')} />
        <PhoneNumberInput
          title={'Phone Number'}
          valid={valid}
          value={data.phoneNumber}
          setValid={setValid}
          setValue={setData}
          formData={data}
        />
      </View>
      <BaseButton
        title={
          isLoading ? <ActivityIndicator color={colors.white} /> : 'Continue'
        }
        disabled={valid || isLoading}
        defaultStyle={{marginTop: 30}}
        onPress={handleOTP}
      />
    </Layout>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
