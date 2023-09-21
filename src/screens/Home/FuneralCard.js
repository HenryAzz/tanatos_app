import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
fonts;
const FuneralCard = ({status}) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        // backgroundColor: colors.white,
        width: '97%',
        // height: 100,
        // marginVertical: 20,
        // marginTop: 10,
        // paddingVertical: 15,
        marginVertical: 8,
        // height: 120,
        // justifyContent: 'space-between',
        borderRadius: 15,
        elevation: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        shadowColor: colors.elev,
        // backgroundColor: 'red',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../../assets/Resrose.png')}
          style={{
            height: 130,
            // resizeMode: 'center',
            width: 100,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
        <View
          style={{
            width: '70%',
            // height: 100,
            backgroundColor: colors.white,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            padding: 10,
          }}>
          <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
            Marry Phillips
          </Text>
          <Text style={[style.font14Re]}>
            Send your support and a message of encouragement to the family and
            friends
          </Text>
          {status === 'home' ? (
            <TouchableOpacity
              style={{
                borderColor: colors.primaryColor,
                borderWidth: 1,
                width: 80,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 6,
                borderRadius: 20,
                marginTop: 10,
                alignSelf: 'flex-end',
              }}>
              <Text style={[style.font16Re, {color: colors.primaryColor}]}>
                Check
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default FuneralCard;

const styles = StyleSheet.create({});
