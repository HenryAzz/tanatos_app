import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';

const FuneralCardShow = ({
  title,
  img1,
  date,
  time,
  onPress,
  heading,
  description,
  name,
  hall_no,
  img,
  isMap,
}) => {
  const {t} = useTranslation();

  return (
    <View
      style={{
            borderRadius: 10,
        backgroundColor: '#F5F5F5',
        width: '100%',
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 0,
        }}>
        <View
          style={{
            height: 30,
            width: 30,
            backgroundColor: colors.white,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-start',
            marginTop: 10,
            // marginLeft: 6,
            marginHorizontal: 7,
          
          }}>
          <Image
            source={img1}
            style={{
              height: 14,
              width: 14,
            }}
          />
        </View>
        <View style={{width: 160, justifyContent: 'space-evenly', height: 120}}>
          <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
            {heading}
          </Text>
         
            <Text
              style={[
                style.font12Re,
                {
                  color: colors.black,
                  fontFamily: fonts.bold,
                  marginVertical: 2,
                  // width: '100%',
                },
              ]}
              numberOfLines={1}>
              {hall_no}
            </Text>
      
          {name && description ? (
            <>
              <Text
                style={[
                  style.font12Re,
                  {
                    color: colors.primaryColor,
                    fontFamily: fonts.bold,
                    marginVertical: 2,
                    // width: '100%',
                  },
                ]}
                numberOfLines={1}>
                {name}
              </Text>
              <Text
                style={[
                  style.font12Re,
                  {
                    color: colors.primaryColor,
                    fontFamily: fonts.bold,
                    marginVertical: 6,
                    // width: '100%',
                  },
                ]}
                numberOfLines={2}>
                {description}
              </Text>
            </>
          ) : null}
          <Text
            style={[
              style.font12Re,
              {
                color: colors.primaryColor,
                fontFamily: fonts.bold,
                // marginTop: 10,
                // width: '100%',
              },
            ]}
            numberOfLines={2}>
            {title}
          </Text>
          {/* <Text
            style={[
              style.font10Re,
              {
                color: '#A2A2A2',
                paddingVertical: 5,
                fontFamily: fonts.medium,
              },
            ]}>
            {subTitle}
          </Text> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // justifyContent: 'space-between',
            }}>
            <Text
              style={[
                style.font14Re,
                {color: '#A2A2A2', fontFamily: fonts.bold},
              ]}>
              {date}/
            </Text>
            <Text
              style={[
                style.font14Re,
                {color: '#A2A2A2', fontFamily: fonts.bold},
              ]}>
              {time}
            </Text>
          </View>
          {!isMap && (
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
                right: -100,
              }}>
              {/* <Image
                source={require('../../assets/Mapshow.png')}
                style={{height: 12, width: 12}}
              /> */}
              <Text
                style={[
                  style.font12Re,
                  {color: colors.white, fontFamily: fonts.bold , textTransform: 'capitalize'},
                ]}>
                {t('Map')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{}}>
        {!img ? (
          <Image
            source={require('../../assets/app_icon.png')}
            style={{
              height: 150,
              width: 120,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              // borderRadius: 80,
            }}
          />
        ) : (
          <Image
            source={{
              uri: 'https://locatestudent.com/tanatos/upload/' + img,
            }}
            // source={img2}
            style={{
              height: 150,
              width: 120,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default FuneralCardShow;

const styles = StyleSheet.create({});
