import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import Icon from 'react-native-vector-icons/Ionicons';
import CardList from '../Favorite/CardList';
import CardListFlowerGalery from './CardListFlowerGalery';
import {useNavigation} from '@react-navigation/native';
import BuyNowb from '../../components/BuyNow';
import ApiRequest from '../../Services/ApiRequest';
import ModalLoadingTrans from '../../components/ModalLoadingTrans';
import {BaseButton} from '../../components/BaseButton';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';
import {t} from 'i18next';
import {useTranslation} from 'react-i18next';
import OrderNotFound from '../MyOrder/OrderNotFound';

const SpecificStoreGalery = ({route}) => {
  const store_id = route.params.item.store_id;
  const item = route?.params?.item;
  const FuneralItemData = route?.params?.item1;
  // console.log(FuneralItemData?.id, 'FuneralItemData item');
  const navigation = useNavigation();

  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [storeData, setStoreData] = useState();
  // console.log(storeData.store, 'storeData');
  const [isLoading, setLoading] = useState();
  // const [selectedItem, setSelectedItem] = useState(null);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const handleGetStoreData = async () => {
    // console.log(1);
    try {
      setShowLoadingModal(true);
      setLoading(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'stores_gallery',
        store_id: store_id,
        // last_id:
      });
      const resp = res.data.data;
      // console.log(resp, 'resp flower');
      setStoreData(resp);
      setShowLoadingModal(false);
    } catch (err) {
    } finally {
      setShowLoadingModal(false);
      setLoading(false);
    }
  };
  const handleGetStoreDataMore = async () => {
    // console.log(1);
    try {
      // setShowLoadingModal(true);
      setBottomLoader(true);
      // setLoading(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'stores_gallery',
        store_id: store_id,
        last_id: storeData[storeData.length - 1]?.id,
      });
      const resp = res.data.data;
      if (resp && resp != undefined && resp.length > 0) {
        setBottomLoader(false);
        setStoreData([...storeData, ...resp]);
      }
      // console.log(resp, 'resp flower');
      // setStoreData(resp);
      // setShowLoadingModal(false);
    } catch (err) {
    } finally {
      setBottomLoader(false);
      // setShowLoadingModal(false);
      setLoading(false);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    handleGetStoreData();
  };
  const [bottomLoader, setBottomLoader] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    setScrolled(true);
  };

  useEffect(() => {
    handleGetStoreData();
  }, []);

  const [select, setSelect] = useState(false);
  // const [selectedItem, setSelectedItem] = useState([]);
  // console.log(selectedItem, 'selected itm');
  const [selectedIds, setSelectedIds] = useState([]);
  const [dataTosend, setDataToSend] = useState([]);

  const [seletedFLower, setSeletedFlower] = useState(null);

  const handleSelect = list => {
    const isExists = dataTosend.some(storedItem => storedItem.id == list.id);
    if (isExists) {
      const newItems = dataTosend.filter(item => item.id !== list.id);
      setDataToSend(newItems);
      const newIds = selectedIds.filter(item => item !== list.id);
      setSelectedIds(newIds);
    } else {
      setDataToSend([...dataTosend, list]);
      setSelectedIds([...selectedIds, list.id]);
    }
  };

  const [SelectedData, setSelectedData] = useState([]);
  const extractData = data => {
    const extractedData = data.map(item => ({
      id: item?.id,
      name: item?.name,
      price: item?.price,
      images: item?.images,
      quanitity: 1,
      store_id: dataTosend[0]?.store_id,
      funeral_id: FuneralItemData?.id,
    }));
    setSelectedData(extractedData);
  };
  // console.log(SelectedData, 'SelectedData');
  useEffect(() => {
    extractData(dataTosend);
  }, [dataTosend]);
  const {t} = useTranslation();
  return (
    <Layout>
      <AppHeader
        title={t('Westside Florist')}
        defaultStyle={{marginBottom: 30}}
      />
      <View style={{alignSelf: 'flex-start'}}>
        <Text style={[style.font24Re, {fontFamily: fonts.bold}]}>
          {t('Flowers Gallery')}
        </Text>
        <Text
          style={{color: '#A2A2A2', fontFamily: fonts.regular, fontSize: 15}}>
          {t('Choose the best bouquet')}
        </Text>
      </View>
      {/* <Button title="click" onPress={() => handleGetStoreData()} /> */}
      <View
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
      </View>
      {/* <ScrollView> */}
      <View style={{alignSelf: 'flex-start', flex: 1, width: '100%'}}>
        <FlatList
          data={storeData}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          onScroll={handleScroll}
          onEndReached={scrolled ? handleGetStoreDataMore : null}
          ListEmptyComponent={
            <OrderNotFound
              title={t('Not Found data')}
              subtitle={t("You don't have any data at this time")}
            />
          }
          ListFooterComponent={
            bottomLoader && (
              <ActivityIndicator size="large" color={colors.gray} />
            )
          }
          ListFooterComponentStyle={{
            width: '100%',
            marginTop: 5,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={2}
          renderItem={({item}) => {
            // console.log(item.store.name, 'jj');
            return (
              <TouchableOpacity
                onPress={() => {
                  // handleSelect(item);
                  setSeletedFlower({...item, quanitity: 1});
                }}
                style={[
                  styles.cardContainer,
                  {
                    // backgroundColor: 'red',
                    width: '45%',
                    borderColor:
                      seletedFLower?.id == item?.id ? '#663399' : 'white',
                    borderWidth: 1,
                  },
                ]}>
                <View style={{height: 120}}>
                  <ImageSwiper
                    images={item.images}
                    imageStyle={{
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.infoContainer}
                  onPress={() => {
                    // handleSelect(item);
                    setSeletedFlower({...item, quanitity: 1});
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.title} numberOfLines={1}>
                      {item?.name}
                    </Text>
                    <Text style={styles.price}>{item?.price}€</Text>
                  </View>
                  <Text style={styles.title}>{item?.store?.name}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
              // <Text>sdas</Text>
              // <CardListFlowerGalery
              //   item={item}
              //   onPress={() => navigation.navigate('EReceipt', {item: item})}
              //   // onPress={() => setModalVisible(true)}
              // />
            );
          }}
        />
      </View>
      {/* </ScrollView> */}
      <BaseButton
        title={t('Continue')}
        defaultStyle={{marginVertical: 20}}
        disabled={!seletedFLower}
        onPress={() =>
          navigation.navigate('EReceipt', {
            item: item,
            dataTosend: [seletedFLower],
            FuneralItemData: FuneralItemData,
          })
        }
      />
      <BuyNowb
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        source={require('../../assets/images/fav/fev1.png')}
      />
    </Layout>
  );
};

export default SpecificStoreGalery;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 15,
    // width: '47%',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 2,
    width: 95,
  },
  price: {
    fontSize: 16,
    width: 40,
    color: colors.primaryColor,
    fontFamily: fonts.bold,
    // backgroundColor: 'red',
  },
  imageGalleryContainer: {
    // Adjust the height as needed
  },
  swiper: {height: 200, flex: 1},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    marginBottom: -55,
  },
  infoContainer: {
    padding: 10,
  },
});
