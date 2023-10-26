import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import AppHeader from '../../components/AppHeader/AppHeader';
import {BaseButton} from '../../components/BaseButton';
import Layout from '../../components/Layout';
import ProductOrderCard from './ProductOrderCard';
import TextCard from './TextCard';
import {colors} from '../../constraints';
import {useTranslation} from 'react-i18next';

const EReceipt = ({route}) => {
  const navigation = useNavigation();

  const item = route?.params?.item;
  const dataTosend = route?.params?.dataTosend;
  const FuneralItemData = route?.params?.FuneralItemData;
  // console.log(dataTosend, 'tosend');
  const [quantity, setQuantity] = useState(1);
  const [selectedData, setSelectedData] = useState(dataTosend);
  const [selectedData1, setSelectedData1] = useState(dataTosend);
  // const [selectedData1, setSelectedData1] = useState(dataTosend);
  console.log(selectedData, 'selected data');
  // const [selectedData, setSelectedData] = useState(dataTosend);

  const price = parseInt(dataTosend[0].price);
  const [basicPrice, setBasicPrice] = useState();

  const handleIncrementLogic = item => {
    const existingIndex = selectedData.findIndex(
      storedItem => storedItem.id === item.id,
    );
    if (existingIndex !== -1) {
      const storedData = [...selectedData1];
      const newArray = [...selectedData];
      newArray[existingIndex] = {...newArray[existingIndex]};
      newArray[existingIndex].price =
        parseInt(newArray[existingIndex].price) +
        parseInt(storedData[existingIndex].price);
      newArray[existingIndex].quanitity =
        parseInt(newArray[existingIndex].quanitity) + 1;

      setSelectedData(newArray);
    }
  };

  const handleDecrementLogic = item => {
    if (item.quanitity > 1) {
      const existingIndex = selectedData.findIndex(
        storedItem => storedItem.id === item.id,
      );
      if (existingIndex !== -1) {
        const storedData = [...selectedData1];
        const newArray = [...selectedData];
        newArray[existingIndex] = {...newArray[existingIndex]};
        newArray[existingIndex].price =
          parseInt(newArray[existingIndex].price) -
          parseInt(storedData[existingIndex].price);
        newArray[existingIndex].quanitity =
          parseInt(newArray[existingIndex].quanitity) - 1;

        setSelectedData(newArray);
      }
    }
  };

  const [totalPricee, setTotalPrice] = useState(); // Initialize with 0
  useEffect(() => {
    // Calculate the total price when the component is mounted
    const newTotalPrice = selectedData.reduce((acc, item) => {
      const price = parseInt(item.price);
      console.log(price, 'price');
      const quantity = parseInt(item.quanitity);
      console.log(quantity, 'quANTOTY');
      return acc + price;
    }, 0);
    console.log(newTotalPrice, 'newTotalPrice');
    setTotalPrice(newTotalPrice);
  }, [selectedData]); // The empty dependency array ensures this effect runs once when the component mounts
  const {t} = useTranslation();
  return (
    <Layout>
      <AppHeader title={t('E-Receipt')} defaultStyle={{marginBottom: 30}} />
      {/* <Text>{quantity === 1 ? item.price : totalPrice}</Text> */}
      {/* <Text>{quantity + '//////' + basicPrice}</Text> */}
      {/* <YourComponent dataTosend={dataTosend} /> */}
      <ScrollView
        style={{width: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {/* <View style={{}}> */}
        <View
          style={{
            flex: 1,
            // width: '99%',
            // marginTop: 20,
            // marginVertical: 6,
            // elevation: 4,
            // shadowColor: colors.elev,
            // backgroundColor: colors.red,
            // borderRadius: 10,
          }}>
          <FlatList
            data={selectedData}
            // horizontal
            keyExtractor={item => item.id.toString()} // Assuming item has an 'id'
            renderItem={({item}) => (
              <ProductOrderCard
                item={item}
                handleIncrement={() => {
                  handleIncrementLogic(item);
                }}
                handleDecrement={() => handleDecrementLogic(item)}
              />
            )}
          />
        </View>
        <View style={{width: '100%', marginTop: 50}}>
          <TextCard title={t('Amount')} price={`$${totalPricee}`} />
          <TextCard title={t('Subtotal')} price={`$${totalPricee}`} />
          <TextCard title={t('Shipping')} price={'Free'} />
        </View>

        <BaseButton
          title={t('Checkout')}
          defaultStyle={{marginVertical: 30}}
          onPress={() =>
            navigation.navigate('Checkout', {
              basicPrice: totalPricee,
              dataTosend: dataTosend,
              FuneralItemData: FuneralItemData,
            })
          }
        />
        {/* </View> */}
      </ScrollView>
    </Layout>
  );
};

export default EReceipt;

const styles = StyleSheet.create({});
