import {Image, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout/index';
import AppHeader from '../../components/AppHeader/AppHeader';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import OHistoryCard from './OHistoryCard';
import {FlatList} from 'react-native';
import ApiRequest from '../../Services/ApiRequest';
const OrderHistory = () => {
  const data = [
    {
      id: 1,
      image: require('../../assets/images/OrderHistory/white.png'),
      title: 'White Rose',
      orderId: 'Order Id : TG-36594',
      date: '28 Oct, 02.18 PM',
      success: 'Success',
    },
    {
      id: 2,
      image: require('../../assets/images/OrderHistory/sun.png'),
      title: 'Sun Flowers',
      orderId: 'Order Id : TG-36594',
      date: '28 Oct, 02.18 PM',
      success: 'Cancel',
    },
    {
      id: 3,
      image: require('../../assets/images/OrderHistory/pink.png'),
      title: 'Pink Roses',
      orderId: 'Order Id : TG-36594',
      date: '28 Oct, 02.18 PM',
      success: 'Success',
    },
    {
      id: 4,
      image: require('../../assets/images/OrderHistory/white.png'),
      title: 'White Rose',
      orderId: 'Order Id : TG-36594',
      date: '28 Oct, 02.18 PM',
      success: 'Cancel',
    },
    {
      id: 5,
      image: require('../../assets/images/OrderHistory/sun.png'),
      title: 'Sun Flowers',
      orderId: 'Order Id : TG-36594',
      date: '28 Oct, 02.18 PM',
      success: 'Cancel',
    },
    {
      id: 6,
      image: require('../../assets/images/OrderHistory/pink.png'),
      title: 'Pink Roses',
      orderId: 'Order Id : TG-36594',
      date: '28 Oct, 02.18 PM',
      success: 'Success',
    },
    {
      id: 7,
      image: require('../../assets/images/OrderHistory/pink.png'),
      title: 'Pink Roses',
      orderId: 'Order Id : TG-36594',
      date: '28 Oct, 02.18 PM',
      success: 'Success',
    },
  ];

  const [orderData, setOrderData] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [account_Type, setAccountType] = useState();

  // const [isModalVisibleCat, setModalVisibleCat] = useState(false);
  const handleOrderData = async () => {
    try {
      setRefreshing(true);
      setLoading(true);
      const dataForReq = {
        type: 'get_data',
        table_name: 'orders',
      };
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

  useEffect(() => {
    handleOrderData();
  }, []);

  return (
    <Layout>
      <AppHeader title={'History'} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginVertical: 20,
        }}>
        <Text style={[style.font14Re, {fontFamily: fonts.bold}]}>
          Select Date
        </Text>
        <Text
          style={[
            style.font14Re,
            {fontFamily: fonts.bold, color: colors.primaryColor},
          ]}>
          1 Oct - 30 Oct
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={orderData}
        renderItem={({item}) => {
          const images = JSON.parse(item.items);
          console.log(item);
          return (
            <OHistoryCard
              title={item.funeral.name}
              images={images}
              date={item.funeral.church_date}
              location={item.funeral.funeral_location}
              message={item.funeral.short_message}
              orderId={item.orderId}
              // date={item.date}
              success={item.status}
            />
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleOrderData()}
            tintColor="#007AFF" // Color of the refresh indicator
            title="Pull to refresh"
            titleColor="#007AFF"
          />
        }
      />
    </Layout>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({});
