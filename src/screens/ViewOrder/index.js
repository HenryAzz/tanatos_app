import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';

import {useNavigation} from '@react-navigation/native';
import AppHeader from '../../components/AppHeader/AppHeader';
import {BaseButton} from '../../components/BaseButton';
import ECard from '../E-Receipt/ECard';
import Card from './Card';

const ViewOrder = ({route}) => {
  const navigation = useNavigation();
  const item = route?.params?.item;
  // console.log(route.params.item, 'item');
  return (
    <Layout>
      <AppHeader title={'E-Receipt'} defaultStyle={{marginBottom: 30}} />
      <Card
        image={require('../../assets/vieworeder.png')}
        price={'$100.00'}
        title={'Pink Roses'}
        size={'1 x set'}
        // onPress={() => alert('ok')}
      />
    </Layout>
  );
};

export default ViewOrder;

const styles = StyleSheet.create({});
