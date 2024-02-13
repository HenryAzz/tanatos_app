import AsyncStorage from '@react-native-async-storage/async-storage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ApiRequest from '../../Services/ApiRequest';
import style from '../../assets/css/style';
import {BaseButton} from '../../components/BaseButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import Greetings from '../../components/Greetings/Greeting';
import {colors, fonts} from '../../constraints';
import {fetchUser, userStore} from '../../store/reducer/usersSlice';
import Cancelled from '../MyOrder/Cancelled';
import Completed from '../MyOrder/Completed';
import NewOrder from '../MyOrder/NewOrder';
import Processing from '../MyOrder/Processing';

const HomeStore = () => {
  const Top = createMaterialTopTabNavigator();
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const [catalogData, setCatalogData] = useState();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const store = useSelector(store => store.user);

  const [formData, setFormData] = useState({
    userName: '',
    image: '',
    url: '',
    accountType: '',
  });

  const handleGetData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setShowLoadingModal(true);
      const res = await ApiRequest({
        type: 'get_data',
        id: user_id,
        table_name: 'users',
      });
      const resp = res?.data?.data[0];

      setFormData({
        userName: resp?.name,
        image: resp?.image,
        url: resp?.url,
        accountType: resp?.user_type,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCatData = async () => {
    try {
      setShowLoadingModal(true);
      const user_id = await AsyncStorage.getItem('user_id');

      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'stores_gallery',
        user_id: user_id,
      });
      const resp = res.data.data;
      setCatalogData(resp);
      setShowLoadingModal(false);
    } catch (err) {
    } finally {
      setShowLoadingModal(false);
    }
  };
  const navigation = useNavigation();
  const [checkStore, setCheckStore] = useState();
  const handleCheckStore = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');

      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'stores',
        user_id: user_id,
        own: 1,
      });
      const resp = res.data.data;
      console.log(resp);
      dispatch(userStore(resp[0]));
      setCheckStore(resp);
    } catch (err) {
    } finally {
      setShowLoadingModal(false);
    }
  };
  useEffect(() => {
    handleGetData();
    handleCheckStore();
    handleGetCatData();
    fetchUser(dispatch);
  }, [isFocused]);

  const {t} = useTranslation();

  return (
    <>
      <ImageBackground
        style={{
          height: 180,

          paddingTop: 30,
        }}
        source={require('../../assets/Homebg.png')}>
        <FocusAwareStatusBar
          animated={true}
          barStyle={'light-content'}
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={{alignSelf: 'center', width: '90%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: 20,
              alignSelf: 'center',
              // backgroundColor: 'red',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {formData.image ? (
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.primaryColor,
                    alignSelf: 'center',
                  }}>
                  <Image
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 30,
                    }}
                    source={{uri: formData.url + formData.image}}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('AppStackWithoutBottom', {
                      screen: 'EditProfile',
                    })
                  }
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.primaryColor,
                    alignSelf: 'center',
                  }}>
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                      resizeMode: 'center',
                      borderRadius: 20,
                    }}
                    source={require('../../assets/app_icon.png')}
                  />
                </TouchableOpacity>
              )}
              <View style={{paddingLeft: 10}}>
                <Greetings accountType={formData.accountType} />
                <Text style={[style.font16Re, {color: colors.white}]}>
                  {formData?.userName}
                </Text>
              </View>
            </View>

            <Image
              style={{
                height: 20,
                width: 20,

                resizeMode: 'center',
              }}
              source={require('../../assets/images/HomeImg/bell.png')}
            />
          </View>
        </View>
      </ImageBackground>

      <View style={{padding: 10, backgroundColor: colors.white, flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={[style.font20Re, {fontFamily: fonts.bold}]}>
            {t('New Orders')}
          </Text>
        </View>

        {Object.keys(store?.store).length !== 0 ? (
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
                name="Completed,"
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
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[style.font14Re, {marginVertical: 20}]}>
              {t("You Don't have store, Please create store")}
            </Text>
            <BaseButton
              title={t('Create Store')}
              defaultStyle={{width: 140, height: 35}}
              textStyle={[style.font14Re, {color: colors.white}]}
              onPress={() => navigation.navigate('CreateStoreapp')}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default HomeStore;

const styles = StyleSheet.create({});
