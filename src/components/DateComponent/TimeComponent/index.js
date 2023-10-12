import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import style from '../../../assets/css/style';
import {colors, fonts} from '../../../constraints';

const phoneScreen = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};

export const TimePicker = ({
  time,
  defaultTime,
  show,
  showTimepicker,
  onChange,
  title,
  timeFuneral,
}) => {
  // Format the selected time as "12:23 PM"
  const formattedTime =
    time &&
    time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

  return (
    <View style={{}}>
      {title ? (
        <Text
          style={[
            style.font16Re,
            {fontFamily: fonts.medium, marginVertical: 4},
          ]}>
          {title}
        </Text>
      ) : null}
      <TouchableOpacity onPress={showTimepicker} style={styles.box}>
        <Text style={styles.time}>{formattedTime || 'Select Time'}</Text>
        <Icon name="clock-outline" size={20} color={colors.primaryColor} />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="timePicker"
          value={time || new Date()}
          mode="time"
          is24Hour={false} // Use 12-hour format
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  time: {
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