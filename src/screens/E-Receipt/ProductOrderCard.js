import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

const ProductOrderCard = ({
  item,
  handleIncrement,
  handleDecrement,
  quantity,
  pricex,
}) => {
  const {name, basicPrice, images} = item;

  const [quantity1, setQuantity] = useState(1);
  const [totle, setTotle] = useState([]);
  // console.log(item, 'totle');
  // useEffect(() => {
  //   const price = parseInt(basicPrice1) + parseInt(item.price);
  //   console.log(price, 'sum');
  // }, [quantity1]);
  // const price = parseInt(item.price);
  // const [basicPrice1, setBasicPrice] = useState(price);
  // console.log(basicPrice1, 'basicPrice1');
  // const handleIncrement = () => {
  //   setQuantity(quantity1 + 1);
  //   setBasicPrice(parseInt(basicPrice1) + parseInt(price));

  //   // Price doubles with each increment
  // };

  // const handleDecrement = () => {
  //   if (quantity1 > 1) {
  //     setQuantity(quantity1 - 1);
  //     setBasicPrice(parseInt(basicPrice1) - parseInt(price));
  //   }
  // };
  const {t} = useTranslation();
  return (
    <View
      style={{
        // width: '100%',
        marginTop: 10,
        // flex: 1,
        marginHorizontal: 5,
        marginVertical: 6,
        elevation: 4,
        shadowColor: colors.elev,
        backgroundColor: colors.white,
        borderRadius: 10,
        flexDirection: 'row',
        // alignItems: 'center',
      }}>
      <View style={{height: 100, width: 100}}>
        <ImageSwiper images={images} />
      </View>

      <View style={{flex: 1, padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={[style.font16Re, {fontFamily: fonts.bold}]}
              numberOfLines={2}>
              {name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleIncrement}
            style={{marginHorizontal: 5}}>
            <Text style={[style.font24Re]}>+</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={[style.font16Re, {fontFamily: fonts.bold}]}
              numberOfLines={2}>
              {item.quanitity} x set
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleIncrement}
            style={{marginHorizontal: 5}}>
            <Text style={[style.font16Re]}>{item.quanitity}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={[style.font16Re, {fontFamily: fonts.bold}]}
              numberOfLines={2}>
              €{item.price}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleDecrement}
            style={{marginHorizontal: 5}}>
            <Text style={[style.font24Re]}>-</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={{marginTop: 10}}>
      
        <TouchableOpacity onPress={handleDecrement}>
          <Text style={[style.font24Re]}>-</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: colors.white,
    elevation: 4,
    shadowColor: colors.elev,
  },
  imageContainer: {
    height: 120,
    width: 155,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  detailsInnerContainer: {
    paddingLeft: 16,
  },
  productName: {
    fontSize: 16,
    fontFamily: 'bold',
  },
  productQuantity: {
    color: '#8C8C8C',
    fontSize: 16,
    marginVertical: 6,
  },
  productPrice: {
    fontSize: 22,
    fontFamily: 'bold',
  },
  buttonContainer: {
    paddingLeft: 20,
  },
  incrementButton: {
    fontSize: 24,
  },
  quantityText: {
    fontSize: 16,
  },
  decrementButton: {
    fontSize: 24,
  },
});

export default ProductOrderCard;
