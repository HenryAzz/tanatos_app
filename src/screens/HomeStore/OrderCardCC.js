import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import style from '../../assets/css/style';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';
import {colors, fonts} from '../../constraints';

const OrderCardCC = ({item, images}) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        elevation: 5,
        shadowColor: colors.elev,
        borderRadius: 10,
        marginBottom: 14,
      }}>
      <View style={{height: 120, width: 170}}>
        <ImageSwiper images={images} />
      </View>

      <Text style={[style.font14Re, {padding: 10}]}>{item.name}</Text>
      <View
        style={{
          flexDirection: 'row',

          alignItems: 'center',
          paddingBottom: 10,
          paddingLeft: 10,
          justifyContent: 'space-between',
        }}>
        <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
          {item.price}€
        </Text>
        {item.status ? (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: colors.primaryColor,
              width: 90,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              backgroundColor: 'white',
            }}>
            <Text style={[style.font14Re, {color: colors.primaryColor}]}>
              {item.status}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default OrderCardCC;
