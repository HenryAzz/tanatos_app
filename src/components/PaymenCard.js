import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from '../assets/css/style';
import {colors, fonts} from '../constraints';
import Icon from 'react-native-vector-icons/Ionicons';
import Withdrawimg from '../assets/Pay.svg';

const PaymenCard = ({title, subTitle, source}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.borderColr,
        padding: 10,
        marginVertical: 10,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={source} style={{height: 20, width: 20}} />
        <View style={{marginLeft: 10}}>
          <Text style={[style.font16Re, {}]}>{title}</Text>
          <Text style={[style.font12Re, {color: '#8C8994'}]}>{subTitle}</Text>
        </View>
      </View>
    </View>
  );
};

export default PaymenCard;

const styles = StyleSheet.create({});
