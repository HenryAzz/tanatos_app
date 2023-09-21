import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, fonts} from '../constraints';

// import ChatBtn from '../assets/images/png/chatBtn.png';

const CustomInput = ({
  label,
  error,
  onChangeText,
  value,
  placeholder,
  errorDisc,
  KT,
  customStyle,
  isBtn,
  onPress,
}) => {
  return (
    <View style={{width: '100%'}}>
      <Text style={[styles.label, customStyle]}>{label}</Text>
      <View>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={styles.textInput}
          keyboardType={KT ? KT : 'default'}
          secureTextEntry={false}
          multiline
          textAlignVertical="top"
          numberOfLines={4}
        />
        {/* {isBtn && (
          <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
            <Image source={ChatBtn} style={styles.btn} />
          </TouchableOpacity>
        )} */}
      </View>
      {error ? <Text style={styles.error}>This is required.</Text> : null}
      {errorDisc ? <Text style={styles.error}>{errorDisc}</Text> : null}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  textInput: {
    height: 140,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    marginBottom: 13,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.gray1,
    fontFamily: fonts.regular,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.black,
    marginBottom: 15,
  },
  btn: {
    width: 90,
    height: 40,
    resizeMode: 'center',
  },
  btnContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
});
