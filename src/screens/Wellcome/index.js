import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import {BaseButton} from '../../components/BaseButton';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import {useNavigation, useRoute} from '@react-navigation/native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import {Button} from 'react-native-share';
import {useDispatch} from 'react-redux';
import {userType} from '../../store/reducer/usersSlice';

const Wellcome = () => {
  //
  const route = useRoute();
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  return (
    <ImageBackground
      source={require('../../assets/Wellcome.png')}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
      }}>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Text
        style={[
          style.font30Re,
          {color: colors.white, fontFamily: fonts.semiBold, marginBottom: 25},
        ]}>
        {t('welcome1')}
      </Text>
      <Text
        style={[
          style.font20Re,
          {color: colors.white, textAlign: 'center', marginBottom: 20},
        ]}>
        {t('welcome2')}
      </Text>
      <BaseButton
        title={
          route.params?.wantCreate == 'yes'
            ? t('customer1')
            : t('Continue as a Guest')
        }
        onPress={async () => {
          if (route.params?.wantCreate == 'yes') {
            dispatch(userType({user_type: 'customer'}));
            await AsyncStorage.setItem('account_Type', 'customer');
            navigation.navigate('Signup', {account_Type: 'customer'});
          } else {
            await AsyncStorage.setItem('account_Type', 'customer');
            dispatch(userType({user_type: 'Guest'}));
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'MainStack',
                  state: {
                    routes: [
                      {
                        name: 'AppStack',
                      },
                    ],
                  },
                },
              ],
            });
          }
        }}
        defaultStyle={{
          backgroundColor: colors.white,
          marginVertical: 10,
          borderRadius: 25,
        }}
        textStyle={{color: colors.primaryColor, fontFamily: fonts.bold}}
      />
      <BaseButton
        title={t('welcome4')}
        onPress={async () => {
          dispatch(userType({user_type: ''}));
          await AsyncStorage.setItem('account_Type', 'store');
          navigation.navigate('Signup', {account_Type: 'store'});
        }}
        defaultStyle={{
          backgroundColor: colors.white,
          // marginVertical: 10,
          borderRadius: 25,
        }}
        textStyle={{color: colors.primaryColor, fontFamily: fonts.bold}}
      />
      <BaseButton
        title={t('welcome5')}
        onPress={async () => {
          dispatch(userType({user_type: ''}));
          await AsyncStorage.setItem('account_Type', 'funeral');
          navigation.navigate('Signup', {account_Type: 'funeral'});
        }}
        defaultStyle={{
          backgroundColor: colors.white,
          marginVertical: 10,
          borderRadius: 25,
        }}
        textStyle={{color: colors.primaryColor, fontFamily: fonts.bold}}
      />
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text
          style={[style.font14Re, {color: colors.white, marginVertical: 20}]}>
          {t('welcome6')}{' '}
          <Text
            style={[
              style.font14Re,
              {color: colors.white, fontFamily: fonts.bold},
            ]}>
            {t('Login')}
          </Text>
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Wellcome;

const styles = StyleSheet.create({});
