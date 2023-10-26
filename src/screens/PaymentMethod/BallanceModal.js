import React from 'react';
import {Modal, StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BaseButton} from '../../components/BaseButton';
import PaymentDone from '../../assets/PaymentDone.svg';
import style from '../../assets/css/style';
import {fonts} from '../../constraints';
import {useTranslation} from 'react-i18next';
const BalanceModal = ({
  isModalVisible,
  setModalVisible,
  total_amount,
  dataTosend,
}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        console.log('close modal');
        setModalVisible(false);
        navigation.navigate('Home');
      }}>
      {/* <Text>smdjkh</Text> */}
      <View
        style={styles.modalBackground}
        // onPress={() => {
        //   setModalVisible(false);
        //   navigation.navigate('Home');
        // }}
      >
        <View
          style={[
            styles.Wrapper,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <Image
            source={require('../../assets/Payment.png')}
            style={{height: 90, width: 90}}
          />
          <Text
            style={[
              style.font24Re,
              {fontFamily: fonts.medium, marginVertical: 20},
            ]}>
            {t('Order Successful!!!')}
          </Text>
          <Text
            style={[
              style.font16Re,
              {fontFamily: fonts.medium, marginBottom: 40},
            ]}>
            {t('You have successfully made order')}
          </Text>
          {/* <BaseButton
            title={'View Order'}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('MainStack', {
                screen: 'ViewOrder',
                params: {
                  total_amount: total_amount,
                  dataTosend: dataTosend,
                },
              });
            }}
            defaultStyle={{marginVertical: 0, borderRadius: 30, width: '60%'}}
          /> */}
          <BaseButton
            title={'Goto Home'}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('MainStack', {screen: 'AppStack'});
            }}
            defaultStyle={{marginVertical: 20, borderRadius: 30, width: '60%'}}
          />
          {/* <BaseButton
            title={'Go Back'}
            onPress={() => navigation.goBack()}
            defaultStyle={{marginVertical: 0, borderRadius: 30, width: '60%'}}
          /> */}
          {/* <View style={styles.flexDirectionRow}>
                  
            <Pressable
              style={styles.justifyContent}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('PrepaidMobilePakage');
              }}>
              <View
                style={[
                  styles.justifyContent,
                  {
                    width: 82,
                    height: 82,
                    backgroundColor: '#fff',
                    elevation: 10,
                    borderRadius: 10,
                  },
                ]}>
                <Image
                  source={mobilePackage}
                  style={{width: 48.13, height: 48.13}}
                />
              </View>
              <Text
                style={[
                  styles.font14,
                  {marginTop: 15, width: 100, fontFamily: 'Gilroy-Medium'},
                ]}>
                Mobile Package
              </Text>
            </Pressable>
          </View> */}
        </View>
      </View>
    </Modal>
  );
};
export default BalanceModal;
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#0000009E',
  },
  Wrapper: {
    height: '65%',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
  },
});
