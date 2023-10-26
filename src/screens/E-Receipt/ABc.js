import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const YourComponent = ({dataTosend}) => {
  const [productData, setProductData] = useState(
    dataTosend.map(product => ({
      id: product.id,
      quantity: 1,
      basicPrice: parseInt(product.price),
    })),
  );

  const handleIncrement = productId => {
    setProductData(prevData => {
      return prevData.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
            basicPrice: product.basicPrice + parseInt(product.price),
          };
        }
        return product;
      });
    });
  };

  const handleDecrement = productId => {
    setProductData(prevData => {
      return prevData.map(product => {
        if (product.id === productId && product.quantity > 1) {
          return {
            ...product,
            quantity: product.quantity - 1,
            basicPrice: product.basicPrice - parseInt(product.price),
          };
        }
        return product;
      });
    });
  };

  return (
    <View>
      {productData.map(product => (
        <View key={product.id}>
          <Text>Name: {product.name}</Text>
          <Text>ID: {product.id}</Text>
          <Text>Price: {product.basicPrice}</Text>
          <Text>Quantity: {product.quantity}</Text>
          <TouchableOpacity onPress={() => handleIncrement(product.id)}>
            <Text>Increment</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDecrement(product.id)}>
            <Text>Decrement</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default YourComponent;
