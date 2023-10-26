import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import React from 'react';
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
const FuneralDetailedPage = () => {
  const route = useRoute();
  const item = route?.params?.item;
  console.log(item, 'item');

  const pathFromBackend = item.image;

  const cleanedPath = pathFromBackend.replace(/^"(.*)"$/, '$1');
  // console.log(item, 'data item');
  const navigation = useNavigation();
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

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${parseFloat(
    item.funeral_lat,
  )},${parseFloat(item.funeral_lng)}&destination=${parseFloat(
    item.chruch_lat,
  )},${parseFloat(item.chruch_lng)}`;
  const {t} = useTranslation();
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
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            paddingLeft: 16,
            marginTop: 30,
            width: '96%',
            alignSelf: 'center',
          }}>
          <View style={{width: '66%', left: 10}}>
            <Text
              style={[
                style.font24Re,
                {fontFamily: fonts.bold, color: colors.white},
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
              {t('ESQUELAS ONLINE')}
            </Text>
            <Text
              style={[
                style.font24Re,
                {
                  fontFamily: fonts.bold,
                  color: colors.white,
                  marginVertical: 10,
                },
              ]}>
              {item.name}
            </Text>
            <Text style={[{fontSize: 13, color: colors.white}]}>
              {item.short_message}
            </Text>
          </View>
          <Image
            source={{uri: item.url + cleanedPath}}
            resizeMode="contain"
            style={{
              height: 160,
              width: 160,
              right: 20,
              top: 30,
              borderRadius: 80,
            }}
          />
          {/* <Image
              source={require('../../assets/logoimg.png')}
              resizeMode="contain"
              style={{
                height: 160,
                width: 160,
                right: 20,
                top: 30,
              }}
            /> */}
        </View>
      </ImageBackground>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}>
        <View style={{padding: 14, marginBottom: 20}}>
          <View style={{paddingVertical: 14}}>
            <Text style={[style.font16Re, {color: '#858585'}]}>
              {item.description}
            </Text>
            {/* <Text
              style={[style.font16Re, {color: '#858585', paddingVertical: 20}]}>
              Words may not be enough to express the deep sorrow we feel at the
              passing of (Name), but please accept our/my condolences and we
              will be sure to include you in our daily prayers.
            </Text>
            <Text
              style={[
                style.font16Re,
                {color: colors.primaryColor, fontFamily: fonts.medium},
              ]}>
              The angels rejoice when a good soul has finally returned home! My
              deepest condolences to you and your family.
            </Text> */}
          </View>
          <FuneralCardShow
            title={item.funeral_location}
            funeral_lat={item.funeral_lat}
            funeral_lng={item.funeral_lng}
            date={item.funeral_date}
            time={item.funeral_time}
            subTitle={'Home prayer'}
            img1={require('../../assets/send11.png')}
            img2={require('../../assets/send1.png')}
            onPress={() =>
              navigation.navigate('Map', {
                params: {
                  startLat: item.funeral_lat,
                  startLng: item.funeral_lng,
                  destLat: item.chruch_lat,
                  destLng: item.chruch_lng,
                },
              })
            }
            // onPress={() => {
            //   Linking.openURL(directionsUrl);
            // }}
          />
          <FuneralCardShow
            title={item.chruch_location}
            chruch_lat={item.chruch_lat}
            chruch_lng={item.lng}
            date={item.church_date}
            time={item.church_time}
            subTitle={'Church prayer'}
            img1={require('../../assets/send22.png')}
            img2={require('../../assets/send2.png')}
            onPress={() =>
              navigation.navigate('Map', {
                params: {
                  startLat: item.funeral_lat,
                  startLng: item.funeral_lng,
                  destLat: item.chruch_lat,
                  destLng: item.chruch_lng,
                },
              })
            }
            // onPress={() => {
            //   Linking.openURL(directionsUrl);
            // }}
          />
          <BaseButton
            title={t('Send Flowers')}
            defaultStyle={{marginVertical: 10}}
            onPress={() => navigation.navigate('FlowerGalery', {item: item})}
          />
          <BaseButton title={t('Share')} onPress={ShareMe} />
        </View>
      </ScrollView>
    </View>
  );
};

export default FuneralDetailedPage;

const styles = StyleSheet.create({});
