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
import {useNavigation} from '@react-navigation/native';
import MapView, {Circle, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
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
  const navigation = useNavigation();
  const [initialRegion, setInitialRegion] = useState({
    latitude: 0, // Set default latitude
    longitude: 0, // Set default longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [mapViewLayout, setMapViewLayout] = useState(null);

  console.log(initialRegion, 'initialRegion');
  useEffect(() => {
    getLocation();
  }, []);

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
        },
        error => {
          console.error(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  return (
    <Layout>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{alignSelf: 'flex-start', marginBottom: 40}}>
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
          style={{height: 200, width: 300, marginVertical: 30}}
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
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
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
        title={'Continue'}
        defaultStyle={{}}
        onPress={() => navigation.navigate('MainStack', {screen: 'AppStack'})}
      />
      <BaseButton
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
      />
    </Layout>
  );
};

export default ShareAddress;

const styles = StyleSheet.create({});
