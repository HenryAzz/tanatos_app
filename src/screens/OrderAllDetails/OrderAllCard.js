/// for future use import React from 'react';

import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';
import {useNavigation} from '@react-navigation/native';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';

const OrderAllCard = ({
  price,
  address,
  images,
  title,
  onPress,
  status,
  accept,
  cancel,
  account_Type,
  track,
  funeral_location,
  id,
}) => {
  // console.log(account_Type, '123456');
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          width: '97%',
          // height: 100,
          alignSelf: 'center',
          // backgroundColor: 'red',
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
            // backgroundColor: 'red',
          }}>
          {images ? (
            <View style={{height: 100, width: 120}}>
              <ImageSwiper
                images={images}
                // imageStyle={{width: '80%', height: '80%'}}
              />
            </View>
          ) : null}
          <View
            style={{
              justifyContent: 'space-evenly',
              height: 100,
              // width: '100%',
              paddingHorizontal: 10,
              width: '62%',
              // backgroundColor: 'red',
              // backgroundColor: colors.white,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            {/* <Text>{id}</Text> */}
            <View
              style={{
                flexDirection: 'row',
                // width: '60%',
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
                {title}
              </Text>
            </View>
            <Text
              style={[
                style.font12Re,
                {
                  color: colors.textGray,
                  fontFamily: fonts.medium,
                  color: '#8C8994',
                  top: 4,
                },
              ]}>
              {funeral_location}
            </Text>
            <Text
              style={[
                style.font10Re,
                {
                  color: colors.textGray,
                  fontFamily: fonts.medium,
                  color: '#8C8994',
                },
              ]}>
              {address}
            </Text>
          </View>
        </View>
      </View>
      <View>{/* ///////////////////////// */}</View>
    </>
  );
};

export default OrderAllCard;
