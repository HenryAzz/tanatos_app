import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import ApiRequest from '../../Services/ApiRequest';
import style from '../../assets/css/style';
import AppHeader from '../../components/AppHeader/AppHeader';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';
import {colors, fonts} from '../../constraints';
import {ToastMessage} from '../../utils/Toast';
import OrderNotFound from '../MyOrder/OrderNotFound';
import AcceptCancel from './AcceptCancel';
import OrderAllCard from './OrderAllCard';

const OrderAllDetails = () => {
  //
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

  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const handleAcceptCancel = id => {
    setShowAcceptModal(true);
    handleOrderCancelData(id);
  };

  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const handleComplete = id => {
    setShowCompleteModal(true);
    handleOrderCancelData(id);
  };

  const [showAcceeptStoreModal, setShowAcceptStoreModal] = useState(false);

  const handleAcceptStore = id => {
    setShowAcceptStoreModal(true);
    handleOrderUpdateDataNewOrder(id);
  };
  const {t} = useTranslation();
  return (
    <View style={{flex: 1, width: '100%', backgroundColor: colors.white}}>
      <AppHeader
        title={t('Order Details')}
        defaultStyle={{marginHorizontal: 10}}
      />
      <View style={styles.topBox}>
        <View>
          <Text style={[styles.txt1, {color: colors.welgrey}]}>TANATOS</Text>
          <Text style={[style.font10Re, {color: colors.welgrey}]}>
            ESQUELAS ONLINE
          </Text>
        </View>
        <View style={{alignItems: 'center', top: -20}}>
          <Image
            source={require('../../assets/Sharedimg.png')}
            style={styles.avatar}
          />
          <Text style={[styles.txt1, {marginTop: 5}]} numberOfLines={1}>
            {funeral?.name}
          </Text>
          <Text style={[styles.txt1, {marginTop: 5}]} numberOfLines={1}>
            {funeral?.hall_no}
          </Text>
          <Text
            style={[style.font16Re, {marginTop: 5, color: colors.white}]}
            numberOfLines={2}>
            {funeral?.funeral_location}
          </Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 20, marginVertical: 20}}>
        <View style={[style.justifySpaBtwRow, {marginVertical: 10}]}>
          <Text style={style.font14Re}>From:</Text>
          <Text style={style.font16Re}>{item?.user?.name}</Text>
        </View>
        <Text style={style.font16Re}>{message}</Text>
      </View>
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
            {t('Total Amount')}:
          </Text>
          <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
            {' '}
            {total_amount}€
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
              onPress={() => setShowAcceptStoreModal(true)}
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
                {t('Accept')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowAcceptModal(true)}
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
                {t('Cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <AcceptCancel
          visible={showAcceeptStoreModal}
          onClose={() => setShowAcceptStoreModal(false)}
          onConfirm={() => handleAcceptStore(orderid)}
          title={t('Do you accept flowers ?')}
        />

        {account_Type === 'store' && status === 'accepted' ? (
          <TouchableOpacity
            onPress={() => setShowCompleteModal(true)}
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
              {t('Complete Order')}
            </Text>
          </TouchableOpacity>
        ) : null}
        {/* ///////// */}
        {account_Type === 'customer' && status === 'pending' ? (
          <TouchableOpacity
            // onPress={() => handleOrderCancelData(orderid)}
            onPress={() => setShowAcceptModal(true)}
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
              {t('Cancel')}
            </Text>
          </TouchableOpacity>
        ) : null}
        <AcceptCancel
          visible={showAcceptModal}
          onClose={() => setShowAcceptModal(false)}
          onConfirm={() => handleAcceptCancel(orderid)}
          title={t('Are you sure you want to cancel this order?')}
        />
        {/* ///////////////////////// */}
        {account_Type === 'customer' && status === 'accepted' ? (
          <TouchableOpacity
            onPress={() => setShowCompleteModal(true)}
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
        <AcceptCancel
          visible={showCompleteModal}
          onClose={() => setShowCompleteModal(false)}
          onConfirm={() => handleComplete(orderid)}
          title={'Are you sure order has been completed ?'}
        />
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

const styles = StyleSheet.create({
  topBox: {
    height: 240,
    backgroundColor: colors.primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  txt1: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 100,
    marginBottom: 5,
  },
});
