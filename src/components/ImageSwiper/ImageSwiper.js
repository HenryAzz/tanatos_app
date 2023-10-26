import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {colors} from '../../constraints';
colors;

// const ImageSwiper = ({images}) => {
//   return (
//     <Swiper
//       style={styles.wrapper}
//       showsButtons={false}
//       showsPagination={true}
//       removeClippedSubviews={false}
//       containerStyle={{marginBottom: 60}}
//       activeDotColor={colors.gray3}
//       dotColor={'#D9D9D9'}
//       activeDotStyle={{width: 25, height: 8}}
//       dotStyle={{width: 10, height: 10}}
//       paginationStyle={{marginBottom: -55}}>
//       {images}
//     </Swiper>
//   );
// };

const ImageSwiper = ({images, imageStyle}) => {
  // console.log(images, 'swiper getting imge ');
  return (
    <Swiper
      style={styles.swiper}
      showsButtons={false}
      showsPagination={true}
      activeDotColor={colors.primaryColor}
      dotColor={'#D9D9D9'}
      activeDotStyle={{width: 25, height: 8}}
      dotStyle={{width: 10, height: 10}}
      paginationStyle={styles.pagination}>
      {images.map((image, index) => (
        <View key={index} style={styles.slide}>
          <Image
            source={{uri: `https://locatestudent.com/tanatos/upload/${image}`}}
            style={[
              {
                // border: 10,
                borderRadius: 10,
                // borderBottomRightRadius: 10,
                width: '100%',
                height: '100%',
                // marginRight: 20,
                resizeMode: 'center',
                // borderTopRightRadius: imageStyle ? 0 : 10,
                // borderTopLeftRadius: 10,
              },
              imageStyle,
            ]}
          />
        </View>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;

const styles = StyleSheet.create({
  wrapper: {
    height: 230,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.gray5,
    borderRadius: 15,
    marginHorizontal: 2,
    flexDirection: 'row',
  },

  img: {
    // resizeMode: 'contain',
  },
});

// how we call
//   <Swiper images={swiperImages} />;
//
