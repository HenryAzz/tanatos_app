import {
  StyleSheet,
  Image,
  top,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';
import {useNavigation} from '@react-navigation/native';
import TextCard from '../E-Receipt/TextCard';

const Card = ({price, size, image, title, onPress}) => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState(1);
  const increment = () => {
    setAmount(amount + 1);
  };
  const decrement = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };
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
          padding: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
          }}>
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
              // alignItems: 'flex-start',
              // justifyContent: 'space-around',
              // height: 100,
              paddingHorizontal: 10,
              // width: '62%',
              backgroundColor: colors.white,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              // elevation: 4,
            }}>
            <View style={{alignItems: 'flex-start'}}>
              <Text style={[style.font22Re, {fontFamily: fonts.bold}]}>
                {price}
              </Text>
              <Text style={[style.font14Re, {fontFamily: fonts.bold}]}>
                {title}
              </Text>

              {/* <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  marginTop: 14,
                }}>
                <TouchableOpacity
                  onPress={decrement}
                  style={{
                    backgroundColor: colors.primaryColor,
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={[style.font22Re, {color: colors.white}]}>-</Text>
                </TouchableOpacity>
                <Text style={[style.font20Re, {marginHorizontal: 10}]}>
                  {amount}
                </Text>
                <TouchableOpacity
                  onPress={increment}
                  style={{
                    backgroundColor: colors.primaryColor,
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={[style.font22Re, {color: colors.white}]}>+</Text>
                </TouchableOpacity>
              </View> */}
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
        <View style={{width: '100%', alignSelf: 'center', marginVertical: 10}}>
          <TextCard title={'Amount'} price={'$100.00'} />
          <TextCard title={'Promo'} price={'$15.00'} />
          <TextCard title={'Total'} price={'$85.00'} />
          <Text
            style={[
              style.font16Re,
              {
                fontFamily: fonts.bold,
                borderBottomColor: '#E0E0E0',
                borderBottomWidth: 1,
                // paddingBottom: 10,
                alignSelf: 'center',
                width: '100%',
                textAlign: 'center',
                paddingTop: 10,
                paddingBottom: 15,
              },
            ]}>
            Payment Method
          </Text>
          <TextCard title={'Payment Method'} price={'E-wallet'} />
          <TextCard title={'Date'} price={'Dec,15, 2023'} />
          <TextCard title={'Transaction ID'} price={'SH678798566'} />
        </View>
      </View>
    </>
  );
};

export default Card;

const styles = StyleSheet.create({});
