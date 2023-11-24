import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import AppHeader from '../../components/AppHeader/AppHeader';
import FuneralCard from '../Home/FuneralCard';
import {ScrollView} from 'react-native';
import Edit from '../../assets/Edit1.png';
import {devWidth} from '../../constraints/Dimentions';
import {useRoute} from '@react-navigation/native';
import ApiRequest from '../../Services/ApiRequest';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';
import Icon from 'react-native-vector-icons/Entypo';
import OrderNotFound from '../MyOrder/OrderNotFound';
import {useTranslation} from 'react-i18next';

const AddFuneralScreen = () => {
  const route = useRoute();
  const item = route.params.item;
  const id = route.params.id;
  const [funeralData, setFuneralData] = useState([]);
  console.log(item, 'funeralData rece');

  const cleanedPath = item.image?.replace(/^"(.*)"$/, '$1');
  // console.log(item.image, 'funeralData');
  // console.log('item.url + cleanedPath', item.url + cleanedPath);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleGetFuneralData = async () => {
    try {
      setLoading(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'orders',
        // funeral_id: item.id,
        funeral_id: item.id,
      });
      const resp = res?.data?.data;
      // console.log(resp, 'resp');
      setFuneralData(resp);
      // if (res?.data?.length > 0) {
      //   setFuneralData(resp);
      // } else {
      //   setFuneralData([]);
      // }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const handleGetFuneralDataMore = async () => {
    try {
      setBottomLoader(true);
      // setLoading(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'orders',
        // funeral_id: item.id,
        funeral_id: item.id,
        last_id: funeralData[funeralData.length - 1]?.id,
      });
      const resp = res?.data?.data;
      // console.log(resp, 'resp');
      setBottomLoader(false);
      if (resp && resp != undefined && resp.length > 0) {
        setFuneralData([...funeralData, ...resp]);
      }
      // setFuneralData(resp);
      // if (res?.data?.length > 0) {
      //   setFuneralData(resp);
      // } else {
      //   setFuneralData([]);
      // }
    } catch (err) {
    } finally {
      setBottomLoader(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetFuneralData();
  }, []);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showImage, setShowImage] = useState();

  // last_id: catalogData[catalogData.length - 1]?.id,
  //   if (resp && resp != undefined && resp.length > 0) {
  //     setCatalogData([...catalogData, ...resp]);
  // }
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    handleGetCatData();
  };
  const [bottomLoader, setBottomLoader] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    setScrolled(true);
  };
  const {t} = useTranslation();
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
            <View
              style={
                {
                  // flexDirection: 'row',
                  // alignItems: 'center',
                  // justifyContent: 'space-between',
                  // width: '100%',
                }
              }>
              <Text
                style={[
                  style.font24Re,
                  {fontFamily: fonts.bold, color: 'rgba(255, 255, 255, 0.5)'},
                ]}>
                TANATOS
              </Text>
            </View>

            <Text
              style={[
                style.font12Re,
                {
                  fontFamily: fonts.bold,
                  color: 'rgba(255, 255, 255, 0.5)',
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
              ]}
              numberOfLines={3}>
              {/* name */}
              {item.name}
              {/* {'funeralData[0]?.full_name'} */}
            </Text>
            <Text style={[{fontSize: 13, color: colors.white}]}>
              {item.short_message}
            </Text>
          </View>

          <Image
            source={{uri: item.url + cleanedPath}}
            style={{
              height: 160,
              width: 160,
              right: 20,
              borderRadius: 80,
              top: 30,
            }}
          />
        </View>
        {/* <TouchableOpacity style={{position: 'absolute', right: 20, top: 40}}>
          <Image source={Edit} style={{height: 20, width: 20}} />
        </TouchableOpacity> */}
      </ImageBackground>

      <Text
        style={[style.font16Re, {paddingHorizontal: 10, paddingVertical: 20}]}>
        {item.description}
      </Text>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal: 10, marginVertical: 40}}>
          <FlatList
            data={funeralData} // Your array of funeral items
            keyExtractor={item => item.id.toString()}
            onScroll={handleScroll}
            onEndReached={scrolled ? handleGetFuneralDataMore : null}
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
            renderItem={({item}) => {
              // console.log(item, 'sd');
              const items = JSON.parse(item.items);
              const imagesArray = items.flatMap(item => item.images);

              return (
                <View style={{}}>
                  <FuneralCard
                    name={item?.funeral?.name}
                    description={item?.funeral?.description}
                    images={imagesArray}
                    sympathy_text={item.sympathy_text}
                    onPress={() => {
                      setShowLoadingModal(true);
                      setShowImage(imagesArray);
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
        <Modal
          transparent
          visible={showLoadingModal}
          animationType="fade"
          onRequestClose={() => setShowLoadingModal(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{backgroundColor: colors.white, flex: 1}}>
              {/* <View style={{height: 120, width: 120, borderRadius: 10}}> */}
              <ImageSwiper images={showImage} />
              <TouchableOpacity
                onPress={() => setShowLoadingModal(false)}
                style={{
                  position: 'absolute',
                  right: 20,
                  top: 20,
                  // backgroundColor: 'red',
                }}>
                <Icon name="circle-with-cross" color={colors.black} size={30} />
              </TouchableOpacity>
              {/* </View> */}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default AddFuneralScreen;

const styles = StyleSheet.create({});
