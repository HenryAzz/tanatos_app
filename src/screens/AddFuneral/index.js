import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import AppHeader from '../../components/AppHeader/AppHeader';
import FuneralCard from '../Home/FuneralCard';
import {ScrollView} from 'react-native';

const AddFuneralScreen = () => {
  return (
    <View style={{flex: 1, width: '100%', backgroundColor: colors.white}}>
      <AppHeader
        title={'Flower to Funeral Home'}
        defaultStyle={{marginHorizontal: 10}}
      />
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
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal: 10, marginVertical: 40}}>
          <FuneralCard />
          <FuneralCard />
          <FuneralCard />
          <FuneralCard />
          <FuneralCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddFuneralScreen;

const styles = StyleSheet.create({});
