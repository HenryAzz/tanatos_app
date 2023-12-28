import {firebase} from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

/// Get FCM tokem /////////////////////////////////////////////////////////////////////////////////
// const getFcmToken = async () => {
//   let token = await messaging().getToken();
//   console.log(token);
//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       // console.log('User email: ', user.email);
//       firestore().collection('Fcm Token').doc(user.email).set({
//         email: user.email,
//         token,
//       });
//       console.log('stored tken');
//     }
//   });
// };
const getFcmToken = async () => {
  // const token = await firestore().collection('Users').get();
  let token = await AsyncStorage.getItem('token');
  // AsyncStorage.removeItem("token")

  if (!token) {
    console.log('no token found Generate new token');
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('Generate new token', token);
        // firestore().collection('Fcm Token').doc(token).set({
        //   token: token,
        // });
        await AsyncStorage.setItem('token', token);
        console.log('stored new token to data base', token);
      }
    } catch (error) {
      console.log('error happen', error);
    }
  }
};

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
};

export const notificationListioner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};
