import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import PaymentCardImg from '../../assets/Pay.svg';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';

const BalanceCard = ({amount, accountType, date, status}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 10,
        padding: 14,
        borderColor: '#DFDFDF',
        marginVertical: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        <PaymentCardImg />
        <View
          style={{
            justifyContent: 'space-between',
            height: 70,
            marginLeft: 10,
          }}>
          <Text style={[style.font16Re]}>${amount}</Text>
          <Text style={[style.font12Re, {color: '#8C8994'}]}>
            {accountType}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primaryColor,
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              borderRadius: 50,
            }}>
            <Text style={[style.font10Re, {color: colors.white}]}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{justifyContent: 'space-between', height: 70}}>
        <Text style={[style.font12Re]}>{date}</Text>
        <Text style={[style.font12Re, {color: '#20BC3B'}]}>{status}</Text>
      </View>
    </View>
  );
};

export default BalanceCard;
