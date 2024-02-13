import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Share from 'react-native-share';
import {captureRef} from 'react-native-view-shot';
import style from '../../assets/css/style';
import {BaseButton} from '../../components/BaseButton';
import DontHaveAccount from '../../components/DontHaveAccount';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {colors, fonts} from '../../constraints';
import FuneralCardShow from './FuneralCardShow';

const FuneralDetailedPage = () => {
  //

  const route = useRoute();
  const navigation = useNavigation();

  const viewRef = useRef();

  const item = route?.params?.item;
  const pathFromBackend = item?.image;
  const cleanedPath = pathFromBackend?.replace(/^"(.*)"$/, '$1');

  const [showDontHaveModal, setShowDontHaveModal] = useState(false);

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

  const handleDontHaveAccout = () => {
    setShowDontHaveModal(false);
  };

  const handlePress = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    if (user_id || user_id !== null) {
      navigation.navigate('FlowerGalery', {item: item});
    } else {
      setShowDontHaveModal(true);
    }
  };

  const ShareMe = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'jpg',
        quality: 0.8,
      });
      await Share.open({url: uri});
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={{flex: 1, width: '100%', backgroundColor: colors.white}}>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent={true}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View ref={viewRef} style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{height: 258, backgroundColor: colors.primaryColor}}>
            <View
              style={{
                alignItems: 'center',
                padding: 4,
                marginTop: 20,
                width: '100%',
              }}>
              <View
                style={{
                  alignSelf: 'flex-start',
                  paddingTop: 10,
                  paddingLeft: 10,
                }}>
                <Text
                  style={[
                    style.font24Re,
                    {fontFamily: fonts.bold, color: 'rgba(255, 255, 255, 0.5)',fontSize:18},
                  ]}>
                  TANATOS
                </Text>

                <Text
                  style={[
                    style.font12Re,
                    {
                      fontFamily: fonts.bold,
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize:9
                    },
                  ]}>
                  ESQUELAS ONLINE
                </Text>
              </View>
              <View style={{width: '100%', alignItems: 'center',display:'flex',justifyContent:'center',flexDirection:'column',  top:-20}}>
                {item.image ? (
                  <Image
                    source={{uri:'https://static.vecteezy.com/system/resources/previews/011/675/372/original/female-avatar-images-png.png'}}
                    style={{
                      height: 96,
                      width: 96,
                   
                      borderRadius: 80
                    
                    }}
                  />
                ) : (
                  <Image
                    source={require('../../assets/app_icon.png')}
                    style={{
                      height: 160,
                      width: 160,
                      borderRadius: 80,
                      top: 0,
                    }}
                  />
                )}
                <Text
                  style={[
                    style.font20Re,
                    {
                      fontFamily: fonts.bold,
                      color: colors.white,
                      marginVertical: 10,
                      maxWidth:120,
                      textAlign: 'center',
                    },
                  ]}>
                  {item?.name} holaa
                </Text>
                <Text style={[{fontSize: 13, color: colors.white}]}>
               
                  {item?.short_message}
                </Text>
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 30}}>
            <View style={{paddingVertical: 14}}>
              <Text style={[style.font16Re, {color: '#35140A'}]}>
                {item?.description}
              </Text>
            </View>
            <FuneralCardShow
              heading={'tanatorio'}
              name={item?.name}
              description={item?.description}
              title={item?.chruch_location}
              chruch_lat={item?.chruch_lat}
              chruch_lng={item?.lng}
              date={item?.church_date}
              img={item.funeral_img}
              img1={require('../../assets/send22.png')}
              img2={require('../../assets/send2.png')}
              onPress={() => OpenMap()}
            />
            <FuneralCardShow
              heading={'ceremonia'}
              hall_no={item.hall_no}
              img={item.church_img}
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
          </View>
        </View>
        <View style={{marginBottom: 20, paddingHorizontal: 30}}>
          <BaseButton
            title={t('Send Flowers')}
            defaultStyle={{marginVertical: 10}}
            onPress={handlePress}
          />
          <BaseButton title={t('Share')} onPress={ShareMe} />
        </View>
      </ScrollView>
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
    </View>
  );
};

export default FuneralDetailedPage;

const styles = StyleSheet.create({});
