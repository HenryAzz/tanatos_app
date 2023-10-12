import React, {useState} from 'react';
import {Modal, StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import style from '../assets/css/style';
import {fonts} from '../constraints';
import {BaseButton} from './BaseButton';
// import PaymentDone from '../../assets/PaymentDone.svg';
const BuyNowb = ({isModalVisible, setModalVisible, source}) => {
  const navigation = useNavigation();
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
            source={source}
            style={{
              height: '72%',
              width: '100%',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}
          />
          <BaseButton
            title={'Buy'}
            defaultStyle={{
              marginBottom: 20,
              marginTop: 20,
              borderRadius: 30,
              width: '50%',
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
export default BuyNowb;
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#0000009E',
  },
  Wrapper: {
    height: '40%',
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 15,
    // padding: 10,
  },
});
