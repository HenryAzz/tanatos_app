import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {devWidth} from '../../constraints/Dimentions';
import OrderCardCC from './OrderCardCC';
import {FlatList} from 'react-native';
import {ScrollView} from 'react-native';

const HomeStore = () => {
  const dataCheck = [
    {
      id: '1',
      title: 'Pink Rose',
      price: '$40.00',
      status: 'Check',
      image: require('../../assets/HomeStorepic.png'),
    },

    {
      id: '2',
      title: 'Pink Rose',
      price: '$40.00',
      status: 'Check',
      image: require('../../assets/HomeStorepic.png'),
    },
  ];
  const dataCompleted = [
    {
      id: '1',
      title: 'Pink Rose',
      price: '$40.00',
      status: 'Completed',
      image: require('../../assets/HomeStorepic.png'),
    },

    {
      id: '2',
      title: 'Pink Rose',
      price: '$40.00',
      status: 'Completed',
      image: require('../../assets/HomeStorepic.png'),
    },
  ];
  return (
    <>
      <ImageBackground
        style={{
          height: 180,

          paddingTop: 30,
        }}
        source={require('../../assets/Homebg.png')}>
        <FocusAwareStatusBar
          animated={true}
          barStyle={'light-content'}
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={{alignSelf: 'center', width: '90%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: 20,
              alignSelf: 'center',
              // backgroundColor: 'red',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  // backgroundColor: 'blue',
                  resizeMode: 'center',
                  borderRadius: 20,
                }}
                source={require('../../assets/images/HomeImg/HomeCardImg1.png')}
              />
              <View style={{paddingLeft: 10}}>
                <Text style={[style.font12Re, {color: colors.white}]}>
                  Good Morning
                </Text>
                <Text style={[style.font16Re, {color: colors.white}]}>
                  Marry John
                </Text>
              </View>
            </View>

            <Image
              style={{
                height: 20,
                width: 20,
                // backgroundColor: 'red',
                resizeMode: 'center',
              }}
              source={require('../../assets/images/HomeImg/bell.png')}
            />
          </View>
        </View>
      </ImageBackground>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={{padding: 10, backgroundColor: colors.white, flex: 1}}>
          <Text
            style={[style.font20Re, {fontFamily: fonts.bold, marginBottom: 3}]}>
            Orders
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View
              style={{
                elevation: 10,
                shadowColor: colors.elev,
                backgroundColor: colors.white,
                width: '49%',
                borderRadius: 10,
                height: 60,
                justifyContent: 'space-around',
                padding: 10,
              }}>
              <Text
                style={[
                  style.font20Re,
                  {fontFamily: fonts.bold, color: colors.primaryColor},
                ]}>
                10
              </Text>
              <Text
                style={[
                  style.font14Re,
                  {color: '#A2A2A2', textAlign: 'right'},
                ]}>
                Running Orders
              </Text>
            </View>

            <View
              style={{
                elevation: 10,
                shadowColor: colors.elev,
                backgroundColor: colors.white,
                width: '49%',
                borderRadius: 10,
                height: 60,
                justifyContent: 'space-around',
                padding: 10,
              }}>
              <Text
                style={[
                  style.font20Re,
                  {fontFamily: fonts.bold, color: colors.primaryColor},
                ]}>
                10
              </Text>
              <Text
                style={[
                  style.font14Re,
                  {color: '#A2A2A2', textAlign: 'right'},
                ]}>
                Pending Orders
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={[style.font20Re, {fontFamily: fonts.bold}]}>
              New Orders
            </Text>
            <Text
              style={[
                style.font16Re,
                {fontFamily: fonts.bold, color: colors.primaryColor},
              ]}>
              View All
            </Text>
          </View>
          <View style={{}}>
            <FlatList
              data={dataCheck}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              horizontal
              renderItem={({item}) => <OrderCardCC item={item} />}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={[style.font20Re, {fontFamily: fonts.bold}]}>
              Completed Orders
            </Text>
            <Text
              style={[
                style.font16Re,
                {fontFamily: fonts.bold, color: colors.primaryColor},
              ]}>
              View All
            </Text>
          </View>
          <View style={{}}>
            <FlatList
              data={dataCompleted}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              horizontal
              renderItem={({item}) => <OrderCardCC item={item} />}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeStore;

const styles = StyleSheet.create({});
