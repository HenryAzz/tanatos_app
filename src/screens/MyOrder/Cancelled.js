import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';

import ApiRequest from '../../Services/ApiRequest';
import Layout from '../../components/Layout';
import {colors} from '../../constraints';
import MyOrderCard from './MyOrderCard';
import OrderNotFound from './OrderNotFound';

const Cancelled = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [orderData, setOrderData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [bottomLoader, setBottomLoader] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [account_Type, setAccountType] = useState();

  const onRefresh = () => {
    setRefreshing(true);
    getMyStoreOrders();
  };

  const handleScroll = () => {
    setScrolled(true);
  };

  const getMoreStoreOrders = async () => {
    try {
      if (!bottomLoader && orderData.length > 0) {
        setBottomLoader(true);

        const user_id = await AsyncStorage.getItem('user_id');
        const account_Type = await AsyncStorage.getItem('account_Type');
        const store_id = await AsyncStorage.getItem('store_id');

        const dataForReq = {
          type: 'get_data',
          table_name: 'orders',
          status: 'cancelled',
          last_id: orderData[orderData.length - 1]?.id,
        };
        if (account_Type === 'customer') {
          dataForReq.own = 1;
          dataForReq.user_id = JSON.parse(user_id);
        } else if (account_Type === 'store') {
          dataForReq.store_id = JSON.parse(store_id);
        }

        const res = await ApiRequest(dataForReq);
        const resp = res?.data?.data;
        if (resp && resp != undefined && resp.length > 0) {
          setOrderData([...servicesData, ...resp]);
        }
        setBottomLoader(false);
        setScrolled(false);
      }
    } catch (error) {
      console.log(error);
      setBottomLoader(false);
      setScrolled(false);
    }
  };

  const getMyStoreOrders = async () => {
    try {
      setRefreshing(true);

      const user_id = await AsyncStorage.getItem('user_id');
      const account_Type = await AsyncStorage.getItem('account_Type');
      const store_id = await AsyncStorage.getItem('store_id');

      const dataForReq = {
        type: 'get_data',
        table_name: 'orders',
        status: 'cancelled',
      };
      if (account_Type === 'customer') {
        dataForReq.own = 1;
        dataForReq.user_id = JSON.parse(user_id);
      } else if (account_Type === 'store') {
        dataForReq.store_id = JSON.parse(store_id);
      }
      const res = await ApiRequest(dataForReq);
      if (res.data?.data) {
        setRefreshing(false);
        setOrderData(res.data?.data);
      } else {
        setOrderData([]);
        setRefreshing(false);
      }
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getMyStoreOrders();
  }, [isFocused]);

  return (
    <Layout>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={orderData}
        onScroll={handleScroll}
        onEndReached={scrolled ? getMoreStoreOrders : null}
        ListEmptyComponent={!refreshing && <OrderNotFound />}
        ListFooterComponent={
          bottomLoader && <ActivityIndicator size="large" color={colors.gray} />
        }
        ListFooterComponentStyle={{
          width: '100%',
          marginTop: 5,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => {
          return (
            <MyOrderCard
              name={
                account_Type === 'store' ? item.funeral.name : item?.store?.name
              }
              location={
                account_Type === 'store'
                  ? item.funeral.funeral_location
                  : item?.store?.location
              }
              phone={
                account_Type === 'store'
                  ? item.funeral.short_message
                  : item?.store?.phone
              }
              totalPrice={item.total_amount}
              onPress={() =>
                navigation.navigate('OrderAllDetails', {
                  item: item,
                  orderid: item.id,
                  total_amount: item.total_amount,
                  image: item.funeral.image,
                  store: item.store,
                  dataToShow: item.items,
                  funeral: item.funeral,
                  message: item?.sympathy_text,
                  status: 'cancelled',
                  account_Type: account_Type,
                })
              }
            />
          );
        }}
      />
    </Layout>
  );
};

export default Cancelled;

const styles = StyleSheet.create({});
