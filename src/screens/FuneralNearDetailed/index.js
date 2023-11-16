import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import {FlatList} from 'react-native';
import BottomCard from '../Home/BottomCard';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../Services/ApiRequest';
import ModalLoadingTrans from '../../components/ModalLoadingTrans';
import OrderNotFound from '../MyOrder/OrderNotFound';
import {useTranslation} from 'react-i18next';

const FuneralNearDetailed = () => {
  const route = useRoute();
  const initialRegion = route?.params?.initialRegion;

  const navigation = useNavigation();
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
    {
      id: 9,
      title: 'casarse con phillips',
      subtitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
    },
    {
      id: 10,
      title: 'casarse con phillips',
      subtitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
    },
    {
      id: 11,
      title: 'casarse con phillips',
      subtitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
    },
    {
      id: 12,
      title: 'casarse con phillips',
      subtitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
    },
    {
      id: 13,
      title: 'casarse con phillips',
      subtitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
    },
    {
      id: 14,
      title: 'casarse con phillips',
      subtitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
    },
    {
      id: 15,
      title: 'casarse con phillips',
      subtitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
    },
  ];

  const [account_Type, setAccountType] = useState();
  const getAccountType = async () => {
    const account_Type = await AsyncStorage.getItem('account_Type');
    setAccountType(account_Type);
    console.log('a', account_Type);
  };
  useEffect(() => {
    getAccountType();
  }, []);
  const [loading, setLoading] = useState(false);
  const [funeralData, setFuneralData] = useState();

  const handleGetFuneralData = async () => {
    try {
      setShowLoadingModal(true);
      // setLoading(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'funerals',
        lat: initialRegion?.latitude,
        lng: initialRegion?.longitude,
        // lat: '',
        // lng: '',
      });
      const resp = res.data.data;
      // console.log(resp, 'resp////////////////////////');
      setFuneralData(resp);
      setRefreshing(false);
      setShowLoadingModal(false);
    } catch (err) {
      setShowLoadingModal(false);
    } finally {
      setRefreshing(false);
      setShowLoadingModal(false);
      // setLoading(false);
    }
  };

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
        lat: initialRegion?.latitude,
        lng: initialRegion?.longitude,
        last_id: funeralData[funeralData.length - 1]?.id,
        // lat: '',
        // lng: '',
      });
      const resp = res.data.data;
      if (resp && resp != undefined && resp.length > 0) {
        setFuneralData([...funeralData, ...resp]);
      }
      setBottomLoader(false);
      // setFuneralData(resp);
      // setShowLoadingModal(false);
    } catch (err) {
      setBottomLoader(false);
      // setShowLoadingModal(false);
    } finally {
      setBottomLoader(false);
    }
  };
  useEffect(() => {
    handleGetFuneralData();
  }, []);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const {t} = useTranslation();
  return (
    <Layout>
      <AppHeader
        title={t('Obituaries Near you')}
        defaultStyle={{marginBottom: 30}}
      />
      <FlatList
        keyExtractor={item => item.id}
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
          bottomLoader && <ActivityIndicator size="large" color={colors.gray} />
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
          <BottomCard
            title={item.name}
            subtitle={item.description}
            account_Type={account_Type}
            onPress1={() =>
              navigation.navigate('FuneralDetailedPage', {item: item})
            }
          />
        )}
      />
    </Layout>
  );
};

export default FuneralNearDetailed;

const styles = StyleSheet.create({});
