import {StyleSheet, Text, Image, View, ScrollView} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import {BakcButton} from '../../assets/images/svg';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import AuthHeader from '../../components/AuthHeader';
import {useNavigation} from '@react-navigation/native';

const Phone = () => {
  const navigation = useNavigation();
  return (
    <Layout>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={colors.backgroundColor}
        // translucent={true}
      />
      <AuthHeader
        title={'Welcome Back!'}
        subTitle={'Enter Your Phone number to get start'}
      />
      <ScrollView
        style={{width: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {/* <AppTextInput titlext={'Name'} placeholder={'Name'} /> */}
        <AppTextInput titleText={'Country'} placeholder={'Country'} />
        <AppTextInput titleText={'Phone Number'} placeholder={'Phone Number'} />

        <BaseButton
          title={'Continue'}
          defaultStyle={{marginTop: 30}}
          onPress={() => navigation.navigate('OtpVerified')}
        />
      </ScrollView>
    </Layout>
  );
};

export default Phone;

const styles = StyleSheet.create({});
