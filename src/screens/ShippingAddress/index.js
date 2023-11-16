import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PhoneNumberInput from '../../components/PhoneInput';
import ApiRequest from '../../Services/ApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

const ShippingAddress = () => {
  const navigation = useNavigation();

  const [valid, setValid] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    phoneNumber: '',
    zipCode: '',
    country: '',
  });
  const handleFieldChange = (fieldName, value) => {
    setFormData({...formData, [fieldName]: value});
  };
  useEffect(() => {
    handleGetData();
  }, []);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const handleGetData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setShowLoadingModal(true);
      const res = await ApiRequest({
        type: 'get_data',
        id: user_id,
        table_name: 'users',
      });
      const resp = res?.data?.data[0];
      console.log(resp, '///////////////');
      // setPhonen(resp?.phone);
      setFormData({
        name: resp?.name,
        email: resp?.email,
        gender: resp?.gender,
        dob: resp?.dob,
        city: resp.city,
        country: resp.country,
        address: resp?.address,
        phoneNumber: resp?.phone,
        state: resp?.state,
      });

      setShowLoadingModal(false);
    } catch (error) {
      setShowLoadingModal(false);
      console.log(error);
    }
  };

  const {t} = useTranslation();

  return (
    <Layout>
      <AppHeader
        title={t('Westside Florists')}
        defaultStyle={{marginBottom: 30}}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <AppTextInput
          placeholder={t('Full Name')}
          titleText={t('Full Name')}
          onChangeText={value => handleFieldChange('name', value)}
          value={formData.name}
        />
        <AppTextInput
          placeholder={t('singup3')}
          titleText={t('singup3')}
          onChangeText={value => handleFieldChange('address', value)}
          value={formData.address}
        />
        <AppTextInput
          placeholder={t('City')}
          titleText={t('City')}
          onChangeText={value => handleFieldChange('city', value)}
          value={formData.city}
        />
        <AppTextInput
          placeholder={t('State')}
          titleText={t('State')}
          value={formData.state}
          onChangeText={value => handleFieldChange('state', value)}
        />
        {/* <PhoneNumberInput
          title={'Phone Number'}
          valid={valid}
          value={formData.phoneNumber}
          setValid={setValid}
          setValue={setFormData}
          formData={formData}
        /> */}

        {/* <AppTextInput placeholder={'Phone'} titleText={'Phone'} /> */}
        <AppTextInput
          placeholder={t('Phone Number')}
          titleText={t('Phone Number')}
          keyboardType="number-pad"
          onChangeText={value => handleFieldChange('phone', value)}
          value={formData.phoneNumber}
        />
        <AppTextInput
          placeholder={t('ZipCode')}
          titleText={t('ZipCode')}
          keyboardType="number-pad"
          onChangeText={value => handleFieldChange('zip', value)}
          value={formData.zip}
        />
        <AppTextInput
          placeholder={t('Country')}
          titleText={t('Country')}
          onChangeText={value => handleFieldChange('country', value)}
          value={formData.country}
        />
        <BaseButton
          title={t('Continue to Payment')}
          onPress={() => navigation.navigate('PaymentMethod')}
          defaultStyle={{marginTop: 30, marginBottom: 20}}
        />
      </ScrollView>
    </Layout>
  );
};

export default ShippingAddress;

const styles = StyleSheet.create({});
