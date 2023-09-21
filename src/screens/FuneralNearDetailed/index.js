import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import {FlatList} from 'react-native';
import BottomCard from '../Home/BottomCard';
import {useNavigation} from '@react-navigation/native';

const FuneralNearDetailed = () => {
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
  return (
    <Layout>
      <AppHeader
        title={'Obituaries Near you'}
        defaultStyle={{marginBottom: 30}}
      />
      <FlatList
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}) => (
          <BottomCard
            title={item.title}
            subtitle={item.subtitle}
            onPress={() => navigation.navigate('FuneralDetailedPage')}
          />
        )}
      />
    </Layout>
  );
};

export default FuneralNearDetailed;

const styles = StyleSheet.create({});
