import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';

const OrderCardCC = ({item, images}) => {
  console.log(images, 'list of image');
  // const JSONArr = JSON.parse(images);
  const imageFilenames = [
    '7814_ad223669-6d15-4278-9b9b-8db680c91914.jpg',
    //   '5737_f1ada5d3-8ab0-424e-9b2b-d0538b7b2b10.jpg',
  ];

  const baseUrl = 'https://locatestudent.com/tanatos/upload/';

  // Create an array of image data by appending the filenames to the base URL
  // const imageData = JSONArr.map(filename => ({
  //   id: filename, // Use a unique ID for each image
  //   url: baseUrl + filename,
  // }));

  return (
    <View
      style={{
        width: 158,
        // height: 100,
        backgroundColor: colors.white,
        elevation: 5,
        shadowColor: colors.elev,
        borderRadius: 10,
        margin: 4,
      }}>
      <View style={{height: 120, width: 155}}>
        <ImageSwiper images={images} />
      </View>
      {/* <FlatList
        data={imageData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Image style={styles.image} source={{uri: item.url}} />
        )}
      /> */}
      {/* <Image
        source={item.image}
        style={{
          height: 120,
          width: 158,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      /> */}
      {/* <Text style={[style.font14Re, {padding: 10}]}>{item.title}</Text> */}
      <Text style={[style.font14Re, {padding: 10}]}>{item.name}</Text>
      <View
        style={{
          flexDirection: 'row',

          alignItems: 'center',
          paddingBottom: 10,
          paddingLeft: 10,
          //   paddingVertical: 10,
          justifyContent: 'space-between',
        }}>
        <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
          {item.price}
        </Text>
        {item.status ? (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: colors.primaryColor,
              width: 90,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
            }}>
            <Text style={[style.font14Re, {color: colors.primaryColor}]}>
              {item.status}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default OrderCardCC;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 120,
    width: 158,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    // margin: 10,
    marginVertical: 10,
  },
});
