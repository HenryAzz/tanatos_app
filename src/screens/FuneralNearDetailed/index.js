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
  const [funeralDataNear, setFuneralDataNear] = useState();

  const handleGetFuneralDataNear = async () => {
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
      setFuneralDataNear(resp);
      setRefreshingNear(false);
      setShowLoadingModal(false);
    } catch (err) {
      setShowLoadingModal(false);
    } finally {
      setRefreshingNear(false);
      setShowLoadingModal(false);
      // setLoading(false);
    }
  };

  const [refreshingNear, setRefreshingNear] = useState(false);
  const onRefreshNear = () => {
    setRefreshingNear(true);
    handleGetFuneralDataNear();
  };
  const [bottomLoaderNear, setBottomLoaderNear] = useState(false);
  const [scrolledMear, setScrolledNEar] = useState(false);
  const handleScrollNear = () => {
    setScrolledNEar(true);
  };

  const handleGetFuneralDataMoreNear = async () => {
    try {
      setBottomLoaderNear(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'funerals',
        lat: initialRegion?.latitude,
        lng: initialRegion?.longitude,
        last_id: funeralDataNear[funeralDataNear.length - 1]?.id,
        // lat: '',
        // lng: '',
      });
      const resp = res.data.data;
      if (resp && resp != undefined && resp.length > 0) {
        setFuneralDataNear([...funeralDataNear, ...resp]);
      }
      setBottomLoaderNear(false);
      // setFuneralData(resp);
      // setShowLoadingModal(false);
    } catch (err) {
      setBottomLoaderNear(false);
      // setShowLoadingModal(false);
    } finally {
      setBottomLoaderNear(false);
    }
  };
  useEffect(() => {
    handleGetFuneralDataNear();
  }, []);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const {t} = useTranslation();
  return (
    <Layout>
      <AppHeader title={t('Obituaries')} defaultStyle={{marginBottom: 30}} />
      <FlatList
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScrollNear}
        onEndReached={scrolledMear ? handleGetFuneralDataMoreNear : null}
        ListEmptyComponent={
          <OrderNotFound
            title={t('Not Found data')}
            subtitle={t("You don't have any data at this time")}
          />
        }
        ListFooterComponent={
          bottomLoaderNear && (
            <ActivityIndicator size="large" color={colors.gray} />
          )
        }
        ListFooterComponentStyle={{
          width: '100%',
          marginTop: 5,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshingNear}
            onRefresh={onRefreshNear}
          />
        }
        data={funeralDataNear}
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
