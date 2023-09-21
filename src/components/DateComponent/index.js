import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';
const phoneScreen = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};
export const DatePicker = ({
  date,
  defaultDate,
  show,
  showDatepicker,
  onChange,
  maxDate,
  minDate,
  disable,
  title,
}) => {
  return (
    <View style={{}}>
      {title ? (
        <Text
          style={[style.font16Re, {fontFamily: fonts.medium, marginBottom: 2}]}>
          {title}
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={showDatepicker}
        style={styles.box}
        disabled={disable}>
        <Text style={styles.date}>{date ? date : 'Select Date'}</Text>
        <Icon
          name="calendar-blank"
          size={20}
          color={disable ? colors.skyDark : colors.primaryColor}
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          is24Hour={true}
          onChange={onChange}
          minimumDate={minDate ? minDate : null}
          maximumDate={maxDate ? maxDate : null}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  date: {
    fontSize: 16,
    fontFamily: fonts.InterRegular,
    color: colors.black,
    lineHeight: 23,
  },
  box: {
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
    width: '100%',
    borderRadius: (phoneScreen.height * 1) / 100,
    paddingHorizontal: 10,
    marginBottom: 2,

    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
  },
});
