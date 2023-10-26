import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';
fonts;
const FuneralCard = ({
  status,
  description,
  images,
  url,
  name,
  sympathy_text,
  onPress,
}) => {
  // const pathFromBackend = image;

  // const cleanedPath = image?.replace(/^"(.*)"$/, '$1');
  // console.log('images///////', sympathy_text);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignSelf: 'center',
        // backgroundColor: colors.white,
        width: '96%',
        alignSelf: 'center',
        // height: 100,
        // marginVertical: 20,
        // marginTop: 10,
        // paddingVertical: 15,
        marginVertical: 8,
        // height: 120,
        // justifyContent: 'space-between',
        borderRadius: 15,
        elevation: 10,
        backgroundColor: colors.white,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        // shadowColor: colors.elev,
        // backgroundColor: 'red',
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{height: 120, width: 120, borderRadius: 10}}>
          <ImageSwiper images={images} />
        </View>

        <View
          style={{
            width: '50%',
            height: 100,
            // backgroundColor: colors.white,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            padding: 10,
          }}>
          <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>{name}</Text>
          <Text style={[style.font14Re]}>{sympathy_text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FuneralCard;

const styles = StyleSheet.create({});
