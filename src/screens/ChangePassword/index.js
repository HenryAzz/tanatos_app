import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {colors} from '../../constraints';

const ChangePassword = () => {
  return (
    <Layout>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={colors.white}
        // translucent={true}
      />
      <AppHeader title={'Change Password'} defaultStyle={{marginBottom: 30}} />
      <AppTextInput titleText={'New Password'} placeholder={'New Password'} />
      <AppTextInput
        titleText={'Confirm Password'}
        placeholder={'NeConfirm Password'}
      />
      <AppTextInput titleText={'Old Password'} placeholder={'Old Password'} />
      <BaseButton title={'Update'} defaultStyle={{marginTop: 40}} />
    </Layout>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
