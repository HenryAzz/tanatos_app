import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';

const AppHeader = ({title, subTitle, onPress, status, defaultStyle}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          justifyContent: 'space-between',
          width: '90%',
          marginTop: 16,
          marginBottom: 20,
        },
        defaultStyle,
      ]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
        <Image
          source={require('../../assets/BackButtonp.png')}
          style={{height: 44, width: 44}}
        />
      </TouchableOpacity>
      <Text style={[style.font20Re, {fontFamily: fonts.medium}]}>{title}</Text>
      {title === 'Add Obituaries' && status === 'before' ? (
        <TouchableOpacity onPress={onPress}>
          <Text>Skip</Text>
        </TouchableOpacity>
      ) : (
        <Text> </Text>
      )}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({});
