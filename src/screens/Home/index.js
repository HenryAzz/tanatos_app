import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  PermissionsAndroid,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import {ProfileHome} from '../../assets/images/HomeImg';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {colors, constants, fonts} from '../../constraints';
import HomeCard from './HomeCard';
import style from '../../assets/css/style';
import TextCardView from './TextCardView';
import BottomCard from './BottomCard';
import SearchPic from '../../assets/images/HomeImg/Search.svg';
import ListOfSearches from './ListOfSearches';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import FuneralCard from './FuneralCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppTextInput from '../../components/FloatingLabelInput';
import {DatePicker} from '../../components/DateComponent';
import {TimePicker} from '../../components/DateComponent/TimeComponent';
import {BaseButton} from '../../components/BaseButton';
import ApiRequest, { ApiRequestGet } from '../../Services/ApiRequest';
import ModalLoadingTrans from '../../components/ModalLoadingTrans';
import {ToastMessage} from '../../utils/Toast';
import Geolocation from 'react-native-geolocation-service';
import Greetings from '../../components/Greetings/Greeting';
import OrderNotFound from '../MyOrder/OrderNotFound';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import {useDispatch} from 'react-redux';
import {fetchUser} from '../../store/reducer/usersSlice';
import axios from 'axios';
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Tanatos wants to access your location',
        message: 'Can we access your location?',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    // console.log('granted', granted);
    if (granted === 'granted') {
      // console.log('You can use Geolocation');
      return true;
    } else {
      // console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
const Home = () => {
  //
  const dispatch = useDispatch();

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
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          // console.log(position, 'position');
        },
        error => {
          console.error(error, 'errr');
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  const [initialRegion, setInitialRegion] = useState(null);

  const navigation = useNavigation();
  const [account_Type, setAccountType] = useState();
  const route = useRoute();
  const getAccountType = async () => {
    const account_Type = await AsyncStorage.getItem('account_Type');
    setAccountType(account_Type);
    // console.log('accountType//////', account_Type);
  };

  const [formData, setFormData] = useState({
    userName: '',
    image: '',
    url: '',
  });

  const [bottomLoaderNear, setBottomLoaderNear] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleScrollNear = () => {
    setScrolled(true);
  };

  const handleGetData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    if (user_id) {
      try {
        setShowLoadingModal(true);
        // const res = await ApiRequest({
        //   type: `/usuarios/${user_id}`,
        //   id: user_id,
        //   table_name: 'users',
        // });
        const res = await ApiRequestGet({
          type: `/usuarios/${user_id}`,
        })
        console.log(res, 'res in getting profile');
        const resp = res?.data.id;
        if (resp) {
          setFormData({
            userName: res?.data.username,
            image: res?.data.image,
            url: res?.data.url,
          });
        }
      } catch (error) {
        setShowLoadingModal(false);

        console.log(error, 'err in getting profile');
      }
    }
  };

  useEffect(() => {
    getAccountType();
  }, []);
  const [loading, setLoading] = useState(false);
  const [funeralData, setFuneralData] = useState();
  const [funeralDataOwn, setFuneralDataOwn] = useState();
  // console.log(funeralData, 'duen');
  const handleGetFuneralDataOwner = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    if (user_id) {
      try {
        setLoading(true);
        setShowLoadingModal(true);
        const res = await ApiRequestGet({
          type: '/funerals',
          table_name: 'funerals',
          own: 1,
          user_id: user_id,
        });
        const resp = res?.data;
        
        console.log(resp, 'resp////////////////////////owner');
        setFuneralDataOwn(resp);
        setShowLoadingModal(false);
      } catch (err) {
        console.log('error in getting owner data', err);
      } finally {
        setShowLoadingModal(false);
        setLoading(false);
      }
    }
  };
  const handleGetFuneralData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    try {
      setLoading(true);
      setShowLoadingModal(true);
      // const res = await ApiRequest({
      //   type: 'get_data',
      //   table_name: 'funerals',
      //   lat: initialRegion?.latitude,
      //   lng: initialRegion?.longitude,
      // });
      // const resp = res.data.data;
      // console.log(resp, 'resp////////////////////////');
      const res = await ApiRequestGet({
        type: '/funerals',
        table_name: 'funerals',
        own: 1,
        user_id: user_id,
      });
      const resp = res?.data;
      
      console.log(resp, 'resp////////////////////////owner');
      setFuneralData(resp);
      setShowLoadingModal(false);
    } catch (err) {
      console.log(err, 'err in loading funeral data');
    } finally {
      setShowLoadingModal(false);
      setLoading(false);
    }
  };
  const isFocused = useIsFocused();
  const refFlat = useRef(null);

  useEffect(() => {
    // handleGetFuneralData();
    handleGetFuneralDataMoreNear();
  }, [route?.params?.update]);

  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showDeleteModal, setShowDeletegModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState();
  // console.log(deleteItemId, 'id for deleting');
  const handleDelete = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setLoading(true);
      setShowLoadingModal(true);
      const res = await ApiRequest({
        type: 'delete_data',
        table_name: 'funerals',
        id: deleteItemId,
      });
      const resp = res.data.data;
      ToastMessage(res?.data?.message);
      console.log(resp, 'resp////////////////////////ownerfunarel');
      setShowDeletegModal(false);
      handleGetFuneralData();
      handleGetFuneralDataOwner();
      setFuneralDataOwn(resp);
      setShowLoadingModal(false);
    } catch (err) {
    } finally {
      setShowLoadingModal(false);
      setLoading(false);
    }
  };

  const {t, i18n} = useTranslation();

  const toggleLanguage = async () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('es'); // Switch to Spanish
    } else {
      i18n.changeLanguage('en'); // Switch to English
    }
  };

  const [funeralDataNear, setFuneralDataNear] = useState([]);

  const handleGetFuneralDataNear = async () => {
    try {
      setShowLoadingModal(true);
      const user_id = await AsyncStorage.getItem('user_id');
      const res = await ApiRequestGet({
        type: '/funerals',
        table_name: 'funerals',
        own: '',
        user_id: user_id,
      });
      const resp = res.data;
      setFuneralDataNear(resp);
      setRefreshingNear(false);
      setShowLoadingModal(false);
    } catch (err) {
      setShowLoadingModal(false);
    } finally {
      setRefreshingNear(false);
      setShowLoadingModal(false);
      // setLoading(false);
    }
  };

  const handleGetFuneralDataMoreNear = async () => {
    if (!bottomLoaderNear && funeralDataNear && funeralDataNear.length > 0) {
      try {
        setBottomLoaderNear(true);
        const user_id = await AsyncStorage.getItem('user_id');

        const res = await ApiRequest({
          type: 'get_data',
          table_name: 'funerals',
          last_id: funeralDataNear[funeralDataNear.length - 1]?.id,
          own: '',
          user_id: user_id,
        });
        const resp = res.data.data;
        if (resp && resp != undefined && resp.length > 0) {
          setFuneralDataNear([...funeralDataNear, ...resp]);
        }
        setBottomLoaderNear(false);
        setScrolled(false);
      } catch (err) {
        setBottomLoaderNear(false);
        setScrolled(false);
      } finally {
        setBottomLoaderNear(false);
        setScrolled(false);
      }
    }
  };

  const heartPress = async item => {
    const user_id = await AsyncStorage.getItem('user_id');
    const sendData = {
      type: 'like_dislike',
      user_id: user_id,
      status: item?.favourite === 'like' ? 'dislike' : 'like',
      funeral_id: item?.id,
    };

    const foundedIndex = funeralDataNear.findIndex(x => x.id === item.id);

    funeralDataNear[foundedIndex].favourite =
      item?.favourite === 'dislike' ? 'like' : 'dislike';

    setFuneralDataNear([...funeralDataNear]);

    try {
      const res = await ApiRequest(sendData);
      if (res.data.result === true) {
        handleGetFuneralDataNear();
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetFuneralDataNear();
    fetchUser(dispatch);
  }, []);

  const [refreshingNear, setRefreshingNear] = useState(false);
  const onRefreshNear = () => {
    setRefreshingNear(true);
    handleGetFuneralDataNear();
  };

  useEffect(() => {
    handleGetFuneralData();
    handleGetFuneralDataOwner();
    handleGetData();
    handleGetFuneralDataNear();
    refFlat.current?.scrollToOffset({animated: true, offset: 0});
  }, [isFocused]);

  return (
    <Layout>
      {/* <BaseButton title={'Change'} onPress={() => toggleLanguage()} /> */}
      {/* {account_Type === 'customer' || account_Type === 'funeral' ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingVertical: 20,
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
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.primaryColor,
                  alignSelf: 'center',
                  alignSelf: 'center',
                  // marginTop: 25,
                  // marginBottom: 5,
                }}>
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    // backgroundColor: 'blue',
                    // resizeMode: 'center',
                    borderRadius: 30,
                  }}
                  source={{uri: formData.url + formData.image}}
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AppStackWithoutBottom', {
                    screen: 'EditProfile',
                  })
                }
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.primaryColor,
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
                  source={require('../../assets/app_icon.png')}
                />
              </TouchableOpacity>
            )}
            <View style={{paddingLeft: 10}}>
              <Greetings />
              <Text style={[style.font16Re]}>
                {formData.userName ? formData?.userName : t('Hello')}
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
      ) : null} */}
      {!funeralData ? (
        <OrderNotFound
          title={t('Not Found data')}
          subtitle={t("You don't have any data at this time")}
        />
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.line,
              marginVertical: 10,
              borderRadius: 50,
              height: 45,
              paddingLeft: 14,
            }}>
            <SearchPic />
            <TextInput
              placeholder="Buscar"
              style={{width: '100%', paddingLeft: 10}}
            />
          </View>

          <View style={{width: '100%'}}>
            {account_Type === 'customer' ? (
              <>
                <TextCardView
                  title={t('Funeral Homes')}
                  onPress={() => navigation.navigate('FuneralDetailed')}
                />
                <View style={{width: '100%'}}>
                  {/* <FlatList
                    horizontal
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={funeralData}
                    renderItem={({item}) => {
                      // console.log(item.hall_no, 'itemitem');
                      return (
                        // <View style={{backgroundColor: 'red'}}>

                        <HomeCard
                          name={item.name}
                          subTitle={item.description}
                          image={item.image}
                          url={'https://innovafuneraria.es/wp-content/uploads/2020/12/organizarunfuneral.jpg'}
                          hallno={item.hall_no}
                          time={item.time}
                          onPress={() =>
                            navigation.navigate('FuneralDetailedPage', {
                              item: item,
                            })
                          }
                          // navigation={props.navigation}
                        />
                        // </View>
                      );
                    }}
                  /> */}
                </View>
              </>
            ) : null}

            <TextCardView
              title={t('Obituaries')}
              // subtitle={account_Type === 'customer' ? t('View all') : null}
              onPress={() =>
                navigation.navigate('FuneralNearDetailed', {
                  initialRegion: initialRegion,
                })
              }
            />

            <View style={{marginBottom: 150}}>
              {account_Type === 'customer' ? (
                <FlatList
                  ref={refFlat}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  onScroll={handleScrollNear}
                  onEndReached={scrolled ? handleGetFuneralDataMoreNear : null}
                  ListEmptyComponent={
                    <OrderNotFound
                      title={t('Not Found data')}
                      subtitle={t("You don't have any data at this time")}
                    />
                  }
                  ListFooterComponent={
                    bottomLoaderNear && (
                      <ActivityIndicator size="large" color={'grey'} />
                    )
                  }
                  ListFooterComponentStyle={{
                    width: '100%',
                    marginTop: 5,
                  }}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshingNear}
                      onRefresh={onRefreshNear}
                    />
                  }
                  data={funeralDataNear}
                  renderItem={({item}) => {
                    // console.log(item.favourite);
                    return (
                      <BottomCard
                        title={item.name}
                        subtitle={item.description}
                        funeralImg={'https://innovafuneraria.es/wp-content/uploads/2020/12/organizarunfuneral.jpg'}
                        account_Type={account_Type}
                        isLiked={item?.favourite}
                        onPress1={() =>
                          navigation.navigate('FuneralDetailedPage', {
                            item: item,
                          })
                        }
                        onHeartPress={() => heartPress(item)}
                      />
                    );
                  }}
                />
              ) : (
                // <FlatList
                //   keyExtractor={item => item.id}
                //   showsVerticalScrollIndicator={false}
                //   showsHorizontalScrollIndicator={false}
                //   data={funeralData}
                //   renderItem={
                //     ({item, index}) => (
                //       // index < 2 ? (
                //       <BottomCard
                //         title={item.name}
                //         subtitle={item.description}
                //         account_Type={account_Type}
                //         onPress1={() =>
                //           navigation.navigate('FuneralDetailedPage', {
                //             item: item,
                //           })
                //         }
                //       />
                //     )
                //     // ) : null
                //   }
                // />
                <FlatList
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={() => (
                    <OrderNotFound
                      title={t('Not Found data')}
                      subtitle={t("You don't have any data at this time")}
                    />
                  )}
                  data={funeralDataOwn}
                  renderItem={({item}) => {
                    return (
                      <BottomCard
                        title={item?.name}
                        subtitle={item.description}
                        account_Type={account_Type}
                        funeralImg={
                          item?.funeral_img &&
                          constants.baseUrl + item?.funeral_img
                        }
                        gotoDetailePage={() => {
                          navigation.navigate('AddFuneralScreen', {
                            item: item,
                            id: item.id,
                          });
                        }}
                        onPressDel={() => {
                          setShowDeletegModal(true);
                          setDeleteItemId(item.id);
                        }}
                        onPress={() =>
                          navigation.navigate('FuneralUpdate', {
                            item: item,
                            id: item.id,
                          })
                        }
                      />
                    );
                  }}
                />
              )}
            </View>
          </View>

          <Modal
            transparent
            visible={showDeleteModal}
            animationType="fade"
            onRequestClose={() => setShowDeletegModal(false)}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: colors.white,
                  alignItems: 'center',
                  height: 130,
                  width: '90%',
                  justifyContent: 'space-evenly',
                  borderRadius: 10,
                }}>
                <Text style={[style.font16Re]}>
                  {t('Are you sure you want to delete !')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '70%',
                  }}>
                  <BaseButton
                    title={t('Cancel')}
                    onPress={() => setShowDeletegModal(false)}
                    defaultStyle={{width: 100, height: 35}}
                    textStyle={{fontSize: 12}}
                  />

                  <BaseButton
                    title={t('Yes sure!')}
                    onPress={() => handleDelete()}
                    defaultStyle={{width: 100, height: 35}}
                    textStyle={{fontSize: 12}}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({});
