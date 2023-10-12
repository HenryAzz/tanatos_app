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
import ApiRequest from '../../Services/ApiRequest';
import {ToastMessage} from '../../utils/Toast';
import ModalLoadingTrans from '../../components/ModalLoadingTrans';
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
  });
  // console.log(formData, 'data');
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
  // console.log(selectedImage, 'img');
  const pickImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      writeTempFile: true,
      compressImageQuality: 0.4,
    })
      .then(image => {
        // uploadImg(image);
        setSelectedImage(image.path);
      })
      .catch(error => {
        console.log('Error picking image: ', error);
      });
  };
  const [showLoadingModal, setShowLoadingModal] = useState(false);
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
      // console.log(resp, '///////////////');
      // setPhonen(resp?.phone);
      setFormData({
        userName: resp?.name,
        email: resp?.email,
        gender: resp?.gender,
        dob: resp?.dob,
        city: resp.city,
        country: resp.country,
      });
      setFormData1({
        userName: resp?.name,
        email: resp?.email,
        gender: resp?.gender,
        dob: resp?.dob,
        city: resp.city,
        country: resp.country,
      });
      setShowLoadingModal(false);
    } catch (error) {
      setShowLoadingModal(false);
      console.log(error);
    }
  };
  const [isLoading1, setIsLoading1] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleUpdateData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setIsLoading1(true);
      setDisabled(true);
      const res = await ApiRequest({
        type: 'update_data',
        id: parseInt(user_id),
        table_name: 'users',
        userName: formData?.name,
        email: formData?.email,
        gender: formData?.gender,
        dob: formData?.dob,
        city: formData.city,
        country: formData.country,
      });
      const obj = {
        type: 'update_data',
        id: user_id,
        table_name: 'users',
        userName: formData?.userName,
        email: formData?.email,
        gender: formData?.gender,
        dob: formData?.dob,
        city: formData.city,
        country: formData.country,
      };
      console.log(obj, 'resp update');
      const resp = res.data;
      setIsLoading1(false);
      setDisabled(false);
      handleGetData();
      ToastMessage(res?.data?.message);
      // navigation.navigate('Profile');
    } catch (error) {
      setIsLoading1(false);
      setDisabled(false);
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <Layout>
      <AppHeader title={'Edit Profile'} defaultStyle={{marginBottom: 30}} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            width: 110,
            height: 110,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: colors.gray,
            alignSelf: 'center',
            marginTop: 25,
            marginBottom: 5,
          }}>
          {formData.image ? (
            <Image
              source={{uri: selectedImage ? selectedImage : formData.image}}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
          ) : (
            <Image source={profile} style={{width: 90, height: 90}} />
          )}
        </TouchableOpacity>
        <View style={{}}>
          <AppTextInput
            placeholder={'Name'}
            titleText={'Name'}
            value={formData.userName}
            onChangeText={text => setFormData({...formData, userName: text})}
          />

          <AppTextInput
            placeholder={'Email'}
            titleText={'Email'}
            value={formData.email}
            onChangeText={text => setFormData({...formData, email: text})}
          />
          <AppTextInput
            placeholder={'Date of Birth'}
            titleText={'Date of Birth'}
            value={formData.dob}
            onChangeText={text => setFormData({...formData, dob: text})}
          />
          <AppTextInput
            placeholder={'Gender'}
            titleText={'Gender'}
            value={formData.gender}
            onChangeText={text => setFormData({...formData, gender: text})}
          />
          <AppTextInput
            placeholder={'City'}
            titleText={'City'}
            value={formData.city}
            onChangeText={text => setFormData({...formData, city: text})}
          />
          <AppTextInput
            placeholder={'County'}
            titleText={'County'}
            value={formData.country}
            onChangeText={text => setFormData({...formData, country: text})}
          />
          <BaseButton
            title={
              isLoading1 ? <ActivityIndicator color={colors.white} /> : 'Update'
            }
            defaultStyle={{marginBottom: 20}}
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
