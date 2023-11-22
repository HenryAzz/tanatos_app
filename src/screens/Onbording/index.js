import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Swiper from 'react-native-swiper';

import SVG1 from '../../assets/onbord1.png';
import SVG2 from '../../assets/onbord2.png';
import SVG3 from '../../assets/onbord3.png';
import {colors, fonts} from '../../constraints';
import {BaseButton} from '../../components/BaseButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';

import {useTranslation} from 'react-i18next';
import style from '../../assets/css/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {userType} from '../../store/reducer/usersSlice';
const Onboarding = () => {
  const dispatch = useDispatch();

  const dots = [];
  const [progress, setProgress] = useState(1);
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [imageIndex, setImageIndex] = useState(0);
  const handleSlideChange = index => {
    setProgress(index + 1);
    setImageIndex(index);
  };
  const handleButtonPress = () => {
    if (imageIndex === 0 || imageIndex === 2) {
      navigation.navigate('Wellcome');
    } else {
      swiperRef.current.scrollBy(1);
    }
  };
  const {t, i18n} = useTranslation();

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Swiper
          loop={false}
          index={imageIndex}
          onIndexChanged={handleSlideChange}
          ref={swiperRef}
          renderPagination={(index, total) => {
            for (let i = 0; i < total; i++) {
              dots.push(
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i === index ? styles.activeDot : styles.inactiveDot,
                    {
                      backgroundColor:
                        i === 1 && i === index
                          ? colors.primaryColor
                          : i === index && i !== 1
                          ? colors.primaryColor
                          : colors.line,
                    },
                  ]}
                />,
              );
            }
          }}>
          <View style={[styles.wrapper, {alignItems: 'center'}]}>
            <View style={{flex: 1}}>
              <Image source={SVG1} style={styles.img} />
            </View>
            <View style={[styles.textContainer, {marginTop: 100}]}>
              <Text style={styles.title}>{t('onbord1')}</Text>
              <Text style={styles.subTitleStyles}>{t('onbord2')}</Text>
            </View>
          </View>
          <View style={[styles.wrapper, {alignItems: 'center'}]}>
            <View style={{flex: 1}}>
              <Image source={SVG2} style={styles.img} />
            </View>
            <View style={[styles.textContainer, {marginTop: 100}]}>
              <Text style={styles.title}>{t('onbord1')}</Text>
              <Text style={[styles.subTitleStyles, {width: 230}]}>
                {t('onbord3')}
              </Text>
            </View>
          </View>
          <View style={[styles.wrapper, {alignItems: 'center'}]}>
            <View style={{flex: 1}}>
              <Image source={SVG3} style={styles.img} />
            </View>
            <View style={[styles.textContainer, {marginTop: 100}]}>
              <Text style={styles.title}>{t('onbord1')}</Text>
              <Text style={styles.subTitleStyles}>{t('onbord4')}</Text>
            </View>
          </View>
        </Swiper>
        <View style={styles.pagination}>{dots}</View>
      </View>
      <View
        style={{
          // backgroundColor: colors.primaryColor,
          // imageIndex === 1 ? colors.primaryColor : colors.white,
          justifyContent: 'flex-end',
        }}>
        <BaseButton
          title={imageIndex === 1 ? t('Continue') : t("Let's Started")}
          defaultStyle={{marginVertical: 30, width: '80%', borderRadius: 40}}
          onPress={handleButtonPress}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text
          style={[
            style.font16Re,
            {
              textAlign: 'center',
              color: colors.gray,
              fontFamily: fonts.medium,
            },
          ]}>
          {t('Create an account')}
        </Text>
        {/* <TouchableOpacity
          style={{}}
          onPress={async () => {
            await AsyncStorage.setItem('account_Type', 'customer');
            dispatch(userType({user_type: 'Guest'}));
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
          }}>
          <Text
            style={[
              style.font16Re,
              {
                textAlign: 'center',
                color: colors.primaryColor,
                fontFamily: fonts.medium,
                paddingLeft: 5,
              },
            ]}>
            {t('Guest')}
          </Text>
        </TouchableOpacity> */}
      </TouchableOpacity>
    </View>
  );
};
export default Onboarding;
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    // alignItems: "center",
    // marginTop: 80,
    marginTop: 60,
    flex: 1,
  },
  title: {
    color: colors.primaryColor,
    fontSize: 30,
    fontFamily: fonts.bold,
    textAlign: 'center',
    // marginBottom: 10,
    marginTop: 15,
  },
  subTitleStyles: {
    textAlign: 'center',
    color: '#A2A2A2',
    fontSize: 20,
    marginTop: 15,

    fontFamily: fonts.regular,
  },
  textContainer: {
    paddingHorizontal: 15,
    height: '30%',
    // marginVertical: 25,
    // flex: 1,
    // marginTop: -100,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'red',
    width: 30,
    height: 11,
  },
  inactiveDot: {
    // backgroundColor: colors.line,
    width: 13,
    height: 13,
    borderRadius: 50,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 10,
    // marginBottom: 30,
    alignSelf: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
  },
  buttonContainer: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    position: 'absolute',
    top: -5,
  },
  img: {
    width: 325,
    borderRadius: 10,
    height: 400,
    // marginTop: -35,
  },
});
