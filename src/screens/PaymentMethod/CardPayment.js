import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';

const CardPayment = ({title, source}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PaymentConfirmOtp')}
      style={{
        height: 60,
        marginVertical: 10,
        elevation: 5,
        backgroundColor: colors.white,
        alignItems: 'center',
        paddingLeft: 14,
        // justifyContent: 'center',
        width: '100%',
        borderRadius: 10,
        shadowColor: colors.elev,
        flexDirection: 'row',
      }}>
      <Image source={source} style={{height: 28, width: 28}} />
      <Text style={[style.font16Re, {fontFamily: fonts.bold, paddingLeft: 20}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CardPayment;

const styles = StyleSheet.create({});
