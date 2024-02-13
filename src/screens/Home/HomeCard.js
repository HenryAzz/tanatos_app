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
  hallno,
  navigation,
}) => {
  console.log(hallno, '==>hallnohalln22222o');
  const cleanedPath = image.replace(/^"(.*)"$/, '$1');

  const [account_Type, setAccountType] = useState();
  const getAccountType = async () => {
    const account_Type = await AsyncStorage.getItem('account_Type');
    setAccountType(account_Type);
    // console.log('a', JSON.parse(image));
  };
  useEffect(() => {
    getAccountType();
  }, []);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      // onPress={() => navigation.navigate('Details', {name})}
      style={[
        styling,
        {
          // backgroundColor: 'red',
          flex: 1,
          // height: 240,
          // paddingTop: 14,
          // width: 230,
          // margin: 4,
          margin: 6,
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
              height: 120,
              width: 180,
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
              height: 120,
              width: 180,
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
          backgroundColor: colors.white,
          // padding: 10,
          // paddingTop: 15,
          paddingVertical: 20,
          justifyContent: 'space-evenly',
          paddingHorizontal: 6,
          width: 180,
          height: 100,
          borderBottomRightRadius: 20,
          // flex: 1,
          borderBottomLeftRadius: 20,
          elevation: 10,
          shadowColor: colors.elev,
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
            // marginVertical: 10,
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
