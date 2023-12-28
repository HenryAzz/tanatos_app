import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import {useTranslation} from 'react-i18next';

import Img from '../../assets/sympathy.svg';
import {colors, fonts} from '../../constraints';
import {BaseButton} from '../../components/BaseButton';
import {useNavigation, useRoute} from '@react-navigation/native';

const MemorialNote = () => {
  //
  const {t} = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const [sympathyText, setSympathyText] = useState('');

  const handlePress = () => {
    navigation.navigate('Checkout', {
      basicPrice: route.params?.basicPrice,
      dataTosend: route.params?.dataTosend,
      FuneralItemData: route.params?.FuneralItemData,
      sympathyText,
    });
  };

  return (
    <Layout>
      <AppHeader title={t('memorialNote1')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, paddingHorizontal: 15}}>
          <View style={{alignItems: 'center'}}>
            <Img />
          </View>
          <View>
            <TextInput
              value={sympathyText}
              style={styles.input}
              multiline
              maxLength={40}
              onChangeText={text => setSympathyText(text)}
            />
            <Text
              style={[
                styles.msg,
                {color: sympathyText?.length == 40 ? colors.red : colors.black},
              ]}>
              {t('memorialNote2')}
            </Text>
          </View>
          <BaseButton
            title={t('Send')}
            defaultStyle={{marginTop: 30, marginBottom: 5}}
            onPress={handlePress}
            disabled={!sympathyText.trim() != ''}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default MemorialNote;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F0F0F0',
    height: 110,
    marginTop: 30,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.black,
    textAlignVertical: 'top',
  },
  msg: {
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: 12,
    textAlign: 'right',
    marginTop: 10,
  },
});
