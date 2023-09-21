import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import Icon from 'react-native-vector-icons/Ionicons';
import CardList from '../Favorite/CardList';
import CardListFlowerGalery from './CardListFlowerGalery';
import {useNavigation} from '@react-navigation/native';

const FlowerGalery = () => {
  const navigation = useNavigation();
  const cardData = [
    {
      id: 1,
      title: 'Pink Rose',
      price: '$19.99',
      image: require('../../assets/images/fav/fev1.png'),
    },
    {
      id: 2,
      title: 'Pink Rose',
      price: '$24.99',
      image: require('../../assets/images/fav/fav2.png'),
    },

    {
      id: 3,
      title: 'Pink Rose',
      price: '$34.99',
      image: require('../../assets/images/fav/fav3.png'),
    },
    {
      id: 4,
      title: 'Pink Rose',
      price: '$44.99',
      image: require('../../assets/images/fav/fav4.png'),
    },
    {
      id: 5,
      title: 'Pink Rose',
      price: '$54.99',
      image: require('../../assets/images/fav/fav3.png'),
    },
    {
      id: 6,
      title: 'Pink Rose',
      price: '$64.99',
      image: require('../../assets/images/fav/fav4.png'),
    },
  ];

  return (
    <Layout>
      <AppHeader title={'Westside Florist'} defaultStyle={{marginBottom: 30}} />
      <View style={{alignSelf: 'flex-start'}}>
        <Text style={[style.font24Re, {fontFamily: fonts.bold}]}>
          Flowers Gallery
        </Text>
        <Text
          style={{color: '#A2A2A2', fontFamily: fonts.regular, fontSize: 15}}>
          Choose the best bouquet
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,

          backgroundColor: colors.white,
          borderColor: colors.line,
          marginVertical: 20,
          borderRadius: 30,
          height: 45,
          // paddingLeft: 14,
          //   width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginBottom: 30,
        }}>
        <Icon name="search" size={24} color="#8C8C8C" />
        <TextInput placeholder="Search" style={{width: '95%'}} />
      </View>
      <ScrollView>
        <FlatList
          data={cardData}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          renderItem={({item}) => {
            console.log(item.image, 'jj');
            return (
              <CardListFlowerGalery
                item={item}
                onPress={() => navigation.navigate('EReceipt', {item: item})}
                //   onPress={() => alert('id', item.id)}
              />
            );
          }}
        />
      </ScrollView>
    </Layout>
  );
};

export default FlowerGalery;

const styles = StyleSheet.create({});
