import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import Edit from '../../assets/Edit.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
const BottomCard = ({
  title,
  subtitle,
  onPress,
  onPress1,
  onPressDel,
  account_Type,
}) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        backgroundColor: colors.white,
        width: '98%',
        // marginTop: 10,
        padding: 15,
        margin: 4,
        // height: 120,
        // justifyContent: 'space-between',
        borderRadius: 15,
        elevation: 10,
        shadowColor: colors.elev,
        // backgroundColor: 'red',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>{title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {account_Type === 'funeral' ? (
            <>
              <TouchableOpacity
                onPress={onPressDel}
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: colors.primaryColor,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}>
                <Icon name="trash" color={colors.white} size={10} />
              </TouchableOpacity>

              <TouchableOpacity onPress={onPress}>
                <Image source={Edit} style={{height: 20, width: 20}} />
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </View>
      <Text
        style={[
          style.font14Re,
          {color: colors.textGray, marginVertical: 6, width: 300},
        ]}>
        {subtitle}
      </Text>

      <TouchableOpacity
        onPress={onPress1}
        style={{
          borderWidth: 1,
          borderColor: colors.primaryColor,
          width: 110,
          alignItems: 'center',
          justifyContent: 'center',
          height: 33,
          //   marginBottom: 8,
          alignSelf: 'flex-end',
          borderRadius: 60,
        }}>
        <Text style={[style.font14Re, {color: colors.primaryColor}]}>
          {account_Type === 'customer' ? 'see obituary' : 'Learn More'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomCard;

const styles = StyleSheet.create({});
