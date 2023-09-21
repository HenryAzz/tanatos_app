import React, {useState, useRef} from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';

import {colors, fonts} from '../../constraints';
import {devWidth} from '../../constraints/Dimentions';

import Icon from 'react-native-vector-icons/Ionicons';
const CardFAQS = ({title, subTtle}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [contentHeight, setContentHeight] = useState(15);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleCollapsibleView = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCollapsed(!isCollapsed);
  };

  const handleLayout = event => {
    setContentHeight(event.nativeEvent.layout.height);
  };

  const animatedHeight = isCollapsed
    ? contentHeight
    : animation.interpolate({
        inputRange: [0, 1],
        outputRange: [contentHeight, 0],
      });

  return (
    <View onPress={toggleCollapsibleView} style={{width: '100%'}}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={{width: '70%'}}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <TouchableOpacity
            style={styles.btnBox}
            onPress={toggleCollapsibleView}>
            {isCollapsed ? (
              <Icon name="chevron-down" size={24} />
            ) : (
              <Icon name="chevron-down" size={24} />
            )}
          </TouchableOpacity>
        </View>
        {!isCollapsed && <Text style={styles.subTtle}>{subTtle}</Text>}
      </View>
    </View>
  );
};

export default CardFAQS;

const styles = StyleSheet.create({
  card: {
    borderColor: colors.line,
    width: '98%',
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    elevation: 5,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.black,
    paddingVertical: 10,
  },
  subTtle: {
    color: colors.gray3,
    fontSize: 14,
    fontFamily: fonts.regular,
    paddingBottom: 10,
  },
  btnBox: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
  },
});
