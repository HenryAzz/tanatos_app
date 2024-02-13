import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import Icon from 'react-native-vector-icons/Ionicons';
import CardList from '../Favorite/CardList';
import CardListFlowerGalery from './CardListFlowerGalery';
import {useNavigation, useRoute} from '@react-navigation/native';
import BuyNowb from '../../components/BuyNow';
import ApiRequest from '../../Services/ApiRequest';
import ModalLoadingTrans from '../../components/ModalLoadingTrans';
import {useTranslation} from 'react-i18next';
import OrderNotFound from '../MyOrder/OrderNotFound';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FlowerGalery = () => {
  const route = useRoute();
  const FuneralItemData = route?.params?.item;
  // console.log(FuneralItemData, 'item receiver');
  const navigation = useNavigation();

  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [storeData, setStoreData] = useState();
  const [isLoading, setLoading] = useState();
  // const [selectedItem, setSelectedItem] = useState(null);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  // const handleGetLike = async (store_id, like, item) => {
  //   const user_id = await AsyncStorage.getItem('user_id');
  //   console.log(user_id, 'user id', store_id, 'storeid', like, 'like');
  //   try {
  //     const res = await ApiRequest({
  //       type: 'like_dislike',
  //       user_id: user_id,
  //       store_id: store_id,
  //       status: like === 'like' ? 'dislike' : 'like',
  //     });
  //     const resp = res.data;
  //     if (resp) {
  //       handleGetStoreData();
  //     }
  //     console.log(resp, 'get store likes');
  //   } catch (err) {
  //   } finally {
  //   }
  // };
  // const heartPress = async (store_id, like, item) => {
  //   const user_id = await AsyncStorage.getItem('user_id');
  //   const sendData = {
  //     type: 'like_dislike',
  //     user_id: user_id,
  //     store_id: store_id,
  //     status: like === 'like' ? 'dislike' : 'like',
  //   };
  //   let data2 = storeData.findIndex(x => x.id === item.id);
  //   if (item.favourite == 'like') {
  //     storeData[data2].favourite = 'dislike';
  //   } else {
  //     storeData[data2].favourite = 'like';
  //   }
  //   setStoreData(storeData);
  //   // setRefresh(pre => !pre);
  //   try {
  //     await ApiRequest(sendData);
  //     handleGetStoreData();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleGetStoreData = async () => {
    // console.log(1);
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setLoading(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'stores_gallery',
        user_id: JSON.parse(user_id),
        // last_id:
      });
      const resp = res.data.data;

      setStoreData(resp);
    } catch (err) {
    } finally {
      setShowLoadingModal(false);
      setLoading(false);
    }
  };
  const handleGetStoreDataMore = async () => {
    try {
      setBottomLoader(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'stores_gallery',
        last_id: storeData[storeData.length - 1]?.id,
      });
      const resp = res.data.data;
      if (resp && resp != undefined && resp.length > 0) {
        setStoreData([...storeData, ...resp]);
      }

      setBottomLoader(false);
      setScrolled(false);
    } catch (err) {
    } finally {
      setBottomLoader(false);
      setLoading(false);
      setScrolled(false);
    }
  };
  useEffect(() => {
    handleGetStoreData();
  }, []);
  const {t} = useTranslation();
  // const [isLoading, setIsLoading] = useState(true);
  const [bottomLoader, setBottomLoader] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    setScrolled(true);
  };

  return (
    <Layout>
      <AppHeader
        title={t('Westside Florist')}
        defaultStyle={{marginBottom: 30}}
      />
      {/* <View style={{alignSelf: 'flex-start'}}>
        <Text style={[style.font24Re, {fontFamily: fonts.bold}]}>
          {t('List of Stores')}
        </Text>
        <Text
          style={{
            color: '#A2A2A2',
            fontFamily: fonts.regular,
            fontSize: 15,
          }}>
          {t('Choose the store')}
        </Text>
      </View> */}
      {/* <Button title="click" onPress={() => handleGetStoreData()} /> */}
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,

          backgroundColor: colors.white,
          borderColor: colors.line,
          marginVertical: 20,
          borderRadius: 30,
          height: 45,
          // paddingLeft: 14,
          //   width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginBottom: 30,
        }}>
        <Icon name="search" size={24} color="#8C8C8C" />
        <TextInput placeholder={t('Search')} style={{width: '95%'}} />
      </View> */}
      {/* <ScrollView> */}
      <View style={{flex: 1}}>
        <FlatList
          data={storeData}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          onScroll={handleScroll}
          onEndReached={scrolled ? handleGetStoreDataMore : null}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={
            <OrderNotFound
              title={'No Found Data'}
              subTitle={'You don"t have any data'}
            />
          }
          ListFooterComponent={
            bottomLoader && <ActivityIndicator size={45} color={colors.gray} />
          }
          ListFooterComponentStyle={{
            width: '100%',
            marginVertical: 15,
            zIndex: 100,
            height: 50,
            justifyContent: 'center',
          }}
          numColumns={2}
          renderItem={({item}) => {
            // console.log(item, 'item.store');
            return (
              <CardListFlowerGalery
                item={item}
                images={item.image}
                // onPressLike={() =>
                //   heartPress(item.store_id, item.favourite, item)
                // }
                // onPressLike={() => console.log(item.favourite, 'favourite')}
                onPress={() =>
                  navigation.navigate('SpecificStoreGalery', {
                    item: item,
                    id: item.id,
                    item1: FuneralItemData,
                  })
                }
                // onPress={() => setModalVisible(true)}
              />
            );
          }}
        />
      </View>
      {/* </ScrollView> */}
      <BuyNowb
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        source={require('../../assets/images/fav/fev1.png')}
      />
      <ModalLoadingTrans
        showLoadingModal={showLoadingModal}
        setShowLoadingModal={setShowLoadingModal}
      />
    </Layout>
  );
};

export default FlowerGalery;

const styles = StyleSheet.create({});
