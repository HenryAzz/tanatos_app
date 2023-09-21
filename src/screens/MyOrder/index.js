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
  return (
    <>
      <View style={{backgroundColor: colors.white}}>
        <AppHeader title={'My Order'} defaultStyle={{marginBottom: 0}} />
      </View>

      <Top.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {backgroundColor: colors.primaryColor},
        }}>
        <Top.Screen
          name="Ongoing"
          component={OngoingOrder}
          options={{
            tabBarLabel: ({focused, color, size}) => (
              <Text
                style={{
                  fontSize: 16,
                  // paddingBottom: 5,
                  color: focused ? colors.primaryColor : colors.gray,
                  fontFamily: focused ? fonts.bold : fonts.bold,
                }}>
                Ongoing
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
                  fontSize: 16,
                  // paddingBottom: 5,
                  color: focused ? colors.primaryColor : colors.gray,
                  fontFamily: focused ? fonts.bold : fonts.bold,
                }}>
                Completed
              </Text>
            ),
          }}
        />
        {account_Type === 'Store' && (
          <Top.Screen
            name="New Orders"
            component={NewOrder}
            options={{
              tabBarLabel: ({focused, color, size}) => (
                <Text
                  style={{
                    fontSize: 16,
                    // paddingBottom: 5,
                    color: focused ? colors.primaryColor : colors.gray,
                    fontFamily: focused ? fonts.bold : fonts.bold,
                  }}>
                  New Orders
                </Text>
              ),
            }}
          />
        )}
      </Top.Navigator>
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
