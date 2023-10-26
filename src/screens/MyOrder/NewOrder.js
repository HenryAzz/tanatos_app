import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import MyOrderCard from './MyOrderCard';

import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import OrderNotFound from './OrderNotFound';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ApiRequest from '../../Services/ApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastMessage} from '../../utils/Toast';

const NewOrder = () => {
  const navigation = useNavigation();

  const [orderData, setOrderData] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [account_Type, setAccountType] = useState();
  const isFocused = useIsFocused();
  // const [isModalVisibleCat, setModalVisibleCat] = useState(false);
  const handleOrderData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const account_Type = await AsyncStorage.getItem('account_Type');
    const store_id = await AsyncStorage.getItem('store_id');
    console.log(store_id, 'store id s');
    console.log(user_id, 'user_id id s');

    try {
      setRefreshing(true);
      setLoading(true);
      const dataForReq = {
        type: 'get_data',
        table_name: 'orders',
        status: 'pending',
        // store_id: store_id,
      };
      if (account_Type === 'customer') {
        dataForReq.own = 1;
        dataForReq.user_id = JSON.parse(user_id);
      } else if (account_Type === 'store') {
        dataForReq.store_id = JSON.parse(store_id);
      }
      setRefreshing(false);
      setAccountType(account_Type);
      const res = await ApiRequest(dataForReq);
      const resp = res.data.data;
      setRefreshing(false);
      setOrderData(resp);
      // console.log(resp, 'resp new order');
    } catch (err) {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    handleOrderData();
  };
  const [bottomLoader, setBottomLoader] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    setScrolled(true);
  };

  const handleOrderDataMore = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const account_Type = await AsyncStorage.getItem('account_Type');
    const store_id = await AsyncStorage.getItem('store_id');
    console.log(store_id, 'store id s');
    console.log(user_id, 'user_id id s');

    try {
      setBottomLoader(true);
      const dataForReq = {
        type: 'get_data',
        table_name: 'orders',
        status: 'pending',
        last_id: orderData[orderData.length - 1]?.id,
      };
      if (account_Type === 'customer') {
        dataForReq.own = 1;
        dataForReq.user_id = JSON.parse(user_id);
      } else if (account_Type === 'store') {
        dataForReq.store_id = JSON.parse(store_id);
      }
      setAccountType(account_Type);
      const res = await ApiRequest(dataForReq);
      const resp = res.data.data;
      if (resp && resp != undefined && resp.length > 0) {
        setOrderData([...orderData, ...resp]);
      }
      setBottomLoader(false);

      // console.log(resp, 'resp new order');
    } catch (err) {
    } finally {
    }
  };

  const handleOrderCancelData = async id => {
    // console.log(id, 'idddididi');
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setLoading(true);
      const res = await ApiRequest({
        type: 'update_data',
        table_name: 'orders',
        status: 'cancelled',
        id: id,
        // status: pending, completed, cancelled, accepted
      });
      const resp = res.data;
      if (resp?.result) {
        ToastMessage(resp.message);
        handleOrderData();
        navigation.navigate('Cancelled');
      }
      // console.log(resp, 'kkk');
      // setOrderData(resp);
    } catch (err) {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const handleOrderUpdateData = async id => {
    // console.log(id, 'idddididi');
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setLoading(true);
      const res = await ApiRequest({
        type: 'update_data',
        table_name: 'orders',
        status: 'accepted',
        id: id,
        // status: pending, completed, cancelled, accepted
      });
      const resp = res.data;
      if (resp?.result) {
        ToastMessage(resp.message);
        handleOrderData();
        navigation.navigate('Processing');
      }
      // console.log(resp, 'kkk');
      // setOrderData(resp);
    } catch (err) {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    handleOrderData();
  }, [isFocused]);

  // const acceptedOrders = orderData?.filter(item => item?.status === 'pending');

  return (
    <Layout>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={orderData}
        onScroll={handleScroll}
        onEndReached={scrolled ? handleOrderDataMore : null}
        ListEmptyComponent={<OrderNotFound />}
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
          const itemsArray = JSON.parse(item.items);
          // console.log(item, 'ite');
          return (
            <MyOrderCard
              // key={index}
              // images={item.images}
              name={
                account_Type === 'store' ? item.funeral.name : item?.store?.name
              }
              // price={item?.store?.price}
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
              // address={item.address}
              // status={item.status}
              // accept={() => handleOrderUpdateData(item.id)}
              // cancel={() => handleOrderCancelData(item.id)}
              onPress={() =>
                navigation.navigate('OrderAllDetails', {
                  item: orderData,
                  // funeral: orderData.funeral,
                  orderid: item.id,
                  total_amount: item.total_amount,
                  image: item.funeral.image,
                  store: item.store,
                  dataToShow: item.items,
                  funeral: item.funeral,
                  message: item.funeral.short_message,
                  // status: pending, completed, cancelled, accepted
                  status: 'pending',
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

export default NewOrder;

const styles = StyleSheet.create({});
