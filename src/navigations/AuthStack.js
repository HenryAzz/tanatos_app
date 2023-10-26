import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onbording from '../screens/Onbording';
import Wellcome from '../screens/Wellcome';
import Signup from '../screens/Signup';
import Phone from '../screens/Phone';
import OtpVerified from '../screens/Otp';
import ShareAddress from '../screens/ShareAddress';
import AddNews from '../screens/AddNews';
import Login from '../screens/Login';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {colors} from '../constraints';
import ForgotPassword from '../screens/ForgotPassword';
import OTPChangeReset from '../screens/ForgotPassword/OTPChangeReset';
import UpdatePassword from '../screens/ForgotPassword/UpdatePassword';
import CreateStore from '../screens/CreateStore';
import AddFlowers from '../screens/AddFlowers';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={colors.white}
        // translucent={true}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Onbording" component={Onbording} />
        <Stack.Screen name="Wellcome" component={Wellcome} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Phone" component={Phone} />
        <Stack.Screen name="OtpVerified" component={OtpVerified} />
        <Stack.Screen name="ShareAddress" component={ShareAddress} />
        <Stack.Screen name="AddNews" component={AddNews} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OTPChangeReset" component={OTPChangeReset} />
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
        <Stack.Screen name="CreateStore" component={CreateStore} />
        <Stack.Screen name="AddFlowers" component={AddFlowers} />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
