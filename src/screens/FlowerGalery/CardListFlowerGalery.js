// import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {colors, fonts} from '../../constraints';

// const windowWidth = Dimensions.get('window').width;

// const CardListFlowerGalery = ({item, onPress, id}) => {
//   const images = [
//     '46_d8a25a22-181b-4907-8425-2835fa087520.jpg',
//     '46_d8a25a22-181b-4907-8425-2835fa087520.jpg',
//     '46_d8a25a22-181b-4907-8425-2835fa087520.jpg',
//     // 'https://locatestudent.com/tanatos/upload/46_d8a25a22-181b-4907-8425-2835fa087520.jpg',
//     // 'https://locatestudent.com/tanatos/upload/46_d8a25a22-181b-4907-8425-2835fa087520.jpg',
//   ];

//   console.log(item, 'item');
//   const ImageGallery = ({images}) => {
//     return (
//       <View style={{flex: 1}}>
//         <FlatList
//           data={images}
//           keyExtractor={(item, index) => index.toString()}
//           horizontal={true} // Set to true for a horizontal scroll
//           renderItem={({item}) => (
//             <Image
//               source={{uri: `https://locatestudent.com/tanatos/upload/${item}`}} // Assuming the images are hosted online
//               style={{width: 200, height: 200, margin: 10}}
//             />
//           )}
//         />
//       </View>
//     );
//   };

//   return (
//     // <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
//     <View style={styles.cardContainer}>
//       {/* <Image source={item.image} style={styles.image} /> */}
//       <View style={{flex: 1}}>
//         <ImageGallery images={item.images} />
//       </View>
//       <View style={styles.infoContainer}>
//         <Text style={styles.title}>{item.name}</Text>
//         <Text style={styles.price}>{item.price}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   listContainer: {
//     // paddingHorizontal: 10, // Add horizontal padding for spacing
//     // paddingBottom: 15, // Add bottom padding for spacing
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   cardContainer: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     elevation: 5,
//     shadowColor: 'black',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     marginBottom: 15,
//     width: '47%',
//     marginHorizontal: 5,
//     // paddingHorizontal: 10,
//     // width: (windowWidth - 40) / 2, // Divide the available width by 2 for 2 columns
//   },
//   image: {
//     width: '100%',
//     height: 150,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   favIconContainer: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     zIndex: 1,
//   },
//   infoContainer: {
//     padding: 10,
//   },
//   title: {
//     fontSize: 18,
//     color: colors.black,
//     marginBottom: 2,
//   },
//   price: {
//     fontSize: 16,
//     color: colors.primaryColor,
//     fontFamily: fonts.bold,
//   },
// });

// export default CardListFlowerGalery;

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {colors, fonts} from '../../constraints';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;

const CardListFlowerGallery = ({item, onPress, id, onPressLike}) => {
  // console.log(item, 'item/////.....///');
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <View style={{height: 120}}>
        <ImageSwiper
          images={item.images}
          imageStyle={{borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}
        />
      </View>

      {/* <TouchableOpacity
        style={{position: 'absolute', right: 10, top: 10}}
        onPress={onPressLike}>
        <Icon
          name={item.favourite === 'like' ? 'heart-outline' : 'heart'}
          color={colors.primaryColor}
          size={30}
        />

      </TouchableOpacity> */}

      <TouchableOpacity onPress={onPress} style={styles.infoContainer}>
        <Text style={styles.title}>{item?.store?.name}</Text>
        {/* <Text style={styles.title}>{item.category}</Text> */}
        <Text style={styles.title}>{item?.store?.phone}</Text>
        {/* <Text style={styles.title}>{item.id}</Text> */}
        <Text style={styles.price}>{item?.store?.location}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 15,
    width: '47%',
    marginHorizontal: 5,
  },
  imageGalleryContainer: {
    // Adjust the height as needed
  },
  swiper: {height: 200, flex: 1},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    marginBottom: -55,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    color: colors.primaryColor,
    fontFamily: fonts.bold,
  },
  imageGalleryContainer: {
    // Adjust the height as needed
  },
  swiper: {height: 200, flex: 1},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    marginBottom: -55,
  },
  infoContainer: {
    padding: 10,
  },
});

export default CardListFlowerGallery;
