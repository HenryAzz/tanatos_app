import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {isWhitespacePresent, validateEmail} from '../../utils/Validations';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';
import Layout from '../../components/Layout';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import AuthHeader from '../../components/AuthHeader';
import ApiRequest from '../../Services/ApiRequest';
import {ToastMessage} from '../../utils/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import {userId, userType} from '../../store/reducer/usersSlice';
import {useDispatch} from 'react-redux';
const Login = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [isSecureText, setIsSecureText] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // const validateForm = useMemo(() => {
  //   const isEmailValid = validateEmail(formData.email);
  //   const isPasswordValid = formData.password.trim().length > 0;

  //   return isEmailValid && isPasswordValid;
  // }, [formData]);
  const [disable, setDisable] = useState(true);
  useMemo(() => {
    const isData =
      validateEmail(formData.email) &&
      formData.email.trim() &&
      formData.password.trim();
    setDisable(!isData);
  }, [formData]);

  // type:add_data
  // table_name:devices
  // user_id:
  // deviceRid:
  // deviceModel:
  // devicePlatform:
  const handleFcm = async id => {
    const token = await AsyncStorage.getItem('token');

    let model = DeviceInfo.getModel();
    const _data = {
      type: 'add_devices',
      table_name: 'devices',
      user_id: id,
      devicePlatform: Platform.OS,
      deviceRid: token,
      deviceModel: model,
    };
    console.log(_data, 'data');
    const res = await ApiRequest(_data);
    console.log(res.data, 'respon device');
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setDisable(true);
      const res = await ApiRequest({
        type: '/usuarios/login', data:
        { email: formData.email.toLowerCase(),
          password: formData.password }
        })
      const resp = res?.data?.data?.id;
      // const store_id = JSON.stringify(res?.data?.store_id);
      const store_id = JSON.stringify(res?.data?.id);

      console.log(resp, 'data login get');
      if (resp) {
        handleFcm(res?.data?.data?.id);
        const id = res?.data?.data?.id;
        const account_Type = res?.data?.data.user_type;
        await AsyncStorage.setItem('user_id', JSON.stringify(id));
        dispatch(userType({user_type: account_Type})),
          dispatch(userId({user_id: id})),
          await AsyncStorage.setItem('account_Type', account_Type);
        if (store_id) {
          await AsyncStorage.setItem('store_id', store_id);
        }

        ToastMessage(res.data?.message);
        setDisable(false);
        // const storeID = await AsyncStorage.getItem('store_id');
        // console.log(storeID);
        setIsLoading(false);
        console.log(resp, 'deberia pasar de pagina');
        navigation.navigate('MainStack');
        setFormData({email: '', password: ''});
      } else {
        ToastMessage(res.data?.message);
        setIsLoading(false);
        setDisable(false);
        // } else {
        //   setIsLoading(false);
        //   setDisable(false);
      }
    } catch (error) {
      setIsLoading(false);
      setDisable(false);
      console.log(error);
    }
  };

  const {t, i18n} = useTranslation();

  return (
    <>
      <View style={{backgroundColor: colors.white, paddingHorizontal: 14}}>
        <AuthHeader title={t('login1')} subTitle={t('login2')} />
      </View>
        <ScrollView showsVerticalScrollIndicator={false}>
      <Layout>
          <View style={{marginTop: 0}}>
            <AppTextInput
              titleText={t('Email')}
              keyboardType="email-address"
              placeholder={t('Email')}
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
            />
            <AppTextInput
              titleText={t('Password')}
              placeholder={t('Password')}
              value={formData.password}
              onChangeText={text => handleInputChange('password', text)}
              secureTextEntry={isSecureText}
              setIsSecureText={setIsSecureText}
              password
              customInputStyle={{paddingRight: 30}}
            />

            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('Phone');
                navigation.navigate('ForgotPassword');
              }}>
              <Text
                style={[
                  style.font14Re,
                  {
                    color: colors.gray,
                    fontFamily: fonts.bold,
                    textAlign: 'right',
                    // top: -6,
                  },
                ]}>
                {t('login3')}
              </Text>
            </TouchableOpacity>
            <View style={{marginVertical: 10, marginTop: 30}}>
              <BaseButton
                title={
                  isLoading ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    t('Login')
                  )
                }
                onPress={handleLogin}
                disabled={disable}
              />
            </View>

            <View
              style={{
                marginVertical: 6,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={[
                  style.font16Re,
                  {
                    textAlign: 'center',
                    color: colors.gray,
                    fontFamily: fonts.medium,
                  },
                ]}>
                {t("Don't have an account ?")}
              </Text>
              <TouchableOpacity
                style={{marginTop: 3}}
                onPress={() => {
                  // toggleLanguage();
                  navigation.navigate('Wellcome', {wantCreate: 'yes'});
                }}>
                <Text
                  style={[
                    style.font16Re,
                    {
                      textAlign: 'center',
                      color: colors.primaryColor,
                      fontFamily: fonts.medium,
                      paddingLeft: 5,
                    },
                  ]}>
                  {t('Signup')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
      </Layout>
        </ScrollView>
    </>
  );
};

export default Login;
