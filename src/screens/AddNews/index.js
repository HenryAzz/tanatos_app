import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import {useNavigation} from '@react-navigation/native';

const AddNews = () => {
  const navigation = useNavigation();
  return (
    <Layout>
      <AppHeader title={'Add News'} />
      <AppTextInput titleText={'Name'} placeholder={'Name'} />
      <Text
        style={[
          style.font16Re,
          {fontFamily: fonts.medium, alignSelf: 'flex-start'},
        ]}>
        Upload Photo
      </Text>
      <View
        style={{
          width: '100%',
          marginVertical: 10,
          marginBottom: 10,
          height: 120,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1.5,
          borderStyle: 'dashed',
        }}>
        <BaseButton title={'Upload a Photo'} defaultStyle={{width: '60%'}} />
      </View>
      <Text
        style={[
          style.font16Re,
          {fontFamily: fonts.medium, alignSelf: 'flex-start'},
        ]}>
        Description
      </Text>
      <TextInput
        placeholder="Description"
        multiline={true}
        textAlignVertical="top"
        style={{
          paddingLeft: 15,
          paddingTop: 10,
          borderColor: '#E0E0E0',
          backgroundColor: '#F5F5F5',
          borderWidth: 1,
          marginVertical: 5,
          width: '100%',
          height: 100,
          borderRadius: 10,
        }}
      />
      <AppTextInput titleText={'Date'} placeholder={'Date'} />
      <BaseButton
        title={'Add News'}
        defaultStyle={{marginTop: 40}}
        onPress={() => navigation.navigate('Phone')}
      />
    </Layout>
  );
};

export default AddNews;

const styles = StyleSheet.create({});
