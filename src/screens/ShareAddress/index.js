import {
  StyleSheet,
  Image,
  Text,
  View,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import AuthHeader from '../../components/AuthHeader';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import {BakcButton} from '../../assets/images/svg';
import {BaseButton} from '../../components/BaseButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView, {Circle, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {ToastMessage} from '../../utils/Toast';
import moment from 'moment';
import ApiRequest from '../../Services/ApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'MERI CYCLE Wants to access your location',
        message: 'Can we access your location?',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
const ShareAddress = () => {
  const route = useRoute();
  const {account_Type, phone, formData, city, country, state, area} =
    route?.params;
  const navigation = useNavigation();

  console.log(
    state,
    'country',
    country,
    'city',
    city,
    'area',
    area,
    ';;;;;;;;;;;',
  );
  const [mapViewLayout, setMapViewLayout] = useState(null);

  // console.log(formData.starting_date, 'starting_date');
  useEffect(() => {
    getLocation();
  }, []);

  // const dateString = ;
  const formatDate = dateString => {
    console.log(dateString, 'date');
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    // const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
    //   new Date(dateString),
    // );
    const formattedDate = moment(dateString).format('YYYY-MM-DD');
    return formattedDate;
  };
  // console.log(formatDate(formData.starting_date), 'options');

  const getLocation = async () => {
    const result = await requestLocationPermission();
    if (result) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setInitialRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        error => {
          console.error(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };
  const [initialRegion, setInitialRegion] = useState(null);
  console.log(formData, 'formdata');
  const [isLoading, setIsLoading] = useState();
  const handleSignup = async () => {
    // console.log(initialRegion.latitude, 'initialRegion.latitude');
    // console.log(initialRegion.longitude, 'initialRegion.latitude');

    try {
      setIsLoading(true);
      const res = await ApiRequest({
        type: 'register',
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: area,
        city: account_Type === 'store' ? '' : city,
        state: account_Type === 'store' ? '' : state,
        country: account_Type === 'store' ? '' : country,
        // zipcode: account_Type === 'store' ? '' : '123',
        phone: phone,
        lat: initialRegion.latitude,
        lng: initialRegion.longitude,
        dob: formatDate(formData.starting_date),
        gender: formData.gender,
        user_type: account_Type,
      });
      const resp = res?.data.result;
      console.log(res?.data, 'register/////////////////');

      const userIdString = JSON.stringify(res?.data?.user_id);

      // let user_Id = JSON.stringify(id);
      if (resp) {
        console.log('register donesss////', res.data);
        await AsyncStorage.setItem('user_id', userIdString);
        // await AsyncStorage.setItem('account_Type', account_Type);

        ToastMessage(res?.data?.message);
        // navigation.navigate('MainStack', {account_Type: account_Type});
        if (account_Type === 'store' || account_Type === 'funeral') {
          navigation.navigate('CreateStore', {
            phone: phone,
            account_Type: account_Type,
          });
          setIsLoading(false);
        } else {
          navigation.navigate('MainStack', {screen: 'AppStack'});
          setIsLoading(false);
        }
      } else {
        //  show message
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <Layout>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{alignSelf: 'flex-start', marginBottom: 10}}>
        <Image
          source={require('../../assets/BackButtonp.png')}
          style={{height: 60, width: 60, left: -12}}
        />
      </TouchableOpacity>
      <View style={{width: '60%'}}>
        <Text
          style={[
            style.font24Re,
            {fontFamily: fonts.bold, textAlign: 'center'},
          ]}>
          Share Your Address With Us
        </Text>
      </View>
      <View style={{width: '90%', marginTop: 20}}>
        <Text style={[style.font14Re, {color: '#A2A2A2', textAlign: 'center'}]}>
          Please enter your location or allow access to your location to find
          food near you.
        </Text>
      </View>
      {/* <Image
        source={require('../../assets/Address.png')}
        style={{height: 200, width: 200, marginVertical: 60}}
      /> */}

      {initialRegion ? (
        <MapView
          style={{height: 400, width: 300, marginVertical: 30}}
          initialRegion={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}>
          <Marker
            coordinate={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
            }}
            title="Current Location"
          />
          <Circle
            center={{
              latitude: initialRegion?.latitude,
              longitude: initialRegion?.longitude,
            }}
            radius={1000}
            fillColor="rgba(0, 128, 255, 0.2)"
            strokeColor="rgba(0, 128, 255, 0.5)"
          />
        </MapView>
      ) : (
        <Text
          style={[
            style.font18Re,
            {
              color: colors.primaryColor,
              marginVertical: 100,
              fontFamily: fonts.bold,
            },
          ]}>
          No Location Permissions
        </Text>
      )}
      <BaseButton
        title={
          isLoading ? <ActivityIndicator color={colors.white} /> : 'Continue'
        }
        defaultStyle={{}}
        disabled={isLoading || !initialRegion}
        onPress={handleSignup}
      />
      {/* <BaseButton
        title={'Skip'}
        defaultStyle={{
          backgroundColor: colors.backgroundColor,
          borderColor: colors.primaryColor,
          borderWidth: 1,
          marginVertical: 30,
        }}
        textStyle={{
          color: colors.primaryColor,
        }}
      /> */}
    </Layout>
  );
};

export default ShareAddress;

const styles = StyleSheet.create({});
