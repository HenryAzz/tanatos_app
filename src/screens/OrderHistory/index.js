import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout/index';
import AppHeader from '../../components/AppHeader/AppHeader';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import OHistoryCard from './OHistoryCard';
import {FlatList} from 'react-native';
const OrderHistory = () => {
  const data = [
    {
      id: 1,
      image: require('../../assets/images/OrderHistory/white.png'),
      title: 'White Rose',
      orderId: 'Order Id : TG-36594',
      date: '28 Oct, 02.18 PM',
      success: 'Success',
    },
    {
      id: 2,
      image: require('../../assets/images/OrderHistory/sun.png'),
      title: 'Sun Flowers',
      orderId: 'Order Id : TG-36594',
      date: '28 Oct, 02.18 PM',
      success: 'Cancel',
    },
    {
      id: 3,
      image: require('../../assets/images/OrderHistory/pink.png'),
      title: 'Pink Roses',
      orderId: 'Order Id : TG-36594',
      date: '28 Oct, 02.18 PM',
      success: 'Success',
    },
    {
      id: 4,
      image: require('../../assets/images/OrderHistory/white.png'),
      title: 'White Rose',
      orderId: 'Order Id : TG-36594',
      date: '28 Oct, 02.18 PM',
      success: 'Cancel',
    },
    {
      id: 5,
      image: require('../../assets/images/OrderHistory/sun.png'),
      title: 'Sun Flowers',
      orderId: 'Order Id : TG-36594',
      date: '28 Oct, 02.18 PM',
      success: 'Cancel',
    },
    {
      id: 6,
      image: require('../../assets/images/OrderHistory/pink.png'),
      title: 'Pink Roses',
      orderId: 'Order Id : TG-36594',
      date: '28 Oct, 02.18 PM',
      success: 'Success',
    },
    {
      id: 7,
      image: require('../../assets/images/OrderHistory/pink.png'),
      title: 'Pink Roses',
      orderId: 'Order Id : TG-36594',
      date: '28 Oct, 02.18 PM',
      success: 'Success',
    },
  ];
  return (
    <Layout>
      <AppHeader title={'History'} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginVertical: 20,
        }}>
        <Text style={[style.font14Re, {fontFamily: fonts.bold}]}>
          Select Date
        </Text>
        <Text
          style={[
            style.font14Re,
            {fontFamily: fonts.bold, color: colors.primaryColor},
          ]}>
          1 Oct - 30 Oct
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={data}
        renderItem={({item}) => (
          <OHistoryCard
            image={item.image}
            title={item.title}
            orderId={item.orderId}
            date={item.date}
            success={item.success}
          />
        )}
      />
    </Layout>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({});
