import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import ListOfRoses from './ListOfRoses';
import CardList from './CardList';
import ApiRequest from '../../Services/ApiRequest';
import {useTranslation} from 'react-i18next';

const Favorite = () => {
  const [storeData, setStoreData] = useState();
  // const [selectedItem, setSelectedItem] = useState(null);

  // const handleGetStoreData = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await ApiRequest({
  //       type: 'get_data',
  //       table_name: 'stores_gallery',
  //       // last_id:
  //     });
  //     const resp = res.data.data;
  //     setStoreData(resp);
  //     // console.log(resp, 'resp');
  //   } catch (err) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   handleGetStoreData();
  // }, []);
  const {t, i18n} = useTranslation();

  return (
    <Layout>
      <AppHeader
        title={t('Westside Florists')}
        defaultStyle={{marginBottom: 30}}
      />
      {/* <ListOfRoses /> */}
      <ScrollView>
        <CardList />
      </ScrollView>
    </Layout>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
