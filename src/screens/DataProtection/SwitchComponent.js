import React, {useState} from 'react';
import {StyleSheet, Text, View, Switch} from 'react-native';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
const SwitchComponent = ({id, title, active, onToggle}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const thumbColor = active ? 'white' : '#f4f3f4';
  const trackColor = active
    ? {true: colors.primaryColor}
    : {false: colors.neutralDarkNine};
  return (
    <View
      style={{
        width: '100%',
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
      }}>
      <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>{title}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Switch
          trackColor={trackColor}
          thumbColor={thumbColor}
          onValueChange={() => onToggle(id)}
          value={active}
        />
        {/* {isEnabled ? (
              <Text style={[style.font14]}>Open</Text>
            ) : (
              <Text style={[style.font14]}>Closed</Text>
            )} */}
      </View>
    </View>
  );
};

export default SwitchComponent;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: '100%',
    // backgroundColor: 'red',
    // width: deviceWidth / 1.1,
    // paddingTop: 20,
    // alignItems: 'center',
    // paddingVertical: 4,
  },

  mylocationTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
});
