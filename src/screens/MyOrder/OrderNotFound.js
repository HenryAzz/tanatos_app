import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import OrderNot from '../../assets/images/fav/NotFoundOrder.png';

const OrderNotFound = () => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Image source={OrderNot} style={{height: 250, width: 250}} />
      <Text style={[style.font20Re, {fontFamily: fonts.bold}]}>
        No Order Yet
      </Text>
      <Text style={[style.font14Re, {paddingBottom: 20, marginVertical: 15}]}>
        You don't have an ongoing orders at this time
      </Text>
    </View>
  );
};

export default OrderNotFound;

const styles = StyleSheet.create({});
