import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';

const FuneralCardShow = ({
  title,
  subTitle,
  img1,
  img2,
  date,
  time,
  onPress,
}) => {
  return (
    <View
      style={{
        // height: 60,
        paddingVertical: 10,
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
      }}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 30,
              width: 25,
              backgroundColor: colors.white,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-start',
              marginTop: 16,
              marginLeft: 6,
            }}>
            <Image
              source={img1}
              style={{
                height: 14,
                width: 14,
              }}
            />
          </View>

          <View style={{marginHorizontal: 10, marginTop: 10, width: '50%'}}>
            <Text
              style={[
                style.font12Re,
                {
                  color: colors.primaryColor,
                  fontFamily: fonts.bold,
                  marginTop: 10,
                  // width: '100%',
                },
              ]}
              numberOfLines={2}>
              {title}
            </Text>
            <Text
              style={[
                style.font10Re,
                {
                  color: '#A2A2A2',
                  paddingVertical: 5,
                  fontFamily: fonts.medium,
                },
              ]}>
              {subTitle}
            </Text>
          </View>
        </View>
        <View style={{left: 44}}>
          <Text
            style={[
              style.font14Re,
              {color: '#A2A2A2', fontFamily: fonts.bold},
            ]}>
            {date}
          </Text>
          <Text
            style={[
              style.font14Re,
              {color: '#A2A2A2', fontFamily: fonts.bold},
            ]}>
            {time}
          </Text>
          <TouchableOpacity
            onPress={onPress}
            style={{
              height: 24,
              marginTop: 5,
              backgroundColor: colors.primaryColor,
              width: 70,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              borderRadius: 12,
              // paddingVertical: 10,
            }}>
            <Image
              source={require('../../assets/Mapshow.png')}
              style={{height: 12, width: 12}}
            />
            <Text
              style={[
                style.font12Re,
                {color: colors.white, fontFamily: fonts.bold},
              ]}>
              Map
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={img2}
        style={{
          height: 130,
          width: 120,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      />
    </View>
  );
};

export default FuneralCardShow;

const styles = StyleSheet.create({});
