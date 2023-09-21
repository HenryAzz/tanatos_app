import {StyleSheet, FlatList, Text, View, Image} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import MyOrderCard from './MyOrderCard';

import style from '../../assets/css/style';
import {fonts} from '../../constraints';
import OrderNotFound from './OrderNotFound';
import {useNavigation} from '@react-navigation/native';
const OngoingOrder = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      image: require('../../assets/images/OrderCard/orderImg1.png'),
      title: 'Pink Roses',
      price: '$1000',
      address:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      status: 'Trace Order',
    },
    {
      id: 2,
      image: require('../../assets/images/OrderCard/orderImg1.png'),
      title: 'Pink Roses',
      price: '$2000',
      address:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      status: 'Trace Order',
    },
    {
      id: 3,
      image: require('../../assets/images/OrderCard/orderImg1.png'),
      title: 'Pink Roses',
      price: '$3000',
      address:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      status: 'Trace Order',
    },
    {
      id: 4,
      image: require('../../assets/images/OrderCard/orderImg1.png'),
      title: 'Pink Roses',
      price: '$4000',
      address:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      status: 'Trace Order',
    },
    {
      id: 5,
      image: require('../../assets/images/OrderCard/orderImg1.png'),
      title: 'Pink Roses',
      price: '$5000',
      address:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      status: 'Trace Order',
    },
    {
      id: 6,
      image: require('../../assets/images/OrderCard/orderImg1.png'),
      title: 'Pink Roses',
      price: '$6000',
      address:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      status: 'Trace Order',
    },
    {
      id: 7,
      image: require('../../assets/images/OrderCard/orderImg1.png'),
      title: 'Pink Roses',
      price: '$7000',
      address:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      status: 'Trace Order',
    },
    {
      id: 8,
      image: require('../../assets/images/OrderCard/orderImg1.png'),
      title: 'Pink Roses',
      price: '$8000',
      address:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      status: 'Trace Order',
    },
    {
      id: 9,
      image: require('../../assets/images/OrderCard/orderImg1.png'),
      title: 'Pink Roses',
      price: '$9000',
      address:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      status: 'Trace Order',
    },
  ];

  return (
    <Layout>
      {data.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          data={data}
          renderItem={({item}) => (
            <MyOrderCard
              image={item.image}
              title={item.title}
              price={item.price}
              address={item.address}
              status={item.status}
              // onPress={() => alert('ok')}
              onPress={() =>
                navigation.navigate('OrderTrack', {
                  data: item,
                })
              }
            />
          )}
        />
      ) : (
        <OrderNotFound />
      )}
    </Layout>
  );
};

export default OngoingOrder;

const styles = StyleSheet.create({});
