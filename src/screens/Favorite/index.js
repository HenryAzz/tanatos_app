import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import ApiRequest from '../../Services/ApiRequest';
import AppHeader from '../../components/AppHeader/AppHeader';
import Layout from '../../components/Layout';
import BottomCard from '../Home/BottomCard';
import OrderNotFound from '../MyOrder/OrderNotFound';

const Favorite = () => {
  //

  const {t} = useTranslation();

  const navigation = useNavigation();

  const [favourites, setFavourites] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [bottomLoader, setBottomLoader] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    setScrolled(true);
  };

  const onRefresh = () => {
    setRefreshing(true);
    handleGetFavourites();
  };

  const handleGetFavourites = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    if (user_id) {
      try {
        const res = await ApiRequest({
          type: 'get_favourite',
          user_id: user_id,
        });
        const resp = res.data?.data;

        setFavourites(resp);
        setRefreshing(false);
      } catch (err) {
        console.log(err);
        setRefreshing(false);
      }
    }
  };

  const handleGetFavouritesMore = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setBottomLoader(true);
      const res = await ApiRequest({
        type: 'get_favourite',
        user_id: user_id,
        last_id: favourites[favourites.length - 1]?.id,
      });
      const resp = res.data?.data;
      if (resp && resp != undefined && resp.length > 0) {
        setFavourites([...favourites, ...resp]);
      }
      setBottomLoader(false);
      setScrolled(false);
    } catch (err) {
      setBottomLoader(false);
      setScrolled(false);
    } finally {
      setBottomLoader(false);
      setScrolled(false);
    }
  };

  const heartPress = async item => {
    const user_id = await AsyncStorage.getItem('user_id');
    const sendData = {
      type: 'like_dislike',
      user_id: user_id,
      status: 'dislike',
      funeral_id: item?.id,
    };

    const data = favourites.filter(x => x.id !== item?.id);

    setFavourites(data);

    try {
      const res = await ApiRequest(sendData);
      if (res.data.result === true) {
        handleGetFavourites();
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetFavourites();
  }, []);

  return (
    <Layout>
      <AppHeader title={t('Memories')} defaultStyle={{marginBottom: 30}} />
      <FlatList
        data={favourites}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={styles.listContainer}
        onScroll={handleScroll}
        onEndReached={scrolled ? handleGetFavouritesMore : null}
        ListEmptyComponent={
          !refreshing && (
            <OrderNotFound
              title={t('Not Found data')}
              subtitle={t("You don't have favorites at the moment")}
            />
          )
        }
        ListFooterComponent={
          bottomLoader && <ActivityIndicatot size="large" color={colors.gray} />
        }
        ListFooterComponentStyle={{
          width: '100%',
          marginHorizontal: 10,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        numColumns={2}
        renderItem={({item}) => (
          <BottomCard
            title={item?.name}
            subtitle={item?.description}
            account_Type={'customer'}
            isLiked={'like'}
            onPress1={() =>
              navigation.navigate('FuneralDetailedPage', {
                item: item,
              })
            }
            onHeartPress={() => heartPress(item)}
          />
        )}
      />
    </Layout>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
