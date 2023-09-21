import {
  StyleSheet,
  Image,
  top,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';
import {useNavigation} from '@react-navigation/native';
import TextCard from './TextCard';

const ECard = ({price, size, image, title, onPress}) => {
  const navigation = useNavigation();
  return (
    <>
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
            //   elevation: 4,

            // width: '100%',  elevation: 4,
            // backgroundColor: 'red',
          }}>
          {/* <Text>sdsdsds</Text> */}
          <Image
            style={{
              height: 100,
              width: 120,

              elevation: 4,
            }}
            source={image}
          />
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
            <View
              style={
                {
                  // flexDirection: 'row',
                  // alignItems: 'center',
                  // justifyContent: 'space-between',
                }
              }>
              <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
                {title}
              </Text>
              <Text
                style={[style.font16Re, {color: '#8C8C8C', marginVertical: 6}]}>
                {size}
              </Text>
              <Text style={[style.font22Re, {fontFamily: fonts.bold}]}>
                {price}
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
        </View>
      </View>
      <View style={{width: '100%', marginTop: 50}}>
        <TextCard title={'Amount'} price={'$100'} />
        <TextCard title={'Subtotal'} price={'$85'} />
        <TextCard title={'Shipping'} price={'Free'} />
      </View>
    </>
  );
};

export default ECard;

const styles = StyleSheet.create({});
