import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  PermissionsAndroid,
  ScrollView,
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
import {colors, fonts} from '../../constraints';
import HomeCard from './HomeCard';
import style from '../../assets/css/style';
import TextCardView from './TextCardView';
import BottomCard from './BottomCard';
import SearchPic from '../../assets/images/HomeImg/Search.svg';
import ListOfSearches from './ListOfSearches';
import {useNavigation, useRoute} from '@react-navigation/native';
import FuneralCard from './FuneralCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppTextInput from '../../components/FloatingLabelInput';
import {DatePicker} from '../../components/DateComponent';
import {TimePicker} from '../../components/DateComponent/TimeComponent';
import {BaseButton} from '../../components/BaseButton';
import ApiRequest from '../../Services/ApiRequest';
import ModalLoadingTrans from '../../components/ModalLoadingTrans';
import {ToastMessage} from '../../utils/Toast';
import Geolocation from 'react-native-geolocation-service';
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'MERI CYCLE Wants to access your location',
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
  useEffect(() => {
    getAccountType();
  }, []);
  const [loading, setLoading] = useState(false);
  const [funeralData, setFuneralData] = useState();
  const [funeralDataOwn, setFuneralDataOwn] = useState();

  const handleGetFuneralDataOwner = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setLoading(true);
      setShowLoadingModal(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'funerals',
        own: 1,
        user_id: user_id,
      });
      const resp = res.data.data;
      // console.log(resp, 'resp////////////////////////owner');
      setFuneralDataOwn(resp);
      setShowLoadingModal(false);
    } catch (err) {
    } finally {
      setShowLoadingModal(false);
      setLoading(false);
    }
  };
  const handleGetFuneralData = async () => {
    try {
      setLoading(true);
      setShowLoadingModal(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'funerals',
        lat: initialRegion?.latitude,
        lng: initialRegion?.longitude,
      });
      const resp = res.data.data;
      // console.log(resp, 'resp////////////////////////');
      setFuneralData(resp);
      setShowLoadingModal(false);
    } catch (err) {
    } finally {
      setShowLoadingModal(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetFuneralData();
    handleGetFuneralDataOwner();
  }, []);
  useEffect(() => {
    handleGetFuneralData();
  }, [route?.params?.update]);

  // const account_Type = 'Funeral';
  const FuneralData = [
    {
      id: '1',
      image: require('../../assets/images/HomeImg/HomeCardImg.png'),
      title: 'Matt Villano',
      subTitle: "5 things to know about the 'conundrum' of lupus",
      profile: require('../../assets/images/HomeImg/HomeCardImg.png'),
      time: '9 Hours ago',
    },
    {
      id: '2',
      image: require('../../assets/images/HomeImg/HomeCardImg1.png'),
      title: 'Zain Korsgaard',
      subTitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
      profile: require('../../assets/images/HomeImg/HomeCardImg.png'),
      time: '9 Hours ago',
    },
    {
      id: '3',
      image: require('../../assets/images/HomeImg/HomeCardImg.png'),
      title: 'Matt Villano',
      subTitle: "5 things to know about the 'conundrum' of lupus",
      profile: require('../../assets/images/HomeImg/HomeCardImg.png'),
      time: '9 Hours ago',
    },
  ];
  const data = [
    {
      id: 1,
      title: 'casarse con phillips',
      subtitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
    },
    {
      id: 2,
      title: 'casarse con phillips',
      subtitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
    },
    {
      id: 3,
      title: 'casarse con phillips',
      subtitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
    },
    {
      id: 4,
      title: 'casarse con phillips',
      subtitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
    },
    {
      id: 5,
      title: 'casarse con phillips',
      subtitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
    },
    {
      id: 6,
      title: 'casarse con phillips',
      subtitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
    },
    {
      id: 7,
      title: 'casarse con phillips',
      subtitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
    },
    {
      id: 8,
      title: 'casarse con phillips',
      subtitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
    },
  ];
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
      // console.log(resp, 'resp////////////////////////owner');
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

  return (
    <Layout>
      {account_Type === 'customer' && (
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
              <Text style={[style.font12Re, {color: colors.textGray}]}>
                Good Morning
              </Text>
              <Text style={[style.font16Re]}>Marry John</Text>
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
      )}

      {account_Type === 'customer' ||
        (account_Type === 'funeral' && (
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
          </>
        ))}
      {account_Type === 'customer' ? <ListOfSearches /> : null}

      <ScrollView
        style={{width: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {account_Type === 'customer' ? (
          <>
            <TextCardView
              title={'Funeral Homes'}
              subtitle={'View all'}
              onPress={() => navigation.navigate('FuneralDetailed')}
            />
            <FlatList
              horizontal
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={funeralData}
              renderItem={({item}) => {
                return (
                  // <View style={{backgroundColor: 'red'}}>
                  <HomeCard
                    name={item.name}
                    subTitle={item.description}
                    image={item.image}
                    url={item.url}
                    time={item.time}
                    // navigation={props.navigation}
                  />
                  // </View>
                );
              }}
            />
          </>
        ) : null}

        <TextCardView
          title={'Obituaries Near you'}
          subtitle={'View all'}
          onPress={() =>
            navigation.navigate('FuneralNearDetailed', {
              initialRegion: initialRegion,
            })
          }
        />
        <View>
          {account_Type === 'customer' ? (
            ///obtained
            <FlatList
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={funeralData}
              renderItem={({item, index}) =>
                index < 2 ? (
                  <BottomCard
                    title={item.name}
                    subtitle={item.description}
                    account_Type={account_Type}
                    onPress1={() =>
                      navigation.navigate('FuneralDetailedPage', {item: item})
                    }
                  />
                ) : null
              }
            />
          ) : (
            <FlatList
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={funeralDataOwn}
              renderItem={({item}) => {
                // console.log(item.image, 'akjska');
                return (
                  <BottomCard
                    title={item.name}
                    subtitle={item.description}
                    account_Type={account_Type}
                    onPressDel={() => {
                      setShowDeletegModal(true);
                      setDeleteItemId(item.id);
                    }}
                    onPress={() =>
                      navigation.navigate('FuneralUpdate', {item: item})
                    }
                  />
                );
              }}
            />
          )}
        </View>

        {/* <FuneralCard status="home" /> */}
        {/* <FuneralCard status="home" /> */}
        {/* )} */}
        {/* <TextCardView title={'Obituarios cerca de ti'} subtitle={'Ver todos'} /> */}
      </ScrollView>
      <ModalLoadingTrans
        showLoadingModal={showLoadingModal}
        setShowLoadingModal={setShowLoadingModal}
      />
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
              Are you sure you want to delete !
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '70%',
              }}>
              <BaseButton
                title={'Cansel'}
                onPress={() => setShowDeletegModal(false)}
                defaultStyle={{width: 100, height: 35}}
                textStyle={{fontSize: 12}}
              />

              <BaseButton
                title={'Ok'}
                onPress={() => handleDelete()}
                defaultStyle={{width: 100, height: 35}}
                textStyle={{fontSize: 12}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({});
