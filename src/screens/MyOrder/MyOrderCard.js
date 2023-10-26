import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';
import {useNavigation} from '@react-navigation/native';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';
import Icon from 'react-native-vector-icons/Entypo';
const MyOrderCard = ({
  price,
  phone,
  name,
  location,
  address,
  images,
  title,
  onPress,
  status,
  accept,
  cancel,
  account_Type,
  track,
  id,
  totalPrice,
}) => {
  // console.log(account_Type, '123456');
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: account_Type === 'store ' ? '98%' : null,
        marginVertical: 5,
        marginHorizontal: 5,
        height: 120,
        // backgroundColor: 'red',
        marginTop: 20,
        // margin: 6,
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
        <View
          style={{
            height: 120,
            padding: 12,
            width: '100%',
            // backgroundColor: colors.white,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* <Text>{id}</Text> */}
          <View
            style={{
              flex: 1,
              // width: '70%',
              // flexDirection: 'row',
              // alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                style.font16Re,
                {fontFamily: fonts.bold, color: colors.black},
              ]}>
              {name}
            </Text>
            <Text
              style={[style.font14Re, {color: colors.black, marginTop: 10}]}>
              {phone}
            </Text>
            <View style={{flex: 1}}>
              <Text
                style={[style.font14Re, {color: colors.black}]}
                numberOfLines={2}>
                {location}
              </Text>
            </View>
          </View>
          <View
            style={{alignItems: 'flex-end', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={onPress}>
              <Icon
                name="chevron-right"
                color={colors.primaryColor}
                size={28}
              />
            </TouchableOpacity>
            <Text style={[style.font14Re, {fontFamily: fonts.bold}]}>
              {totalPrice}$
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyOrderCard;
