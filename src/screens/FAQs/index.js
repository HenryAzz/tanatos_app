import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import CardFAQS from './FAQCard';

import {FlatList} from 'react-native';

import SearchPic from '../../assets/images/HomeImg/Search.svg';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';
import Icon from 'react-native-vector-icons/Ionicons';
import AppHeader from '../../components/AppHeader/AppHeader';

const FAQs = () => {
  const data = [
    {
      id: 1,
      Question: '1 How can i cancel my order?',
      Answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 2,
      Question: '2 How can i cancel my order?',
      Answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 3,
      Question: '3 How can i cancel my order?',
      Answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 4,
      Question: '4 How can i cancel my order?',
      Answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 5,
      Question: '5 How can i cancel my order?',
      Answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 6,
      Question: '5 How can i cancel my order?',
      Answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 7,
      Question: '5 How can i cancel my order?',
      Answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 8,
      Question: '5 How can i cancel my order?',
      Answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 9,
      Question: '5 How can i cancel my order?',
      Answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 10,
      Question:
        '5 How can i cancel my ordercancel my ordercancel my ordercancel my order?',
      Answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry text of the printing and typesetting industry text of the printing and typesetting industry text of the printing and typesetting industry.',
    },
  ];

  return (
    <Layout>
      <AppHeader title={'FAQs'} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          elevation: 4,
          backgroundColor: colors.white,
          borderColor: colors.line,
          marginVertical: 10,
          borderRadius: 10,
          height: 45,
          // paddingLeft: 14,
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 14,
          marginBottom: 30,
        }}>
        <TextInput placeholder="Search" style={{width: '90%'}} />
        <Icon name="search" color={colors.primaryColor} size={24} />
      </View>
      <View style={{width: '100%', flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <CardFAQS title={item.Question} subTtle={item.Answer} />
          )}
        />
      </View>
    </Layout>
  );
};

export default FAQs;

const styles = StyleSheet.create({});
