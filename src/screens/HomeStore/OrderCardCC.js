import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';

const OrderCardCC = ({item}) => {
  return (
    <View
      style={{
        width: 158,
        backgroundColor: colors.white,
        elevation: 5,
        shadowColor: colors.elev,
        borderRadius: 10,
        margin: 4,
      }}>
      <Image
        source={item.image}
        style={{
          height: 120,
          width: 158,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      />
      <Text style={[style.font14Re, {padding: 10}]}>{item.title}</Text>
      <View
        style={{
          flexDirection: 'row',

          alignItems: 'center',
          paddingBottom: 10,
          //   paddingVertical: 10,
          justifyContent: 'space-around',
        }}>
        <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
          {item.price}
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: colors.primaryColor,
            width: 90,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
          }}>
          <Text style={[style.font14Re, {color: colors.primaryColor}]}>
            {item.status}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderCardCC;
