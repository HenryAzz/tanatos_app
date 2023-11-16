import React, {useEffect, useState} from 'react';
import style from '../../assets/css/style';
import {colors} from '../../constraints';
import {deviceWidth} from '../../constants/Dimentions';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
const ProfileCard = ({title, source, onPress}) => {
  const {t, i18n} = useTranslation();
  const toggleLanguage = async () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('es'); // Switch to Spanish
    } else {
      i18n.changeLanguage('en'); // Switch to English
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        {
          // flexDirection: 'row',
          // alignItems: 'center',
          // justifyContent: 'space-between',
        }
      }>
      <View
        style={{
          paddingHorizontal: 10,
          // width: '100%',
          // backgroundColor: 'red',
          flexDirection: 'row',
          marginVertical: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: colors.line,
              padding: 10,
              borderRadius: 50,
            }}>
            <Image
              source={source}
              style={{height: 20, width: 20, tintColor: colors.primaryColor}}
              // resizeMode="center"
            />
          </View>
          <Text style={[style.font16Re, {paddingLeft: 16}]}>{t(title)}</Text>
        </View>
        <Icon name={'chevron-forward'} size={22} color={colors.primaryColor} />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({});
