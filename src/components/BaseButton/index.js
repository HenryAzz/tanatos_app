// React
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import style from '../../assets/css/style';
import {colors} from '../../constraints';

export const BaseButton = ({
  title,
  onPress = () => '',
  disabled = false,
  icon,
  textStyle,
  defaultStyle,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress()}
      style={[
        styles.default,
        defaultStyle,
        style.justify,
        {...defaultStyle, ...style},
        disabled ? {backgroundColor: colors.gray} : {},
      ]}>
      {/* // style={[styles.default, , defaultStyle, style.justify]} */}
      {icon ? icon : null}
      {!loading ? (
        <Text
          style={[
            styles.title,
            textStyle,
            disabled ? {color: colors.neutralDarkFour} : {},
          ]}>
          {title}
        </Text>
      ) : (
        <ActivityIndicator color={'#fff'} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  default: {
    height: 45,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.primaryColor,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: colors.white,
  },
});
