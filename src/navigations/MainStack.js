import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Text, Image} from 'react-native';
import Home from '../screens/Home';
import MyOrder from '../screens/MyOrder';
import {colors, fonts} from '../constraints';
import HomeImg from '../assets/Home.png';

import Favorite from '../screens/Favorite';
import Account from '../screens/Account';
import HomeIcon from '../assets/images/svg/HomeIcon';
import MyOrderIcon from '../assets/images/svg/MyOrderIcon';
import AccountIcon from '../assets/images/svg/AccountIcon';
import FavouriteIcon from '../assets/images/svg/FavouriteIcon';
import FAQs from '../screens/FAQs';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import OrderHistory from '../screens/OrderHistory';
import ContactUs from '../screens/ContactUs';
import DataProtection from '../screens/DataProtection';
import PaymentMethod from '../screens/PaymentMethod';
import OngoingOrder from '../screens/MyOrder/Ongoing';
import Completed from '../screens/MyOrder/Completed';
import OrderTrack from '../screens/OrderTrack/OrderTrack';
import FuneralDetailed from '../screens/FuneralDetailed.js';
import FuneralNearDetailed from '../screens/FuneralNearDetailed';
import FuneralDetailedPage from '../screens/FuneralDetailedPage';
import FlowerGalery from '../screens/FlowerGalery';
import EReceipt from '../screens/E-Receipt/E-Receipt';
import CheckoutScreen from '../screens/Checkout';
import ShippingAddress from '../screens/ShippingAddress';
import PaymentConfirmOtp from '../screens/PaymentConfirmOtp';
import ViewOrder from '../screens/ViewOrder';
import AddFuneral from '../assets/images/svg/AddFuneral';
import AddFuneralScreen from '../screens/AddFuneral';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddNews from '../screens/AddNews';
import AddNewsIcon from '../assets/images/svg/AddNewsIcon';
import HomeStore from '../screens/HomeStore';
import BallanceScreen from '../screens/Ballance';
import HomeFuneral from '../screens/Home/HomeFuneral';
import FuneralUpdate from '../screens/FuneralUpdate';
import Map from '../screens/Map';
import AddFlowers from '../screens/AddFlowers';
import Catalog from '../screens/Catalog';
import SpecificStoreGalery from '../screens/FlowerGalery/SpecificStoreGalery';
import OrderAllDetails from '../screens/OrderAllDetails/OrderAllDetails';
import CreateStore from '../screens/CreateStore';
import {useTranslation} from 'react-i18next';
import UploadPhoto from '../screens/AddNews/UploadPhoto';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      {/* <Stack.Screen name="AppStack" component={HomeFuneral} /> */}
      <Stack.Screen name="AppStack" component={AppStack} />

      <Stack.Screen
        name="AppStackWithoutBottom"
        component={AppStackWithoutBottom}
      />

      <Stack.Screen name="OrderTrack" component={OrderTrack} />
      <Stack.Screen name="FuneralDetailed" component={FuneralDetailed} />
      <Stack.Screen
        name="FuneralNearDetailed"
        component={FuneralNearDetailed}
      />
      <Stack.Screen
        name="FuneralDetailedPage"
        component={FuneralDetailedPage}
      />
      <Stack.Screen name="FlowerGalery" component={FlowerGalery} />
      <Stack.Screen name="EReceipt" component={EReceipt} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="ShippingAddress" component={ShippingAddress} />

      <Stack.Screen name="PaymentConfirmOtp" component={PaymentConfirmOtp} />
      <Stack.Screen name="ViewOrder" component={ViewOrder} />
      <Stack.Screen name="AddNewss" component={AddNews} />
      <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
      <Stack.Screen name="HomeFuneral" component={HomeFuneral} />
      <Stack.Screen name="FuneralUpdate" component={FuneralUpdate} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="AddFlowers" component={AddFlowers} />
      <Stack.Screen name="AddFuneralScreen" component={AddFuneralScreen} />
      <Stack.Screen name="OrderAllDetails" component={OrderAllDetails} />
      <Stack.Screen
        name="SpecificStoreGalery"
        component={SpecificStoreGalery}
      />
      <Stack.Screen name="CreateStoreapp" component={CreateStore} />
    </Stack.Navigator>
  );
};
const AppStack = () => {
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

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        // tabBarActiveTintColor: '#4A78FF',
        // tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          paddingVertical: 10,
          height: 65,
        },
        tabBarLabelStyle: {
          // paddingBottom: 10,
          // color: 'red',
          // fontSize: 12,
          // fontFamily: fonts.regular,
        },
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={account_Type === 'store' ? HomeStore : Home}
        // component={HomeFuneral}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <HomeIcon focused={focused} /> : <HomeIcon />,
          tabBarLabel: ({focused, color, size}) => (
            <Text
              style={{
                // fontSize: 14,
                paddingBottom: 5,
                color: focused ? colors.primaryColor : colors.gray,
                fontFamily: focused ? fonts.medium : fonts.regular,
              }}>
              {account_Type === 'funeral' ? t('Add Obituaries') : t('Home')}
            </Text>
          ),
        }}
      />
      {/* {account_Type === 'customer' || account_Type === 'store' ? ( */}
      {account_Type === 'customer' ? (
        <Tab.Screen
          name="MyOrder"
          component={MyOrder}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <MyOrderIcon focused={focused} /> : <MyOrderIcon />,

            tabBarLabel: ({focused, color, size}) => (
              <Text
                style={{
                  // fontSize: 14,
                  paddingBottom: 5,
                  color: focused ? colors.primaryColor : color,
                  fontFamily: focused ? fonts.medium : fonts.regular,
                }}>
                {t('My Order')}
              </Text>
            ),
          }}
        />
      ) : null}
      {account_Type === 'customer' && (
        <Tab.Screen
          name="Favorite"
          component={Favorite}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <FavouriteIcon focused={focused} /> : <FavouriteIcon />,

            tabBarLabel: ({focused, color, size}) => (
              <Text
                style={{
                  // fontSize: 14,
                  paddingBottom: 5,
                  color: focused ? colors.primaryColor : color,
                  fontFamily: focused ? fonts.medium : fonts.regular,
                }}>
                {t('Favorite')}
              </Text>
            ),
          }}
        />
      )}
      {account_Type === 'funeral' && (
        <Tab.Screen
          name="AddFuneral"
          // component={AddFuneralScreen}
          component={HomeFuneral}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <AddFuneral focused={focused} /> : <AddFuneral />,

            tabBarLabel: ({focused, color, size}) => (
              <Text
                style={{
                  // fontSize: 14,
                  paddingBottom: 5,
                  color: focused ? colors.primaryColor : color,
                  fontFamily: focused ? fonts.medium : fonts.regular,
                }}>
                {t('Add Funeral')}
              </Text>
            ),
          }}
        />
      )}
      {account_Type === 'store' && (
        <Tab.Screen
          name="AddNews"
          // component={AddNews}
          component={Catalog}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <AddNewsIcon focused={focused} /> : <AddNewsIcon />,
            tabBarLabel: ({focused, color, size}) => (
              <Text
                style={{
                  // fontSize: 14,
                  paddingBottom: 5,
                  color: focused ? colors.primaryColor : color,
                  fontFamily: focused ? fonts.medium : fonts.regular,
                }}>
                {t('Catalog')}
              </Text>
            ),
          }}
        />
      )}

      {account_Type === 'store' && (
        <Tab.Screen
          name="CreateStoreapp"
          // component={AddNews}
          component={CreateStore}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <AddNewsIcon focused={focused} /> : <AddNewsIcon />,
            tabBarLabel: ({focused, color, size}) => (
              <Text
                style={{
                  // fontSize: 14,
                  paddingBottom: 5,
                  color: focused ? colors.primaryColor : color,
                  fontFamily: focused ? fonts.medium : fonts.regular,
                }}>
                {t('Store')}
              </Text>
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <AccountIcon focused={focused} /> : <AccountIcon />,
          tabBarLabel: ({focused, color, size}) => (
            <Text
              style={{
                // fontSize: 14,
                paddingBottom: 5,
                color: focused ? colors.primaryColor : color,
                fontFamily: focused ? fonts.medium : fonts.regular,
              }}>
              {t('Account')}
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppStackWithoutBottom = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="DataProtection" component={DataProtection} />
      <Stack.Screen name="FAQs" component={FAQs} />
      <Stack.Screen name="Balance" component={BallanceScreen} />
      <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
    </Stack.Navigator>
  );
};

export default MainStack;
