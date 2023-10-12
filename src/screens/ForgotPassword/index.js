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

  return (
    <Layout>
      <View>
        <AuthHeader
          title={'Forgot Password'}
          subTitle={'Enter Your phone Number to change passwprd'}
        />
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
        disabled={valid}
        defaultStyle={{marginTop: 30}}
        onPress={handleOTP}
      />
    </Layout>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
