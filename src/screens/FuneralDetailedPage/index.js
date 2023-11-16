import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../components/Layout';
import {BaseButton} from '../../components/BaseButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Image} from 'react-native';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';
import FuneralCardShow from './FuneralCardShow';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import Share from 'react-native-share';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import DontHaveAccount from '../../components/DontHaveAccount';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
const FuneralDetailedPage = () => {
  const store = useSelector(store => store.user);
  console.log(store.user_id, 'store');
  const route = useRoute();
  const item = route?.params?.item;
  const itemFav = route?.params?.itemFav;
  console.log(item, 'item from fave');

  const pathFromBackend = item?.image;

  const cleanedPath = pathFromBackend?.replace(/^"(.*)"$/, '$1');
  // console.log(cleanedPath, 'data item');
  const navigation = useNavigation();
  // console.log(cleanedPath, 'item.url + cleanedPath');
  // const imageUrl = cleanedPath
  // ? item.url + cleanedPath
  // : '../../assets/app_icon.png';

  const ShareMe = async () => {
    const shareOptions = {
      message:
        'Hi wellcome to TANATOS download from PlayStore and register Now https://tanatos.com',
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(ShareResponse, 'Share res');
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  // const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${parseFloat(
  //   item?.funeral_lat,
  // )},${parseFloat(item.funeral_lng)}&destination=${parseFloat(
  //   item.chruch_lat,
  // )},${parseFloat(item.chruch_lng)}`;
  const {t} = useTranslation();

  const chruch_lat = item?.chruch_lat && JSON.parse(item?.chruch_lat);
  const chruch_lng = item?.chruch_lng && JSON.parse(item?.chruch_lng);
  const funeral_lat = item?.funeral_lat && JSON.parse(item?.funeral_lat);
  const funeral_lng = item?.funeral_lng && JSON.parse(item?.funeral_lng);
  // const funeral_lng = item?.funeral_lng?.;

  const startLat = funeral_lat && funeral_lat?.toFixed(5); // Starting latitude
  const startLng = funeral_lng && funeral_lng?.toFixed(5); // Starting longitude
  const destinationLat = chruch_lat && chruch_lat?.toFixed(5); // Destination latitude
  const destinationLng = chruch_lng && chruch_lng?.toFixed(5); // Destination longitude

  const url = Platform.select({
    ios: `http://maps.apple.com/?saddr=${startLat},${startLng}&daddr=${destinationLat},${destinationLng}`,
    android: `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${destinationLat},${destinationLng}`,
  });
  const OpenMap = () =>
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log(`Unable to open ${url}`);
        }
      })
      .catch(err => ErrorMessage('Try again later'));

  const [showDontHaveModal, setShowDontHaveModal] = useState(false);

  const handleDontHaveAccout = () => {
    // Implement your delete logic here
    // ...
    setShowDontHaveModal(false);
  };
  const checkGuest = async () => {
    // const user_type = await AsyncStorage.getItem('account_type');
    const user_id = await AsyncStorage.getItem('user_id');
    if (!user_id || null) {
      setShowDontHaveModal(true);
    }
  };
  useEffect(() => {
    checkGuest();
  }, []);
  return (
    <View style={{flex: 1, width: '100%', backgroundColor: colors.white}}>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <ImageBackground
        style={{height: 270, paddingTop: 16}}
        source={require('../../assets/Sharedbg.jpg')}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
          <Image
            source={require('../../assets/BackButtonp.png')}
            style={{
              height: 44,
              width: 44,
              position: 'absolute',
              marginVertical: 10,
              left: 10,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'center',
            padding: 4,
            // paddingLeft: 16,
            marginTop: 30,
            width: '96%',
            alignSelf: 'center',
          }}>
          <View style={{width: '60%', left: 10}}>
            <Text
              style={[
                style.font24Re,
                {fontFamily: fonts.bold, color: 'rgba(255, 255, 255, 0.5)'},
              ]}>
              {t('TANATOS')}
            </Text>

            <Text
              style={[
                style.font12Re,
                {
                  fontFamily: fonts.bold,
                  color: colors.white,
                },
              ]}>
              {/* {t('ESQUELAS ONLINE')} */}
            </Text>
            <Text
              style={[
                style.font20Re,
                {
                  fontFamily: fonts.bold,
                  color: colors.white,
                  marginVertical: 10,
                },
              ]}>
              {item?.name}
            </Text>
            <Text style={[{fontSize: 13, color: colors.white}]}>
              {item?.short_message}
            </Text>
          </View>
          {item.image ? (
            <Image
              source={{uri: item.url + cleanedPath}}
              style={{
                height: 160,
                width: 160,
                right: 20,
                borderRadius: 80,
                top: 0,
              }}
            />
          ) : (
            <Image
              source={require('../../assets/app_icon.png')}
              style={{
                height: 160,
                width: 160,
                right: 20,
                borderRadius: 80,
                top: 0,
              }}
            />
          )}
        </View>
      </ImageBackground>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}>
        <View style={{padding: 14, marginBottom: 20}}>
          <View style={{paddingVertical: 14}}>
            <Text style={[style.font16Re, {color: '#858585'}]}>
              {item?.description}
            </Text>
          </View>
          <FuneralCardShow
            heading={'VELATORIO'}
            name={item?.name}
            description={item?.description}
            title={item?.chruch_location}
            chruch_lat={item?.chruch_lat}
            chruch_lng={item?.lng}
            date={item?.church_date}
            time={item?.church_time}
            // hall_no={item.hall_no}
            // subTitle={'Church prayer'}
            img1={require('../../assets/send22.png')}
            img2={require('../../assets/send2.png')}
            onPress={() => OpenMap()}
            // onPress={() => {
            //   Linking.openURL(directionsUrl);
            // }}
          />
          <FuneralCardShow
            heading={'CEREMONIA'}
            hall_no={item.hall_no}
            // name={item?.name}
            // description={item?.description}
            title={item?.funeral_location}
            funeral_lat={item?.funeral_lat}
            funeral_lng={item?.funeral_lng}
            date={item?.funeral_date}
            time={item?.funeral_time}
            subTitle={'Home prayer'}
            img1={require('../../assets/send11.png')}
            img2={require('../../assets/send1.png')}
            onPress={() => OpenMap()}
          />

          <BaseButton
            title={t('Send Flowers')}
            defaultStyle={{marginVertical: 10}}
            onPress={() => navigation.navigate('FlowerGalery', {item: item})}
          />
          <DontHaveAccount
            visible={showDontHaveModal}
            closeModal={() => {
              setShowDontHaveModal(false);
              navigation.replace('MainStack');
            }}
            handleDontHave={handleDontHaveAccout}
            setShowDontHaveModa={setShowDontHaveModal}
            message={t(
              "Hey there! It looks like you're not logged in. Log in to proceed further.",
            )}
          />
          <BaseButton title={t('Share')} onPress={ShareMe} />
        </View>
      </ScrollView>
    </View>
  );
};

export default FuneralDetailedPage;

const styles = StyleSheet.create({});
