import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../constraints';

const dataRoses = [
  {id: 1, name: 'All'},
  {id: 2, name: 'Rose'},
  {id: 3, name: 'Lilly'},
  {id: 4, name: 'Jasmine'},
  {id: 5, name: 'Tulip'},
  {id: 6, name: 'Carnation'},
  {id: 7, name: 'Orchids'},
  {id: 8, name: 'Rose'},
  {id: 9, name: 'Lilly'},
  {id: 10, name: 'Jasmine'},
  {id: 11, name: 'Tulip'},
  {id: 12, name: 'Carnation'},
];

const ListOfRoses = () => {
  const [selectedItem, setSelectedItem] = useState(dataRoses[0].id);

  const renderItem = ({item}) => {
    const isActive = selectedItem === item.id;

    const containerStyle = {
      backgroundColor: isActive ? colors.primaryColor : 'transparent',
      borderColor: colors.primaryColor,
      borderWidth: 1,
    };

    return (
      <TouchableOpacity
        style={[styles.itemContainer, containerStyle]}
        onPress={() => setSelectedItem(item.id)}>
        <Text style={isActive ? styles.activeText : styles.text}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={dataRoses}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: 40,
    marginBottom: 30,
    // paddingHorizontal: 10,
  },
  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,

    // marginVertical: 10,
    marginRight: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.primaryColor,
  },
  activeText: {
    color: 'white',
  },
});

export default ListOfRoses;
