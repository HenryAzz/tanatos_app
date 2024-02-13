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
import React, {useEffect, useReducer, useState} from 'react';
import Layout from '../../components/Layout';
import moment from 'moment';
import AppTextInput from '../../components/FloatingLabelInput';
import style from '../../assets/css/style';

import {DatePicker} from '../../components/DateComponent';
import {TimePicker} from '../../components/DateComponent/TimeComponent';
import {BaseButton} from '../../components/BaseButton';
import AppHeader from '../../components/AppHeader/AppHeader';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ImagePicker from 'react-native-image-crop-picker';
import {ToastMessage} from '../../utils/Toast';
import ApiRequest from '../../Services/ApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {colors, constants, fonts} from '../../constraints';
import PhoneNumberInput from '../../components/PhoneInput';
import {useTranslation} from 'react-i18next';

const FuneralUpdate = () => {
  const route = useRoute();
  const item = route?.params?.item;
  console.log(item, 'sdsssssssssssssssssssssssssssssssssssssssssss');
  const pathFromBackend = item.image;

  const cleanedPath = pathFromBackend.replace(/^"(.*)"$/, '$1');
  const [showLoadingModal, setShowLoadingModal] = useState(true);
  const LoadingModal = () => (
    <Modal
      transparent
      visible={showLoadingModal}
      animationType="fade"
      onRequestClose={() => setShowLoadingModal(false)}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    </Modal>
  );
  const setDataUser = async () => {
    // setTimeFuneral(item.funeral_time);
    // setTimeCherch(item.church_time);
    // setSelectedTime(item.funeral_time);
    // setSelectedTime1(item.church_time);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Your code to run when the screen gains focus.

      console.log('Screen gained focus');
      setFormData({
        name: item.name,
        description: item.description,
        starting_date: item.funeral_date,
        starting_date1: item.church_date,
        timeCherch: item.church_time,
        timeFuneral: item.funeral_time,
      });
      setShortMessage(item.shortMessage);
      setArea(item.funeral_location);
      setArea1(item.chruch_location);
      setImagesToSend(cleanedPath);
      //   setImages(item.url + item.image);
      setShowLoadingModal(false);
      console.log('Screen gained focus');

      setDataUser();
      return () => {
        // Your cleanup code, if needed.
        console.log('Screen lost focus');
      };
    }, []),
  );
  useEffect(() => {
    setFormData({
      name: item.name,
      description: item.description,
      starting_date: item.funeral_date,
      starting_date1: item.church_date,
      timeCherch: item.church_time,
      timeFuneral: item.funeral_time,
    });
    setShortMessage(item.shortMessage);
    setArea(item.funeral_location);
    setArea1(item.chruch_location);
    setImagesToSend(cleanedPath);
    //   setImages(item.url + item.image);
    setShowLoadingModal(false);
    console.log(item.funeral_location, 'item.funeral_location');
  }, []);

  const [formData, setFormData] = useState({
    starting_date: undefined,
    starting_dateModal: undefined,
    starting_date1: undefined,
    starting_dateModal1: undefined,
    name: '',
    description: '',

    timeFuneral: '',
    timeCherch: '',
  });

  const onDateChange = (event, selectedDate, dateName, modalName) => {
    if (event.type === 'dismissed') {
      setFormData({
        ...formData,
        [modalName]: false,
      });
      console.log('user cancelled');
    } else {
      setFormData(prevState => ({
        ...prevState,
        [modalName]: false,
        [dateName]: selectedDate?.toDateString(),
      }));
    }
  };

  // Function to format a date string to AM/PM time
  const formatTime = dateString => {
    // console.log('time gettign ', dateString);
    // console.log(options, 'timee');
    const options = {hour: 'numeric', minute: '2-digit', hour12: true};
    return new Date(dateString).toLocaleTimeString([], options);
  };
  //   useEffect(() => {
  //     formatTime();
  //     console.log(formatTime(selectedTime), 'tiem select');
  //   }, []);
  const formatDate = dateString => {
    const formattedDate = moment(dateString).format('YYYY-MM-DD');
    // console.log(formattedDate, 'options');
    return formattedDate;
  };
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [area, setArea] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [markerData, setMarkerData] = useState({
    latitude: '',
    longitude: '',
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);

  const [country1, setCountry1] = useState('');
  const [visible1, setVisible1] = useState(false);
  const [area1, setArea1] = useState('');
  const [city1, setCity1] = useState('City');
  const [state1, setState1] = useState('');
  const [markerData1, setMarkerData1] = useState({
    latitude: '',
    longitude: '',
  });
  //   console.log(markerData, '12345', markerData1);

  const [shortMessage, setShortMessage] = useState('');
  const maxLength = 20;

  const handleChangeText = inputText => {
    if (inputText.length <= maxLength) {
      setShortMessage(inputText);
    }
  };
  const remainingCharacters = maxLength - shortMessage?.length;
  const [images, setImages] = useState([]);
  const [imagesToSend, setImagesToSend] = useState([]);
  console.log(imagesToSend, 'imagesToSend');
  const [disabled, setdisabled] = useState(true);
  const [imageLoader, setImageLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  const openGallery = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      writeTempFile: true,
      compressImageQuality: 0.4,
    })
      .then(async image => {
        setImages({uri: image.path});
        uploadImg(image);
      })
      .catch(err => {
        console.log(err, 'img err');
      });
  };
  const uploadImg = async image => {
    // console.log(image, 'image');
    setImageLoader(true);
    const imageName = image.path.split('/');
    const imageData = {
      fileCopyUri: null,
      name:
        Platform.OS == 'ios' ? image.filename : imageName[imageName.length - 1],
      size: image.size,
      type: image.mime,
      uri: image.path,
    };
    const body = new FormData();
    body.append('type', 'upload_data');
    body.append('file', imageData);
    try {
      const res = await ApiRequest(body);
      setImageLoader(false);
      if (res.data.result) {
        ToastMessage(res.data?.message);
        // setImagesToSend([...imagesToSend, res.data.file_name]);
        setImagesToSend(res.data.file_name);
        // console.log('image to send', imagesToSend);
      } else {
        setImageLoader(false);
        ToastMessage('Upload Again');
        // removeImage(images.length, true);
      }
    } catch (err) {
      //   console.log(err, 'img err');
      setImageLoader(false);
      ToastMessage('Upload Again');
      //   removeImage(images.length, true);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimepicker, setShowTimepicker] = useState(false);

  const handleTimeChange = (event, selectedDate) => {
    if (selectedDate) {
      setShowTimepicker(false);
      setSelectedTime(selectedDate);
    }
  };
  const [selectedTime1, setSelectedTime1] = useState(null);
  const [showTimepicker1, setShowTimepicker1] = useState(false);

  const handleTimeChange1 = (event, selectedDate) => {
    if (selectedDate) {
      setShowTimepicker1(false);
      setSelectedTime1(selectedDate);
    }
  };

  const handleUpdateObdti = async () => {
    const data = {
      type: 'update_data',
      table_name: 'funerals',
      id: item.id,
      image: imagesToSend,
      name: formData.name,
      description: formData.description,
      //   message: shortMessage,
      funeral_date: formatDate(formData.starting_date),
      funeral_time: formatTime(formData.selectedTime),
      church_time: formatTime(formData.selectedTime1),
      church_date: formatDate(formData.starting_date1),
      funeral_location: area,
      funeral_lat: markerData.latitude,
      funeral_lng: markerData.longitude,
      chruch_location: area1,
      chruch_lat: markerData1.latitude,
      chruch_lng: markerData1.longitude,
    };

    try {
      setShowLoadingModal(true);
      setLoading(true);
      const res = await ApiRequest(data);

      console.log(res.data, 'image uplod');
      if (res?.data?.result) {
        ToastMessage(res?.data?.message);
        // if (route?.params?.account_Type === 'funeral') {
        //   navigation.navigate('MainStack', {screen: 'HomeFuneral'});
        // }
        // else {
        // navigation.reset({
        //   index: 0,
        //   routes: [
        //     {
        //       name: 'MainStack',
        //     },
        //   ],
        // });
        // }
        setDataUser();
        navigation.navigate('Home', {update: 'update'});
        // navigation.navigate('MainStack', {screen: 'AppStack'});
        setLoading(false);
        setShowLoadingModal(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error, 'img upl');
    } finally {
      //   ToastMessage('not update');
      setShowLoadingModal(false);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <AppHeader title={'Editar esquela'} />
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
            // backgroundColor: 'red',
            borderRadius: 50,
            height: 110,
            width: 110,
            padding: 10,
          }}
          onPress={openGallery}>
          {imagesToSend.length > 0 ? (
            <Image
              source={{
                uri: item.url + imagesToSend,
              }}
              // source={require('../../../assets/profilepic.png')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
          ) : (
            <Image
              source={require('../../assets/profilepic.png')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
          )}
        </TouchableOpacity>

        <AppTextInput
          titleText={t('Name')}
          placeholder={t('Name')}
          value={formData.name}
          onChangeText={text => handleInputChange('name', text)}
        />
        <Text
          style={[
            style.font16Re,

            // {fontFamily: fonts.medium, marginBottom: multiline ? 25 : 2},
          ]}>
          {t('addflower3')}
        </Text>
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
          Home Funeral Time
        </Text>
        {/* funeral_location funeral_lat funeral_lng chruch_location chruch_lat
        chruch_lng */}
        <Text
          style={[style.font16Re, {fontFamily: fonts.medium, marginTop: 5}]}>
          Funeral Location
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
            {' '}
            {area ? area : 'Enter Funeral Location'}
          </Text>
        </TouchableOpacity>
        <View style={styles.container}>
          {/* <Text style={styles.title}>Select a Time</Text> */}
          <TimePicker
            // initialTime={formData.timeCherch}
            // timeFuneral={formData.timeFuneral}
            time={selectedTime}
            show={showTimepicker}
            showTimepicker={() => setShowTimepicker(true)}
            onChange={handleTimeChange}
            title="Funeral Time"
          />
        </View>
        <DatePicker
          title={'Date'}
          date={formData.starting_date}
          show={formData.starting_dateModal}
          // disable={route.params?.user === 'owner' ? false : true}
          showDatepicker={() => {
            setFormData(prevState => ({
              ...prevState,
              starting_dateModal: true,
            }));
          }}
          onChange={(event, selectedDate) => {
            onDateChange(
              event,
              selectedDate,
              'starting_date',
              'starting_dateModal',
            );
          }}
          maxDate={new Date()}
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
          Church Time
        </Text>
        <Text
          style={[style.font16Re, {fontFamily: fonts.medium, marginTop: 5}]}>
          Chruch Location
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
            {area1 ? area1 : 'Enter Church Location'}
          </Text>
        </TouchableOpacity>
        <TimePicker
          // initialTime={formData.timeCherch}
          // timeFuneral={formData.timeFuneral}
          time={selectedTime1}
          show={showTimepicker1}
          showTimepicker={() => setShowTimepicker1(true)}
          onChange={handleTimeChange1}
          title="Chruch Time"
        />
        <DatePicker
          title={'Date'}
          date={formData.starting_date1}
          show={formData.starting_dateModal1}
          // disable={route.params?.user === 'owner' ? false : true}
          showDatepicker={() => {
            setFormData(prevState => ({
              ...prevState,
              starting_dateModal1: true,
            }));
          }}
          onChange={(event, selectedDate) => {
            onDateChange(
              event,
              selectedDate,
              'starting_date1',
              'starting_dateModal1',
            );
          }}
          minDate={new Date()}
        />
        {/* <Text>
                Selected Time:{' '}
                {selectedTime ? formatTime(selectedTime) : 'None'}
              </Text> */}

        <BaseButton
          onPress={handleUpdateObdti}
          title={
            loading ? <ActivityIndicator color={colors.white} /> : 'Update'
          }
          defaultStyle={{marginVertical: 20}}
        />
      </ScrollView>
      <LoadingModal />
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        defaultStyle={{}}
        // style={{
        //   width: '90%',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   backgroundColor: 'red', // Add an overlay background color if desired
        // }}
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
          {/* <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity> */}

          <GooglePlacesAutocomplete
            placeholder={t('SearchD')}
            GooglePlacesDetailsQuery={{fields: 'geometry'}}
            // renderPoweredByGoogle={false}
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
              // console.log(data, details);

              setCountry(data.terms[data.terms.length - 1].value);
              setCity(data?.terms[data.terms.length - 2]?.value);
              // 'details' is provided when fetchDetails = true
              setMarkerData({
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
              });
              setArea(data.description);
              setState(data.structured_formatting.secondary_text);
              // hideModal();
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
        // style={{
        //   width: '90%',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   backgroundColor: 'red', // Add an overlay background color if desired
        // }}
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
          {/* <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity> */}

          <GooglePlacesAutocomplete
            placeholder={t('SearchD')}
            GooglePlacesDetailsQuery={{fields: 'geometry'}}
            // renderPoweredByGoogle={false}
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
              // console.log(data, details);

              setCountry1(data.terms[data.terms.length - 1].value);
              setCity1(data?.terms[data.terms.length - 2]?.value);
              // 'details' is provided when fetchDetails = true
              setMarkerData1({
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
              });
              setArea1(data.description);
              setState1(data.structured_formatting.secondary_text);
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

export default FuneralUpdate;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
