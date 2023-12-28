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
  TextInput,
  Modal,
  RefreshControl,
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
import AppTextInput from '../../components/FloatingLabelInput';
import {useMemo} from 'react';
import OrderNotFound from '../MyOrder/OrderNotFound';
import {useTranslation} from 'react-i18next';
const AddFlowers = props => {
  const navigation = useNavigation();
  const route = useRoute();
  // const {id, account_Type} = route.params;

  // console.log(id, 'acc', account_Type);
  const [images, setImages] = useState([]);
  const [imagesToSend, setImagesToSend] = useState([]);
  const [disabled, setdisabled] = useState(true);
  const [imageLoader, setImageLoader] = useState(false);
  const [img, setImg] = useState('');
  const [imgToSend, setImgToSend] = useState('');
  const [loading, setLoading] = useState(false);
  const isUpdate = route.params?.update || false;
  const buttonText = isUpdate ? 'Update' : 'Continue';

  // useEffect(() => {
  //   if (images.length > 0 && imagesToSend.length > 0) {
  //     setdisabled(false);
  //   } else {
  //     setdisabled(true);
  //   }
  // }, [images, imagesToSend]);
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
        // ToastMessage(res.data?.message);
        // setImagesToSend([...imagesToSend, res.data.file_name]);
        setImg(constants.baseUrl + res.data.file_name);
        setImgToSend(res.data.file_name);
      } else {
        setImageLoader(false);
        ToastMessage('Upload Again');
        setImg('');
        // removeImage(images.length, true);
      }
    } catch (err) {
      console.log(err);
      setImageLoader(false);
      ToastMessage('Upload Again');
      setImg('');
      // removeImage(images.length, true);
    }
  };
  const openGallery = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      writeTempFile: true,
      compressImageQuality: 0.4,
    })
      .then(async image => {
        // setImages(prevImages => [...prevImages, {uri: image.path}]);
        setImg(image.path);
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
  const {t} = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    catagory: '',
    price: '',
  });
  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [catData, setCatData] = useState();
  const [selectedItem, setSelectedItem] = useState(null);

  const [isModalVisibleCat, setModalVisibleCat] = useState(false);
  const handleGetCatData = async () => {
    try {
      // setLoading(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'categories',
      });
      const resp = res.data.data;
      setCatData(resp);

      // console.log(resp, 'resp');
    } catch (err) {
    } finally {
      // setLoading(false);
    }
  };
  const handleGetCatDataMore = async () => {
    try {
      // setLoading(true);
      setBottomLoader(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'categories',
        last_id: catData[catData.length - 1]?.id,
      });
      const resp = res.data.data;
      setBottomLoader(false);
      if (resp && resp != undefined && resp.length > 0) {
        setCatData([...catData, ...resp]);
      }
      // setCatData(resp);

      // console.log(resp, 'resp');
    } catch (err) {
    } finally {
      setBottomLoader(false);
      // setLoading(false);
    }
  };
  // useEffect(() => {
  //   handleGetCatData();
  // }, []);

  const handleAddFlower = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const store_id = await AsyncStorage.getItem('store_id');
    console.log(store_id, 'store_id');

    setdisabled(true);
    setLoading(true);
    const dataToPost = {
      table_name: 'stores_gallery',
      store_id: JSON.parse(store_id),
      name: formData.name?.trim(),
      description: formData.description?.trim(),
      price: formData.price,
      // category: selectedItem.name,
      category: '',
      images: JSON.stringify([imgToSend]),
    };

    if (route.params?.flower) {
      dataToPost.type = 'update_data';
      dataToPost.id = route.params?.flower?.id;
    } else {
      dataToPost.type = 'add_data';
    }

    try {
      const res = await ApiRequest(dataToPost);
      if (res?.data?.result) {
        console.log(res.data, 'image uplod');
        console.log('flower added');
        ToastMessage(res?.data?.message);
        setFormData({
          name: '',
          description: '',
          price: '',
        });
        setImages([]);
        setImg('');
        setImgToSend('');
        setSelectedItem(null);
        // navigation.navigate('MainStack', {screen: 'AddFlowers'});
        // if (route?.params?.account_Type === 'funeral') {
        //   navigation.navigate('MainStack', {screen: 'HomeFuneral'});
        // }
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
        navigation.navigate('AddNews');
        setLoading(false);
        setdisabled(false);
      } else {
        console.log(res?.data?.message);
        // ToastMessage(res?.data?.message);
        setLoading(false);
        setdisabled(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setdisabled(false);
    }
  };

  const [valid, setValid] = useState(true);

  useMemo(() => {
    const isFormFilled =
      imgToSend &&
      img &&
      // selectedItem.name &&
      formData.price &&
      formData.description?.trim() &&
      // selectedItem & &
      formData.name?.trim();
    setValid(!isFormFilled);
  }, [imgToSend, formData, selectedItem, img]);

  // last_id: catalogData[catalogData.length - 1]?.id,
  //   if (resp && resp != undefined && resp.length > 0) {
  //     setCatalogData([...catalogData, ...resp]);
  // }
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    handleGetCatData();
  };
  const [bottomLoader, setBottomLoader] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    setScrolled(true);
  };

  useEffect(() => {
    if (route.params?.flower) {
      const {flower} = route.params;
      const image = flower?.images.length > 0 && flower?.images[0];
      setImg(constants.baseUrl + image);
      setImgToSend(image);
      setFormData({
        ...formData,
        name: flower?.name,
        description: flower?.description,
        price: flower?.price,
      });
    }
  }, [route]);

  return (
    <Layout>
      <ScrollView style={{width: '100%'}}>
        <AppHeader
          title={route.params?.flower ? t('Update') : t('addflower1')}
        />
        <View>
          <AppTextInput
            titleText={t('addflower2')}
            // keyboardType="email-address"
            placeholder={t('addflower2')}
            value={formData.name}
            onChangeText={text => handleInputChange('name', text)}
          />
          <Text
            style={[
              style.font16Re,
              {fontFamily: fonts.medium, alignSelf: 'flex-start'},
            ]}>
            {t('Upload Photo')}
          </Text>
          <TouchableOpacity
            style={{
              width: '100%',
              marginVertical: 10,
              marginBottom: 10,
              height: 120,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1.5,
              borderStyle: 'dashed',
            }}
            onPress={openGallery}>
            {imageLoader && (
              <View style={[styles.loaderBox]}>
                <ActivityIndicator size={30} color={colors.white} />
              </View>
            )}
            {img ? (
              <Image source={{uri: img}} style={styles.image} />
            ) : (
              <BaseButton
                title={t('Upload Photo')}
                onPress={openGallery}
                defaultStyle={{width: '60%'}}
              />
            )}
          </TouchableOpacity>

          {/* <FlatList
            data={images}
            // horizontal
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            onScroll={handleScroll}
            onEndReached={scrolled ? handleGetCatDataMore : null}
            onEndReachedThreshold={0.2}
            // ListEmptyComponent={
            //   <OrderNotFound
            //     title={'Not Found data'}
            //     subtitle={"You don't have any data at this time"}
            //   />
            // }
            // ListFooterComponent={
            //   bottomLoader && (
            //     <ActivityIndicator size="large" color={colors.gray} />
            //   )
            // }
            ListFooterComponentStyle={{
              width: '100%',
              marginTop: 5,
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
          /> */}
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
            placeholderTextColor={colors.gray}
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
              color: colors.black,
              fontFamily: fonts.regular,
              fontSize: 16,
            }}
          />
          <AppTextInput
            titleText={t('addflower4')}
            // keyboardType="email-address"
            keyboardType="number-pad"
            placeholder={t('addflower4')}
            value={formData.price}
            onChangeText={text => handleInputChange('price', text)}
          />
          {/* <Text
            style={[style.font16Re, {fontFamily: fonts.medium, marginTop: 5}]}>
            {t('addflower5')}
          </Text> */}
          {/* <TouchableOpacity
            onPress={() => setModalVisibleCat(true)}
            style={{
              borderWidth: 1,
              borderColor: '#E0E0E0',
              backgroundColor: '#F5F5F5',
              height: 50,
              borderRadius: 10,
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
            <Text> {selectedItem ? selectedItem.name : t('addflower5')}</Text>
          </TouchableOpacity> */}
        </View>

        <View
          style={{
            width: '100%',
            marginVertical: 30,
          }}>
          <BaseButton
            title={route.params?.flower ? t('Update') : t('addflower1')}
            disabled={valid || loading}
            loading={loading}
            onPress={handleAddFlower}
          />
        </View>
        {/* <View
          style={{
            width: '100%',
            marginBottom: 30,
          }}>
          <BaseButton
            title={t('addflower6')}
            // disabled={disabled}
            // loading={loading}
            // onPress={() => {
            //   navigation.reset({
            //     index: 0,
            //     routes: [
            //       {
            //         name: 'MainStack',
            //       },
            //     ],
            //   });
            // }}
            onPress={() => navigation.navigate('AppStack', {screen: 'Home'})}
          />
        </View> */}
      </ScrollView>
      <Modal
        visible={isModalVisibleCat}
        animationType="slide"
        transparent={true}
        defaultStyle={{}}
        // style={{
        //   width: '90%',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   backgroundColor: 'red', // Add an overlay background color if desired
        // }}
        onRequestClose={() => setModalVisibleCat(false)}>
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
          <View style={{backgroundColor: colors.white, width: '100%'}}>
            <FlatList
              data={catData}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedItem(item);
                    setModalVisibleCat(false);
                  }}
                  style={{
                    // backgroundColor:
                    // selectedItem === item ? 'red' : 'transparent',
                    borderColor:
                      selectedItem === item ? 'black' : 'transparent',
                    borderWidth: 1,
                    padding: 10,
                    margin: 5,
                    borderRadius: 5,
                  }}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </Layout>
  );
};
export default AddFlowers;
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
  image: {
    width: 360,
    height: 110,
  },
  loaderBox: {
    width: 360,
    height: 110,
    backgroundColor: '#0000009E',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
  },
});
