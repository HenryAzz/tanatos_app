// import {StyleSheet, FlatList, Text, View, Image} from 'react-native';
// import React from 'react';
// import Layout from '../../components/Layout';
// import MyOrderCard from './MyOrderCard';

// import style from '../../assets/css/style';
// import {fonts} from '../../constraints';
// import OrderNotFound from './OrderNotFound';
// import {useNavigation} from '@react-navigation/native';
// const NewOrder = () => {
//   const navigation = useNavigation();
//   const data = [
//     {
//       id: 1,
//       image: require('../../assets/images/OrderCard/orderImg1.png'),
//       title: 'Pink Roses',
//       price: '$1000',
//       address:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
//       status: 'Confirm',
//     },
//     {
//       id: 2,
//       image: require('../../assets/images/OrderCard/orderImg1.png'),
//       title: 'Pink Roses',
//       price: '$2000',
//       address:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
//       status: 'Confirm',
//     },
//     {
//       id: 3,
//       image: require('../../assets/images/OrderCard/orderImg1.png'),
//       title: 'Pink Roses',
//       price: '$3000',
//       address:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
//       status: 'Confirm',
//     },
//     {
//       id: 4,
//       image: require('../../assets/images/OrderCard/orderImg1.png'),
//       title: 'Pink Roses',
//       price: '$4000',
//       address:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
//       status: 'Confirm',
//     },
//     {
//       id: 5,
//       image: require('../../assets/images/OrderCard/orderImg1.png'),
//       title: 'Pink Roses',
//       price: '$5000',
//       address:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
//       status: 'Confirm',
//     },
//     {
//       id: 6,
//       image: require('../../assets/images/OrderCard/orderImg1.png'),
//       title: 'Pink Roses',
//       price: '$6000',
//       address:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
//       status: 'Confirm',
//     },
//     {
//       id: 7,
//       image: require('../../assets/images/OrderCard/orderImg1.png'),
//       title: 'Pink Roses',
//       price: '$7000',
//       address:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
//       status: 'Confirm',
//     },
//     {
//       id: 8,
//       image: require('../../assets/images/OrderCard/orderImg1.png'),
//       title: 'Pink Roses',
//       price: '$8000',
//       address:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
//       status: 'Confirm',
//     },
//     {
//       id: 9,
//       image: require('../../assets/images/OrderCard/orderImg1.png'),
//       title: 'Pink Roses',
//       price: '$9000',
//       address:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
//       status: 'Confirm',
//     },
//   ];

//   return (
//     <Layout>
//       {data.length > 0 ? (
//         <FlatList
//           showsVerticalScrollIndicator={false}
//           showsHorizontalScrollIndicator={false}
//           keyExtractor={item => item.id}
//           data={data}
//           renderItem={({item}) => (
//             <MyOrderCard
//               image={item.image}
//               title={item.title}
//               price={item.price}
//               address={item.address}
//               status={item.status}
//               // onPress={() => alert('ok')}
//               onPress={() =>
//                 navigation.navigate('OrderTrack', {
//                   data: item,
//                 })
//               }
//             />
//           )}
//         />
//       ) : (
//         <OrderNotFound />
//       )}
//     </Layout>
//   );
// };

// export default NewOrder;

// const styles = StyleSheet.create({});

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
import {fonts} from '../../constraints';
import OrderNotFound from './OrderNotFound';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ApiRequest from '../../Services/ApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastMessage} from '../../utils/Toast';

const Cancelled = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [orderData, setOrderData] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [refreshing, setRefreshing] = useState(false);
  const [account_Type, setAccountType] = useState();

  // const [isModalVisibleCat, setModalVisibleCat] = useState(false);
  const handleOrderData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const account_Type = await AsyncStorage.getItem('account_Type');
    const store_id = await AsyncStorage.getItem('store_id');

    try {
      setLoading(true);
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
      // setRefreshing(false)
      setAccountType(account_Type);
      const res = await ApiRequest(dataForReq);
      const resp = res.data.data;

      setOrderData(resp);
      // console.log(resp, 'resp new order');
    } catch (err) {
    } finally {
      setLoading(false);
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

    try {
      setBottomLoader(true);
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
      // setRefreshing(false)
      setAccountType(account_Type);
      const res = await ApiRequest(dataForReq);
      const resp = res.data.data;
      setBottomLoader(false);
      if (resp && resp != undefined && resp.length > 0) {
        setOrderData([...orderData, ...resp]);
      }
      // setOrderData(resp);
    } catch (err) {
      setBottomLoader(false);
    } finally {
      setBottomLoader(false);
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
      // setRefreshing(false);
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
      // setRefreshing(false);
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
          console.log(item.items, 'item item');
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
                  status: 'cancelled',
                  account_Type: account_Type,
                })
              }
            />
          );
        }}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      />
    </Layout>
  );
};

export default Cancelled;

const styles = StyleSheet.create({});
