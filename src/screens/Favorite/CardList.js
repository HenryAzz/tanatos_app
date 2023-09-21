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
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, fonts} from '../../constraints';

const windowWidth = Dimensions.get('window').width;

const cardData = [
  {
    id: 1,
    title: 'Pink Rose',
    price: '$19.99',
    image: require('../../assets/images/fav/fev1.png'),
  },
  {
    id: 2,
    title: 'Pink Rose',
    price: '$24.99',
    image: require('../../assets/images/fav/fav2.png'),
  },

  {
    id: 3,
    title: 'Pink Rose',
    price: '$24.99',
    image: require('../../assets/images/fav/fav3.png'),
  },
  {
    id: 4,
    title: 'Pink Rose',
    price: '$24.99',
    image: require('../../assets/images/fav/fav4.png'),
  },
  {
    id: 5,
    title: 'Pink Rose',
    price: '$24.99',
    image: require('../../assets/images/fav/fav3.png'),
  },
  {
    id: 6,
    title: 'Pink Rose',
    price: '$24.99',
    image: require('../../assets/images/fav/fav4.png'),
  },
];

const CardList = () => {
  const renderCard = ({item}) => (
    <View style={styles.cardContainer}>
      <Image source={item.image} style={styles.image} />
      <TouchableOpacity style={styles.favIconContainer}>
        <Icon name="heart-o" size={20} color={colors.primaryColor} />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={cardData}
      renderItem={renderCard}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    // paddingHorizontal: 10, // Add horizontal padding for spacing
    // paddingBottom: 15, // Add bottom padding for spacing
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
    width: '47%',
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
