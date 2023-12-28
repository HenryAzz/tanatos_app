import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import {colors} from '../constraints';
import {BaseButton} from './BaseButton';
import style from '../assets/css/style';
import {useTranslation} from 'react-i18next';

const ConfirmationModal = ({
  visible,
  setVisible,
  onPress,
  message,
  loading,
}) => {
  //
  const {t} = useTranslation();
  const hideModal = () => {
    setVisible(false);
  };
  return (
    <Modal
      visible={visible}
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      style={{margin: 0}}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.btn} onPress={hideModal}>
            <Icon name="closecircle" color={colors.black} size={25} />
          </TouchableOpacity>
          <Text style={[style.font20Re, {textAlign: 'center'}]}>
            {t('Hold On!')}
          </Text>
          <Text
            style={[style.font16Re, {marginVertical: 23, textAlign: 'center'}]}>
            {message}
          </Text>
          <View style={[style.justifySpaBtwRow]}>
            <BaseButton
              title={t('Cancel')}
              defaultStyle={{
                width: '47%',
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.softGray,
              }}
              textStyle={{color: colors.black}}
              onPress={hideModal}
            />
            <BaseButton
              title={t('Delete')}
              defaultStyle={{width: '47%'}}
              onPress={onPress}
              loading={loading}
              disabled={loading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0000009E',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  contentContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  btn: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 30,
    height: 30,
    borderWidth: 1,
  },
});
