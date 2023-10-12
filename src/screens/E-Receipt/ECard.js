import {
  StyleSheet,
  Image,
  top,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';
import {useNavigation} from '@react-navigation/native';
import TextCard from './TextCard';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';

const ECard = ({price, size, images, title, onPress}) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{width: '100%', marginTop: 50}}>
        <TextCard title={'Amount'} price={'$100'} />
        <TextCard title={'Subtotal'} price={'$85'} />
        <TextCard title={'Shipping'} price={'Free'} />
        {/* <TextCard title={'Payment Method'} price={'My wallet'} /> */}
      </View>
    </>
  );
};

export default ECard;

const styles = StyleSheet.create({});
