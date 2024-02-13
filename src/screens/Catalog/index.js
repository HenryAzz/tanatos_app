import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ApiRequest from '../../Services/ApiRequest';
import style from '../../assets/css/style';
import AppHeader from '../../components/AppHeader/AppHeader';
import {BaseButton} from '../../components/BaseButton';
import Layout from '../../components/Layout';
import {colors} from '../../constraints';
import OrderCardCC from '../HomeStore/OrderCardCC';
import OrderNotFound from '../MyOrder/OrderNotFound';
import {useSelector} from 'react-redux';

const Catalog = () => {
  //
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [catalogData, setCatalogData] = useState([]);
  const store = useSelector(store => store.user);

  const handleGetCatData = async () => {
    try {
      setLoading(true);
      setRefreshing(true);
      // setShowLoadingModal(true);
      const user_id = await AsyncStorage.getItem('user_id');
      const store_id = await AsyncStorage.getItem('store_id');
      if (
        !store_id ||
        store_id === null ||
        store_id === undefined ||
        store_id === 'null'
      ) {
        return setRefreshing(false);
      }
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'stores_gallery',
        user_id: user_id,
        store_id: JSON.parse(store_id),
        own: 1,
      });
      const resp = res.data?.data;

      setRefreshing(false);
      setCatalogData(resp);
      // setShowLoadingModal(false);
    } catch (err) {
      console.log(err);
      setRefreshing(false);
    }
  };

  const [bottomLoader, setBottomLoader] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    setScrolled(true);
  };
  const handleGetCatDataMore = async () => {
    try {
      setBottomLoader(true);
      // setShowLoadingModal(true);
      const user_id = await AsyncStorage.getItem('user_id');
      const store_id = await AsyncStorage.getItem('store_id');
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'stores_gallery',
        user_id: user_id,
        store_id: JSON.parse(store_id),
        own: 1,
        last_id: catalogData[catalogData.length - 1]?.id,
      });
      const resp = res.data.data;
      setBottomLoader(false);
      if (resp && resp != undefined && resp.length > 0) {
        setCatalogData([...catalogData, ...resp]);
      }
      // console.log(resp, 'resp///');
      // setCatalogData(resp);
      // setShowLoadingModal(false);
    } catch (err) {
    } finally {
      setBottomLoader(false);
      // setShowLoadingModal(false);
      // setLoading(false);
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    handleGetCatData();
  }, [isFocused]);
  const navigation = useNavigation();
  const onRefresh = () => {
    setRefreshing(true);
    handleGetCatData();
  };
  const {t} = useTranslation();
  return (
    <Layout>
      <AppHeader title={t('Catalog')} />
      <View style={{flex: 1}}>
        <FlatList
          data={catalogData}
          ListEmptyComponent={
            !refreshing && (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  width: '100%',
                  alignSelf: 'center',
                }}>
                <OrderNotFound
                  title={t('Not Found data')}
                  subtitle={t("You don't have any data at this time")}
                />
                {Object.keys(store?.store)?.length !== 0 && (
                  <BaseButton
                    title={t('Add Gallery')}
                    onPress={() => navigation.navigate('AddFlowers')}
                  />
                )}
              </View>
            )
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginHorizontal: 4,
          }}
          numColumns={2}
          onScroll={handleScroll}
          onEndReached={scrolled ? handleGetCatDataMore : null}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            bottomLoader && (
              <ActivityIndicator size="large" color={colors.gray} />
            )
          }
          ListFooterComponentStyle={{
            width: '100%',
            marginTop: 5,
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CatalogDetail', {catalog: item})
              }>
              <OrderCardCC item={item} images={item?.images} />
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      {catalogData?.length > 0 && (
        <BaseButton
          defaultStyle={{
            height: 30,
            width: 120,
            alignSelf: 'flex-start',
            marginBottom: 20,
            position: 'absolute',
            bottom: 0,
            zIndex: 11,
            alignSelf: 'center',
          }}
          textStyle={[style.font12Re, {color: colors.white}]}
          title={t('Add More Gallery')}
          onPress={() => navigation.navigate('AddFlowers')}
        />
      )}
    </Layout>
  );
};

export default Catalog;

const styles = StyleSheet.create({
  d: {},
});
