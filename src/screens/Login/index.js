import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
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

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setDisable(true);
      const res = await ApiRequest({
        type: 'login',
        email: formData.email.toLowerCase(),
        password: formData.password,
      });
      const resp = res?.data?.result;

      // console.log(resp);
      console.log(res.data);
      if (resp === true) {
        // const id = res?.data?.user_id;
        // const company_id = res?.data?.company_id;
        // const user_type = res?.data?.user_type;
        // await AsyncStorage.setItem('user_id', id);

        // setAccountType(user_type);
        navigation.reset({index: 0, routes: [{name: 'AppStack'}]});
        setDisable(false);
        setIsLoading(false);
        // setFormData({email: '', password: ''});
        // } else {
        // ToastMessage(res.data?.message);
        // setIsLoading(false);
      } else {
        setIsLoading(false);
        setDisable(false);
      }
    } catch (error) {
      setIsLoading(false);
      setDisable(false);
      console.log(error);
    }
  };

  return (
    <>
      <View style={{backgroundColor: colors.white, paddingHorizontal: 14}}>
        <AuthHeader
          title={"Let's Login"}
          subTitle={'Enter Your detail below to Login'}
        />
      </View>
      <Layout>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 0}}>
            <AppTextInput
              titleText={'Email'}
              placeholder={'Email'}
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
            />
            <AppTextInput
              titleText={'Password'}
              placeholder={'Password'}
              value={formData.password}
              onChangeText={text => handleInputChange('password', text)}
              secureTextEntry={isSecureText}
              setIsSecureText={setIsSecureText}
              password
              customInputStyle={{paddingRight: 30}}
            />

            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('ForgetPassword');
              }}>
              <Text
                style={[
                  style.font14Re,
                  {
                    color: colors.gray3,
                    fontFamily: fonts.bold,
                    textAlign: 'right',
                    // top: -6,
                  },
                ]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <View style={{marginVertical: 10, marginTop: 30}}>
              <BaseButton
                title={
                  isLoading ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    'Login'
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
                Don't have an account ?
              </Text>
              <TouchableOpacity
                style={{marginTop: 3}}
                onPress={() => {
                  navigation.navigate('Wellcome');
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
                  Signup
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </>
  );
};

export default Login;
