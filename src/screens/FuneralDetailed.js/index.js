import {StyleSheet, FlatList, Text, View} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import HomeCard from '../Home/HomeCard';
import FuneralCard from './FuneralCard';

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
  return (
    <Layout>
      <AppHeader title={'Funeral Homes'} defaultStyle={{marginBottom: 30}} />

      <FlatList
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={FuneralData}
        renderItem={({item}) => (
          // <View style={{backgroundColor: 'red'}}>
          <FuneralCard
            name={item.title}
            subTitle={item.subTitle}
            image={item.image}
            profile={item.profile}
            time={item.time}
            // navigation={props.navigation}
          />
          // </View>
        )}
      />
    </Layout>
  );
};

export default FuneralDetailed;

const styles = StyleSheet.create({});
