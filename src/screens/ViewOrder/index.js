import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Layout from '../../components/Layout';

import {useNavigation} from '@react-navigation/native';
import AppHeader from '../../components/AppHeader/AppHeader';
import {BaseButton} from '../../components/BaseButton';
import ECard from '../E-Receipt/ECard';
import Card from './Card';

const ViewOrder = ({route}) => {
  const navigation = useNavigation();
  const {total_amount, dataTosend} = route?.params;
  // console.log(total_amount, 'total_amount');
  // console.log(route.params.item, 'item');
  // useEffect(() => {
  //   setTimeout(() => navigation.navigate('Home'), 3000);
  // }, []);
  return (
    <Layout>
      <AppHeader title={'E-Receipt'} defaultStyle={{marginBottom: 30}} />
      <Card
        image={require('../../assets/vieworeder.png')}
        price={`$${total_amount}`}
        title={dataTosend?.name}
        size={'1 x set'}
        // onPress={() => alert('ok')}
      />
    </Layout>
  );
};

export default ViewOrder;

const styles = StyleSheet.create({});
