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
import ApiRequest, { ApiRequestGet } from '../../Services/ApiRequest';
import ModalLoadingTrans from '../../components/ModalLoadingTrans';
import OrderNotFound from '../MyOrder/OrderNotFound';
import {useTranslation} from 'react-i18next';
import {colors} from '../../constraints';
import {useNavigation} from '@react-navigation/native';

const FuneralDetailed = () => {
  const [funeralData, setFuneralData] = useState();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetFuneralData = async () => {
    try {
      setLoading(true);
      setShowLoadingModal(true);
      const res = await ApiRequestGet({
        type: '/funerals',
        table_name: 'funerals',
      });
      const resp = res.data;
      console.log(resp, 'resp555555////////////////////////');
      setFuneralData(resp);
      setRefreshing(false);
      setShowLoadingModal(false);
    } catch (err) {
    } finally {
      setShowLoadingModal(false);
      setLoading(false);
    }
  };
  console.log( 'resp555555////////////////////////');

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
      const res = await ApiRequestGet({
        type: '/funerals',
        table_name: 'funerals',
        last_id: funeralData[funeralData.length - 1]?.id,
      });
      const resp = res.data.data;
      setBottomLoader(false);
      if (resp && resp != undefined && resp.length > 0) {
        setFuneralData([...funeralData, ...resp]);
      }
      setFuneralData(resp);
    } catch (err) {
    } finally {
      setBottomLoader(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetFuneralData();
  }, []);

  const {t} = useTranslation();
  const navigation = useNavigation();
  return (
    <Layout>
      <AppHeader title={t('Funeral Homes')} defaultStyle={{marginBottom: 30}} />

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
          data={funeralData}
          renderItem={({item}) => (
            <FuneralCard
              name={item.name}
              subTitle={item.description}
              image={item.image}
              url={"https://kffhealthnews.org/wp-content/uploads/sites/2/2020/03/GettyImages-104304892_funeral_1350.jpg"}
              time={item.time}
              onPress={() =>
                navigation.navigate('FuneralDetailedPage', {
                  item: item,
                })
              }
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
