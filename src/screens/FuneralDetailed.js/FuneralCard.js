import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';

import {deviceHeight, deviceWidth} from '../../constraints/Dimentions';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';
deviceHeight;
const FuneralCard = ({
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
  return (
    <View
      // onPress={() => navigation.navigate('Details', {name})}
      style={[
        styling,
        {
          //   paddingTop: 14,
          //   width: '50%',

          //   margin: 4,
          paddingHorizontal: 10,
          marginVertical: 10,
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
            height: 100,
            width: 150,
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
          width: 150,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          elevation: 10,
          shadowColor: colors.elev,
          //   backgroundColor: 'red',
        }}>
        <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>{name}</Text>
        <Text
          style={{
            color: '#A2A2A2',
            marginVertical: 6,
            fontFamily: fonts.regular,
            fontSize: 11,
          }}>
          {subTitle}
        </Text>

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
  );
};

export default FuneralCard;

const styles = StyleSheet.create({});
