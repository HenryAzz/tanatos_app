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

const FlowerGalery = () => {
  const route = useRoute();
  const FuneralItemData = route?.params?.item;
  // console.log(FuneralItemData, 'item receiver');
  const navigation = useNavigation();
  const cardData = [
    {
      id: 1,
      title: 'Pink Rose',
      price: '$19.99',
      image: require('../../assets/images/fav/fev1.png'),
    },
    {
      id: 2,
      title: 'Pink Rose',
      price: '$24.99',
      image: require('../../assets/images/fav/fav2.png'),
    },

    {
      id: 3,
      title: 'Pink Rose',
      price: '$34.99',
      image: require('../../assets/images/fav/fav3.png'),
    },
    {
      id: 4,
      title: 'Pink Rose',
      price: '$44.99',
      image: require('../../assets/images/fav/fav4.png'),
    },
    {
      id: 5,
      title: 'Pink Rose',
      price: '$54.99',
      image: require('../../assets/images/fav/fav3.png'),
    },
    {
      id: 6,
      title: 'Pink Rose',
      price: '$64.99',
      image: require('../../assets/images/fav/fav4.png'),
    },
  ];

  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [storeData, setStoreData] = useState();
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

        // last_id:
      });
      const resp = res.data.data;
      console.log(resp, 'get store data///////////');
      setStoreData(resp);
      setShowLoadingModal(false);
    } catch (err) {
    } finally {
      setShowLoadingModal(false);
      setLoading(false);
    }
  };
  const handleGetStoreDataMore = async () => {
    try {
      setShowLoadingModal(true);
      setLoading(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'stores_gallery',
        last_id: storeData[storeData.length - 1]?.id,
        // last_id:
      });
      const resp = res.data.data;
      if (resp && resp != undefined && resp.length > 0) {
        setStoreData([...storeData, ...resp]);
      }
      // console.log(resp, 'get store data///////////');
      // setStoreData(resp);
      setShowLoadingModal(false);
    } catch (err) {
    } finally {
      setShowLoadingModal(false);
      setLoading(false);
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
      <View style={{alignSelf: 'flex-start'}}>
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
          !isLoading && (
            <OrderNotFound
              title={'No service added'}
              subTitle={'Future added services will be showing here...'}
            />
          )
        }
        ListFooterComponent={
          bottomLoader && (
            <ActivityIndicator size="large" color={colors.gray3} />
          )
        }
        ListFooterComponentStyle={{
          width: '100%',
          marginTop: 5,
        }}
        numColumns={2}
        renderItem={({item}) => {
          // console.log(item, 'item.store');
          return (
            <CardListFlowerGalery
              item={item}
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
