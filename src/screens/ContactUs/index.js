import {StyleSheet, Text, View} from 'react-native';
import React, {useTransition} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {colors} from '../../constraints';
import CustomInput from '../../components/CustomInput';
import {useTranslation} from 'react-i18next';

const ContactUs = () => {
  const {t, i18} = useTranslation();
  return (
    <Layout>
      <AppHeader title={t('account3')} defaultStyle={{marginBottom: 30}} />
      <AppTextInput
        titleText={t('How Can We Help You?')}
        placeholder={t('Type Here...')}
        multiline={true}
        // customInputStyle={{backgroundColor: 'red'}}
      />
      <AppTextInput placeholder={t('Email where we can send you reply')} />

      <BaseButton title={t('Send')} />
    </Layout>
  );
};

export default ContactUs;

const styles = StyleSheet.create({});
