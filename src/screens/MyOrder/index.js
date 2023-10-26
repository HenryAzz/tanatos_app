import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import AppHeader from '../../components/AppHeader/AppHeader';
import OngoingOrder from './Ongoing';
import Layout from '../../components/Layout';
import {colors, fonts} from '../../constraints';
import Completed from './Completed';
import NewOrder from './NewOrder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../Services/ApiRequest';
import Cancelled from './Cancelled';
import Processing from './Processing';
import {useTranslation} from 'react-i18next';

const Top = createMaterialTopTabNavigator();

const MyOrder = () => {
  const [account_Type, setAccountType] = useState();
  const getAccountType = async () => {
    const account_Type = await AsyncStorage.getItem('account_Type');
    setAccountType(account_Type);
    console.log('accountType//////', account_Type);
  };
  useEffect(() => {
    getAccountType();
  }, []);

  const {t, i18n} = useTranslation();

  const toggleLanguage = async () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('es'); // Switch to Spanish
    } else {
      i18n.changeLanguage('en'); // Switch to English
    }
  };
  return (
    <>
      <View style={{backgroundColor: colors.white}}>
        <AppHeader title={t('My Order')} defaultStyle={{marginBottom: 0}} />
      </View>

      <View style={{flex: 1}}>
        <Top.Navigator
          screenOptions={{
            swipeEnabled: false,
            tabBarIndicatorStyle: {backgroundColor: colors.primaryColor},
          }}>
          <Top.Screen
            name="New"
            component={NewOrder}
            options={{
              tabBarLabel: ({focused, color, size}) => (
                <Text
                  style={{
                    fontSize: 12,
                    // paddingBottom: 5,
                    color: focused ? colors.primaryColor : colors.gray,
                    fontFamily: focused ? fonts.bold : fonts.bold,
                  }}>
                  {t('New')}
                </Text>
              ),
            }}
          />
          <Top.Screen
            name="Processing"
            component={Processing}
            options={{
              tabBarLabel: ({focused, color, size}) => (
                <Text
                  style={{
                    fontSize: 12,
                    // paddingBottom: 5,
                    color: focused ? colors.primaryColor : colors.gray,
                    fontFamily: focused ? fonts.bold : fonts.bold,
                  }}>
                  {t('Processing')}
                </Text>
              ),
            }}
          />
          <Top.Screen
            name="Completed"
            component={Completed}
            options={{
              tabBarLabel: ({focused, color, size}) => (
                <Text
                  style={{
                    fontSize: 12,
                    // paddingBottom: 5,
                    color: focused ? colors.primaryColor : colors.gray,
                    fontFamily: focused ? fonts.bold : fonts.bold,
                  }}>
                  {t('Completed')}
                </Text>
              ),
            }}
          />
          <Top.Screen
            name="Cancelled"
            component={Cancelled}
            options={{
              tabBarLabel: ({focused, color, size}) => (
                <Text
                  style={{
                    fontSize: 12,
                    // paddingBottom: 5,
                    color: focused ? colors.primaryColor : colors.gray,
                    fontFamily: focused ? fonts.bold : fonts.bold,
                  }}>
                  {t('Cancelled')}
                </Text>
              ),
            }}
          />
        </Top.Navigator>
      </View>
    </>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    textAlignVertical: 5,
  },
});
