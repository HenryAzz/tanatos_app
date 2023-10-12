import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import OrderCardCC from '../HomeStore/OrderCardCC';
import ApiRequest from '../../Services/ApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalLoadingTrans from '../../components/ModalLoadingTrans';

const Catalog = () => {
  const dataCompleted = [
    {
      id: '1',
      title: 'Pink Rose',
      price: '$40.00',

      image: require('../../assets/HomeStorepic.png'),
    },

    {
      id: '2',
      title: 'Pink Rose',
      price: '$40.00',

      image: require('../../assets/HomeStorepic.png'),
    },
    {
      id: '3',
      title: 'Pink Rose',
      price: '$40.00',

      image: require('../../assets/HomeStorepic.png'),
    },
    {
      id: '4',
      title: 'Pink Rose',
      price: '$40.00',

      image: require('../../assets/HomeStorepic.png'),
    },
    {
      id: '5',
      title: 'Pink Rose',
      price: '$40.00',

      image: require('../../assets/HomeStorepic.png'),
    },
    {
      id: '6',
      title: 'Pink Rose',
      price: '$40.00',

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
    <Layout>
      <AppHeader title={'Catalog'} />
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
      <ModalLoadingTrans
        showLoadingModal={showLoadingModal}
        setShowLoadingModal={setShowLoadingModal}
      />
    </Layout>
  );
};

export default Catalog;

const styles = StyleSheet.create({});
