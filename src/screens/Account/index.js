import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProfileCard from './ProfileCard';
import Layout from '../../components/Layout';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, fonts} from '../../constraints';
import style from '../../assets/css/style';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import AppHeader from '../../components/AppHeader/AppHeader';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = () => {
  const navigation = useNavigation();
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
    {
      id: 3,
      navigate: 'OrderHistory',
      title: 'Order History',
      image: require('../../assets/images/AccountImg/Order.png'),
    },
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
      navigate: 'Logout',
      title: 'Logout',
      image: require('../../assets/images/AccountImg/Out.png'),
    },
  ];
  const [account_Type, setAccountType] = useState();
  const getAccountType = async () => {
    const account_Type = await AsyncStorage.getItem('account_Type');
    setAccountType(account_Type);
    console.log('accountTyp profile', account_Type);
  };
  useEffect(() => {
    getAccountType();
  }, []);

  // const [listData, setListData] = useState([]);
  // const getProfileScreenItems = async () => {
  //   if (registerReducer.acc_type == 'owner') {
  //     setListData([

  //     ]);
  //   } else if (registerReducer.acc_type == 'agent') {
  //     setListData([

  //     ]);
  //   } else {
  //     setListData([
  //       {
  //         id: '2',
  //         title: 'Requested Offers',
  //       },
  //       {
  //         id: '3',
  //         title: 'Contracts',
  //       },
  //       {
  //         id: '7',
  //         title: 'Setting',
  //       },
  //       {
  //         id: '8',
  //         title: 'Log out',
  //       },
  //     ]);
  //   }
  // };
  // useEffect(() => {
  //   getProfileScreenItems();
  // }, [isLoading]);

  const filteredData = data.filter(item => {
    if (account_Type === 'Store') {
      return item.navigate !== 'PaymentMethod' && item.navigate !== 'FAQs';
    } else {
      return item.navigate !== 'Balance';
    }
  });
  return (
    <Layout>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={colors.white}
      />
      <AppHeader title={'Account'} />
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
              onPress={() =>
                navigation.navigate('AppStackWithoutBottom', {
                  screen: item.navigate,
                })
              }
            />
          )}
        />
      </View>
      {/* <ProfileCard
        title={item.title}
        source={item.image}
        onPress={() =>
          navigation.navigate('AppStackWithoutBottom', {
            screen: item.navigate,
          })
        }
      /> */}
    </Layout>
  );
};

export default Account;

const styles = StyleSheet.create({});
