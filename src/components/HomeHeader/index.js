import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../constants';

import {deviceWidth} from '../../constants/Dimentions';
const HomeHeader = ({title, subTitle, Notification, Avatar}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        // backgroundColor: 'red',
        alignItems: 'center',
        // alignSelf: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'center',
        }}>
        {Avatar}
        <View style={{marginLeft: 10}}>
          <Text style={[style.font14, {color: '#919191'}]}>{title}</Text>
          <Text style={[style.font14]}>{subTitle}</Text>
        </View>
      </View>
      {/* <TouchableOpacity onPress={()=>navigation.navigate('No')}> */}
      <View>{Notification}</View>
      {/* </TouchableOpacity> */}
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});
