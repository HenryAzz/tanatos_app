import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import OTPComponent from '../../components/OTPComponent';
import AppHeader from '../../components/AppHeader/AppHeader';
import BalanceModal from '../PaymentMethod/BallanceModal';
import {BaseButton} from '../../components/BaseButton';

const PaymentConfirmOtp = () => {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (parseInt(value) === 1234) {
      setModalVisible(true);
    }
  }, [value]);
  return (
    <Layout>
      <AppHeader title={'Your Pin'} />
      <View style={{alignSelf: 'flex-start'}}>
        <OTPComponent value={value} setValue={setValue} />
      </View>
      <BalanceModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      {/* <BaseButton title={'Modal open'} onPress={() => setModalVisible(true)} /> */}
    </Layout>
  );
};

export default PaymentConfirmOtp;

const styles = StyleSheet.create({});
