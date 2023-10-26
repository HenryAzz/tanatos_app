import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../constraints';

const ModalLoadingTrans = ({showLoadingModal, setShowLoadingModal}) =>
  showLoadingModal ? (
    <Modal
      transparent
      visible={showLoadingModal}
      animationType="fade"
      onRequestClose={() => setShowLoadingModal(false)}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    </Modal>
  ) : null;

export default ModalLoadingTrans;

const styles = StyleSheet.create({});
