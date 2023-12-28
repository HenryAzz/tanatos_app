import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import ApiRequest from '../../Services/ApiRequest';
import AppHeader from '../../components/AppHeader/AppHeader';
import Layout from '../../components/Layout';
import OrderNotFound from '../MyOrder/OrderNotFound';
import CardList from './CardList';

const Favorite = () => {
  //
  const navigation = useNavigation();

  const [storeData, setStoreData] = useState();

  const [loading, setLoading] = useState();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    handleGetStoreData();
  };
  const [bottomLoader, setBottomLoader] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    setScrolled(true);
  };

  const handleGetStoreData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    if (user_id) {
      try {
        setShowLoadingModal(true);
        setLoading(true);
        const res = await ApiRequest({
          type: 'get_favourite',
          user_id: user_id,
        });
        const resp = res.data.data;

        setStoreData(resp);
        setShowLoadingModal(false);
        setRefreshing(false);

        console.log(resp, 'storeData');
      } catch (err) {
      } finally {
        setShowLoadingModal(false);
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  const handleGetStoreDataMore = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setLoading(true);
      const res = await ApiRequest({
        type: 'get_favourite',
        user_id: user_id,
        // last_id: storeData[storeData.length - 1]?.id,
      });
      const resp = res.data.data;
      if (resp && resp != undefined && resp.length > 0) {
        setStoreData([...storeData, ...resp]);
      }
      console.log(resp, 'storeData');
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetStoreData();
  }, []);
  const {t, i18n} = useTranslation();
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  return (
    <Layout>
      <AppHeader title={t('Memories')} defaultStyle={{marginBottom: 30}} />

      <FlatList
        data={storeData}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        onScroll={handleScroll}
        onEndReached={scrolled ? handleGetStoreDataMore : null}
        ListEmptyComponent={
          <OrderNotFound
            title={t('Not Found data')}
            subtitle={t("You don't have favorites at the moment")}
          />
        }
        ListFooterComponent={
          bottomLoader && <ActivityIndicatot size="large" color={colors.gray} />
        }
        ListFooterComponentStyle={{
          width: '100%',
          marginTop: 5,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        numColumns={2}
        renderItem={({item}) => (
          <CardList
            item={item}
            images={item?.images}
            onPress={() =>
              navigation.navigate('SpecificStoreGalery', {
                item: item,
                store_id: item?.store_id,
              })
            }
          />
        )}
      />
    </Layout>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
