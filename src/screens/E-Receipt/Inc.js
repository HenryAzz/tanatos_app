import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

const IncrementDecrementComponent = () => {
  const [quantity, setQuantity] = useState(1); // Initial quantity
  const basePrice = 5;
  const priceIncrement = 10;

  const increment = () => {
    setQuantity(quantity + 2);
  };

  const decrement = () => {
    if (quantity >= 3) {
      setQuantity(quantity - 2);
    }
  };

  const totalPrice = basePrice + Math.floor(quantity / 2) * priceIncrement;

  return (
    <View>
      <Text>Quantity: {quantity}</Text>
      <Text>Total Price: {totalPrice}</Text>
      <Button title="Increment" onPress={increment} />
      <Button title="Decrement" onPress={decrement} />
    </View>
  );
};

export default IncrementDecrementComponent;
