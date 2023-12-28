import React from 'react';
import {Modal, View, Text} from 'react-native';
import {BaseButton} from '../BaseButton';
import style from '../../assets/css/style';
import {colors} from '../../constraints';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {userType} from '../../store/reducer/usersSlice';
import {useTranslation} from 'react-i18next';

const DontHaveAccount = ({visible, closeModal, handleDontHave, message}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={closeModal}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white', // Use your color variable here
            alignItems: 'center',
            height: 200,
            width: '90%',
            justifyContent: 'space-evenly',
            borderRadius: 10,
            padding: 20,
          }}>
          <Text style={[style.font14Re, {textAlign: 'center'}]}>{message}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <BaseButton
              title={t('Cancel')}
              onPress={closeModal}
              defaultStyle={{
                width: 130,
                height: 35,
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.primaryColor,
              }}
              textStyle={[style.font14Re, {color: colors.primaryColor}]}
            />

            <BaseButton
              title={t('exit')}
              onPress={() => {
                return (
                  closeModal,
                  dispatch(userType({user_type: ''})),
                  navigation.replace('AuthStack', {
                    screen: 'Wellcome',
                    wantCreate: 'yes',
                  })
                );
              }}
              textStyle={[style.font14Re, {color: colors.white}]}
              defaultStyle={{width: 130, height: 35}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DontHaveAccount;

//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const handleDontHave = () => {
//     // Implement your delete logic here
//     // ...
//     setShowDeleteModal(false);
//   };

//     <ModalComponent
//       visible={showDeleteModal}
//       closeModal={() => setShowDeleteModal(false)}
//       handleDontHave={handleDontHave}
//       message="Are you sure you want to delete!"
//     />;
