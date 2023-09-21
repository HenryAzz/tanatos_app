import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';

const TextCardView = ({title, subtitle, onPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
      }}>
      <Text style={[style.font20Re, {fontFamily: fonts.bold}]}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={[style.font14Re, {color: colors.primaryColor}]}>
          {subtitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextCardView;

const styles = StyleSheet.create({});
