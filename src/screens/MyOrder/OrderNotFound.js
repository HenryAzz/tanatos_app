import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import OrderNot from '../../assets/images/fav/NotFoundOrder.png';
import {useTranslation} from 'react-i18next';

const OrderNotFound = ({title, subtitle}) => {
  const {t, i18n} = useTranslation();

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Image source={OrderNot} style={{height: 250, width: 250}} />
      <Text style={[style.font20Re, {fontFamily: fonts.bold}]}>
        {title ? title : t('No Order Yet')}
      </Text>
      <Text style={[style.font14Re, {paddingBottom: 20, marginVertical: 15}]}>
        {subtitle
          ? subtitle
          : t("You don't have an ongoing orders at this time")}
      </Text>
    </View>
  );
};

export default OrderNotFound;

const styles = StyleSheet.create({});
