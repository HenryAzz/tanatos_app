import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {colors} from '../../constraints';
import CustomInput from '../../components/CustomInput';

const ContactUs = () => {
  return (
    <Layout>
      <AppHeader title={'Contact Us'} defaultStyle={{marginBottom: 30}} />
      <AppTextInput
        titleText={'How Can We Help You?'}
        placeholder={'Type Here...'}
        multiline={true}
        // customInputStyle={{backgroundColor: 'red'}}
      />
      <AppTextInput placeholder={'Email where we can send you reply'} />

      <BaseButton title={'Send'} />
    </Layout>
  );
};

export default ContactUs;

const styles = StyleSheet.create({});
