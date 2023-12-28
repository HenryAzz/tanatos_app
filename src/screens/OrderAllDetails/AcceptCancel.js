import React from 'react';
import {Modal, View, Text} from 'react-native';
import {BaseButton} from '../../components/BaseButton';
import style from '../../assets/css/style';
import {useTranslation} from 'react-i18next';
import {colors, fonts} from '../../constraints';
const AcceptCancel = ({visible, onClose, onConfirm, title, subtitle}) => {
  const {t} = useTranslation();
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            height: 130,
            width: '90%',
            justifyContent: 'space-evenly',
            borderRadius: 10,
          }}>
          <Text style={[style.font16Re, {textAlign: 'center'}]}>
            {t(title)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '70%',
            }}>
            <BaseButton
              title={t('Cancel')}
              onPress={onClose}
              defaultStyle={{width: 100, height: 35}}
              textStyle={{fontSize: 12}}
            />

            <BaseButton
              title={t('Accept')}
              onPress={onConfirm}
              defaultStyle={{width: 100, height: 35}}
              textStyle={{fontSize: 12}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AcceptCancel;
