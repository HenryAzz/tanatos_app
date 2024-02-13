import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {colors} from '../../constraints';
import CustomInput from '../../components/CustomInput';
import {useTranslation} from 'react-i18next';
import ApiRequest from '../../Services/ApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMemo} from 'react';
import {validateEmail} from '../../utils/Validations';
import {ToastMessage} from '../../utils/Toast';

const ContactUs = () => {
  const {t, i18} = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    title: '',
    message: '',
  });
  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [disable, setDisable] = useState(true);
  useMemo(() => {
    const isData =
      validateEmail(formData.email) &&
      formData.email.trim() &&
      formData.message &&
      formData.title;
    setDisable(!isData);
  }, [formData]);

  const [loading, setloading] = useState(false);
  const handleContactUs = async id => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setloading(true);
      const data = {
        type: 'add_data',
        table_name: 'contact_us',
        // name:
        email: formData.email,
        title: formData.title,
        message: formData.message,
        user_id: user_id,
      };
      console.log(data, 'data');
      const res = await ApiRequest(data);
      if (res?.data?.result) {
        ToastMessage(res.data.message);
        setFormData({
          email: '',
          title: '',
          message: '',
        });
      }

      console.log(res.data, 'respon device');
    } catch {
    } finally {
      setloading(false);
    }
  };
  return (
    <Layout>
      <AppHeader title={t('account3')} defaultStyle={{marginBottom: 30}} />
      <AppTextInput
        titleText={t('Title')}
        placeholder={t('Title')}
        value={formData.title}
        onChangeText={text => handleInputChange('title', text)}
      />
      <AppTextInput
        titleText={t('contact2')}
        placeholder={t('Type Here...')}
        multiline={true}
        value={formData.message}
        onChangeText={text => handleInputChange('message', text)}
      />
      {/* <AppTextInput placeholder={} /> */}
      <AppTextInput
        titleText={t('contact5')}
        keyboardType="email-address"
        placeholder={t('contact5')}
        value={formData.email}
        onChangeText={text => handleInputChange('email', text)}
      />
      <BaseButton
        title={loading ? <ActivityIndicator color={colors.white} /> : t('Send')}
        onPress={handleContactUs}
        disabled={disable || loading}
      />
    </Layout>
  );
};

export default ContactUs;

const styles = StyleSheet.create({});
