import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, fonts} from '../../constraints';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';

const windowWidth = Dimensions.get('window').width;

const CardList = ({item, images, onPress}) => {
  const image = JSON.parse(images);

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <View style={{height: 120, width: 160}}>
        {images ? <ImageSwiper images={image} /> : null}
      </View>
      <TouchableOpacity style={styles.favIconContainer}>
        <Icon name="heart" size={20} color={colors.primaryColor} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item?.store?.name}</Text>
          <Text style={styles.price}>{item.price}€</Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: 'space-between',
    width: '100%',
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 15,
    width: 161,
    marginHorizontal: 5,
    // paddingHorizontal: 10,
    // width: (windowWidth - 40) / 2, // Divide the available width by 2 for 2 columns
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  favIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: colors.black,
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    color: colors.primaryColor,
    fontFamily: fonts.bold,
  },
});

export default CardList;
