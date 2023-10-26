import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ProfileCard from './ProfileCard';
import Layout from '../../components/Layout';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import AppHeader from '../../components/AppHeader/AppHeader';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import LogoutBottomSheet from '../../components/Logout/LogoutBottomSheet';

const Account = () => {
  const navigation = useNavigation();

  const {t, i18n} = useTranslation();

  const data = [
    {
      id: 1,
      navigate: 'EditProfile',
      title: 'Edit Profile',
      image: require('../../assets/images/AccountImg/Edit.png'),
    },
    {
      id: 2,
      navigate: 'ChangePassword',
      title: 'Change Password',
      image: require('../../assets/images/AccountImg/Change.png'),
    },
    // {
    //   id: 3,
    //   navigate: 'OrderHistory',
    //   title: 'Order History',
    //   image: require('../../assets/images/AccountImg/Order.png'),
    // },
    {
      id: 4,
      navigate: 'ContactUs',
      title: 'Contact Us',
      image: require('../../assets/images/AccountImg/Contact.png'),
    },
    {
      id: 5,
      navigate: 'DataProtection',
      title: 'Data Protection',
      image: require('../../assets/images/AccountImg/Data.png'),
    },
    {
      id: 6,
      navigate: 'PaymentMethod',
      title: 'Payment Method',
      image: require('../../assets/images/AccountImg/Payment.png'),
    },
    {
      id: 7,
      navigate: 'FAQs',
      title: 'FAQs',
      image: require('../../assets/images/AccountImg/Discount.png'),
    },
    {
      id: 8,
      navigate: 'Balance',
      title: 'Balance',
      image: require('../../assets/images/AccountImg/Discount.png'),
    },
    {
      id: 9,
      navigate: 'login',
      title: 'Logout',
      image: require('../../assets/images/AccountImg/Out.png'),
    },
  ];
  const [account_Type, setAccountType] = useState();
  const getAccountType = async () => {
    const account_Type = await AsyncStorage.getItem('account_Type');
    setAccountType(account_Type);
  };
  useEffect(() => {
    getAccountType();
  }, []);

  const filteredData = data.filter(item => {
    if (account_Type === 'store') {
      return item.navigate !== 'PaymentMethod' && item.navigate !== 'FAQs';
    } else {
      return item.navigate !== 'Balance';
    }
  });
  const handleNavigate = async item => {
    if (item.title === 'Logout') {
      openBottomSheet();
      // navigation.replace('AuthStack', {screen: 'login'});
    } else
      navigation.navigate('AppStackWithoutBottom', {
        screen: item.navigate,
      });
    item.title === 'Logout'
      ? (await AsyncStorage.removeItem('user_id'),
        await AsyncStorage.removeItem('store_id'))
      : null;
  };

  const bottomSheetRef = useRef(null);
  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };
  const getSelectedLanguage = async () => {
    try {
      const language = await AsyncStorage.getItem('selectedLanguage');
      return language || 'en'; // Default to English if no language is stored
    } catch (error) {
      console.error('Error getting selected language:', error);
      return 'en'; // Default to English in case of an error
    }
  };

  useEffect(() => {
    getSelectedLanguage().then(language => {
      // Set the initial language when the component mounts
      i18n.changeLanguage(language);
      setCurrentLanguageName(language === 'en' ? 'English' : 'Spanish');
      setIsSpanish(language === 'es');
    });
  }, []);
  const [isSpanish, setIsSpanish] = useState(false);

  const [currentLanguageName, setCurrentLanguageName] = useState('English');
  const toggleLanguage = () => {
    let newLanguage;
    if (i18n.language === 'en') {
      newLanguage = 'es'; // Switch to Spanish
    } else {
      newLanguage = 'en'; // Switch to English
    }

    // Save the selected language in AsyncStorage
    AsyncStorage.setItem('selectedLanguage', newLanguage)
      .then(() => {
        i18n.changeLanguage(newLanguage);
        setCurrentLanguageName(newLanguage === 'en' ? 'English' : 'Spanish');
        setIsSpanish(newLanguage === 'es');
      })
      .catch(error => {
        console.error('Error saving selected language:', error);
      });
  };

  return (
    <Layout>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={colors.white}
      />
      {/* <Button title="OTU" onPress={() => openBottomSheet()} /> */}
      <AppHeader title={t('Account')} />
      <View style={{width: '100%'}}>
        <FlatList
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          data={filteredData}
          renderItem={({item}) => (
            <ProfileCard
              title={item.title}
              source={item.image}
              type={account_Type}
              onPress={() => handleNavigate(item)}
            />
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 6,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 0.2,
          paddingBottom: 20,
          borderBottomColor: colors.white,
        }}>
        <View
          style={{
            left: -10,
            width: '60%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: colors.line,
              borderRadius: 50,
            }}>
            {/* <About /> */}
          </View>
          <Text style={[style.font16Re, {paddingLeft: 16}]}>
            {t('Language')}
          </Text>
          {/* <Text style={[style.font16Re, {paddingLeft: 16}]}>
                Language: {currentLanguageName}
              </Text> */}
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[style.font16Re, {paddingLeft: 16}]}>
            {currentLanguageName}
          </Text>
          <Switch
            value={isSpanish}
            onValueChange={toggleLanguage}
            thumbColor={isSpanish ? colors.primary : colors.white}
            trackColor={{false: colors.gray, true: colors.primaryColor}}
          />
        </View>
      </View>
      <LogoutBottomSheet bottomSheetRef={bottomSheetRef} />
    </Layout>
  );
};

export default Account;

const styles = StyleSheet.create({});
