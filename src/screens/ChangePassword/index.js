// import {StyleSheet, Text, ScrollView, ActivityIndicator} from 'react-native';
// import React, {useState, useMemo} from 'react';

// import ApiRequest from '../../Services/ApiRequest';
// import {BaseButton} from '../../components/BaseButton';
// import {colors} from '../../constraints';

// import {validatePassword} from '../../utils/Validations';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Layout from '../../components/Layout';
// import AppTextInput from '../../components/FloatingLabelInput';
// import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
// import AppHeader from '../../components/AppHeader/AppHeader';

// const ChangePassword = ({navigation}) => {
//   const [formData, setFormData] = useState({
//     password: '',
//     newPassword: '',
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const handleChangePassword = async () => {
//     const user_id = await AsyncStorage.getItem('user_id');

//     try {
//       setIsLoading(true);
//       const res = await ApiRequest({
//         type: 'update_password',
//         user_id: user_id,
//         password: formData.password,
//       });
//       const resp = res?.data?.result;
//       // console.log(resp);
//       if (resp) {
//         const id = res?.data?.user?.id;
//         // console.log('id stored');
//         navigation.navigate('Login');
//         setIsLoading(false);
//       } else {
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleInputChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validateForm = useMemo(() => {
//     const isPasswordValid = formData.password.length > 7;
//     const isPasswordValidConfirm = formData.password.length > 7;
//     const samePassword = formData.password === formData.newPassword;

//     return isPasswordValid && isPasswordValidConfirm && samePassword;
//   }, [formData]);
//   const [isSecureText, setIsSecureText] = useState(true);
//   const [isSecureText1, setIsSecureText1] = useState(true);

//   return (
//     <Layout>
//       <FocusAwareStatusBar
//         animated={true}
//         barStyle={'dark-content'}
//         backgroundColor={colors.white}
//         // translucent={true}
//       />
//       <AppHeader title={'Change Password'} defaultStyle={{marginBottom: 30}} />
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <AppTextInput
//           placeholder={'Password'}
//           titleTexts={'PASSWORD'}
//           value={formData.password}
//           onChangeText={text => handleInputChange('password', text)}
//           secureTextEntry={isSecureText}
//           setIsSecureText={setIsSecureText}
//           password
//         />
//         {!validatePassword(formData.password) &&
//           formData.password.length >= 2 && (
//             <Text style={{top: -12, color: colors.red}}>
//               {' '}
//               Password must be 8 digits (Aa1234*/)
//             </Text>
//           )}
//         <AppTextInput
//           placeholder={'New Password'}
//           title={'New Password'}
//           value={formData.newPassword}
//           onChangeText={text => handleInputChange('newPassword', text)}
//           secureTextEntry={isSecureText1}
//           setIsSecureText={setIsSecureText1}
//           password
//         />
//         <BaseButton title={'Update'} defaultStyle={{marginTop: 40}} />
//       </ScrollView>
//       {/* <Button
//         btnName={
//           isLoading ? (
//             <ActivityIndicator color={colors.white} />
//           ) : (
//             'Change Password'
//           )
//         }
//         customStyle={{marginBottom: 10}}
//         onPress={handleChangePassword}
//         disabled={!validateForm || isLoading}
//       /> */}
//     </Layout>
//   );
// };

// export default ChangePassword;

// const styles = StyleSheet.create({});

// // {!validatePassword(formData.password) &&
// //   formData.password.length >= 2 && (
// //     <Text style={{top: -12, color: colors.red}}>
// //       {' '}
// //       Password must be 8 digits (Aa1234*/)
// //     </Text>
// //   )}
// //   {!validatePassword(formData.newPassword) &&
// //     formData.newPassword.length >= 2 && (
// //       <Text style={{top: -12, color: colors.red}}>
// //         {' '}
// //         Password must be 8 digits (Aa1234*/)
// //       </Text>
// //     )}

import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState, useMemo} from 'react';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {colors} from '../../constraints';
import {useNavigation} from '@react-navigation/native';
import {ToastMessage} from '../../utils/Toast';
import ApiRequest from '../../Services/ApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

const ChangePassword = () => {
  const navigation = useNavigation();

  const [isSecureTextOld, setIsSecureTextOld] = useState(true);
  const [isSecureText, setIsSecureText] = useState(true);
  const [isSecureText1, setIsSecureText1] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = useMemo(() => {
    const isPasswordValid = formData.password.length > 5;
    const isPasswordValidConfirm = formData.confirmPassword.length > 5;
    const samePassword = formData.password === formData.confirmPassword;

    return isPasswordValid && isPasswordValidConfirm && samePassword;
  }, [formData]);

  const handleChanegPassword = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    try {
      setIsLoading(true);
      const res = await ApiRequest({
        type: 'change_password',
        old_password: formData.oldPassword,
        new_password: formData.confirmPassword,
        user_id: user_id,
      });
      const resp = res?.data?.result;
      console.log(resp);
      if (resp) {
        const id = res?.data?.user?.id;
        // console.log('id stored');
        ToastMessage(res?.data?.message);
        navigation.replace('MainStack');
        setIsLoading(false);
      } else {
        ToastMessage(res?.data?.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {t, i18n} = useTranslation();

  return (
    <Layout>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={colors.white}
        // translucent={true}
      />
      <AppHeader
        title={t('Change Password')}
        defaultStyle={{marginBottom: 30}}
      />

      <AppTextInput
        titleText={t('Old Password')}
        placeholder={t('Old Password')}
        value={formData.oldPassword}
        onChangeText={text => handleInputChange('oldPassword', text)}
        secureTextEntry={isSecureTextOld}
        setIsSecureText={setIsSecureTextOld}
        password
      />

      <AppTextInput
        titleText={t('New Password')}
        placeholder={t('New Password')}
        value={formData.password}
        onChangeText={text => handleInputChange('password', text)}
        secureTextEntry={isSecureText}
        setIsSecureText={setIsSecureText}
        password
      />
      <AppTextInput
        titleText={t('Confirm Password')}
        placeholder={t('Confirm Password')}
        value={formData.confirmPassword}
        onChangeText={text => handleInputChange('confirmPassword', text)}
        secureTextEntry={isSecureText1}
        setIsSecureText={setIsSecureText1}
        password
      />
      <BaseButton
        title={
          isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            t('Change Password')
          )
        }
        disabled={!validateForm || isLoading}
        defaultStyle={{marginTop: 30}}
        onPress={handleChanegPassword}
      />
    </Layout>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
