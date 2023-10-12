import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {deviceHeight, deviceWidth} from '../../constraints/Dimentions';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
deviceHeight;
const HomeCard = ({
  name,
  image,
  url,
  profile,

  time,
  styling,
  subTitle,

  navigation,
}) => {
  const cleanedPath = image.replace(/^"(.*)"$/, '$1');
  const [account_Type, setAccountType] = useState();
  const getAccountType = async () => {
    const account_Type = await AsyncStorage.getItem('account_Type');
    setAccountType(account_Type);
    console.log('a', account_Type);
  };
  useEffect(() => {
    getAccountType();
  }, []);
  return (
    <View
      // onPress={() => navigation.navigate('Details', {name})}
      style={[
        styling,
        {
          paddingTop: 14,
          width: 250,
          margin: 4,
        },
      ]}>
      <TouchableOpacity
      // onPress={() =>
      //   navigation.navigate('HomeStackWithoutBottom', {screen: 'ChefScreen'})
      // }
      >
        <Image
          source={{uri: url + cleanedPath}}
          style={{
            height: 120,
            width: 230,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            elevation: 10,
            shadowColor: colors.elev,
            // backgroundColor: 'red',
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: colors.white,
          padding: 10,
          width: 230,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          elevation: 10,
          shadowColor: colors.elev,
          //   backgroundColor: 'red',
        }}>
        <Text style={[style.font18Re, {fontFamily: fonts.bold}]}>{name}</Text>
        <Text
          style={{
            color: '#A2A2A2',
            marginVertical: 10,
            fontFamily: fonts.regular,
            fontSize: 11,
          }}>
          {subTitle}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* {account_Type === 'customer' && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Image
                source={profile}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                }}
              />
              <Text
                style={{
                  color: colors.primaryColor,
                  paddingLeft: 6,
                  fontFamily: fonts.regular,
                  fontSize: 11,
                }}>
                Shop Roses
              </Text>
            </View>
          )} */}
          {account_Type !== 'customer'}
          <Text></Text>
          <Text
            style={{
              color: colors.primaryColor,
              paddingLeft: 6,
              fontFamily: fonts.regular,
              fontSize: 11,
            }}>
            {time}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({});
