import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AIcon from 'react-native-vector-icons/AntDesign';

import style from '../../assets/css/style';
import AppHeader from '../../components/AppHeader/AppHeader';
import {BaseButton} from '../../components/BaseButton';
import ConfirmationModal from '../../components/ConfirmationModal';
import Layout from '../../components/Layout';
import {colors, constants, fonts} from '../../constraints';
import ApiRequest from '../../Services/ApiRequest';
import {ToastMessage} from '../../utils/Toast';

const CatalogDetail = () => {
  //
  const {t} = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const catalog = route.params?.catalog;
  const flowerImg = catalog?.images?.length > 0 ? catalog.images[0] : '';

  // console.log(catalog);

  const deleteFlower = async () => {
    try {
      if (!catalog?.id) {
        return false;
      }
      setLoading(true);
      const dataToDelete = {
        type: 'delete_data',
        table_name: 'stores_gallery',
        id: catalog?.id,
      };
      const res = await ApiRequest(dataToDelete);
      if (res.data?.result) {
        setVisible(false);
        ToastMessage(res.data?.message);
        navigation.navigate('AddNews');
        setLoading(false);
      } else {
        console.log('err in deleting flower');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <AppHeader title={t('catalogDetail1')} />
      <View style={{paddingHorizontal: 10}}>
        <View style={style.justifySpaBtwRow}>
          <Text style={styles.title}>{t('catalogDetail2')}:</Text>
          <View style={style.justifyRow}>
            <TouchableOpacity
              style={{width: 30, height: 30}}
              onPress={() =>
                navigation.navigate('AddFlowers', {flower: catalog})
              }>
              <AIcon name="edit" color={colors.black} size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[style.justify, {marginBottom: 10}]}>
          <Image
            source={{uri: constants.baseUrl + flowerImg}}
            style={styles.flowerImg}
          />
        </View>
        <View style={[style.justifySpaBtwRow, {marginBottom: 10}]}>
          <Text style={style.font16Re}>{t('catalogDetail3')}:</Text>
          <View style={{width: 170, alignItems: 'flex-end'}}>
            <Text
              style={[style.font16Re, {fontFamily: fonts.medium}]}
              numberOfLines={1}>
              {catalog?.name}
            </Text>
          </View>
        </View>
        <View style={[style.justifySpaBtwRow, {marginBottom: 10}]}>
          <Text style={style.font16Re}>{t('catalogDetail4')}:</Text>
          <View style={{width: 240, alignItems: 'flex-end'}}>
            <Text
              style={[style.font16Re, {fontFamily: fonts.medium}]}
              numberOfLines={1}>
              {catalog?.description}
            </Text>
          </View>
        </View>
        <View style={[style.justifySpaBtwRow, {marginBottom: 10}]}>
          <Text style={style.font16Re}>{t('catalogDetail6')}:</Text>
          <View style={{width: 170, alignItems: 'flex-end'}}>
            <Text
              style={[style.font16Re, {fontFamily: fonts.medium}]}
              numberOfLines={1}>
              {catalog?.price}€
            </Text>
          </View>
        </View>
        <View style={{marginVertical: 20}}>
          <BaseButton
            title={t('catalogDetail7')}
            onPress={() => setVisible(true)}
          />
        </View>
      </View>
      <ConfirmationModal
        message={t('Are you sure you want to delete !')}
        visible={visible}
        setVisible={setVisible}
        onPress={deleteFlower}
        loading={loading}
      />
    </Layout>
  );
};

export default CatalogDetail;

const styles = StyleSheet.create({
  flowerImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 15,
    marginVertical: 20,
  },
  title: {
    marginVertical: 10,
    color: colors.black,
    fontSize: 18,
    fontFamily: fonts.medium,
  },
});
