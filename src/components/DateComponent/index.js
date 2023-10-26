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
import moment from 'moment/moment';
import {useTranslation} from 'react-i18next';
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
  const {t} = useTranslation();
  // Function to format a date to 'yyyy-MM-dd' format
  const formatDate = dateString => {
    // console.log(dateString, 'date');
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    // const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
    //   new Date(dateString),
    // );
    const formattedDate = moment(dateString).format('YYYY-MM-DD');
    // console.log(formattedDate, 'options');
    return formattedDate;
  };

  return (
    <View style={{marginBottom: 5}}>
      {title ? (
        <Text
          style={[
            style.font16Re,
            {fontFamily: fonts.medium, marginTop: 5, marginBottom: 2},
          ]}>
          {title}
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={showDatepicker}
        style={styles.box}
        disabled={disable}>
        <Text style={styles.date}>
          {date ? formatDate(date) : t('Select Date')}
        </Text>
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
