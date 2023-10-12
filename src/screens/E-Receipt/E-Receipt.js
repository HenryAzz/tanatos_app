import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import MyOrderCard from '../MyOrder/MyOrderCard';
import ECard from './ECard';
import {BaseButton} from '../../components/BaseButton';
import {colors, constants, fonts} from '../../constraints';
import {useNavigation} from '@react-navigation/native';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';
import style from '../../assets/css/style';
import TextCard from './TextCard';

const EReceipt = ({route}) => {
  const navigation = useNavigation();
  const item = route?.params?.item;
  const dataTosend = route?.params?.dataTosend;
  console.log(item, 'item');
  console.log('=============item=============');
  console.log(dataTosend[0], 'dataTosend');

  const [quantity, setQuantity] = useState(1);
  const price = dataTosend.price;
  const [basicPrice, setBasicPrice] = useState(price);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
    setBasicPrice(parseInt(basicPrice) + parseInt(price)); // Price doubles with each increment
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setBasicPrice(parseInt(basicPrice) - parseInt(price));
    }
  };

  return (
    <Layout>
      <AppHeader title={'E-Receipt'} defaultStyle={{marginBottom: 30}} />
      {/* <Text>{quantity === 1 ? item.price : totalPrice}</Text> */}
      {/* <Text>{quantity + '//////' + basicPrice}</Text> */}
      <View
        style={{
          width: '99%',
          marginTop: 20,
          marginVertical: 6,
          elevation: 4,
          shadowColor: colors.elev,
          backgroundColor: colors.white,
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{height: 120, width: 155}}>
            <ImageSwiper images={dataTosend[0].images} />
          </View>
          <View
            style={{
              justifyContent: 'space-around',
              // height: 100,
              paddingHorizontal: 10,
              // width: '62%',
              backgroundColor: colors.white,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              // elevation: 4,
            }}>
            <View style={{paddingLeft: 16}}>
              <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
                {item.name}
              </Text>
              <Text
                style={[style.font16Re, {color: '#8C8C8C', marginVertical: 6}]}>
                {quantity} x set
              </Text>
              <Text style={[style.font22Re, {fontFamily: fonts.bold}]}>
                {basicPrice}
              </Text>
            </View>

            {/* {onPress ? (
            <TouchableOpacity
              onPress={onPress}
              style={{
                backgroundColor: colors.primaryColor,
                height: 25,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                alignSelf: 'flex-end',
                marginBottom: 3,
              }}>
              <Text style={[style.font12Re, {color: colors.white}]}>
                Tracke Order
              </Text>
            </TouchableOpacity>
          ) : null} */}
          </View>
          <View style={{paddingLeft: 20}}>
            <TouchableOpacity onPress={handleIncrement}>
              <Text style={[style.font24Re]}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[style.font16Re]}>{quantity}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDecrement}>
              <Text style={[style.font24Re]}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{width: '100%', marginTop: 50}}>
        <TextCard title={'Amount'} price={`$${basicPrice}`} />
        <TextCard title={'Subtotal'} price={`$${basicPrice}`} />
        <TextCard title={'Shipping'} price={'Free'} />
      </View>
      {/* <ECard
      // images={item.images}
      // title={item.name}
      // price={item.price}
      // size={'1 x set'}
      // onPress={() => alert('ok')}
      /> */}
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
