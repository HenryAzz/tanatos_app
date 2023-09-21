import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import style from '../assets/css/style';
import {colors, fonts} from '../constraints';
import AppTextInput from './FloatingLabelInput';
import {BaseButton} from './BaseButton';
import Icon from 'react-native-vector-icons/Ionicons';
import Withdrawimg from '../assets/Pay.svg';
import PaymenCard from './PaymenCard';
const PaymentToCardSheet = ({bottomSheetRef}) => {
  const navigation = useNavigation();
  const handleAddCard = async () => {
    bottomSheetRef.current.close();
    // navigation.replace('AuthStack', {screen: 'Login'});
  };
  return (
    <RBSheet
      ref={bottomSheetRef}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={340}
      openDuration={250}
      customStyles={{
        wrapper: {
          // backgroundColor: 'transparent',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 20,
        },
      }}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text
            style={[
              style.font20Re,
              {fontFamily: fonts.bold, marginVertical: 15, textAlign: 'center'},
            ]}>
            Withdraw To
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.borderColr,
              padding: 10,
              marginVertical: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Withdrawimg />
              <View style={{marginLeft: 10}}>
                <Text style={[style.font16Re, {}]}>Master Card</Text>
                <Text style={[style.font12Re, {color: '#8C8994'}]}>
                  **********0937
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleAddCard}
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
          <PaymenCard
            title={'Paypal'}
            subTitle={'uth123@gmail.com'}
            source={require('../assets/paypal.png')}
          />
          <BaseButton
            title={'Withdraw'}
            onPress={() => handleAddCard()}
            defaultStyle={{marginVertical: 20}}
          />
        </View>
      </View>
    </RBSheet>
  );
};

export default PaymentToCardSheet;

const styles = StyleSheet.create({
  Btn: {
    width: '46%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.primaryColor,
    borderColor: colors.primaryColor,
  },
});
