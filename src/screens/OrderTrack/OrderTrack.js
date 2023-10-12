import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import MyOrderCard from '../MyOrder/MyOrderCard';
import AppHeader from '../../components/AppHeader/AppHeader';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import TrackingCard from './TrackingCard';
import a from '../../assets/images/order/a.png';
import b from '../../assets/images/order/b.png';
import c from '../../assets/images/order/c.png';
import cc from '../../assets/images/order/cc.png';
import yes from '../../assets/images/order/yes.png';
import yes1 from '../../assets/images/order/yesone.png';
const OrderTrack = ({route}) => {
  console.log(route.params.data);
  const item = route.params.data;
  return (
    <Layout>
      <AppHeader title={'Order Tracking'} defaultStyle={{marginBottom: 20}} />

      <MyOrderCard
        image={item.image}
        title={item.title}
        price={item.price}
        address={item.address}
        // onPress={() => alert('ok')}
      />

      <Text
        style={[style.font16Re, {fontFamily: fonts.bold, marginVertical: 40}]}>
        Packet In Delivery
      </Text>
      <View
        style={{
          flexDirection: 'row',
          width: '95%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TrackingCard title={'Preparing'} source={a} source1={yes} />

        <TrackingCard title={'delivering'} source={b} source1={yes} />
        <TrackingCard title={'Completed'} source={cc} source1={yes} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '60%',
          top: -10,
          left: -4,
          borderStyle: 'dotted',
        }}>
        <View
          style={{
            borderTopWidth: 3,
            borderColor: colors.primaryColor,
            height: 6,
            width: 70,
            borderStyle: 'dotted',
          }}
        />
        <View
          style={{
            borderTopWidth: 3,
            height: 6,
            borderColor: colors.primaryColor,
            width: 70,
            borderStyle: 'dotted',
          }}
        />
      </View>
    </Layout>
  );
};

export default OrderTrack;

const styles = StyleSheet.create({});
