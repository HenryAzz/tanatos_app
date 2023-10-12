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
const FuneralDetailedPage = () => {
  const route = useRoute();
  const item = route?.params?.item;
  [
    {
      chruch_lat: '21.1431669',
      chruch_lng: '105.8554513',
      chruch_location: 'Uy Nỗ, Đông Anh, Hanoi, Vietnam',
      church_date: '2023-10-31',
      church_time: '00:00:00',
      created_at: '5th Oct',
      description: 'Cnchf',
      distance: '',
      funeral_date: '2023-10-05',
      funeral_lat: '17.4154947',
      funeral_lng: '78.4179563',
      funeral_location:
        'TTD Tirumala Tirupati Devasthanam, Road Number 92, MLA Colony, Jubilee Hills, Hyderabad, Telangana, India',
      funeral_time: '00:00:00',
      id: '16',
      image: '"9406_f56cea92-2c69-45ff-b2f6-d16b1427578f.jpg"',
      lat: '',
      lng: '',
      name: 'Fjfuf6',
      table_name: 'funerals',
      thumb:
        'https://locatestudent.com/tanatos/upload/"9406_f56cea92-2c69-45ff-b2f6-d16b1427578f.jpg"',
      time: '00:00:00',
      updated_timestamp: '2023-10-05 16:13:14',
      url: 'https://locatestudent.com/tanatos/upload/',
      user: {
        address: '',
        created_at: '2023-10-05 14:41:54',
        dob: '2000-01-01',
        email: 'shan@gmail.com',
        gender: 'male',
        id: '47',
        lat: '0',
        lng: '0',
        name: 'Shan',
        password:
          '4fe1ef7b99ebc2ad6d4e2d08c65c0b23eaf65e11780f6b37dd267d254f16680e',
        phone: '+923456789012',
        user_type: 'funeral',
      },
      user_id: '47',
    },
  ];

  const pathFromBackend = item.image;

  const cleanedPath = pathFromBackend.replace(/^"(.*)"$/, '$1');
  console.log(item, 'data item');
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
        style={{width: '100%'}}>
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
                TANATOS
              </Text>
              <Text
                style={[
                  style.font12Re,
                  {
                    fontFamily: fonts.bold,
                    color: colors.white,
                  },
                ]}>
                ESQUELAS ONLINE
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
            title={'Send Flowers'}
            defaultStyle={{marginVertical: 10}}
            onPress={() => navigation.navigate('FlowerGalery')}
          />
          <BaseButton title={'Share'} onPress={ShareMe} />
        </View>
      </ScrollView>
    </View>
  );
};

export default FuneralDetailedPage;

const styles = StyleSheet.create({});
