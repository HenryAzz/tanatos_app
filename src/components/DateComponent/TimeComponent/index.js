import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {t} from 'i18next';
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
  console.log(time, 'tme');
  const formattedTime =
    time &&
    time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
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
        <Text style={styles.time}>
          {formattedTime ? `${formattedTime}h` : t('Select Time')}
        </Text>
        <Icon name="clock-outline" size={20} color={colors.primaryColor} />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="timePicker"
          value={time || new Date()}
          mode="time"
          is24Hour={true} // Use 12-hour format
          onChange={onChange}
          display="spinner"
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

// <TimePicker

//   time={selectedTime}
//   show={showTimepicker}
//   showTimepicker={() => setShowTimepicker(true)}
//   onChange={handleTimeChange}
//   title="Funeral Time"
// />;
