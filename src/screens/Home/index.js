import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import {ProfileHome} from '../../assets/images/HomeImg';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {colors, fonts} from '../../constraints';
import HomeCard from './HomeCard';
import style from '../../assets/css/style';
import TextCardView from './TextCardView';
import BottomCard from './BottomCard';
import SearchPic from '../../assets/images/HomeImg/Search.svg';
import ListOfSearches from './ListOfSearches';
import {useNavigation} from '@react-navigation/native';
import FuneralCard from './FuneralCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
  const navigation = useNavigation();
  const [account_Type, setAccountType] = useState();
  const getAccountType = async () => {
    const account_Type = await AsyncStorage.getItem('account_Type');
    setAccountType(account_Type);
    console.log('accountType//////', account_Type);
  };
  useEffect(() => {
    getAccountType();
  }, []);
  // const account_Type = 'Funeral';
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
      subTitle: 'Envía tu apoyo y un mensaje de ánimo a familiares y amigos',
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
  ];
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
  ];

  return (
    <Layout>
      {account_Type === 'Customer' && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingVertical: 20,
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Image
              style={{
                height: 40,
                width: 40,
                // backgroundColor: 'blue',
                resizeMode: 'center',
                borderRadius: 20,
              }}
              source={require('../../assets/images/HomeImg/HomeCardImg1.png')}
            />
            <View style={{paddingLeft: 10}}>
              <Text style={[style.font12Re, {color: colors.textGray}]}>
                Good Morning
              </Text>
              <Text style={[style.font16Re]}>Marry John</Text>
            </View>
          </View>

          <Image
            style={{
              height: 20,
              width: 20,
              // backgroundColor: 'red',
              resizeMode: 'center',
            }}
            source={require('../../assets/images/HomeImg/bell.png')}
          />
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.line,
          marginVertical: 10,
          borderRadius: 50,
          height: 45,
          paddingLeft: 14,
        }}>
        <SearchPic />
        <TextInput
          placeholder="Buscar"
          style={{width: '100%', paddingLeft: 10}}
        />
      </View>
      {account_Type === 'Customer' && <ListOfSearches />}

      <ScrollView
        style={{width: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <TextCardView
          title={'Funeral Homes'}
          subtitle={'View all'}
          onPress={() => navigation.navigate('FuneralDetailed')}
        />
        <FlatList
          horizontal
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={FuneralData}
          renderItem={({item}) => (
            // <View style={{backgroundColor: 'red'}}>
            <HomeCard
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

        <TextCardView
          title={
            account_Type === 'Customer'
              ? 'Obituaries Near you'
              : 'Flowers to Funeral Home'
          }
          subtitle={'View all'}
          onPress={() =>
            navigation.navigate(
              account_Type === 'Customer'
                ? 'FuneralNearDetailed'
                : 'FuneralHome',
            )
          }
        />
        <View>
          {account_Type === 'Customer' ? (
            <FlatList
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={({item}) => (
                <BottomCard title={item.title} subtitle={item.subtitle} />
              )}
            />
          ) : (
            <>
              <FuneralCard status="home" />
              <FuneralCard status="home" />
            </>
          )}
        </View>
        {/* <TextCardView title={'Obituarios cerca de ti'} subtitle={'Ver todos'} /> */}
      </ScrollView>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({});
