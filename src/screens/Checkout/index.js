import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import {BaseButton} from '../../components/BaseButton';
import Cardpic from '../../assets/images/svg/Card.svg';
import Cardpic1 from '../../assets/images/svg/Card1.svg';
import Icon from 'react-native-vector-icons/Ionicons';
import TextCard from './TextCard';
import {useNavigation} from '@react-navigation/native';
import {devWidth} from '../../constraints/Dimentions';
const CheckoutScreen = () => {
  const navigation = useNavigation();
  return (
    <Layout>
      <AppHeader title={'Checkout'} />

      {/* <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}> */}
      <View style={{alignSelf: 'flex-start', width: '100%'}}>
        <Text
          style={[style.font18Re, {fontFamily: fonts.bold, marginBottom: 10}]}>
          Shipping Address
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.white,
            elevation: 4,
            shadowColor: colors.elev,
            borderWidth: 1,
            borderColor: colors.line,
            justifyContent: 'space-between',
            padding: 10,
            borderRadius: 10,
            marginVertical: 14,
            // marginBottom: 30,
          }}>
          <Text style={[style.font16Re]}>Home delivery</Text>
          <Icon
            name="chevron-down-outline"
            size={22}
            color={colors.primaryColor}
          />
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            elevation: 4,
            shadowColor: colors.elev,
            padding: 20,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}>
            <Text style={[style.font14Re, {marginBottom: 10}]}>Jane Doe</Text>
            <Text
              style={[
                style.font14Re,
                {
                  color: '#DB3022',
                  alignItems: 'flex-end',
                  //   fontFamily: fonts.bold,
                },
              ]}>
              Change
            </Text>
          </View>
          <Text style={[style.font14Re, {width: 200}]}>
            3 Newbridge Court Chino Hills, CA 91709, United States
          </Text>
        </View>
        <Text
          style={[style.font14Re, {alignSelf: 'flex-end', marginVertical: 4}]}>
          we send to the funeral home
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            marginTop: 20,
            // marginVertical: 14,
          }}>
          <Text style={[style.font18Re, {fontFamily: fonts.bold}]}>
            Payment
          </Text>

          <Text
            style={[
              style.font14Re,
              {
                color: '#DB3022',
                alignItems: 'flex-end',
                paddingRight: 24,
                //   fontFamily: fonts.bold,
              },
            ]}>
            Change
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <View
            style={{
              elevation: 4,
              backgroundColor: colors.white,
              borderRadius: 8,
            }}>
            <Cardpic />
          </View>
          <Text style={[style.font14Re, {marginLeft: 20}]}>
            **** **** **** 3947
          </Text>
        </View>
        <View>
          <Text style={[style.font18Re, {fontFamily: fonts.bold}]}>
            Payment Method
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F5F5F5',
              borderWidth: 1,
              borderColor: colors.line,
              justifyContent: 'space-between',
              padding: 10,
              borderRadius: 10,
              marginVertical: 14,
              marginBottom: 30,
            }}>
            <Text style={[style.font16Re]}>My Wallet</Text>
            <Icon
              name="chevron-forward-outline"
              size={22}
              color={colors.primaryColor}
            />
          </View>
          <TextCard title={'Order:'} price={'112$'} />
          <TextCard title={'Delivery:'} price={'15$'} />
          <TextCard title={'Summay:'} price={'127$'} />
        </View>
      </View>
      {/* </ScrollView> */}
      <BaseButton
        title={'Continue to Payment'}
        onPress={() => navigation.navigate('ShippingAddress')}
        defaultStyle={{marginTop: 33, marginBottom: 20}}
      />
    </Layout>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});
