import {useNavigation} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import ApiRequest from '../../Services/ApiRequest';
import AuthHeader from '../../components/AuthHeader';
import {BaseButton} from '../../components/BaseButton';
import AppTextInput from '../../components/FloatingLabelInput';
import Layout from '../../components/Layout';
import {colors} from '../../constraints';
import {ToastMessage} from '../../utils/Toast';
import {validateEmail} from '../../utils/Validations';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    phoneNumber: '',
  });

  const [valid, setValid] = useState(true);

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

  const [formData, setFormData] = useState({
    email: '',
  });
  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useMemo(() => {
    const isFormFilled = validateEmail(formData.email);
    setValid(!isFormFilled);
  }, [formData]);

  const [isLoading, setIsLoading] = useState(false);
  const handleOTP = async () => {
    try {
      setIsLoading(true);
      const res = await ApiRequest({
        type: 'forgot_password',
        email: formData.email,
      });
      const resp = res?.data;
      const respon = res?.data.user_exist;
      console.log(respon);
      if (resp) {
        console.log('resp?.code', resp?.code);
        navigation.navigate('OTPChangeReset', {
          OTP: resp?.code,
          email: formData.email,
          user_id: resp?.user_id,
        });
        setFormData({email: ''});

        // navigation.navigate('OtpVerified', {
        //   OTP: resp?.code.code,
        // });

        setIsLoading(false);
      } else {
        ToastMessage('Invalid User Credentials');
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
        <AppTextInput
          titleText={t('Email')}
          keyboardType="email-address"
          placeholder={t('Email')}
          value={formData.email}
          onChangeText={text => handleInputChange('email', text)}
        />
        {/* <PhoneNumberInput
          title={t('Phone Number')}
          valid={valid}
          value={data.phoneNumber}
          setValid={setValid}
          setValue={setData}
          formData={data}
        /> */}
      </View>
      <BaseButton
        title={
          isLoading ? <ActivityIndicator color={colors.white} /> : t('Continue')
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
