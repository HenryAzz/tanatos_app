import React from 'react';
import {Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncDataStore = ({storageKey, storageValue, onSave}) => {
  const handleSave = async () => {
    try {
      await AsyncStorage.setItem(storageKey, storageValue);
      onSave && onSave();
    } catch (error) {
      console.error('Error saving data: ' + error);
    }
  };

  return (
    <Button
      title={`Save ${storageValue} to ${storageKey}`}
      onPress={handleSave}
    />
  );
};

export default AsyncDataStore;
