import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import ApiRequest from '../../../Services/ApiRequest';
import style from '../../../assets/css/style';
import AppHeader from '../../../components/AppHeader/AppHeader';
import {BaseButton} from '../../../components/BaseButton';
import {DatePicker} from '../../../components/DateComponent';
import {TimePicker} from '../../../components/DateComponent/TimeComponent';
import AppTextInput from '../../../components/FloatingLabelInput';
import Layout from '../../../components/Layout';
import {colors, constants, fonts} from '../../../constraints';
import {ToastMessage} from '../../../utils/Toast';
import {useEffect} from 'react';

const HomeFuneral = () => {
  //
  const navigation = useNavigation();
  const route = useRoute();
  const store = useSelector(store => store.user);
  const status = route?.params;

  const {t} = useTranslation();

  const [wantFlowers, setWantFlowers] = useState('yes');
  const [area, setArea] = useState('');
  const [valid, setValid] = useState();
  const [imageLoader, setImageLoader] = useState(false);
  const [imageLoader2, setImageLoader2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimepicker, setShowTimepicker] = useState(false);
  const [selectedTime1, setSelectedTime1] = useState(null);
  const [showTimepicker1, setShowTimepicker1] = useState(false);
  const [area1, setArea1] = useState('');
  const [imagesToSend, setImagesToSend] = useState('');
  const [imageToSendFuneral, setImagesToSendFuneral] = useState('');
  const [imageToSendCharch, setImagesToSendChurch] = useState('');
  const [markerData1, setMarkerData1] = useState({
    latitude: '',
    longitude: '',
  });
  const [markerData, setMarkerData] = useState({
    latitude: '',
    longitude: '',
  });
  const [formData, setFormData] = useState({
    starting_date: undefined,
    starting_dateModal: undefined,
    starting_date1: undefined,
    starting_dateModal1: undefined,
    name: '',
    description: '',
    hallno: '',
    surname: '',
  });

  const maxLength = 1000; // Maximum allowed characters for description

  const handleInputChange = (name, value) => {
    if (name === 'description' && value.length > maxLength) {
      // If the description exceeds the character limit, slice the input to the maximum length
      value = value.slice(0, maxLength);
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onDateChange = (event, selectedDate, dateName, modalName) => {
    if (event.type === 'dismissed') {
      setFormData({
        ...formData,
        [modalName]: false,
      });
    } else {
      setFormData(prevState => ({
        ...prevState,
        [modalName]: false,
        [dateName]: selectedDate?.toDateString(),
      }));
    }
  };

  const formatDate = dateString => {
    const formattedDate = moment(dateString).format('YYYY-MM-DD');
    // console.log(formattedDate, 'options');
    return formattedDate;
  };

  const openGallery = async imageType => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      writeTempFile: true,
      compressImageQuality: 0.4,
      multiple: true, // Enable multiple image selection
    })
      .then(async images => {
        uploadImages(images, imageType);
      })
      .catch(err => {
        console.log(err, 'error in gallery');
      });
  };

  const uploadImages = async (images, imageType) => {
    if (imageType === 'funeral') {
      setImageLoader(true);
    } else if (imageType === 'charch') {
    } else if (imageType === 'imageToSend') {
      setImageLoader2(true);
    }
    try {
      const uploadPromises = images.map(async image => {
        const imageName = image.path.split('/');
        const imageData = {
          fileCopyUri: null,
          name:
            Platform.OS === 'ios'
              ? image.filename
              : imageName[imageName.length - 1],
          size: image.size,
          type: image.mime,
          uri: image.path,
        };
        const body = new FormData();
        body.append('type', 'upload_data');
        body.append('file', imageData);

        const res = await ApiRequest(body);

        if (res.data.result) {
          console.log('res.data.file_name', res.data.file_name);
          if (imageType === 'funeral') {
            setImagesToSendFuneral(res?.data?.file_name);
          } else if (imageType === 'charch') {
            setImagesToSendChurch(res?.data?.file_name);
          } else if (imageType === 'imageToSend') {
            setImagesToSend(res?.data?.file_name);
          }
        }
      });
    } catch (error) {
      console.log(error, 'error in image upload');
      setImageLoader(false);
      ToastMessage('Upload Again');
    } finally {
      setImageLoader(false);
      setImageLoader2(false);
    }
  };

  const handleTimeChange = (event, selectedDate) => {
    if (selectedDate) {
      setShowTimepicker(false);
      setSelectedTime(selectedDate);
    }
  };

  const handleTimeChange1 = (event, selectedDate) => {
    if (selectedDate) {
      setShowTimepicker1(false);
      setSelectedTime1(selectedDate);
    }
  };

  const formattedTimeCh =
    selectedTime &&
    selectedTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  const formattedTimeFun =
    selectedTime1 &&
    selectedTime1.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

  const handleAddObi = async () => {
    setLoading(true);
    const user_id = await AsyncStorage.getItem('user_id');

    const data = {
      type: 'add_data',
      table_name: 'funerals',
      user_id: user_id,
      hall_no: formData.hallno,
      surname: formData.surname,
      image: imagesToSend,
      name: formData.name,
      description: formData.description,
      short_message: 'descanse en paz',
      funeral_date: formatDate(formData.starting_date),
      funeral_time: formattedTimeFun,
      church_time: formattedTimeCh,
      church_date: formatDate(formData.starting_date1),
      funeral_location: area,
      funeral_lat: markerData.latitude,
      funeral_lng: markerData.longitude,
      chruch_location: area1,
      chruch_lat: markerData1.latitude,
      chruch_lng: markerData1.longitude,
      funeral_img: imageToSendFuneral,
      church_img: imageToSendFuneral,
      flower_accept: wantFlowers,
    };

    try {
      setLoading(true);
      const res = await ApiRequest(data);
      if (res?.data?.result) {
        ToastMessage(res?.data?.message);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'MainStack',
            },
          ],
        });
        setFormData({});
        setLoading(false);
      } else {
        ToastMessage(res?.data?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error, 'img upl');
    } finally {
      setLoading(false);
    }
  };

  useMemo(() => {
    const isFormFilled =
      formData.name &&
      formData.description &&
      formData.hallno &&
      formData.starting_date &&
      formData.starting_date1 &&
      formattedTimeFun &&
      formattedTimeCh &&
      formData.name &&
      area &&
      area1 &&
      formData.surname &&
      imageToSendCharch &&
      // imageToSendFuneral &&
      imagesToSend;

    setValid(!isFormFilled);
  }, [
    formData,
    formattedTimeCh,
    formattedTimeFun,
    area,
    area1,
    imageToSendCharch,
    // imageToSendFuneral,
    imagesToSend,
  ]);

  useEffect(() => {
    if (store?.users?.city || store?.users?.country) {
      setArea(store.users?.city + ',' + store.users?.country);
    }
    setImagesToSend(store.users?.image);
  }, []);

  return (
    <Layout>
      <AppHeader
        title={t('Add Obituaries')}
        skip={status?.status}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'MainStack',
              },
            ],
          })
        }
      />

      <ScrollView
        style={{width: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginVertical: 20,
            elevation: 10,
            shadowColor: colors.elev,
          }}
          onPress={() => openGallery('imageToSend')}>
          {imagesToSend ? (
            <View
              style={{
                backgroundColor: colors.white,
                shadowColor: colors.elev,
                elevation: 10,
                borderRadius: 53,
              }}>
              <Image
                source={{
                  uri:
                    'https://locatestudent.com/tanatos/upload/' + imagesToSend,
                }}
                // source={require('../../../assets/profilepic.png')}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
              />
              {imageLoader2 && (
                <View
                  style={{
                    position: 'absolute',
                    top: 30,
                    left: 40,
                  }}>
                  <ActivityIndicator color={colors.white} size={30} />
                </View>
              )}
            </View>
          ) : (
            <View
              style={{
                backgroundColor: colors.white,
                shadowColor: colors.elev,
                elevation: 10,
                borderRadius: 53,
              }}>
              <Image
                source={{
                  uri:
                    'https://locatestudent.com/tanatos/upload/' +
                    store?.users?.image,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
              />
            </View>
          )}
        </TouchableOpacity>
        <AppTextInput
          titleText={t('Name')}
          placeholder={t('Name')}
          value={formData.name}
          onChangeText={text => handleInputChange('name', text)}
        />
        <AppTextInput
          titleText={t('Surname')}
          placeholder={t('Surname')}
          value={formData.surname}
          onChangeText={text => handleInputChange('surname', text)}
        />
        <AppTextInput
          titleText={t('Hall')}
          placeholder={t('Hall')}
          value={formData.hallno}
          onChangeText={text => handleInputChange('hallno', text)}
        />
        <Text style={[style.font16Re]}>{t('addflower3')}</Text>
        <TextInput
          placeholder={t('addflower3')}
          multiline={true}
          textAlignVertical="top"
          value={formData.description}
          onChangeText={text => handleInputChange('description', text)}
          style={{
            paddingLeft: 15,
            paddingTop: 10,
            borderColor: '#E0E0E0',
            backgroundColor: '#F5F5F5',
            borderWidth: 1,
            marginVertical: 5,
            width: '100%',
            height: 100,
            borderRadius: 10,
            fontFamily: fonts.regular,
            color: colors.black,
            fontSize: 16,
          }}
        />
        <Text style={style.font14Re}>
          {formData?.description?.length}/{maxLength} characters used
        </Text>

        <Text
          style={[
            style.font16Re,
            {
              fontFamily: fonts.bold,
              alignSelf: 'center',
              marginVertical: 16,
            },
          ]}>
          {t('funeral4')}
        </Text>
        <Text
          style={[
            style.font16Re,
            {
              fontFamily: fonts.medium,
              alignSelf: 'flex-start',
              marginTop: 16,
            },
          ]}>
          {t('Upload funeral pic')}
        </Text>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            width: '100%',
          }}
          onPress={() => openGallery('funeral')}>
          {imageToSendFuneral ? (
            <View
              style={{
                width: '100%',
                marginTop: 10,
              }}>
              <Image
                source={{
                  uri:
                    'https://locatestudent.com/tanatos/upload/' +
                    imageToSendFuneral,
                }}
                style={{
                  width: '95%',
                  height: 100,
                }}
              />
              {imageLoader && (
                <View
                  style={{
                    position: 'absolute',
                    top: 30,
                    left: 120,
                  }}>
                  <ActivityIndicator color={colors.white} size={30} />
                </View>
              )}
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => openGallery('funeral')}
              activeOpacity={0.5}
              style={{
                width: '100%',
                borderRadius: 10,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#E0E0E0',
                backgroundColor: '#F5F5F5',
                height: 75,
                elevation: 10,
                shadowColor: colors.elev,
                alignSelf: 'center',
                marginVertical: 14,
              }}>
              <TouchableOpacity
                onPress={() => openGallery('funeral')}
                style={{
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    style.font16Re,
                    {
                      fontFamily: fonts.medium,
                      alignSelf: 'center',
                      marginVertical: 16,
                    },
                  ]}>
                  {t('Upload funeral pic')}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        <Text
          style={[style.font16Re, {fontFamily: fonts.medium, marginTop: 5}]}>
          {t('funeral5')}
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            borderWidth: 1,
            borderColor: '#E0E0E0',
            backgroundColor: '#F5F5F5',
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            paddingLeft: 10,
          }}>
          <Text
            numberOfLines={1}
            style={[
              style.font16Re,
              {color: area ? colors.black : colors.gray},
            ]}>
            {area ? area : t('funeral6')}
          </Text>
        </TouchableOpacity>
        <TimePicker
          time={selectedTime}
          show={showTimepicker}
          showTimepicker={() => setShowTimepicker(true)}
          onChange={handleTimeChange}
          title={t('funeral7')}
        />
        <DatePicker
          title={t('funeral8')}
          date={formData.starting_date}
          show={formData.starting_dateModal}
          showDatepicker={() => {
            setFormData(prevState => ({
              ...prevState,
              starting_dateModal: true,
            }));
          }}
          onChange={(event, selectedDate) => {
            const currentDate = new Date();

            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(currentDate.getDate() - 4);

            const threeDaysAfter = new Date();
            threeDaysAfter.setDate(currentDate.getDate() + 3);

            if (new Date(selectedDate) < threeDaysAgo) {
              setFormData({
                ...formData,
                starting_dateModal: false,
              });
              ToastMessage(t('dateMessage'));
              return false;
            } else if (new Date(selectedDate) > threeDaysAfter) {
              setFormData({
                ...formData,
                starting_dateModal: false,
              });
              return ToastMessage(t('dateMessage1'));
            } else {
              onDateChange(
                event,
                selectedDate,
                'starting_date',
                'starting_dateModal',
              );
            }
          }}
        />

        <Text
          style={[
            style.font16Re,
            {
              fontFamily: fonts.bold,
              alignSelf: 'center',
              marginVertical: 16,
            },
          ]}>
          {t('funeral11')}
        </Text>
        <Text
          style={[style.font16Re, {fontFamily: fonts.medium, marginTop: 5}]}>
          {t('funeral9')}
        </Text>
        <Text
          style={[
            style.font16Re,
            {
              fontFamily: fonts.medium,
              alignSelf: 'flex-start',
              marginTop: 16,
            },
          ]}>
          {t('Upload charch pic')}
        </Text>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            // marginVertical: 20,
            width: '100%',
            // elevation: 10,
            // shadowColor: colors.elev,
          }}
          onPress={() => openGallery('charch')}>
          {imageToSendCharch ? (
            <View
              style={{
                width: '100%',
              }}>
              <Image
                source={{
                  uri:
                    'https://locatestudent.com/tanatos/upload/' +
                    imageToSendCharch,
                }}
                style={{
                  width: '95%',
                  height: 100,
                  marginVertical: 10,
                }}
              />
              {imageLoader && (
                <View
                  style={{
                    position: 'absolute',
                    top: 30,
                    left: 40,
                  }}>
                  <ActivityIndicator color={colors.primaryColor} size={30} />
                </View>
              )}
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => openGallery('charch')}
              activeOpacity={0.5}
              style={{
                width: '100%',
                borderRadius: 10,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#E0E0E0',
                backgroundColor: '#F5F5F5',
                height: 75,

                elevation: 10,
                shadowColor: colors.elev,

                alignSelf: 'center',
                marginVertical: 14,
              }}>
              <TouchableOpacity
                onPress={() => openGallery('charch')}
                style={{
                  width: '90%',
                  // backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    style.font16Re,
                    {
                      fontFamily: fonts.medium,
                      alignSelf: 'center',
                      marginVertical: 16,
                    },
                  ]}>
                  {t('Upload charch pic')}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        <Text
          style={[style.font16Re, {fontFamily: fonts.medium, marginTop: 5}]}>
          {t('funeral9')}
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible1(true)}
          style={{
            borderWidth: 1,
            borderColor: '#E0E0E0',
            backgroundColor: '#F5F5F5',
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            paddingLeft: 10,
          }}>
          <Text
            numberOfLines={1}
            style={[
              style.font16Re,
              {color: area ? colors.black : colors.gray},
            ]}>
            {' '}
            {area1 ? area1 : t('funeral0')}
          </Text>
        </TouchableOpacity>
        <TimePicker
          time={selectedTime1}
          show={showTimepicker1}
          showTimepicker={() => setShowTimepicker1(true)}
          onChange={handleTimeChange1}
          title={t('funeral11')}
        />
        <DatePicker
          title={'Date'}
          date={formData.starting_date1}
          show={formData.starting_dateModal1}
          showDatepicker={() => {
            setFormData(prevState => ({
              ...prevState,
              starting_dateModal1: true,
            }));
          }}
          onChange={(event, selectedDate) => {
            const currentDate = new Date();

            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(currentDate.getDate() - 4);

            const threeDaysAfter = new Date();
            threeDaysAfter.setDate(currentDate.getDate() + 3);

            if (new Date(selectedDate) < threeDaysAgo) {
              setFormData({
                ...formData,
                starting_dateModal1: false,
              });
              ToastMessage(t('dateMessage'));
              return false;
            } else if (new Date(selectedDate) > threeDaysAfter) {
              setFormData({
                ...formData,
                starting_dateModal1: false,
              });
              return ToastMessage(t('dateMessage1'));
            } else {
              onDateChange(
                event,
                selectedDate,
                'starting_date1',
                'starting_dateModal1',
              );
            }
          }}
        />
        <View style={[style.justifySpaBtwRow, {marginTop: 10}]}>
          <Text style={style.font16Re}>{t('funeral13')}</Text>
          <View>
            {wantFlowers == 'yes' ? (
              <TouchableOpacity
                style={styles.checkBox}
                onPress={() => setWantFlowers('no')}>
                <Icon name="check" size={17} color={colors.white} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.checkBox, {backgroundColor: colors.white}]}
                onPress={() => setWantFlowers('yes')}></TouchableOpacity>
            )}
          </View>
        </View>
        <BaseButton
          onPress={handleAddObi}
          disabled={valid || loading}
          title={
            loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              t('funeral12')
            )
          }
          defaultStyle={{marginVertical: 20}}
        />
      </ScrollView>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            padding: 20,
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
          }}>
          <GooglePlacesAutocomplete
            placeholder={t('SearchD')}
            GooglePlacesDetailsQuery={{fields: 'geometry'}}
            enablePoweredByContainer={false}
            styles={{
              container: {
                flex: 1,
                zIndex: 2,
                height: '100%',
                width: '100%',
                alignSelf: 'center',
                marginTop: 10,
              },
              textInput: {
                borderBottomColor: '#d4d4d4',
                borderBottomWidth: 1,
                color: 'black',
                fontFamily: fonts.regular,
                fontSize: 16,
              },
              description: {
                color: 'black',
                fontFamily: fonts.regular,
                fontSize: 16,
                lineHeight: 22,
              },
            }}
            fetchDetails={true}
            onPress={(data, details = null) => {
              setMarkerData({
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
              });
              setArea(data.description);
              setModalVisible(false);
            }}
            query={{
              key: constants.MAP_API_KEY,
              language: 'en',
            }}
          />
        </View>
      </Modal>
      <Modal
        visible={isModalVisible1}
        animationType="slide"
        transparent={true}
        defaultStyle={{}}
        onRequestClose={() => setModalVisible1(false)}>
        <View
          style={{
            flex: 1,
            padding: 20,
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
          }}>
          <GooglePlacesAutocomplete
            placeholder={t('SearchD')}
            GooglePlacesDetailsQuery={{fields: 'geometry'}}
            enablePoweredByContainer={false}
            styles={{
              container: {
                flex: 1,
                zIndex: 2,
                height: '100%',
                width: '100%',
                alignSelf: 'center',
                marginTop: 10,
              },
              textInput: {
                borderBottomColor: '#d4d4d4',
                borderBottomWidth: 1,
                color: 'black',
                fontFamily: fonts.regular,
                fontSize: 16,
              },
              description: {
                color: 'black',
                fontFamily: fonts.regular,
                fontSize: 16,
                lineHeight: 22,
              },
            }}
            fetchDetails={true}
            onPress={(data, details = null) => {
              setMarkerData1({
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
              });
              setArea1(data.description);
              // hideModal();
              setModalVisible1(false);
            }}
            query={{
              key: constants.MAP_API_KEY,
              language: 'en',
            }}
          />
        </View>
      </Modal>
    </Layout>
  );
};

export default HomeFuneral;

const styles = StyleSheet.create({
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primaryColor,
  },
});
