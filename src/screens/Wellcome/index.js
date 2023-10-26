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
import {useNavigation} from '@react-navigation/native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import {Button} from 'react-native-share';

const Wellcome = () => {
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();

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
        title={t('welcome3')}
        onPress={async () => {
          await AsyncStorage.setItem('account_Type', 'customer');
          navigation.navigate('Signup', {account_Type: 'customer'});
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
