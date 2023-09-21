import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import MyOrderCard from '../MyOrder/MyOrderCard';
import ECard from './ECard';
import {BaseButton} from '../../components/BaseButton';
import {constants} from '../../constraints';
import {useNavigation} from '@react-navigation/native';

const EReceipt = ({route}) => {
  const navigation = useNavigation();
  const item = route?.params?.item;
  // console.log(route.params.item, 'item');
  return (
    <Layout>
      <AppHeader title={'E-Receipt'} defaultStyle={{marginBottom: 30}} />
      <ECard
        image={item.image}
        title={item.title}
        price={item.price}
        size={'1 x set'}
        // onPress={() => alert('ok')}
      />
      <BaseButton
        title={'Checkout'}
        defaultStyle={{marginVertical: 30}}
        onPress={() => navigation.navigate('Checkout')}
      />
    </Layout>
  );
};

export default EReceipt;

const styles = StyleSheet.create({});
