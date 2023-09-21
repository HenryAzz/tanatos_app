import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import ListOfRoses from './ListOfRoses';
import CardList from './CardList';

const Favorite = () => {
  return (
    <Layout>
      <AppHeader
        title={'Westside Florists'}
        defaultStyle={{marginBottom: 30}}
      />
      <ListOfRoses />
      <ScrollView>
        <CardList />
      </ScrollView>
    </Layout>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
