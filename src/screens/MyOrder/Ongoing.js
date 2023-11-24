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
import {useNavigation} from '@react-navigation/native';
import ApiRequest from '../../Services/ApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OngoingOrder = () => {
  const navigation = useNavigation();

  const [orderData, setOrderData] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for the refresh indicator

  // const [isModalVisibleCat, setModalVisibleCat] = useState(false);
  const handleOrderData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setLoading(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'orders',
        user_id: user_id,
        // last_id:
      });
      const resp = res.data.data;
      setOrderData(resp);
    } catch (err) {
    } finally {
      setLoading(false);
      setRefreshing(false); // Turn off the refresh indicator
    }
  };

  const onRefresh = () => {
    setRefreshing(true); // Turn on the refresh indicator
    handleOrderData();
  };

  useEffect(() => {
    handleOrderData();
  }, []);

  const acceptedOrders = orderData?.filter(item => item?.status === 'pending');

  return (
    <Layout>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={acceptedOrders}
        renderItem={({item}) => {
          const itemsArray = JSON.parse(item.items);

          return itemsArray.map((itemData, index) => (
            <MyOrderCard
              key={index}
              images={itemData.images}
              title={itemData.name}
              price={itemData.price}
              address={item.address}
              status={item.status}
              onPress={() =>
                navigation.navigate('OrderTrack', {
                  data: item,
                })
              }
            />
          ));
        }}
        refreshControl={
          // Add the RefreshControl component
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </Layout>
  );
};

export default OngoingOrder;

const styles = StyleSheet.create({});
