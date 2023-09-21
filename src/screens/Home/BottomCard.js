import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';

const BottomCard = ({title, subtitle, onPress}) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        backgroundColor: colors.white,
        width: '98%',
        // marginTop: 10,
        padding: 15,
        margin: 4,
        // height: 120,
        // justifyContent: 'space-between',
        borderRadius: 15,
        elevation: 10,
        shadowColor: colors.elev,
        // backgroundColor: 'red',
      }}>
      <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>{title}</Text>
      <Text
        style={[
          style.font14Re,
          {color: colors.textGray, marginVertical: 6, width: 300},
        ]}>
        {subtitle}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={{
          borderWidth: 1,
          borderColor: colors.primaryColor,
          width: 110,
          alignItems: 'center',
          justifyContent: 'center',
          height: 33,
          //   marginBottom: 8,
          alignSelf: 'flex-end',
          borderRadius: 60,
        }}>
        <Text style={[style.font14Re, {color: colors.primaryColor}]}>
          Learn more
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomCard;

const styles = StyleSheet.create({});
