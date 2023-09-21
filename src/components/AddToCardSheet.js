import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import style from '../assets/css/style';
import {colors, fonts} from '../constraints';
import AppTextInput from './FloatingLabelInput';
import {BaseButton} from './BaseButton';
const AddToCardSheet = ({bottomSheetRef}) => {
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
            Add New Card
          </Text>
          <AppTextInput placeholder={'489348230948209'} />
          <AppTextInput placeholder={'Expiry Date'} />
          <AppTextInput placeholder={'CVC'} />
          <BaseButton title={'Add Card'} onPress={() => handleAddCard()} />
        </View>
      </View>
    </RBSheet>
  );
};

export default AddToCardSheet;

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
