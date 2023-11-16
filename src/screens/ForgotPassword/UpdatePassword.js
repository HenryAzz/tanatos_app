import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState, useMemo} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {colors} from '../../constraints';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ToastMessage} from '../../utils/Toast';
import ApiRequest from '../../Services/ApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {t} from 'i18next';
import {useTranslation} from 'react-i18next';
import {validatePassword} from '../../utils/Validations';

const UpdatePassword = () => {
  const navigation = useNavigation();

  const [isSecureText, setIsSecureText] = useState(true);
  const [isSecureText1, setIsSecureText1] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [notSame, setNotSame] = useState();
  const validateForm = useMemo(() => {
    const isPasswordValid = formData.password.length > 5;
    const isPasswordValidConfirm = formData.confirmPassword.length > 5;
    const samePassword = formData.password === formData.confirmPassword;
    const same = formData.password === formData.confirmPassword;
    setNotSame(same);

    return isPasswordValid && isPasswordValidConfirm && samePassword;
  }, [formData]);

  const route = useRoute();
  const {user_id} = route?.params;
  const handleResetPassword = async () => {
    if (user_id) {
      try {
        setIsLoading(true);
        const res = await ApiRequest({
          type: 'update_password',
          user_id: user_id,
          password: formData.password,
        });
        const resp = res?.data?.result;
        // console.log(resp);
        if (resp) {
          const id = res?.data?.user?.id;
          // console.log('id stored');
          ToastMessage(res?.data?.message);
          navigation.replace('login');
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
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
        backgroundColor={colors.white}
        // translucent={true}
      />
      <AppHeader
        title={t('Reset Password')}
        defaultStyle={{marginBottom: 30}}
      />

      <AppTextInput
        titleText={t('New Password')}
        placeholder={t('New Password')}
        value={formData.password}
        onChangeText={text => handleInputChange('password', text)}
        secureTextEntry={isSecureText}
        setIsSecureText={setIsSecureText}
        password
      />
      {!validatePassword(formData.password) &&
        formData.password.length >= 2 && (
          <Text style={{top: -8, color: colors.red}}>
            {t('Password must be 8 digits (Aa1234*/)')}
          </Text>
        )}
      <View>
        <AppTextInput
          titleText={t('Confirm Password')}
          placeholder={t('Confirm Password')}
          value={formData.confirmPassword}
          onChangeText={text => handleInputChange('confirmPassword', text)}
          secureTextEntry={isSecureText1}
          setIsSecureText={setIsSecureText1}
          password
        />
        {!validatePassword(formData.confirmPassword) &&
          formData.confirmPassword.length >= 2 && (
            <Text style={{top: -8, color: colors.red}}>
              {t('Password must be 8 digits (Aa1234*/)')}
            </Text>
          )}
        {!notSame && formData.confirmPassword?.length > 7 && (
          <Text style={{top: -8, color: colors.red}}>Password not same</Text>
        )}
      </View>
      <BaseButton
        title={
          isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            t('Reset Password')
          )
        }
        disabled={!validateForm || isLoading}
        defaultStyle={{marginTop: 30}}
        onPress={handleResetPassword}
        // onPress={() => toggleLanguage()}
      />
    </Layout>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({});
