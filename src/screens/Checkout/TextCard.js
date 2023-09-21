import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import style from '../../assets/css/style';

const TextCard = ({title, price}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '96%',
        // borderBottomColor: '#E0E0E0',
        // borderBottomWidth: 1,
        paddingBottom: 10,
        marginVertical: 5,
      }}>
      <Text style={[style.font14Re]}>{title}</Text>
      <Text style={[style.font14Re]}>{price}</Text>
    </View>
  );
};

export default TextCard;

const styles = StyleSheet.create({});
