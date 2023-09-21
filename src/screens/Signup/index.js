import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useMemo, useRef} from 'react';
import Layout from '../../components/Layout';
import AppTextInput from '../../components/FloatingLabelInput';
import {BaseButton} from '../../components/BaseButton';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import {BakcButton} from '../../assets/images/svg';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import AuthHeader from '../../components/AuthHeader';
import {useNavigation} from '@react-navigation/native';
import {validateEmail} from '../../utils/Validations';
import {DatePicker} from '../../components/DateComponent';
import RBSheet from 'react-native-raw-bottom-sheet';
import Tick from '../../assets/Tick.svg';
const Signup = ({route}) => {
  const account_Type = route.params.account_Type;
  console.log(account_Type);
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    shopName: '',
    category: '',
    contactNumber: '',
    shopLocation: '',
    starting_date: undefined,
    starting_dateModal: undefined,
  });
  const [disable, setDisable] = useState(true);
  useMemo(() => {
    const isData =
      validateEmail(formData.email) &&
      formData.email.trim() &&
      formData.name.trim() &&
      formData.confirmPassword.trim() &&
      formData.confirmPassword.trim().length > 7 &&
      formData.dateOfBirth.trim() &&
      formData.gender.trim() &&
      formData.address.trim() &&
      formData.shopName.trim() &&
      formData.category.trim() &&
      formData.contactNumber.trim() &&
      formData.shopLocation.trim() &&
      formData.password.trim().length > 7 &&
      formData.password.trim() &&
      formData.password === formData.confirmPassword;
    setDisable(!isData);
  }, [formData]);

  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onDateChange = (event, selectedDate, dateName, modalName) => {
    if (event.type === 'dismissed') {
      console.log('user cancelled');
    } else {
      setFormData(prevState => ({
        ...prevState,
        [modalName]: false,
        [dateName]: selectedDate?.toDateString(),
      }));
    }
  };
  const ref = useRef(null);
  const openBottomSheet = () => {
    ref.current.open();
  };
  const handleSelect = async type => {
    try {
      setFormData({
        ...formData,
        company_id: '',
      });
      // await AsyncStorage.setItem('acc_type', type);
      setFormData({...formData, accountType: type});
      ref.current.close();
    } catch (e) {
      // saving error
      console.log('errrrr....in storage');
    }
  };

  return (
    <Layout>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={colors.backgroundColor}
      />
      <AuthHeader
        title={"Let's Create Account"}
        subTitle={'Enter Your details below to create a new account.'}
      />
      <ScrollView
        style={{width: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <AppTextInput
          titleText={'Name'}
          placeholder={'Name'}
          value={formData.name}
          onChangeText={text => handleInputChange('name', text)}
        />
        <AppTextInput
          titleText={'Email'}
          placeholder={'Email'}
          value={formData.email}
          onChangeText={text => handleInputChange('email', text)}
        />
        <AppTextInput
          titleText={'Password'}
          placeholder={'Password'}
          secureTextEntry
          value={formData.password}
          onChangeText={text => handleInputChange('password', text)}
        />
        <AppTextInput
          titleText={'Confirm Password'}
          placeholder={'Confirm Password'}
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={text => handleInputChange('confirmPassword', text)}
        />
        {account_Type === 'Customer' || account_Type === 'Store' ? (
          <>
            {/* <AppTextInput
              titleText={'Date of Birth'}
              placeholder={'Date of Birth'}
              value={formData.dateOfBirth}
              onChangeText={text => handleInputChange('dateOfBirth', text)}
            /> */}
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
              minDate={new Date()}
            />
            <Text
              style={[
                style.font16Re,
                {fontFamily: fonts.medium, marginVertical: 4},
              ]}>
              Select Gender
            </Text>
            <TouchableOpacity
              style={{
                height: 50,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#E0E0E0',
                backgroundColor: '#F5F5F5',
                marginBottom: 10,
                justifyContent: 'space-between',
                padding: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                ref.current.open();
              }}>
              <Text
                style={[
                  style.font16Re,
                  {color: !formData.accountType ? '#969696' : colors.gray},
                ]}>
                {formData.accountType ? formData.accountType : 'Select Gender'}
              </Text>
            </TouchableOpacity>
          </>
        ) : null}
        {account_Type === 'Funeral' ? (
          <AppTextInput
            titleText={'Address'}
            placeholder={'Address'}
            value={formData.address}
            onChangeText={text => handleInputChange('address', text)}
          />
        ) : null}

        {account_Type === 'Store' ? (
          <>
            <AppTextInput
              titleText={'Shop Name'}
              placeholder={'Shop Name'}
              value={formData.shopName}
              onChangeText={text => handleInputChange('shopName', text)}
            />
            <AppTextInput
              titleText={'Category'}
              placeholder={'Category'}
              value={formData.category}
              onChangeText={text => handleInputChange('category', text)}
            />
            <AppTextInput
              titleText={'Contact Number'}
              placeholder={'Contact Number'}
              value={formData.contactNumber}
              onChangeText={text => handleInputChange('contactNumber', text)}
            />
            <AppTextInput
              titleText={'Shop Location'}
              placeholder={'Shop Location'}
              value={formData.shopLocation}
              onChangeText={text => handleInputChange('shopLocation', text)}
            />
          </>
        ) : null}

        <BaseButton
          title={'Continue'}
          defaultStyle={{marginVertical: 20}}
          disabled={disable}
          onPress={() =>
            navigation.navigate(account_Type === 'Store' ? 'AddNews' : 'Phone')
          }
        />
      </ScrollView>
      <RBSheet
        ref={ref}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        openDuration={250}
        customStyles={{
          wrapper: {
            // backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
          },
        }}>
        <View>
          <Text style={[style.font16Re, {marginVertical: 15}]}>
            Select Account Type
          </Text>
          <TouchableOpacity
            style={{
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.gray5,
              marginBottom: 10,
              justifyContent: 'space-between',
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              handleSelect('Male');
            }}>
            <Text style={style.font16Re}>Male</Text>
            {formData.accountType === 'Male' ? <Tick /> : null}
            {/* <Tick /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.gray5,
              marginBottom: 10,
              justifyContent: 'space-between',
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              handleSelect('Female');
            }}>
            <Text style={style.font16Re}>Female</Text>
            {formData.accountType === 'Female' ? <Tick /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.gray5,
              marginBottom: 10,
              justifyContent: 'space-between',
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              handleSelect('Other');
            }}>
            <Text style={style.font16Re}>Other</Text>
            {formData.accountType === 'Other' ? <Tick /> : null}
          </TouchableOpacity>
        </View>
      </RBSheet>
    </Layout>
  );
};

export default Signup;

const styles = StyleSheet.create({});
