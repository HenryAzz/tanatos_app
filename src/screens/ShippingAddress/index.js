import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ShippingAddress = () => {
  const navigation = useNavigation();
  return (
    <Layout>
      <AppHeader
        title={'Westside Florists'}
        defaultStyle={{marginBottom: 30}}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <AppTextInput placeholder={'Full Name'} titleText={'Full Name'} />
        <AppTextInput placeholder={'Address'} titleText={'Address'} />
        <AppTextInput placeholder={'City'} titleText={'City'} />
        <AppTextInput placeholder={'State'} titleText={'State'} />
        <AppTextInput placeholder={'Phone'} titleText={'Phone'} />
        <AppTextInput placeholder={'ZipCode'} titleText={'ZipCode'} />
        <AppTextInput placeholder={'Country'} titleText={'Country'} />
        <BaseButton
          title={'Continue to Payment'}
          onPress={() => navigation.navigate('PaymentMethod')}
          defaultStyle={{marginTop: 30, marginBottom: 20}}
        />
      </ScrollView>
    </Layout>
  );
};

export default ShippingAddress;

const styles = StyleSheet.create({});
