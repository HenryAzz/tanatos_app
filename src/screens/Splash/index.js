import {StyleSheet, Text, Image, View, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from '../../components/Layout';
import {colors} from '../../constraints';

const Splash = () => {
  const navigation = useNavigation();
  const getUserId = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    console.log('id...', user_id);
    // const user_id = '';
    setTimeout(() => {
      if (user_id) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'MainStack',
              state: {
                routes: [
                  {
                    name: 'AppStack',
                  },
                ],
              },
            },
          ],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'AuthStack',
            },
          ],
        });
      }
    }, 1500);
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar hidden translucent={true} />
      <Image
        source={require('../../../src/assets/bootsplash_logo_original.png')}
        style={{width: 180}}
        resizeMode="center"
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
