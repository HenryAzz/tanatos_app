import {StyleSheet, Image, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../components/AppHeader/AppHeader';
import Layout from '../../components/Layout';
import AppTextInput from '../../components/FloatingLabelInput';
import {ScrollView} from 'react-native';
import {BaseButton} from '../../components/BaseButton';
import {TouchableOpacity} from 'react-native';

import {colors, fonts} from '../../constraints';
import ImagePicker from 'react-native-image-crop-picker';
import profile from '../../assets/profile.png';
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
  });
  const [selectedImage, setSelectedImage] = useState('');
  console.log(selectedImage, 'img');
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
          <AppTextInput placeholder={'Name'} titleText={'Name'} />
          <AppTextInput placeholder={'Email'} titleText={'Email'} />
          <AppTextInput
            placeholder={'Date of Birth'}
            titleText={'Date of Birth'}
          />
          <AppTextInput placeholder={'Gender'} titleText={'Gender'} />
          <AppTextInput placeholder={'City'} titleText={'City'} />
          <AppTextInput placeholder={'County'} titleText={'County'} />
          <BaseButton title={'Update'} defaultStyle={{marginBottom: 20}} />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
