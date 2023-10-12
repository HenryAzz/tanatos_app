import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {devWidth} from '../../constraints/Dimentions';
import OrderCardCC from './OrderCardCC';
import {FlatList} from 'react-native';
import {ScrollView} from 'react-native';
import ApiRequest from '../../Services/ApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    {
      id: '3',
      title: 'Pink Rose',
      price: '$40.00',
      status: 'Completed',
      image: require('../../assets/HomeStorepic.png'),
    },
    {
      id: '4',
      title: 'Pink Rose',
      price: '$40.00',
      status: 'Completed',
      image: require('../../assets/HomeStorepic.png'),
    },
    {
      id: '5',
      title: 'Pink Rose',
      price: '$40.00',
      status: 'Completed',
      image: require('../../assets/HomeStorepic.png'),
    },
    {
      id: '6',
      title: 'Pink Rose',
      price: '$40.00',
      status: 'Completed',
      image: require('../../assets/HomeStorepic.png'),
    },
  ];
  const [loading, setLoading] = useState(false);
  const [catalogData, setCatalogData] = useState();
  console.log(catalogData, 'catalogData');
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const handleGetCatData = async () => {
    try {
      setLoading(true);
      setShowLoadingModal(true);
      const user_id = await AsyncStorage.getItem('user_id');
      // console.log(user_id);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'stores_gallery',
        user_id: user_id,
        // last_id:""
      });
      const resp = res.data.data;
      console.log(resp, 'resp///');
      setCatalogData(resp);
      setShowLoadingModal(false);
    } catch (err) {
    } finally {
      setShowLoadingModal(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetCatData();
  }, []);
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
              style={[style.font14Re, {color: '#A2A2A2', textAlign: 'right'}]}>
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
              style={[style.font14Re, {color: '#A2A2A2', textAlign: 'right'}]}>
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
        {/* <View style={{}}>
            <FlatList
              data={dataCheck}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              horizontal
              renderItem={({item}) => <OrderCardCC item={item} />}
            />
          </View> */}
        {/* <View
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
          </View> */}
        <View style={{flex: 1}}>
          <FlatList
            data={catalogData}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={({item}) => (
              <OrderCardCC item={item} images={item.images} />
            )}
          />
        </View>
      </View>
    </>
  );
};

export default HomeStore;

const styles = StyleSheet.create({});
