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

const Wellcome = () => {
  const navigation = useNavigation();

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
        Welcome!
      </Text>
      <Text
        style={[
          style.font20Re,
          {color: colors.white, textAlign: 'center', marginBottom: 20},
        ]}>
        We are preparing something great for you!
      </Text>
      <BaseButton
        title={'Continue as customer'}
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
        title={'Continue as Store'}
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
        title={'Continue as Funeral Home'}
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
          Already have an account?{' '}
          <Text
            style={[
              style.font14Re,
              {color: colors.white, fontFamily: fonts.bold},
            ]}>
            Login
          </Text>
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Wellcome;

const styles = StyleSheet.create({});
