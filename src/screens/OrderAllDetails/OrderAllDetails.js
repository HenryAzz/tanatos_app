import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import AppHeader from '../../components/AppHeader/AppHeader';
import FuneralCard from '../Home/FuneralCard';
import {ScrollView} from 'react-native';
import Edit from '../../assets/Edit1.png';
import {devWidth} from '../../constraints/Dimentions';
import {useNavigation, useRoute} from '@react-navigation/native';
import ApiRequest from '../../Services/ApiRequest';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';
import Icon from 'react-native-vector-icons/Entypo';
import OrderNotFound from '../MyOrder/OrderNotFound';
import OrderAllCard from './OrderAllCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastMessage} from '../../utils/Toast';

const OrderAllDetails = () => {
  const route = useRoute();
  const orderid = route?.params?.orderid;
  const item = route?.params?.item;
  const store = route?.params?.store;
  const status = route?.params?.status;
  const account_Type = route?.params?.account_Type;
  const image = route?.params?.image;
  const message = route?.params?.message;
  const funeral = route?.params?.funeral;
  const total_amount = route?.params?.total_amount;
  const dataToShow = JSON.parse(route?.params?.dataToShow);
  const navigation = useNavigation();
  // const id = route.params.id;
  // useEffect(() => {
  //   setFuneralData(item);
  // }, []);

  //
  const cleanedPath = image?.replace(/^"(.*)"$/, '$1');
  // console.log(parseInt('7.6'), 'item.url[0] + cleanedPath rece');

  console.log(orderid, 'orderid');
  // console.log('item.url + cleanedPath', item.url + cleanedPath);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  // const handleGetFuneralData = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await ApiRequest({
  //       type: 'get_data',
  //       table_name: 'orders',
  //       // funeral_id: item.id,
  //       funeral_id: item.id,
  //     });
  //     const resp = res?.data?.data;
  //     // console.log(resp, 'resp');
  //     setFuneralData(resp);
  //     // if (res?.data?.length > 0) {
  //     //   setFuneralData(resp);
  //     // } else {
  //     //   setFuneralData([]);
  //     // }
  //   } catch (err) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   handleGetFuneralData();
  // }, []);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showImage, setShowImage] = useState();
  const [funeralData, setFuneralData] = useState();

  // const handleOrderData = async () => {
  //   const user_id = await AsyncStorage.getItem('user_id');
  //   const account_Type = await AsyncStorage.getItem('account_Type');
  //   const store_id = await AsyncStorage.getItem('store_id');
  //   // console.log(store_id, 'store id s');
  //   // console.log(user_id, 'user_id id s');
  //   // console.log(account_Type, 'account_Type id s');
  //   try {
  //     setLoading(true);
  //     setRefreshing(true);
  //     const dataForReq = {
  //       type: 'get_data',
  //       table_name: 'orders',
  //       status: status,
  //       own: 1,
  //       user_id: JSON.parse(user_id),
  //       // last_id:
  //     };
  //     // if (account_Type === 'customer') {
  //     //   dataForReq.user_id = JSON.parse(user_id);
  //     // } else if (account_Type === 'store') {
  //     //   dataForReq.store_id = store_id;
  //     // }
  //     // setAccountType(account_Type);
  //     const res = await ApiRequest(dataForReq);
  //     const resp = res.data.data;
  //     setRefreshing(false);
  //     // setOrderData(resp);
  //     setFuneralData(resp);
  //     // console.log(resp, 'resp new order');
  //   } catch (err) {
  //   } finally {
  //     setLoading(false);
  //     // setRefreshing(false);
  //   }
  // };
  // useEffect(() => {
  //   handleOrderData();
  // }, []);

  const handleOrderCancelData = async id => {
    // console.log(id, 'idddididi');
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setLoading(true);
      const res = await ApiRequest({
        type: 'update_data',
        table_name: 'orders',
        status: 'cancelled',
        id: orderid,
        // status: pending, completed, cancelled, accepted
      });
      const resp = res.data;
      // console.log(resp, 'kkk');
      if (resp?.result) {
        ToastMessage(resp.message);
        // handleOrderData();
        navigation.navigate('Cancelled');
      }
      // setOrderData(resp);
    } catch (err) {
    } finally {
      setLoading(false);
      // setRefreshing(false);
    }
  };
  const handleOrderUpdateDataNewOrder = async id => {
    console.log(id, 'idddididi');
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      console.log(id, '1111 idddididi');
      setLoading(true);
      setRefreshing(false);
      const res = await ApiRequest({
        type: 'update_data',
        table_name: 'orders',
        status: 'accepted',
        id: orderid,
        // status: pending, completed, cancelled, accepted
      });
      const resp = res.data;
      console.log(resp.message, 'kkk update successfully');

      // setRefreshing(true);
      if (resp?.result) {
        ToastMessage(resp.message);
        // handleOrderData();
        navigation.navigate('Processing');
        // setRefreshing(false);
      }

      setOrderData(resp);
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
  return (
    <View style={{flex: 1, width: '100%', backgroundColor: colors.white}}>
      <AppHeader
        title={'Order Details'}
        defaultStyle={{marginHorizontal: 10}}
      />
      <ImageBackground
        style={{height: 250, paddingTop: 16}}
        source={require('../../assets/Sharedbg.jpg')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            paddingLeft: 16,
            width: '96%',
            alignSelf: 'center',
          }}>
          <View style={{width: '66%', left: 10}}>
            <View
              style={
                {
                  // flexDirection: 'row',
                  // alignItems: 'center',
                  // justifyContent: 'space-between',
                  // width: '100%',
                }
              }>
              <Text
                style={[
                  style.font24Re,
                  {fontFamily: fonts.bold, color: colors.white},
                ]}>
                TANATOS
              </Text>
            </View>

            <Text
              style={[
                style.font12Re,
                {
                  fontFamily: fonts.bold,
                  color: colors.white,
                },
              ]}>
              {/* ESQUELAS ONLINE */}
            </Text>
            <Text
              style={[
                style.font24Re,
                {
                  fontFamily: fonts.bold,
                  color: colors.white,
                  marginVertical: 10,
                },
              ]}>
              {/* name */}
              {funeral?.name}
              {/* {'funeralData[0]?.full_name'} */}
            </Text>
            <Text style={[{fontSize: 13, color: colors.white}]}>{message}</Text>
          </View>
          {!cleanedPath ? (
            <Image
              source={{
                uri: 'https://locatestudent.com/tanatos/upload/' + cleanedPath,
              }}
              style={{
                height: 160,
                width: 160,
                right: 20,
                borderRadius: 80,
                top: 30,
              }}
            />
          ) : (
            <Image
              source={require('../../assets/Sharedimg.png')}
              // source={{uri: item.url + cleanedPath}}
              style={{
                height: 160,
                width: 160,
                right: 20,
                borderRadius: 80,
                top: 30,
              }}
            />
          )}
        </View>
        {/* <TouchableOpacity style={{position: 'absolute', right: 20, top: 40}}>
          <Image source={Edit} style={{height: 20, width: 20}} />
        </TouchableOpacity> */}
      </ImageBackground>

      {/* <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}> */}
      <View style={{marginHorizontal: 10, marginVertical: 40, flex: 1}}>
        <View
          style={{
            marginBottom: 20,
            marginLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
            Total Amount:
          </Text>
          <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
            {' '}
            {total_amount}$
          </Text>
        </View>
        <FlatList
          data={dataToShow}
          // keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <OrderNotFound />}
          renderItem={({item}) => {
            // console.log(item, 'sd///');
            // const items = JSON.parse(item.items);
            // const imagesArray = items.flatMap(item => item.images);

            return (
              <View style={{flex: 1}}>
                <OrderAllCard
                  title={item.name}
                  price={total_amount}
                  description={funeral?.description}
                  images={item.images}
                  funeral_location={funeral.funeral_location}
                  sympathy_text={item.sympathy_text}
                  status={status}
                  account_Type={account_Type}
                  // accept={() => handleOrderUpdateDataNewOrder(item.id)}
                  // cancel={() => handleOrderCancelData(item.id)}
                  onPress={() => {
                    setShowLoadingModal(true);
                    setShowImage(imagesArray);
                  }}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                />
              </View>
            );
          }}
        />

        {account_Type === 'store' && status === 'pending' ? (
          <View
            style={{
              flexDirection: 'row',
              // width: '5%',
              flex: 1,
              // alignSelf: 'flex-end',
              // marginRight: 12,
              marginTop: 10,
              marginHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => handleOrderUpdateDataNewOrder(orderid)}
              style={{
                backgroundColor: colors.primaryColor,
                height: 40,
                width: 150,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                alignSelf: 'flex-end',
                marginBottom: 3,
              }}>
              <Text style={[style.font12Re, {color: colors.white}]}>
                accept
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOrderCancelData(orderid)}
              style={{
                backgroundColor: colors.primaryColor,
                height: 40,
                width: 150,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                alignSelf: 'flex-end',
                marginBottom: 3,
              }}>
              <Text style={[style.font12Re, {color: colors.white}]}>
                cancel
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {account_Type === 'store' && status === 'accepted' ? (
          <TouchableOpacity
            onPress={() => handleOrderCancelData(orderid)}
            style={{
              backgroundColor: colors.primaryColor,
              height: 40,
              width: 150,
              marginRight: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              // alignSelf: 'flex-end',
              // marginBottom: 3,
              marginTop: 10,
              marginRight: 15,
            }}>
            <Text style={[style.font12Re, {color: colors.white}]}>
              Complete Order
            </Text>
          </TouchableOpacity>
        ) : null}
        {/* ///////// */}
        {account_Type === 'customer' && status === 'pending' ? (
          <TouchableOpacity
            onPress={() => handleOrderCancelData(orderid)}
            style={{
              backgroundColor: colors.primaryColor,
              height: 40,
              width: 150,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              alignSelf: 'flex-end',
              // marginBottom: 3,
              marginTop: 10,
              marginRight: 15,
            }}>
            <Text style={[style.font12Re, {color: colors.white}]}>cancel</Text>
          </TouchableOpacity>
        ) : null}

        {/* ///////////////////////// */}
        {account_Type === 'customer' && status === 'accepted' ? (
          <TouchableOpacity
            onPress={() => handleOrderCancelData(orderid)}
            style={{
              backgroundColor: colors.primaryColor,
              height: 40,
              width: 150,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              alignSelf: 'flex-end',
              // marginBottom: 3,
              marginTop: 10,
              marginRight: 15,
            }}>
            <Text style={[style.font12Re, {color: colors.white}]}>
              Complete Order
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <Modal
        transparent
        visible={showLoadingModal}
        animationType="fade"
        onRequestClose={() => setShowLoadingModal(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{backgroundColor: colors.white, flex: 1}}>
            {/* <View style={{height: 120, width: 120, borderRadius: 10}}> */}
            <ImageSwiper images={showImage} />
            <TouchableOpacity
              onPress={() => setShowLoadingModal(false)}
              style={{
                position: 'absolute',
                right: 20,
                top: 20,
                // backgroundColor: 'red',
              }}>
              <Icon name="circle-with-cross" color={colors.black} size={30} />
            </TouchableOpacity>
            {/* </View> */}
          </View>
        </View>
      </Modal>
      {/* </ScrollView> */}
      {/* ) : (
      <OrderNotFound
          title={'t'}
          subtitle={"You don't have any data at this time"}
        /> */}
      {/* )} */}
    </View>
  );
};

export default OrderAllDetails;

const styles = StyleSheet.create({});
