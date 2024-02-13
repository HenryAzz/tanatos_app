import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import style from '../../assets/css/style';
import {colors} from '../../constraints';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {userId, userStore, userType} from '../../store/reducer/usersSlice';
const LogoutBottomSheet = ({bottomSheetRef}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    bottomSheetRef.current.close();
    await AsyncStorage.clear();
    dispatch(userType({userType: ''}));
    dispatch(userId({user_id: ''}));
    dispatch(userStore({}));
    navigation.replace('AuthStack', {screen: 'login'});
  };
  const {t} = useTranslation();
  return (
    <RBSheet
      ref={bottomSheetRef}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={220}
      openDuration={250}
      customStyles={{
        wrapper: {},
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
          {/* <Text
            style={[style.font16Re, {marginVertical: 15, textAlign: 'center'}]}>
            {t('Hold On!')}
          </Text> */}
          <Text
            style={[style.font18Re, {marginVertical: 15, textAlign: 'center'}]}>
            {t('Are you sure you want to logout?')}
          </Text>
        </View>
        <View style={[style.justifySpaBtwRow, {marginBottom: 20}]}>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current.close();
            }}
            style={[styles.Btn, {backgroundColor: colors.primaryColor}]}>
            <Text style={[style.font16Re, {color: colors.white}]}>
              {t('Cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            style={[styles.Btn, {backgroundColor: colors.primaryColor}]}>
            <Text style={[style.font16Re, {color: colors.white}]}>
              {t('Logout1')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </RBSheet>
  );
};

export default LogoutBottomSheet;

const styles = StyleSheet.create({
  Btn: {
    width: '46%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.primaryColor,
    // borderColor: colors.btnColor,
  },
});
