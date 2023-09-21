import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import PaymentCardImg from '.././../assets/Pay.svg';
import BalanceCard from './BalanceCard';
import Withdraw from '../../assets/Witdraw.svg';
import PaymentToCardSheet from '../../components/PaymentToCardSheet';
const BallanceScreen = () => {
  const ref = useRef(null);
  const openBottomSheet = () => {
    ref.current.open();
  };

  const data = [
    {
      id: '1',
      amount: '1556.36',
      accountType: 'Your Master Card Account',
      date: '25 Oct 2021',
      status: 'SUCCESS',
    },

    {
      id: '2',
      amount: '1556.36',
      accountType: 'Your Master Card Account',
      date: '25 Oct 2021',
      status: 'SUCCESS',
    },

    {
      id: '3',
      amount: '1556.36',
      accountType: 'Your Master Card Account',
      date: '25 Oct 2021',
      status: 'SUCCESS',
    },

    {
      id: '4',
      amount: '1556.36',
      accountType: 'Your Master Card Account',
      date: '25 Oct 2021',
      status: 'SUCCESS',
    },
    {
      id: '5',
      amount: '1556.36',
      accountType: 'Your Master Card Account',
      date: '25 Oct 2021',
      status: 'SUCCESS',
    },
    {
      id: '6',
      amount: '1556.36',
      accountType: 'Your Master Card Account',
      date: '25 Oct 2021',
      status: 'SUCCESS',
    },
  ];
  return (
    <Layout>
      <AppHeader title={'Balance'} />

      <View style={{alignSelf: 'flex-start', width: '100%', flex: 1}}>
        <ImageBackground
          source={require('../../assets/WitdrawBg.png')}
          style={{height: 200, width: '100%', marginTop: -20}}>
          <View
            style={{
              top: 15,
              //   left: 20,
              padding: 20,
              justifyContent: 'space-between',
            }}>
            <Text style={[style.font16Re, {color: colors.white}]}>
              Available Balance
            </Text>
            <Text
              style={[
                style.font30Re,
                {
                  color: colors.white,
                  fontFamily: fonts.bold,
                  marginVertical: 10,
                },
              ]}>
              $5830.26
            </Text>
            <TouchableOpacity
              onPress={openBottomSheet}
              style={{
                alignSelf: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                borderWidth: 1,
                marginTop: 10,
                padding: 5,
                borderColor: colors.white,
              }}>
              <Withdraw />
              <Text
                style={[
                  style.font12Re,
                  {color: colors.white, marginLeft: 5, top: 2},
                ]}>
                Withdraw
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
          Withdraw History
        </Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <BalanceCard
              amount={item.amount}
              accountType={item.accountType}
              date={item.date}
              status={item.status}
            />
          )}
        />
      </View>
      <PaymentToCardSheet bottomSheetRef={ref} />
    </Layout>
  );
};

export default BallanceScreen;

const styles = StyleSheet.create({});
