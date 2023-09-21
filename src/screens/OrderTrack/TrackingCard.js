import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';

const TrackingCard = ({title, source, source1}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image source={source} style={{height: 35, width: 35}} />
      <Text
        style={[
          style.font14Re,
          {
            fontFamily: fonts.bold,
            color: colors.primaryColor,
            paddingVertical: 16,
          },
        ]}>
        {title}
      </Text>

      <Image source={source1} style={{height: 18, width: 18}} />
    </View>
  );
};

export default TrackingCard;

const styles = StyleSheet.create({});
