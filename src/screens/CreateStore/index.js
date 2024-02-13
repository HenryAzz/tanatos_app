import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {t} from 'i18next';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ApiRequest from '../../Services/ApiRequest';
import style from '../../assets/css/style';
import AuthHeader from '../../components/AuthHeader';
import {BaseButton} from '../../components/BaseButton';
import AppTextInput from '../../components/FloatingLabelInput';
import Layout from '../../components/Layout';
import ModalLoadingTrans from '../../components/ModalLoadingTrans';
import {colors, constants, fonts} from '../../constraints';
import {ToastMessage} from '../../utils/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {userStore} from '../../store/reducer/usersSlice';

const CreateStore = () => {
  const route = useRoute();
  const phone = route?.params?.phone;
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    shopName: '',
    category: '',
    contactNumber: '',
    shopLocation: '',
  });

  const [area, setArea] = useState('');

  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [markerData, setMarkerData] = useState({latitude: '', longitude: ''});
  const store = useSelector(store => store.user);

  const [country, setCountry] = useState('');

  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const [catData, setCatData] = useState();

  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const handleGetCatData = async () => {
    try {
      setLoading(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'categories',
      });
      const resp = res.data.data;
      setCatData(resp);
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

    try {
      setLoading1(true);
      const res = await ApiRequest({
        type: 'add_data',
        table_name: 'stores',
        user_id: user_id,
        phone: phone,
        location: area,
        lat: markerData.latitude,
        lng: markerData.longitude,
        name: formData.shopName,
      });
      const resp = res.data;

      if (res.data.result) {
        dispatch(userStore(res?.data?.store));
        ToastMessage(res?.data?.message);
        await AsyncStorage.setItem('store_id', JSON.stringify(resp?.id));

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
    try {
      setLoading1(true);

      const res = await ApiRequest({
        type: 'update_data',
        table_name: 'stores',
        id: store?.store?.id,
        location: area,
        name: formData.shopName,
      });

      if (res.data.result) {
        ToastMessage(res?.data?.message);
        navigation.navigate('MainStack', {
          screen: 'UploadPhoto',
          params: {
            type: 'update',
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

  useEffect(() => {
    if (Object.keys(store?.store)?.length !== 0) {
      setFormData({
        ...formData,
        shopName: store?.store?.name,
      });
      setArea(store?.store?.location);
    }
  }, [isFocused]);

  return (
    <Layout>
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
          <Text
            numberOfLines={1}
            style={[
              style.font16Re,
              {color: area ? colors.black : colors.gray},
            ]}>
            {' '}
            {area ? area : t('Enter Store Location')}
          </Text>
        </TouchableOpacity>
        {/* <Text>{checkStore[0].location}</Text> */}

        {/* <AppTextInput
          titleText={'Address'}
          placeholder={'Address'}
          value={formData.shopLocation}
          onChangeText={text => handleInputChange('shopLocation', text)}
        /> */}
        {Object.keys(store?.store)?.length !== 0 ? (
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
                flex: 1,
                zIndex: 2,
                height: '100%',
                width: '100%',
                alignSelf: 'center',
                marginTop: 10,
              },
              textInput: {
                borderBottomColor: '#d4d4d4',
                borderBottomWidth: 1,
                color: 'black',
                fontFamily: fonts.regular,
                fontSize: 16,
              },
              description: {
                color: 'black',
                fontFamily: fonts.regular,
                fontSize: 16,
                lineHeight: 22,
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
    </Layout>
  );
};

export default CreateStore;

const styles = StyleSheet.create({});
