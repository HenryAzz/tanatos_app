import {StyleSheet, Text, Image, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../components/Layout';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import {BakcButton} from '../../assets/images/svg';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import AuthHeader from '../../components/AuthHeader';
import {useNavigation} from '@react-navigation/native';
import OTPComponent from '../../components/OtpComponent';
const OtpVerified = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  return (
    <Layout>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={colors.backgroundColor}
        // translucent={true}
      />
      <AuthHeader
        title={'Verify Your Account!'}
        subTitle={'We send a code on your phone number +44******964'}
      />
      <OTPComponent value={value} setValue={setValue} />
      <Text style={[{marginVertical: 40}]}>Resend in 00.30</Text>
      <BaseButton
        title={'Continue'}
        defaultStyle={{}}
        onPress={() => navigation.navigate('ShareAddress')}
      />
    </Layout>
  );
};

export default OtpVerified;

const styles = StyleSheet.create({});
