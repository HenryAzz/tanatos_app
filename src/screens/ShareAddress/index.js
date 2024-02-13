////////////// share screen orugnal code :
import {
  StyleSheet,
  Image,
  Text,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
  ScrollView,
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
import DeviceInfo from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
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

  // console.log(
  //   state,
  //   'country',
  //   country,
  //   'city',
  //   city,
  //   'area',
  //   area,
  //   formData,
  //   'formdata',
  //   account_Type,
  //   'accounttyo',
  //   ';;;;;;;;;;;',
  // );
  const [mapViewLayout, setMapViewLayout] = useState(null);

  // console.log(formData.starting_date, 'starting_date');
  useEffect(() => {
    getLocation();
  }, []);

  // const dateString = ;
  const formatDate = dateString => {
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
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setMarkerLocation({
            latitude,
            longitude,
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
  const [isLoading, setIsLoading] = useState();

  const handleFcm = async id => {
    const token = await AsyncStorage.getItem('token');

    let model = DeviceInfo.getModel();
    const _data = {
      type: 'add_devices',
      table_name: 'devices',
      user_id: id,
      devicePlatform: Platform.OS,
      deviceRid: token,
      deviceModel: model,
    };
    const res = await ApiRequest(_data);
    console.log(res.data, 'respon device');
  };

  const handleSignup = async () => {
    // console.log(initialRegion.latitude, 'initialRegion.latitude');
    // console.log(initialRegion.longitude, 'initialRegion.latitude');

    try {
      setIsLoading(true);
      const res = await ApiRequest({
        type: '/usuarios',
        data: {
          city: city,
          username: formData.name.trim(),
          email: formData.email.toLowerCase(),
          password: formData.password,
          address: formData.address,
          state: state,
          country: country,
          zipcode: '',
          phone: phone,
          lat: initialRegion.latitude,
          lng: initialRegion.longitude,
          dob: formatDate(formData.starting_date),
          gender: '',
          user_type: account_Type,
        },
      });
      const resp = res?.status;
      console.log(res);
      const userIdString = JSON.stringify(res?.data?.id);

      // let user_Id = JSON.stringify(id);
      if (resp === 201) {
        handleFcm(userIdString);
        await AsyncStorage.setItem('user_id', userIdString);
        await AsyncStorage.setItem('account_Type', account_Type);

        ToastMessage(res?.data?.message);
        // navigation.navigate('MainStack', {account_Type: account_Type});
        // if (account_Type === 'store') {
        //   // navigation.navigate('CreateStore', {
        //   //   phone: phone,
        //   //   account_Type: account_Type,
        //   // });
        //   navigation.reset({
        //     index: 0,
        //     routes: [
        //       {
        //         name: 'CreateStore',
        //         params: {
        //           phone: phone,
        //           account_Type: account_Type,
        //         },
        //       },
        //     ],
        //   });
        //   setIsLoading(false);
        // } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'MainStack',
            },
          ],
        });

        setIsLoading(false);
        // }
      } else {
        //  show message
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const [markerLocation, setMarkerLocation] = useState(null);
  const {t, i18n} = useTranslation();

  const toggleLanguage = async () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('es'); // Switch to Spanish
    } else {
      i18n.changeLanguage('en'); // Switch to English
    }
  };
  return (
    <ScrollView>
      <View style={{alignItems: 'center'}}>
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
            {t('share1')}
          </Text>
        </View>
        <View style={{width: '90%', marginTop: 20}}>
          <Text
            style={[style.font14Re, {color: '#A2A2A2', textAlign: 'center'}]}>
            {t('share2')}
          </Text>
        </View>

        {initialRegion ? (
          <MapView
            style={{height: 300, width: '100%', marginVertical: 30}}
            initialRegion={{
              latitude: initialRegion?.latitude || 0,
              longitude: initialRegion?.longitude || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            onPress={event => {
              const {latitude, longitude} = event.nativeEvent.coordinate;
              setInitialRegion({latitude, longitude});
              setMarkerLocation({latitude, longitude});
            }}>
            {markerLocation && (
              <Marker
                coordinate={markerLocation}
                title="Current Location"
                draggable={true}
                onDragEnd={e => {
                  setMarkerLocation(e.nativeEvent.coordinate);
                }}
              />
            )}
            <Circle
              center={{
                latitude:
                  markerLocation?.latitude || initialRegion?.latitude || 0,
                longitude:
                  markerLocation?.longitude || initialRegion?.longitude || 0,
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
            {t('share3')}
          </Text>
        )}
        <BaseButton
          title={
            isLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              t('Continue')
            )
          }
          defaultStyle={{}}
          disabled={isLoading || !initialRegion}
          onPress={handleSignup}
        />
      </View>
    </ScrollView>
  );
};

export default ShareAddress;

const styles = StyleSheet.create({});
