import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';

const FuneralCardShow = ({title, subTitle, img1, img2}) => {
  return (
    <View
      style={{
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
              height: 25,
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

          <View style={{marginHorizontal: 10, marginTop: 10}}>
            <Text
              style={[
                style.font12Re,
                {
                  color: colors.primaryColor,
                  fontFamily: fonts.bold,
                  marginTop: 10,
                },
              ]}
              numberOfLines={1}>
              {title}
            </Text>
            <Text
              style={[
                style.font10Re,
                {
                  color: '#A2A2A2',
                  paddingVertical: 10,
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
            23/05/2023
          </Text>
          <Text
            style={[
              style.font14Re,
              {color: '#A2A2A2', fontFamily: fonts.bold},
            ]}>
            03:00 PM
          </Text>
        </View>
      </View>
      <Image
        source={img2}
        style={{
          height: 120,
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
