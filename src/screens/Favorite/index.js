import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import ListOfRoses from './ListOfRoses';
import CardList from './CardList';
import ApiRequest from '../../Services/ApiRequest';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import OrderNotFound from '../MyOrder/OrderNotFound';
import ModalLoadingTrans from '../../components/ModalLoadingTrans';

const Favorite = () => {
  const navigation = useNavigation();
  const [storeData, setStoreData] = useState();
  console.log('storeData', storeData);
  const [loading, setLoading] = useState();

  const cardData = [
    {
      id: 1,
      title: 'Pink Rose',
      price: '$19.99',
      image: require('../../assets/images/fav/fev1.png'),
    },
    {
      id: 2,
      title: 'Pink Rose',
      price: '$24.99',
      image: require('../../assets/images/fav/fav2.png'),
    },

    {
      id: 3,
      title: 'Pink Rose',
      price: '$24.99',
      image: require('../../assets/images/fav/fav3.png'),
    },
    {
      id: 4,
      title: 'Pink Rose',
      price: '$24.99',
      image: require('../../assets/images/fav/fav4.png'),
    },
    {
      id: 5,
      title: 'Pink Rose',
      price: '$24.99',
      image: require('../../assets/images/fav/fav3.png'),
    },
    {
      id: 6,
      title: 'Pink Rose',
      price: '$24.99',
      image: require('../../assets/images/fav/fav4.png'),
    },
  ];

  const [selectedItem, setSelectedItem] = useState(null);

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
      <AppHeader
        title={t('Westside Florists')}
        defaultStyle={{marginBottom: 30}}
      />

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
            subtitle={t("You don't have any data at this time")}
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
