import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import CraditCard from '../../assets/images/svg/Creditcard.svg';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import Icon from 'react-native-vector-icons/Ionicons';
import AddToCardSheet from '../../components/AddToCardSheet';
import {useNavigation} from '@react-navigation/native';
import CardPayment from './CardPayment';
import BalanceModal from './BallanceModal';
import {BaseButton} from '../../components/BaseButton';
const PaymentMethod = () => {
  const navigation = useNavigation();
  const ref = useRef(null);
  const openBottomSheet = () => {
    ref.current.open();
  };

  return (
    <Layout>
      <AppHeader title={'PaymentMethod'} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.primaryColor,
          height: 60,
          padding: 10,
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CraditCard />
          <Text
            style={[style.font20Re, {fontFamily: fonts.bold, marginLeft: 20}]}>
            ..... .... .... 5677
          </Text>
        </View>
        <TouchableOpacity
          onPress={openBottomSheet}
          style={{
            backgroundColor: colors.primaryColor,
            width: 20,
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
          }}>
          <Icon name="add" color={colors.white} size={18} />
        </TouchableOpacity>
      </View>
      <CardPayment
        title={'Paypal'}
        source={require('../../assets/paypal.png')}
      />
      <CardPayment
        title={'Apple Pay'}
        source={require('../../assets/apple.png')}
      />
      <CardPayment
        title={'Google Pay'}
        source={require('../../assets/google.png')}
      />
      <AddToCardSheet bottomSheetRef={ref} />
    </Layout>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({});
