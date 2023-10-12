import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
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

const SpecificStoreGalery = ({route}) => {
  const store_id = route.params.item.store_id;
  const item = route.params.item;
  const item1 = route.params.item1;
  console.log(store_id, 'itme item');
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
    console.log(1);
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
  useEffect(() => {
    handleGetStoreData();
  }, []);

  const [select, setSelect] = useState(false);
  // const [selectedItem, setSelectedItem] = useState([]);
  // console.log(selectedItem, 'selected itm');
  const [selectedIds, setSelectedIds] = useState([]);
  const [dataTosend, setDataToSend] = useState([]);
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
  console.log(dataTosend);

  // useEffect(() => {
  // console.log(dataTosend.length);
  // }, [dataTosend]);
  return (
    <Layout>
      <AppHeader title={'Westside Florist'} defaultStyle={{marginBottom: 30}} />
      <View style={{alignSelf: 'flex-start'}}>
        <Text style={[style.font24Re, {fontFamily: fonts.bold}]}>
          Flowers Gallery
        </Text>
        <Text
          style={{color: '#A2A2A2', fontFamily: fonts.regular, fontSize: 15}}>
          Choose the best bouquet
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
        <TextInput placeholder="Search" style={{width: '95%'}} />
      </View>
      {/* <ScrollView> */}
      <FlatList
        data={storeData}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        renderItem={({item}) => {
          //   console.log(item.image, 'jj');
          return (
            <View
              style={[
                styles.cardContainer,
                {
                  borderColor: selectedIds.includes(item.id)
                    ? '#663399'
                    : 'white',
                  borderWidth: 1,
                },
              ]}>
              <View style={{height: 120, width: 155}}>
                <ImageSwiper images={item.images} />
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleSelect(item);
                }}
                style={styles.infoContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </TouchableOpacity>
            </View>
            // <CardListFlowerGalery
            //   item={item}
            //   onPress={() => navigation.navigate('EReceipt', {item: item})}
            //   // onPress={() => setModalVisible(true)}
            // />
          );
        }}
      />
      {/* </ScrollView> */}
      <BaseButton
        title={'Continue'}
        defaultStyle={{marginVertical: 20}}
        onPress={() =>
          navigation.navigate('EReceipt', {item: item, dataTosend: dataTosend})
        }
      />
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
    width: '47%',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 18,
    color: colors.black,
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    color: colors.primaryColor,
    fontFamily: fonts.bold,
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
