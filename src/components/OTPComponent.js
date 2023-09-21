import {
  Animated,
  Image,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import React, {useState, useMemo} from 'react';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {colors, fonts} from '../constraints';

const CELL_COUNT = 4;

const OTPComponent = ({value, setValue}) => {
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView>
      <Text style={styles.label}>Enter your pin to confirm payment</Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default OTPComponent;

const styles = StyleSheet.create({
  root: {padding: 20, minHeight: 300},
  codeFieldRoot: {
    width: '82%',
    // alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },
  cellRoot: {
    width: 50,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.softGray,
  },
  cellText: {
    color: colors.gray,
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: colors.darkBlue,
    borderBottomWidth: 1,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
  },
});
