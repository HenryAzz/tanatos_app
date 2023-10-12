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
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import {ToastMessage} from '../../utils/Toast';

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

  // console.log(catData, 'cat');
  // console.log(selectedItem, 'selectedItemcat');

  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const res = await ApiRequest({
        type: 'add_data',
        table_name: 'stores',
        user_id: user_id,
        cat_id: selectedItem.id,
        phone: phone,
        location: area,
        lat: markerData.latitude,
        lng: markerData.longitude,
        name: selectedItem?.name,
      });
      const resp = res.data;
      if (res.data.result) {
        console.log(resp, 'create sore');
        ToastMessage(res?.data?.message);
        await AsyncStorage.setItem('store_id', toString(resp?.id));
        navigation.navigate('AddNews', {
          id: resp?.id,
          account_Type: account_Type,
        });
        // navigation.navigate('AddNews');
        setLoading(false);
      } else {
        ToastMessage(res?.data?.message);
        console.log('errrr');
      }
    } catch (err) {
      console.log(err, 'errrr');
    } finally {
      setLoading(false);
    }
  };
  // const validateForm = useMemo(() => {
  //   const isShopName = formData.shopName?.length > 0;
  //   const isShopLocation = area?.length > 0;
  //   const isCategory = selectedItem?.length > 0;

  //   return isShopName && isShopLocation && isCategory;
  // }, [formData || area || selectedItem?.name]);

  const [validF, setValidF] = useState(true);
  useMemo(() => {
    const isFormFilled =
      formData.shopName.trim() &&
      formData.shopName?.length > 0 &&
      selectedItem &&
      area?.length > 0;

    setValidF(!isFormFilled);
  }, [formData, selectedItem, area]);
  return (
    <Layout>
      {/* <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={colors.backgroundColor}
      /> */}
      <AuthHeader
        title={"Let's Create Store"}
        subTitle={'Enter Your details below to create a new store'}
      />
      <ScrollView
        style={{width: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <AppTextInput
          titleText={'Shop Name'}
          placeholder={'Shop Name'}
          value={formData.shopName}
          onChangeText={text => handleInputChange('shopName', text)}
        />
        {/* <AppTextInput
          titleText={'Category'}
          placeholder={'Category'}
          value={formData.category}
          onChangeText={text => handleInputChange('category', text)}
        /> */}
        <Text
          style={[style.font16Re, {fontFamily: fonts.medium, marginTop: 5}]}>
          Category
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisibleCat(true)}
          style={{
            borderWidth: 1,
            borderColor: '#E0E0E0',
            backgroundColor: '#F5F5F5',
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            paddingLeft: 10,
          }}>
          <Text> {selectedItem ? selectedItem.name : 'Category'}</Text>
        </TouchableOpacity>
        {/* <PhoneNumberInput
          title={'PHONE'}
          valid={valid}
          value={formData.phoneNumber}
          setValid={setValid}
          setValue={setFormData}
          formData={formData}
        /> */}

        {/* <AppTextInput
          titleText={'Shop Location'}
          placeholder={'Shop Location'}
          value={formData.shopLocation}
          onChangeText={text => handleInputChange('shopLocation', text)}
        /> */}

        <Text
          style={[style.font16Re, {fontFamily: fonts.medium, marginTop: 5}]}>
          Location
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
          <Text> {area ? area : 'Enter Store Location'}</Text>
        </TouchableOpacity>

        {/* <AppTextInput
          titleText={'Address'}
          placeholder={'Address'}
          value={formData.shopLocation}
          onChangeText={text => handleInputChange('shopLocation', text)}
        /> */}

        <BaseButton
          title={
            loading ? <ActivityIndicator color={colors.white} /> : 'Continue'
          }
          defaultStyle={{marginVertical: 20}}
          disabled={validF}
          onPress={handleAddStore}
        />
      </ScrollView>
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
            placeholder="Search "
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
      <Modal
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
      </Modal>
    </Layout>
  );
};

export default CreateStore;

const styles = StyleSheet.create({});
