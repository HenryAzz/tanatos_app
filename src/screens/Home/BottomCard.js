import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import Edit from '../../assets/Edit.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AIcon from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
const BottomCard = ({
  title,
  subtitle,
  onPress,
  onPress1,
  onPressDel,
  account_Type,
  gotoDetailePage,
  funeralImg,
  onHeartPress,
  isLiked,
}) => {
  const {t} = useTranslation();

  // console.log(isLiked);
  return (
    <TouchableOpacity
      onPress={account_Type === 'customer' ? onPress1 : gotoDetailePage}
      style={{
        alignSelf: 'center',
        backgroundColor: colors.white,
        width: '98%',
        padding: 15,
        margin: 4,
        borderRadius: 15,
        elevation: 10,
        shadowColor: colors.elev,
        overflow: 'hidden',
      }}>
      <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
        <View style={{alignItems: 'center', flexDirection: 'row', flex: 1}}>
          {account_Type === 'funeral' && (
            <View>
              {funeralImg ? (
                <Image
                  source={{uri: funeralImg}}
                  style={{width: 35, height: 35, borderRadius: 50}}
                />
              ) : (
                <Image
                  source={require('../../assets/logoimg.png')}
                  style={{width: 35, height: 35, borderRadius: 50}}
                />
              )}
            </View>
          )}
          <View style={{marginLeft: 10}}>
            <Text
              numberOfLines={1}
              style={[style.font16Re, {fontFamily: fonts.bold, width: 170}]}>
              {title}
            </Text>
            <Text
              style={[
                style.font14Re,
                {color: colors.textGray, marginVertical: 6, width: 200},
              ]}
              numberOfLines={2}>
              {subtitle}
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
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
          ) : (
            // <TouchableOpacity onPress={onHeartPress}>
            //   <AIcon
            //     name={isLiked  ? 'heart' : 'hearto'}
            //     color={colors.primaryColor}
            //     size={20}
            //   />
            // </TouchableOpacity>
            null
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={account_Type === 'customer' ? onPress1 : gotoDetailePage}
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
          {account_Type === 'customer' ? t('see obituary') : 'See more'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default BottomCard;

const styles = StyleSheet.create({});
