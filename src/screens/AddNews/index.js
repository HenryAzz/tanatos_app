// import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
// import React, {useState} from 'react';
// import Layout from '../../components/Layout';
// import AppHeader from '../../components/AppHeader/AppHeader';
// import AppTextInput from '../../components/FloatingLabelInput';
// import {BaseButton} from '../../components/BaseButton';
// import style from '../../assets/css/style';
// import {colors, fonts} from '../../constraints';
// import {useNavigation} from '@react-navigation/native';
// import {DatePicker} from '../../components/DateComponent';

// const AddNews = () => {
//   const navigation = useNavigation();
//   const [formData, setFormData] = useState({
//     starting_date: undefined,
//     starting_dateModal: undefined,
//   });
//   const onDateChange = (event, selectedDate, dateName, modalName) => {
//     if (event.type === 'dismissed') {
//       console.log('user cancelled');
//     } else {
//       setFormData(prevState => ({
//         ...prevState,
//         [modalName]: false,
//         [dateName]: selectedDate?.toDateString(),
//       }));
//     }
//   };
//   return (
//     <Layout>
//       <AppHeader title={'Add News'} />
//       <AppTextInput titleText={'Name'} placeholder={'Name'} />
//       <ScrollView style={{width: '100%'}}>
//         <View>
//           <Text
//             style={[
//               style.font16Re,
//               {fontFamily: fonts.medium, alignSelf: 'flex-start'},
//             ]}>
//             Upload Photo
//           </Text>
//           <View
//             style={{
//               width: '100%',
//               marginVertical: 10,
//               marginBottom: 10,
//               height: 120,
//               alignItems: 'center',
//               justifyContent: 'center',
//               borderWidth: 1.5,
//               borderStyle: 'dashed',
//             }}>
//             <BaseButton
//               title={'Upload a Photo'}
//               defaultStyle={{width: '60%'}}
//             />
//           </View>

//           {/* <View style={{width: '100%'}}>
//             <DatePicker
//               title={'Date of Birth'}
//               date={formData.starting_date}
//               show={formData.starting_dateModal}
//               // disable={route.params?.user === 'owner' ? false : true}
//               showDatepicker={() => {
//                 setFormData(prevState => ({
//                   ...prevState,
//                   starting_dateModal: true,
//                 }));
//               }}
//               onChange={(event, selectedDate) => {
//                 onDateChange(
//                   event,
//                   selectedDate,
//                   'starting_date',
//                   'starting_dateModal',
//                 );
//               }}
//               maxDate={new Date()}
//             />
//           </View> */}
//           {/* <AppTextInput titleText={'Date'} placeholder={'Date'} /> */}
//           <BaseButton
//             title={'Add News'}
//             defaultStyle={{marginTop: 40}}
//             onPress={() => navigation.navigate('Phone')}
//           />
//         </View>
//       </ScrollView>
//     </Layout>
//   );
// };

// export default AddNews;

// const styles = StyleSheet.create({});

import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import style from '../../assets/css/style';
// import {UploadImg} from '../../../assets/images';

// import {UpdateUser, upload_data} from '../../../Services/LoginFunctions';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from '../../components/Layout';
import AppHeader from '../../components/AppHeader/AppHeader';
import {BaseButton} from '../../components/BaseButton';
import {colors, constants, fonts} from '../../constraints';
import {ToastMessage} from '../../utils/Toast';
import ApiRequest from '../../Services/ApiRequest';
const AddNews = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route?.params?.id;
  const account_Type = route?.params?.account_Type;
  console.log(id, '', account_Type);

  const [images, setImages] = useState([]);
  const [imagesToSend, setImagesToSend] = useState([]);
  const [disabled, setdisabled] = useState(true);
  const [imageLoader, setImageLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const isUpdate = route.params?.update || false;
  const buttonText = isUpdate ? 'Update' : 'Continue';
  useEffect(() => {
    if (route.params?.property) {
      const {property} = route.params;
      const images =
        property?.images.length > 0 && JSON.parse(property?.images);
      if (images) {
        setImagesToSend(images);
        const imagesToShow = images.map(image => ({
          uri: constants.imageLink + image,
        }));
        setImages(imagesToShow);
      }
    }
  }, [route]);
  useEffect(() => {
    if (images.length > 0 && imagesToSend.length > 0) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  }, [images, imagesToSend]);
  const uploadImg = async image => {
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
        setImagesToSend([...imagesToSend, res.data.file_name]);
      } else {
        setImageLoader(false);
        ToastMessage('Upload Again');
        removeImage(images.length, true);
      }
    } catch (err) {
      console.log(err);
      setImageLoader(false);
      ToastMessage('Upload Again');
      removeImage(images.length, true);
    }
  };
  const openGallery = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      writeTempFile: true,
      compressImageQuality: 0.4,
    })
      .then(async image => {
        setImages(prevImages => [...prevImages, {uri: image.path}]);
        uploadImg(image);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const removeImage = (index, isApiResponse = false) => {
    if (isApiResponse) {
      setImages(preImgs =>
        preImgs.filter((item, ItemIndex) => ItemIndex !== index),
      );
    } else {
      setImages(preImgs =>
        preImgs.filter((item, ItemIndex) => ItemIndex !== index),
      );
      setImagesToSend(preImgs =>
        preImgs.filter((item, ItemIndex) => ItemIndex !== index),
      );
    }
  };
  const handleSubmit = async () => {
    setdisabled(true);
    setLoading(true);
    const user_id = await AsyncStorage.getItem('user_id');

    const dataToPost = {
      type: 'update_data',
      table_name: 'stores',
      id: id,
      images: JSON.stringify(imagesToSend),
    };

    console.log(dataToPost, 'image uplod');
    try {
      const res = await ApiRequest(dataToPost);
      console.log(res.data, 'image uplod');
      if (res?.data?.result) {
        ToastMessage(res?.data?.message);
        if (route?.params?.account_Type === 'funeral') {
          navigation.navigate('MainStack', {screen: 'HomeFuneral'});
          // navigation.navigate('MainStack', {screen: 'AddFlowers'});
          // navigation.navigate('', {id: id});
        }
        // else {
        //   navigation.reset({
        //     index: 0,
        //     routes: [
        //       {
        //         name: 'MainStack',
        //       },
        //     ],
        //   });
        // }
        setLoading(false);
        setdisabled(false);
      } else if (route?.params?.account_Type === 'store') {
        console.log(res?.data?.message);
        navigation.navigate('MainStack', {
          screen: 'AddFlowers',
          params: {
            id: id,
            account_Type: account_Type,
          },
        });

        // ToastMessage('1');
        setLoading(false);
        setdisabled(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setdisabled(false);
    }
  };
  return (
    <Layout>
      <ScrollView style={{width: '100%'}}>
        {/* <View style={[style.layout, style.headerView]}> */}
        {/* <Text style={style.headerText}>Add photos</Text>
        <Text style={[style.emailText1, style.topLowMargin]}>
          add your home photos
        </Text>
        <View style={style.topHighMargin} />
        <TouchableOpacity
          style={styles.imgBox}
          onPress={openGallery}
          // disabled={imageLoader && true}
        >
          <Text>Uplod image</Text>
          <Text style={[style.emailText5, style.topMargin]}>Upload photos</Text> */}
        {/* </TouchableOpacity> */}
        <AppHeader title={'Upload Photo'} />
        <View>
          <Text
            style={[
              style.font16Re,
              {fontFamily: fonts.medium, alignSelf: 'flex-start'},
            ]}>
            Upload Photo
          </Text>
          <View
            style={{
              width: '100%',
              marginVertical: 10,
              marginBottom: 10,
              height: 120,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1.5,
              borderStyle: 'dashed',
            }}>
            <BaseButton
              title={'Upload a Photo'}
              onPress={openGallery}
              defaultStyle={{width: '60%'}}
            />
          </View>

          {/* <View style={{width: '100%'}}>
            <DatePicker
              title={'Date of Birth'}
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
          </View> */}
          {/* <AppTextInput titleText={'Date'} placeholder={'Date'} /> */}
          {/* <BaseButton
            title={'Add News'}
            defaultStyle={{marginTop: 40}}
            onPress={() => navigation.navigate('Phone')}
          /> */}
        </View>
        {/* <Text style={[style.emailText, style.topMargin]}>Photos</Text> */}
        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            const lastIndex = images.length;
            return (
              <View
                style={{
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 15,
                  width: 102,
                  height: 152,
                  // width: 100,
                  marginRight: 10,
                }}>
                <TouchableOpacity
                  disabled={imageLoader && true}
                  style={styles.iconBox}
                  onPress={() => {
                    removeImage(index);
                  }}>
                  <Icon name="close" size={20} color={colors.black} />
                </TouchableOpacity>
                {imageLoader && index + 1 === lastIndex && (
                  <>
                    <View
                      style={{
                        backgroundColor: '#0000006E',
                        width: 100,
                        height: 150,
                        zIndex: 1,
                        position: 'absolute',
                        borderRadius: 10,
                      }}>
                      <ActivityIndicator
                        color={colors.white}
                        size={25}
                        style={{
                          position: 'absolute',
                          zIndex: 2,
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                        }}
                      />
                    </View>
                  </>
                )}
                <Image
                  style={{
                    width: 100,
                    height: 150,
                    borderRadius: 15,
                    marginRight: 10,
                  }}
                  source={{uri: item.uri}}
                />
              </View>
            );
          }}
        />
        {/* </View> */}
        <View
          style={{
            width: '100%',
            marginVertical: 100,
          }}>
          <BaseButton
            title={buttonText}
            // disabled={disabled}
            loading={loading}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};
export default AddNews;
const styles = StyleSheet.create({
  buttonView1: {
    borderRadius: 10,
    marginBottom: Platform.OS === 'android' ? 20 : 30,
    backgroundColor: 'red',
  },
  buttonView2: {
    borderRadius: 10,
    marginBottom: 20,
    width: '87%',
  },
  imgBox: {
    height: 160,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  iconBox: {
    position: 'absolute',
    right: 5,
    top: -5,
    backgroundColor: colors.white,
    zIndex: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});
