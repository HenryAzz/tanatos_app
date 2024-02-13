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
  onPress,
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
    // console.log('a', account_Type);
  };
  useEffect(() => {
    getAccountType();
  }, []);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      // onPress={() => navigation.navigate('Details', {name})}
      style={[
        styling,
        {
          // backgroundColor: 'red',
          // flex: 1,
          // width: '100%',
          height: 220,
          // paddingTop: 14,
          // width: 230,
          // margin: 4,
          marginVertical: 10,
          marginRight: 10,
        },
      ]}>
      <TouchableOpacity
      // onPress={() =>
      //   navigation.navigate('HomeStackWithoutBottom', {screen: 'ChefScreen'})
      // }
      >
        {!image && !image.length > 0 ? (
          <Image
            // source={require('../../assets/app_icon.png')}
            source={require('../../assets/app_icon.png')}
            // source={{uri: item.url + cleanedPath}}
            style={{
              width: 160,
              height: 100,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              top: 0,
              // backgroundColor: 'red',
            }}
          />
        ) : (
          <Image
            // accessibilityLabel="No"
            source={{uri: url }}
            style={{
              width: 160,
              height: 100,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              elevation: 10,
              shadowColor: colors.elev,
              borderWidth: 1,
              // backgroundColor: colors.gray,
            }}
          />
        )}
      </TouchableOpacity>
      <View
        style={{
          paddingVertical: 20,
          justifyContent: 'space-evenly',
          paddingHorizontal: 6,
          width: 160,
          height: 100,
          borderBottomRightRadius: 20,
          // flex: 1,
          borderBottomLeftRadius: 20,
          elevation: 10,
          shadowColor: colors.elev,
          backgroundColor: colors.white,
          //   backgroundColor: 'red',
        }}>
        <Text
          style={[style.font18Re, {fontFamily: fonts.bold}]}
          numberOfLines={1}>
          {name}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            color: '#A2A2A2',
            marginVertical: 10,
            fontFamily: fonts.regular,
            fontSize: 11,
          }}>
          {subTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({});
