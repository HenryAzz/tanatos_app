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
import OngoingOrder from '../MyOrder/Ongoing';
import Completed from '../MyOrder/Completed';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NewOrder from '../MyOrder/NewOrder';
import Processing from '../MyOrder/Processing';
import Cancelled from '../MyOrder/Cancelled';
import Greetings from '../../components/Greetings/Greeting';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {BaseButton} from '../../components/BaseButton';
import ModalLoadingTrans from '../../components/ModalLoadingTrans';
import {useTranslation} from 'react-i18next';

const HomeStore = () => {
  const Top = createMaterialTopTabNavigator();
  const isFocused = useIsFocused();
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
  const [loading1, setLoading1] = useState(false);
  const [catalogData, setCatalogData] = useState();
  // console.log(catalogData, 'catalogData');
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const [formData, setFormData] = useState({
    userName: '',
    image: '',
    url: '',
    accountType: '',
  });

  const handleGetData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setShowLoadingModal(true);
      const res = await ApiRequest({
        type: 'get_data',
        id: user_id,
        table_name: 'users',
      });
      const resp = res?.data?.data[0];
      console.log(resp, 'respresprespresprespresp');
      setFormData({
        userName: resp?.name,
        image: resp?.image,
        url: resp?.url,
        accountType: resp?.user_type,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCatData = async () => {
    try {
      setLoading1(true);
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
      // console.log(resp, 'resp///');
      setCatalogData(resp);
      setShowLoadingModal(false);
    } catch (err) {
    } finally {
      setShowLoadingModal(false);
      setLoading(false);
    }
  };
  const navigation = useNavigation();
  const [checkStore, setCheckStore] = useState();
  const handleCheckStore = async () => {
    try {
      setLoading(true);
      // setShowLoadingModal(true);
      const user_id = await AsyncStorage.getItem('user_id');
      // console.log(user_id);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'stores',
        user_id: user_id,
        own: 1,
        // last_id:""
      });
      const resp = res.data.data;
      // console.log(resp, 'resp/// get store data');
      setCheckStore(resp);
      // setShowLoadingModal(false);
    } catch (err) {
    } finally {
      setShowLoadingModal(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetData();
    handleCheckStore();
    handleGetCatData();
  }, [isFocused]);
  // console.log(checkStore, 'checkStore');

  const {t, i18n} = useTranslation();
  const toggleLanguage = async () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('es'); // Switch to Spanish
    } else {
      i18n.changeLanguage('en'); // Switch to English
    }
  };

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
              {formData.image ? (
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.gray,
                    alignSelf: 'center',
                    // marginTop: 25,
                    // marginBottom: 5,
                  }}>
                  <Image
                    style={{
                      height: 50,
                      width: 50,
                      // backgroundColor: 'blue',
                      // resizeMode: 'center',
                      borderRadius: 30,
                    }}
                    source={{uri: formData.url + formData.image}}
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.gray,
                    alignSelf: 'center',
                    // marginTop: 25,
                    // marginBottom: 5,
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
                </View>
              )}
              <View style={{paddingLeft: 10}}>
                <Greetings accountType={formData.accountType} />
                <Text style={[style.font16Re, {color: colors.white}]}>
                  {formData?.userName}
                </Text>
              </View>
            </View>

            <Image
              style={{
                height: 20,
                width: 20,

                resizeMode: 'center',
              }}
              source={require('../../assets/images/HomeImg/bell.png')}
            />
          </View>
        </View>
      </ImageBackground>
      {/* <BaseButton title={'Change'} onPress={() => toggleLanguage()} /> */}
      <View style={{padding: 10, backgroundColor: colors.white, flex: 1}}>
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
          {/* <Text
            style={[
              style.font16Re,
              {fontFamily: fonts.bold, color: colors.primaryColor},
            ]}>
            View All
          </Text> */}
        </View>

        {/* {loading && <ModalLoadingTrans />} */}
        {checkStore?.length > 0 ? (
          <View style={{flex: 1}}>
            <Top.Navigator
              screenOptions={{
                swipeEnabled: false,
                tabBarIndicatorStyle: {backgroundColor: colors.primaryColor},
              }}>
              <Top.Screen
                name="New"
                component={NewOrder}
                options={{
                  tabBarLabel: ({focused, color, size}) => (
                    <Text
                      style={{
                        fontSize: 12,
                        // paddingBottom: 5,
                        color: focused ? colors.primaryColor : colors.gray,
                        fontFamily: focused ? fonts.bold : fonts.bold,
                      }}>
                      {t('New')}
                    </Text>
                  ),
                }}
              />
              <Top.Screen
                name="Processing"
                component={Processing}
                options={{
                  tabBarLabel: ({focused, color, size}) => (
                    <Text
                      style={{
                        fontSize: 12,
                        // paddingBottom: 5,
                        color: focused ? colors.primaryColor : colors.gray,
                        fontFamily: focused ? fonts.bold : fonts.bold,
                      }}>
                      {t('Processing')}
                    </Text>
                  ),
                }}
              />
              <Top.Screen
                name="Completed,"
                component={Completed}
                options={{
                  tabBarLabel: ({focused, color, size}) => (
                    <Text
                      style={{
                        fontSize: 12,
                        // paddingBottom: 5,
                        color: focused ? colors.primaryColor : colors.gray,
                        fontFamily: focused ? fonts.bold : fonts.bold,
                      }}>
                      {t('Completed')}
                    </Text>
                  ),
                }}
              />
              <Top.Screen
                name="Cancelled"
                component={Cancelled}
                options={{
                  tabBarLabel: ({focused, color, size}) => (
                    <Text
                      style={{
                        fontSize: 12,
                        // paddingBottom: 5,
                        color: focused ? colors.primaryColor : colors.gray,
                        fontFamily: focused ? fonts.bold : fonts.bold,
                      }}>
                      {t('Cancelled')}
                    </Text>
                  ),
                }}
              />
            </Top.Navigator>
          </View>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[style.font14Re, {marginVertical: 20}]}>
              You Don't have store, Please create store
            </Text>
            <BaseButton
              title={'Create Store'}
              defaultStyle={{width: 140, height: 35}}
              textStyle={[style.font14Re, {color: colors.white}]}
              onPress={() => navigation.navigate('CreateStoreapp')}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default HomeStore;

const styles = StyleSheet.create({});
