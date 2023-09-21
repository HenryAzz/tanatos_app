import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import {BaseButton} from '../../components/BaseButton';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';
import FuneralCardShow from './FuneralCardShow';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import Share from 'react-native-share';
const FuneralDetailedPage = () => {
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
          style={{height: 250, paddingTop: 16}}
          source={require('../../assets/Sharedbg.jpg')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
              paddingLeft: 16,
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
                Marry Phillips
              </Text>
              <Text style={[{fontSize: 13, color: colors.white}]}>
                Fining Solace in the shared memories we hold dear
              </Text>
            </View>
            <Image
              source={require('../../assets/Sharedimg.png')}
              style={{
                height: 160,
                width: 160,
                right: 20,
                top: 30,
              }}
            />
          </View>
        </ImageBackground>
        <View style={{padding: 14, marginBottom: 20}}>
          <View style={{paddingVertical: 14}}>
            <Text style={[style.font16Re, {color: '#858585'}]}>
              I can't imagine what you must be feeling right now, but I want you
              to know that we are just a phone call away. My deepest
              condolences.
            </Text>
            <Text
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
            </Text>
          </View>
          <FuneralCardShow
            title={'Home Funeral Time'}
            subTitle={'Home prayer'}
            img1={require('../../assets/send11.png')}
            img2={require('../../assets/send1.png')}
          />
          <FuneralCardShow
            title={'The Church of San Rafael'}
            subTitle={'Home prayer'}
            img1={require('../../assets/send22.png')}
            img2={require('../../assets/send2.png')}
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
