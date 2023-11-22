import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import Layout from '../../components/Layout';
import AuthHeader from '../../components/AuthHeader';
import AppTextInput from '../../components/FloatingLabelInput';
import PhoneNumberInput from '../../components/PhoneInput';
import {BaseButton} from '../../components/BaseButton';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {colors, constants, fonts} from '../../constraints';
import style from '../../assets/css/style';
import ApiRequest from '../../Services/ApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import {ToastMessage} from '../../utils/Toast';
import ModalLoadingTrans from '../../components/ModalLoadingTrans';
import {t} from 'i18next';

const CreateStore = () => {
  const route = useRoute();
  const phone = route?.params?.phone;
  const account_Type = route?.params?.account_Type;
  // console.log(phone, 'phone//');
  const [formData, setFormData] = useState({
    shopName: '',
    category: '',
    contactNumber: '',
    shopLocation: '',
  });

  const [visible, setVisible] = useState(false);
  const [area, setArea] = useState('');
  const [name, setNAme] = useState('');
  const [city, setCity] = useState('City');
  const [state, setState] = useState('');
  const [markerData, setMarkerData] = useState({latitude: '', longitude: ''});
  // console.log(markerData.latitude);
  const [country, setCountry] = useState('');
  // console.log(country, 'country');
  // console.log(markerData, 'markerData');
  // console.log(state, 'state');
  // console.log(city, 'city');
  // console.log(area, 'area');

  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [valid, setValid] = useState(true);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const [catData, setCatData] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const isFocused = useIsFocused();
  // console.log(catData, 'cat');
  // console.log(selectedItem, 'selectedItemcat');

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [isModalVisibleCat, setModalVisibleCat] = useState(false);
  const handleGetCatData = async () => {
    try {
      setLoading(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'categories',
      });
      const resp = res.data.data;
      setCatData(resp);
      // console.log(resp, 'resp');
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetCatData();
  }, []);

  const handleAddStore = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    // console.log(user_id, 'user_id');
    try {
      setLoading1(true);
      const res = await ApiRequest({
        type: 'add_data',
        table_name: 'stores',
        user_id: user_id,
        // cat_id: selectedItem.id,
        phone: phone,
        location: area,
        lat: markerData.latitude,
        lng: markerData.longitude,
        // category: selectedItem?.name,
        name: formData.shopName,
      });
      const resp = res.data;
      if (res.data.result) {
        // console.log(resp, 'create sore');
        ToastMessage(res?.data?.message);
        await AsyncStorage.setItem('store_id', JSON.stringify(resp?.id));
        // navigation.navigate('Home', {
        //   id: resp?.id,
        //   account_Type: account_Type,
        // });
        navigation.navigate('UploadPhoto', {id: resp?.id});
        setLoading1(false);
      } else {
        ToastMessage(res?.data?.message);
        console.log('errrr');
      }
    } catch (err) {
      console.log(err, 'errrr');
    } finally {
      setLoading1(false);
    }
  };
  const handleUpdateStore = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    // console.log(user_id, 'user_id');
    try {
      setLoading1(true);
      const res = await ApiRequest({
        type: 'update_data',
        table_name: 'stores',
        id: user_id,

        location: area,

        name: formData.shopName,
      });
      const resp = res.data;
      if (res.data.result) {
        // console.log(resp, 'create sore');
        ToastMessage(res?.data?.message);
        console.log(resp?.id, 'resp?.id');
        await AsyncStorage.setItem('store_id', JSON.stringify(resp.id));
        // navigation.navigate('HomeStore', {
        //   id: resp?.id,
        //   account_Type: account_Type,
        // });
        // navigation.navigate('AppStackWithoutBottom', {screen: 'UploadPhoto'});
        navigation.navigate('MainStack', {
          screen: 'UploadPhoto',
          params: {
            id: resp?.id,
          },
        });
        setLoading1(false);
      } else {
        ToastMessage(res?.data?.message);
        console.log('errrr');
      }
    } catch (err) {
      console.log(err, 'errrr');
    } finally {
      setLoading1(false);
    }
  };
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const [validF, setValidF] = useState(true);
  useMemo(() => {
    const isFormFilled =
      formData.shopName.trim() &&
      formData.shopName?.length > 0 &&
      area?.length > 0;

    setValidF(!isFormFilled);
  }, [formData, area]);

  const [checkStore, setCheckStore] = useState();
  const handleCheckStore = async () => {
    if (!isFocused) return;
    try {
      setShowLoadingModal(true);
      const user_id = await AsyncStorage.getItem('user_id');
      console.log(user_id);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'stores',
        user_id: user_id,
        own: 1,
        // last_id:""
      });
      const resp = res.data.data;
      console.log(resp[0].name, 'resp/// get store data');
      setShowLoadingModal(false);
      setCheckStore(resp);
      setFormData({
        shopName: resp[0].name,
        shopLocation: resp[0]?.location,
      });

      setArea(resp[0]?.location);
    } catch (err) {
      setShowLoadingModal(false);
    } finally {
      setShowLoadingModal(false);
    }
  };
  useEffect(() => {
    handleCheckStore();
    // handleGetCatData();
  }, [isFocused]);
  // console.log(checkStore[0]?.name, 'checkStore/////////');
  return (
    <Layout>
      {/* <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={colors.backgroundColor}
      /> */}
      <AuthHeader
        title={t("Let's Create Store")}
        subTitle={t('Enter Your details below to create a new store')}
      />
      <ScrollView
        style={{width: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <AppTextInput
          titleText={t('Shop Name')}
          placeholder={t('Shop Name')}
          value={formData.shopName}
          onChangeText={text => handleInputChange('shopName', text)}
        />

        <Text
          style={[
            style.font16Re,
            {fontFamily: fonts.medium, marginTop: 5, marginBottom: 3},
          ]}>
          {t('Location')}
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            borderWidth: 1,
            borderColor: '#E0E0E0',
            backgroundColor: '#F5F5F5',
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            paddingLeft: 10,
          }}>
          <Text> {area ? area : t('Enter Store Location')}</Text>
        </TouchableOpacity>
        {/* <Text>{checkStore[0].location}</Text> */}

        {/* <AppTextInput
          titleText={'Address'}
          placeholder={'Address'}
          value={formData.shopLocation}
          onChangeText={text => handleInputChange('shopLocation', text)}
        /> */}
        {checkStore ? (
          <BaseButton
            title={
              loading1 ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                t('Update Store')
              )
            }
            defaultStyle={{marginVertical: 20}}
            disabled={validF || loading1}
            onPress={handleUpdateStore}
          />
        ) : (
          <BaseButton
            title={
              loading1 ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                t('Add Store')
              )
            }
            defaultStyle={{marginVertical: 20}}
            disabled={validF || loading1}
            onPress={handleAddStore}
          />
        )}
      </ScrollView>
      <ModalLoadingTrans
        showLoadingModal={showLoadingModal}
        setShowLoadingModal={setShowLoadingModal}
      />
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        defaultStyle={{}}
        // style={{
        //   width: '90%',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   backgroundColor: 'red', // Add an overlay background color if desired
        // }}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            padding: 20,
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
          }}>
          {/* <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity> */}

          <GooglePlacesAutocomplete
            placeholder={t('SearchD')}
            GooglePlacesDetailsQuery={{fields: 'geometry'}}
            // renderPoweredByGoogle={false}
            enablePoweredByContainer={false}
            styles={{
              container: {
                // height: 10,
                //   flex: 1,
                //   zIndex: 2,
                // height: '70%',
                width: '100%',
                alignSelf: 'center',
                // borderWidth: 1,
                // borderColor: '#E0E0E0',
                // backgroundColor: '#F5F5F5',
                // backgroundColor: 'red',
                // marginTop: 10,
                // borderRadius: 10,
              },
              textInput: {
                height: '110%',
                // borderRadius: 10,
                //   borderWidth: 1,
                //   borderColor: '#E0E0E0',
                backgroundColor: 'white',
                //   borderBottomColor: '#d4d4d4',
                //   borderBottomWidth: 0.5,
                color: 'black',
              },
            }}
            fetchDetails={true}
            onPress={(data, details = null) => {
              // console.log(data, details);

              setCountry(data.terms[data.terms.length - 1].value);
              setCity(data?.terms[data.terms.length - 2]?.value);
              // 'details' is provided when fetchDetails = true
              setMarkerData({
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
              });
              setArea(data.description);
              setState(data.structured_formatting.secondary_text);
              // hideModal();
              setModalVisible(false);
            }}
            query={{
              key: constants.MAP_API_KEY,
              language: 'en',
            }}
          />
        </View>
      </Modal>
      {/* <Modal
        visible={isModalVisibleCat}
        animationType="slide"
        transparent={true}
        defaultStyle={{}}
        // style={{
        //   width: '90%',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   backgroundColor: 'red', // Add an overlay background color if desired
        // }}
        onRequestClose={() => setModalVisibleCat(false)}>
        <View
          style={{
            flex: 1,
            padding: 20,
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
          }}>
          <View style={{backgroundColor: colors.white, width: '100%'}}>
            <FlatList
              data={catData}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedItem(item);
                    setModalVisibleCat(false);
                  }}
                  style={{
                    // backgroundColor:
                    // selectedItem === item ? 'red' : 'transparent',
                    borderColor:
                      selectedItem === item ? 'black' : 'transparent',
                    borderWidth: 1,
                    padding: 10,
                    margin: 5,
                    borderRadius: 5,
                  }}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal> */}
    </Layout>
  );
};

export default CreateStore;

const styles = StyleSheet.create({});
