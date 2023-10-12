import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import {useNavigation} from '@react-navigation/native';

const AuthHeader = ({title, subTitle, defaultStyle}) => {
  const navigation = useNavigation();
  return (
    <View style={{alignSelf: 'flex-start', marginBottom: 25, marginTop: 15}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/BackButtonp.png')}
          style={{height: 50, width: 50, left: -12}}
        />
      </TouchableOpacity>
      <Text style={[style.font24Re, {fontFamily: fonts.bold, marginTop: 10}]}>
        {title}
      </Text>
      <Text style={[style.font14Re, {color: '#A2A2A2'}]}>{subTitle}</Text>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({});
