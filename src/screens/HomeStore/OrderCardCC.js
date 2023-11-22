import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';

const OrderCardCC = ({item, images}) => {
  return (
    <View
      style={{
        // width: 158,
        backgroundColor: colors.white,
        elevation: 5,
        shadowColor: colors.elev,
        borderRadius: 10,
        marginBottom: 14,
        // width: '45%',
      }}>
      <View style={{height: 120, width: 155}}>
        <ImageSwiper images={images} />
      </View>

      <Text style={[style.font14Re, {padding: 10}]}>{item.name}</Text>
      <View
        style={{
          flexDirection: 'row',

          alignItems: 'center',
          paddingBottom: 10,
          paddingLeft: 10,
          //   paddingVertical: 10,
          justifyContent: 'space-between',
        }}>
        <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
          {item.price}$
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 120,
    width: 158,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    // margin: 10,
    marginVertical: 10,
  },
});
