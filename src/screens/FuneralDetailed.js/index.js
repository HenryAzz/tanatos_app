import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import HomeCard from '../Home/HomeCard';
import FuneralCard from './FuneralCard';
import ApiRequest from '../../Services/ApiRequest';
import ModalLoadingTrans from '../../components/ModalLoadingTrans';
import OrderNotFound from '../MyOrder/OrderNotFound';

const FuneralDetailed = () => {
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
      subTitle: 'Envía tu apoyo y un mensaje de ánimo a ',
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
    {
      id: '4',
      image: require('../../assets/images/HomeImg/HomeCardImg.png'),
      title: 'Matt Villano',
      subTitle: "5 things to know about the 'conundrum' of lupus",
      profile: require('../../assets/images/HomeImg/HomeCardImg.png'),
      time: '9 Hours ago',
    },
    {
      id: '5',
      image: require('../../assets/images/HomeImg/HomeCardImg.png'),
      title: 'Matt Villano',
      subTitle: "5 things to know about the 'conundrum' of lupus",
      profile: require('../../assets/images/HomeImg/HomeCardImg.png'),
      time: '9 Hours ago',
    },
    {
      id: '6',
      image: require('../../assets/images/HomeImg/HomeCardImg.png'),
      title: 'Matt Villano',
      subTitle: "5 things to know about the 'conundrum' of lupus",
      profile: require('../../assets/images/HomeImg/HomeCardImg.png'),
      time: '9 Hours ago',
    },
    {
      id: '7',
      image: require('../../assets/images/HomeImg/HomeCardImg.png'),
      title: 'Matt Villano',
      subTitle: "5 things to know about the 'conundrum' of lupus",
      profile: require('../../assets/images/HomeImg/HomeCardImg.png'),
      time: '9 Hours ago',
    },
    {
      id: '8',
      image: require('../../assets/images/HomeImg/HomeCardImg.png'),
      title: 'Matt Villano',
      subTitle: "5 things to know about the 'conundrum' of lupus",
      profile: require('../../assets/images/HomeImg/HomeCardImg.png'),
      time: '9 Hours ago',
    },
    {
      id: '9',
      image: require('../../assets/images/HomeImg/HomeCardImg.png'),
      title: 'Matt Villano',
      subTitle: "5 things to know about the 'conundrum' of lupus",
      profile: require('../../assets/images/HomeImg/HomeCardImg.png'),
      time: '9 Hours ago',
    },
    {
      id: '10',
      image: require('../../assets/images/HomeImg/HomeCardImg.png'),
      title: 'Matt Villano',
      subTitle: "5 things to know about the 'conundrum' of lupus",
      profile: require('../../assets/images/HomeImg/HomeCardImg.png'),
      time: '9 Hours ago',
    },
    {
      id: '11',
      image: require('../../assets/images/HomeImg/HomeCardImg.png'),
      title: 'Matt Villano',
      subTitle: "5 things to know about the 'conundrum' of lupus",
      profile: require('../../assets/images/HomeImg/HomeCardImg.png'),
      time: '9 Hours ago',
    },
    {
      id: '12',
      image: require('../../assets/images/HomeImg/HomeCardImg.png'),
      title: 'Matt Villano',
      subTitle: "5 things to know about the 'conundrum' of lupus",
      profile: require('../../assets/images/HomeImg/HomeCardImg.png'),
      time: '9 Hours ago',
    },
    {
      id: '13',
      image: require('../../assets/images/HomeImg/HomeCardImg.png'),
      title: 'Matt Villano',
      subTitle: "5 things to know about the 'conundrum' of lupus",
      profile: require('../../assets/images/HomeImg/HomeCardImg.png'),
      time: '9 Hours ago',
    },
    {
      id: '14',
      image: require('../../assets/images/HomeImg/HomeCardImg.png'),
      title: 'Matt Villano',
      subTitle: "5 things to know about the 'conundrum' of lupus",
      profile: require('../../assets/images/HomeImg/HomeCardImg.png'),
      time: '9 Hours ago',
    },
  ];
  const [funeralData, setFuneralData] = useState();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetFuneralData = async () => {
    try {
      setLoading(true);
      setShowLoadingModal(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'funerals',
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

  // last_id: catalogData[catalogData.length - 1]?.id,
  //   if (resp && resp != undefined && resp.length > 0) {
  //     setCatalogData([...catalogData, ...resp]);
  // }
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    handleGetFuneralData();
  };
  const [bottomLoader, setBottomLoader] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    setScrolled(true);
  };
  const handleGetFuneralDataMore = async () => {
    try {
      setBottomLoader(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'funerals',
        last_id: funeralData[funeralData.length - 1]?.id,
      });
      const resp = res.data.data;
      setBottomLoader(false);
      if (resp && resp != undefined && resp.length > 0) {
        setFuneralData([...funeralData, ...resp]);
      }
      // setFuneralData(resp);
    } catch (err) {
    } finally {
      setBottomLoader(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetFuneralData();
  }, []);

  return (
    <Layout>
      <AppHeader title={'Funeral Homes'} defaultStyle={{marginBottom: 30}} />

      <View
        style={{
          // backgroundColor: 'red',
          alignSelf: 'center',
          width: '100%',
          flex: 1,
        }}>
        <FlatList
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onEndReached={scrolled ? handleGetFuneralDataMore : null}
          ListEmptyComponent={
            <OrderNotFound
              title={'Not Found data'}
              subtitle={"You don't have any at this time"}
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
          data={funeralData}
          renderItem={({item}) => (
            <FuneralCard
              name={item.name}
              subTitle={item.description}
              image={item.image}
              url={item.url}
              time={item.time}
              // navigation={props.navigation}
            />
          )}
        />
      </View>
      <ModalLoadingTrans
        showLoadingModal={showLoadingModal}
        setShowLoadingModal={setShowLoadingModal}
      />
    </Layout>
  );
};

export default FuneralDetailed;

const styles = StyleSheet.create({});
