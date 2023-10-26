import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {colors} from '../../constraints';
import style from '../../assets/css/style';
import {Switch} from 'react-native';
import SwitchComponent from './SwitchComponent';
import {useNavigation} from '@react-navigation/native';

const DataProtection = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    darkMode: false,
    notification: false,
    biometricID: false,
    googleAuthenticator: false,
  });
  console.log(formData);

  const toggleSwitch = id => {
    setFormData(prevData => ({
      ...prevData,
      [id]: !prevData[id],
    }));
  };

  return (
    <Layout>
      <AppHeader title={'Data Protection'} />
      {/* <SwitchComponent
        id="state1"
        title={'State 1'}
        active={formData.state1}
        onToggle={toggleSwitch}
      /> */}

      <SwitchComponent
        title={'Dark Mode'}
        active={formData.darkMode}
        onToggle={toggleSwitch}
        id="darkMode"
      />
      <SwitchComponent
        title={'Notification'}
        active={formData.notification}
        onToggle={toggleSwitch}
        id="notification"
      />

      <SwitchComponent
        title={'Biometric ID'}
        active={formData.biometricID}
        onToggle={toggleSwitch}
        id="biometricID"
      />
      <SwitchComponent
        title={'Google Authenticator'}
        active={formData.googleAuthenticator}
        onToggle={toggleSwitch}
        id="googleAuthenticator"
      />
      <BaseButton
        title={'Change Pin'}
        defaultStyle={{borderRadius: 30, marginVertical: 20}}
      />
      <BaseButton
        title={'Change Password'}
        defaultStyle={{borderRadius: 20}}
        onPress={() => navigation.navigate('ChangePassword')}
      />
    </Layout>
  );
};

export default DataProtection;

const styles = StyleSheet.create({
  abc: {},
});
