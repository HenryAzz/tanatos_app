// import React, {useRef, useState} from 'react';
// import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import PhoneInput from 'react-native-phone-number-input';
// import {colors, fonts} from '../constants';

// const PhoneNumberInput = ({
//   value,
//   setValue,
//   valid,
//   setValid,
//   onEndEditing,
//   onChangeText,
//   formData,
//   label,
// }) => {
//   const [countryCode, setCountryCode] = useState('');
//   const [formattedValue, setFormattedValue] = useState('');
//   const phoneInput = useRef(null);
//   const checkPhoneNumber = text => {
//     const checkValid = phoneInput.current?.isValidNumber(text);
//     setValid(checkValid ? checkValid : false);
//     setCountryCode(phoneInput.current?.getCountryCode() || '');
//   };
//   return (
//     <View style={styles.container}>
//       <SafeAreaView style={styles.wrapper}>
//         <Text style={[styles.label]}>{'Phone'}</Text>
//         <PhoneInput
//           ref={phoneInput}
//           // textInputProps={onEndEditing}
//           onEndEditing={onEndEditing}
//           defaultValue={value}
//           defaultCode="PK"
//           layout="second"
//           containerStyle={{
//             backgroundColor: '#fff',
//             borderWidth: 1,
//             borderColor: '#D7D7D7',
//             width: '100%',
//             height: 50,
//             borderRadius: 5,
//           }}
//           textContainerStyle={{
//             backgroundColor: '#fff',
//             borderLeftWidth: 1,
//             borderLeftColor: '#E0E0E0',
//             borderTopEndRadius: 5,
//             borderBottomEndRadius: 5,
//           }}
//           textInputStyle={{fontFamily: 'Inter-Regular', height: 52}}
//           codeTextStyle={{fontSize: 16}}
//           onChangeText={text => {
//             setValue({...formData, phoneNumber: text});
//           }}
//           onChangeFormattedText={text => {
//             checkPhoneNumber(text);
//             setValue({...formData, phoneNumber: text});
//             setFormattedValue(text);
//             setCountryCode(phoneInput.current?.getCountryCode() || '');
//           }}
//           countryPickerProps={{withAlphaFilter: false}}
//         />
//         {!valid && (
//           <Text style={{top: 2, color: colors.red}}>
//             Enter valid phone number
//           </Text>
//         )}
//       </SafeAreaView>
//     </View>
//   );
// };

// // '+8801303653205'

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   wrapper: {
//     flex: 1,
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   button: {
//     marginTop: 20,
//     height: 50,
//     width: 300,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#7CDB8A',
//     shadowColor: 'rgba(0,0,0,0.4)',
//     shadowOffset: {
//       width: 1,
//       height: 5,
//     },
//     shadowOpacity: 0.34,
//     shadowRadius: 6.27,
//     elevation: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 14,
//   },
//   redColor: {
//     backgroundColor: '#F57777',
//   },
//   message: {
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 20,
//     marginBottom: 20,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//   },
//   label: {
//     fontFamily: fonts.bold,
//     fontSize: 12,
//     color: colors.gray3,
//     marginBottom: 7,
//   },
// });

// export default PhoneNumberInput;

import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {colors, fonts} from '../constraints';
import {useTranslation} from 'react-i18next';

const PhoneNumberInput = ({
  value,
  setValue,
  valid,
  setValid,
  onChangeText,
  formData,
  label,
}) => {
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef(null);
  const checkPhoneNumber = text => {
    const checkValid = phoneInput.current?.isValidNumber(text);
    setValid(checkValid);
    setCountryCode(phoneInput.current?.getCountryCode() || '');
  };
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.wrapper}>
        <Text style={[styles.label]}>{t('Phone Number')}</Text>
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          value={value}
          layout="second"
          defaultCode="ES"
          placeholder={t('Phone Number')}
          containerStyle={{
            borderWidth: 1,
            borderColor: '#E0E0E0',
            backgroundColor: '#F5F5F5',
            width: '100%',
            borderRadius: 5,
          }}
          textContainerStyle={{
            borderWidth: 1,
            borderColor: '#E0E0E0',
            backgroundColor: '#F5F5F5',
            borderTopEndRadius: 5,
            borderBottomEndRadius: 5,
            height: 50,
          }}
          textInputStyle={{fontFamily: fonts.regular, height: 52}}
          codeTextStyle={{fontSize: 16}}
          onChangeText={text => {
            setValue({...formData, phoneNumber: text});
          }}
          onChangeFormattedText={text => {
            checkPhoneNumber(text);
            setValue({...formData, phoneNumber: text});
            setFormattedValue(text);
            setCountryCode(phoneInput.current?.getCountryCode() || '');
          }}
          countryPickerProps={{withAlphaFilter: false}}
        />
        {value && valid && (
          <Text style={{top: 2, color: colors.red}}>
            {t('Enter a valid phone number')}
          </Text>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'red',
  },
  wrapper: {
    // flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.gray3,
    marginBottom: 7,
  },
});

export default PhoneNumberInput;
////how we call and validate
//    <PhoneNumberInput
//           title={'PHONE'}
//           valid={valid}
//           value={formData.phoneNumber}
//           setValid={setValid}
//           setValue={setFormData}
//           formData={formData}
// />

//           const validateForm = useMemo(() => {
//             const valueValid = valid && formData.phoneNumber;
//             return valueValid;
//           }, [formData]);

// const [data, setData] = useState({
//   phoneNumber: '',
// });
// const [valid, setValid] = useState(true);
