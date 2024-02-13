import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import ApiRequest from '../../Services/ApiRequest';
import style from '../../assets/css/style';
import AppHeader from '../../components/AppHeader/AppHeader';
import {BaseButton} from '../../components/BaseButton';
import Layout from '../../components/Layout';
import {colors, fonts} from '../../constraints';
import {ToastMessage} from '../../utils/Toast';
import BalanceModal from '../PaymentMethod/BallanceModal';
import TextCard from './TextCard';
import {useSelector} from 'react-redux';

const CheckoutScreen = () => {
  //
  const navigation = useNavigation();
  const route = useRoute();
  const store = useSelector(store => store.user);

  const total_amount = route?.params?.basicPrice;
  const dataTosend = route?.params?.dataTosend;
  const FuneralItemData = route?.params?.FuneralItemData;
  const sympathyText = route?.params?.sympathyText;

  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState(store?.users?.phone);

  const handleEditPress = () => {
    setEditMode(true);
  };

  const handleSavePress = () => {
    setEditMode(false);
  };

  const [catData, setCatData] = useState();

  const [loading, setLoading] = useState(false);

  const handleOrderData = async () => {
    // console.log(' dataTosend[0].store_id', dataTosend[0]?.store_id);
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setLoading(true);
      // ,,,

      const res = await ApiRequest({
        type: 'add_data',
        table_name: 'orders',
        user_id: user_id,
        store_id: dataTosend[0]?.store_id,
        store_gallery_id: dataTosend[0].id,
        items: JSON.stringify(dataTosend),
        full_name: FuneralItemData.user.name,
        address: FuneralItemData.funeral_location,
        email: FuneralItemData.user.email,
        phone: FuneralItemData.user.phone,
        status: 'pending',
        // status: 'completed',
        // status: 'cancelled',
        // status: 'accepted',
        lat: FuneralItemData.funeral_lat,
        lng: FuneralItemData.funeral_lng,
        funeral_id: FuneralItemData.id,
        sympathy_text: sympathyText,
        total_amount: total_amount,
      });
      // console.log('2');
      const resp = res.data;
      // alert('add');
      if (resp.result) {
        ToastMessage(resp.message);
        setModalVisible(true);
      }
      // console.log(resp, 'order done');
    } catch (err) {
      console.log('order errrrrooorrr', err);
    } finally {
      // console.log('order errrrrooorrr');
      setLoading(false);
    }
  };
  const {t} = useTranslation();
  return (
    <Layout>
      <AppHeader title={t('Continue shopping')} />

      {/* <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}> */}
      <View style={{alignSelf: 'flex-start', width: '100%'}}>
        <Text
          style={[style.font18Re, {fontFamily: fonts.bold, marginBottom: 10}]}>
          {t('Dirección de envío')}
        </Text>
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.white,
            elevation: 4,
            shadowColor: colors.elev,
            borderWidth: 1,
            borderColor: colors.line,
            justifyContent: 'space-between',
            padding: 10,
            borderRadius: 10,
            marginVertical: 14,
            // marginBottom: 30,
          }}>
          <Text style={[style.font16Re]}>Home delivery</Text>
          <Icon
            name="chevron-down-outline"
            size={22}
            color={colors.primaryColor}
          />
        </View> */}
        <View
          style={{
            backgroundColor: colors.white,
            elevation: 4,
            shadowColor: colors.elev,
            padding: 20,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}>
            <Text style={[style.font14Re, {marginBottom: 10}]}>
              {FuneralItemData?.user?.name}
            </Text>
            <Text
              style={[
                style.font14Re,
                {
                  color: '#DB3022',
                  alignItems: 'flex-end',
                  //   fontFamily: fonts.bold,
                },
              ]}>
              {t('Change')}
            </Text>
          </View>
          <Text style={[style.font14Re, {width: 200}]}>
            {FuneralItemData?.funeral_location}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            elevation: 4,
            shadowColor: colors.elev,
            padding: 20,
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}>
            <Text style={[style.font14Re, {marginBottom: 10}]}>
              {t('Phone Number')}
            </Text>
            {editMode ? (
              <TouchableOpacity onPress={handleSavePress}>
                <Text
                  style={[
                    style.font14Re,
                    {
                      color: '#DB3022',
                      alignItems: 'flex-end',
                    },
                  ]}>
                  {t('Save')}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleEditPress}>
                <Text
                  style={[
                    style.font14Re,
                    {
                      color: '#DB3022',
                      alignItems: 'flex-end',
                    },
                  ]}>
                  {t('Change')}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {editMode ? (
            <TextInput
              style={[
                style.font14Re,
                {
                  width: 200,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.black,
                  paddingBottom: -10,
                },
              ]}
              value={newPhoneNumber}
              onChangeText={text => setNewPhoneNumber(text)}
            />
          ) : (
            <Text style={[style.font14Re, {width: 200}]}>
              {newPhoneNumber || store?.users?.phone}
            </Text>
          )}
        </View>
        <Text
          style={[style.font14Re, {alignSelf: 'flex-end', marginVertical: 4}]}>
          {t('we send to the funeral home')}
        </Text>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            marginTop: 20,
            // marginVertical: 14,
          }}>
          <Text style={[style.font18Re, {fontFamily: fonts.bold}]}>
            Payment
          </Text>

          <Text
            style={[
              style.font14Re,
              {
                color: '#DB3022',
                alignItems: 'flex-end',
                paddingRight: 24,
                //   fontFamily: fonts.bold,
              },
            ]}>
            Change
          </Text>
        </View> */}
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <View
            style={{
              elevation: 4,
              backgroundColor: colors.white,
              borderRadius: 8,
            }}>
            <Cardpic />
          </View>
          <Text style={[style.font14Re, {marginLeft: 20}]}>
            **** **** **** 3947
          </Text>
        </View> */}
        <View>
          {/* <Text style={[style.font18Re, {fontFamily: fonts.bold}]}>
            Payment Method
          </Text> */}
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F5F5F5',
              borderWidth: 1,
              borderColor: colors.line,
              justifyContent: 'space-between',
              padding: 10,
              borderRadius: 10,
              marginVertical: 14,
              marginBottom: 30,
            }}>
            <Text style={[style.font16Re]}>My Wallet</Text>
            <Icon
              name="chevron-forward-outline"
              size={22}
              color={colors.primaryColor}
            />
          </View> */}
          <TextCard title={t('Order')} price={`€${total_amount}`} />
          <TextCard
            title={t('Delivery')}
            price={`€${parseInt(total_amount) + 20}`}
          />
          <TextCard title={'Summay'} price={'127$'} />
        </View>
      </View>
      {/* </ScrollView> */}
      <BaseButton
        title={
          loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            t('Continue to Payment')
          )
        }
        disabled={loading}
        // onPress={() => navigation.navigate('ShippingAddress')}
        // onPress={() => setModalVisible(true)}
        onPress={() => handleOrderData()}
        defaultStyle={{marginTop: 33, marginBottom: 20}}
      />
      <BalanceModal
        total_amount={total_amount}
        dataTosend={dataTosend}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </Layout>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});
