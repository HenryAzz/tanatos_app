import {StyleSheet, Image, Text, View, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppHeader from '../../components/AppHeader/AppHeader';
import Layout from '../../components/Layout';
import AppTextInput from '../../components/FloatingLabelInput';
import {ScrollView} from 'react-native';
import {BaseButton} from '../../components/BaseButton';
import {TouchableOpacity} from 'react-native';

import {colors, fonts} from '../../constraints';
import ImagePicker from 'react-native-image-crop-picker';
import profile from '../../assets/profile.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest, {
  ApiRequestGet,
  ApiRequestPatch,
  ApiRequestPut,
} from '../../Services/ApiRequest';
import {ToastMessage} from '../../utils/Toast';
import ModalLoadingTrans from '../../components/ModalLoadingTrans';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
const EditProfile = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    accountType: '',
    first_name: '',
    last_name: '',
    image: '',
    path: '',
    dob: '',
    url: '',
  });

  // console.log(formData, 'formData');
  const [formData1, setFormData1] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    accountType: '',
    first_name: '',
    last_name: '',
    image: '',
    path: '',
  });
  const [selectedImage, setSelectedImage] = useState('');
  const navigation = useNavigation();
  console.log(formData.url, formData.image, 'formData.url + formData.image');
  const pickImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      writeTempFile: true,
      compressImageQuality: 0.4,
    })
      .then(image => {
        setSelectedImage(image.path);
        console.log(image, 'image');
        uploadImg(image);
      })
      .catch(error => {
        console.log('Error picking image: ', error);
      });
  };
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const handleGetData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    if (user_id) {
      try {
        setShowLoadingModal(true);

        // console.log(data, 'data profile');

        const res = await ApiRequestGet({
          type: `/usuarios/${user_id}`,
        });
        const resp = res?.data;
        console.log(resp, 'readsajkfnaskfjsn');
        setFormData({
          userName: resp?.username,
          email: resp?.email,
          gender: resp?.gender,
          dob: resp?.dob,
          city: resp.city,
          country: resp.country,
          image: resp?.image,
          url: resp.url,
          phoneNumber: resp?.phone,
        });
        setFormData1({
          userName: resp?.name,
          email: resp?.email,
          gender: resp?.gender,
          dob: resp?.dob,
          city: resp.city,
          country: resp.country,
          phone: resp?.phoneNumber,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setShowLoadingModal(false);
      }
    }
  };
  const [isLoading1, setIsLoading1] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const handleUpdateData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setIsLoading1(true);
      setDisabled(true);
      const res = await ApiRequestPatch({
        type: `/usuarios/${user_id}`,
        data: {
          id: parseInt(user_id),
          table_name: 'users',
          username: formData?.userName,
          email: formData?.email,
          gender: formData?.gender,
          dob: formData?.dob,
          city: formData.city,
          country: formData.country,
          image: formData.image,
        },
      });
      // const obj = {
      //   type: 'update_data',
      //   image: formData.image,
      //   id: user_id,
      //   table_name: 'users',
      //   userName: formData?.userName,
      //   email: formData?.email,
      //   gender: formData?.gender,
      //   dob: formData?.dob,
      //   city: formData.city,
      //   country: formData.country,
      // };
      // console.log(obj, 'resp update');
      // const resp = res?.data;
      setIsLoading1(false);
      setDisabled(false);
      // alert('ooo');
      navigation.navigate('Home');
      // handleGetData();
      ToastMessage(res?.data?.message);
    } catch (error) {
      setIsLoading1(false);
      setDisabled(false);
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);

  const uploadImg = async image => {
    // console.log(image, 'image starty');
    const imageName = image.path.split('/');
    const imageData = {
      fileCopyUri: null,
      name:
        Platform.OS == 'ios' ? image.filename : imageName[imageName.length - 1],
      size: image.size,
      type: image.mime,
      uri: image.path,
    };
    console.log(image.path, 'wdadsakfjnaskjfnksajfnskajf');
    setSelectedImage(image.path);
    // console.log('start to uplod');
    const body = new FormData();
    body.append('type', 'upload_data');
    body.append('file', imageData);
    setShowLoader(true);
    const res = await ApiRequest(body)
      .then(res => {
        // console.log('uplod');
        ToastMessage(res?.data?.message);
        setFormData({
          ...formData,
          image: res.data?.file_name,
          path: res.data?.file_name,
        });
        setShowLoader(false);
      })
      .catch(err => {
        console.log(err);
        ToastMessage('Upload Again');
        setShowLoader(false);
      });
  };

  const {t, i18n} = useTranslation();

  return (
    <Layout>
      <AppHeader title={t('account1')} defaultStyle={{marginBottom: 30}} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            width: 105,
            height: 105,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.gray,
            alignSelf: 'center',
            marginTop: 25,
            marginBottom: 5,
            overflow: 'hidden',
          }}>
          {formData.image ? (
            <>
              <Image
                source={{
                  uri: selectedImage
                    ? selectedImage
                    : formData.url + formData.image,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
              />
            </>
          ) : (
            <Image
              source={selectedImage ? {uri: selectedImage} : profile}
              style={{width: 105, height: 105}}
            />
          )}
          {showLoader ? (
            <View style={{position: 'absolute'}}>
              <ActivityIndicator color={colors.white} />
            </View>
          ) : null}
          {/* <ActivityIndicator color={colors.primaryColor} /> */}
        </TouchableOpacity>
        <View style={{}}>
          <AppTextInput
            placeholder={t('User home name')}
            titleText={t('User home name')}
            value={formData.userName}
            onChangeText={text => setFormData({...formData, userName: text})}
          />

          <AppTextInput
            placeholder={t('Email')}
            titleText={t('Email')}
            value={formData.email}
            editable={false}
            onChangeText={text => setFormData({...formData, email: text})}
          />

          <AppTextInput
            placeholder={t('Phone Number')}
            titleText={t('Phone Number')}
            value={formData.phoneNumber}
            editable={false}
            onChangeText={text => setFormData({...formData, phoneNumber: text})}
          />
          {/* {formData.accountType === 'customer' ? (
            <AppTextInput
              placeholder={t('Date of Birth')}
              titleText={t('Date of Birth')}
              editable={false}
              value={formData.dob}
              onChangeText={text => setFormData({...formData, dob: text})}
            />
          ) : null} */}

          <AppTextInput
            placeholder={t('City')}
            titleText={t('City')}
            value={formData.city}
            onChangeText={text => setFormData({...formData, city: text})}
          />
          <AppTextInput
            placeholder={t('County')}
            titleText={t('County')}
            value={formData.country}
            onChangeText={text => setFormData({...formData, country: text})}
          />
          <BaseButton
            title={
              isLoading1 ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                t('Update')
              )
            }
            disabled={isLoading1}
            defaultStyle={{marginBottom: 10, marginTop: 20}}
            onPress={handleUpdateData}
          />
        </View>
      </ScrollView>
      <ModalLoadingTrans
        showLoadingModal={showLoadingModal}
        setShowLoadingModal={setShowLoadingModal}
      />
    </Layout>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
