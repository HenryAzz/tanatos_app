import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import 'intl-pluralrules';

import RootNavigation from './src/navigations';
import i18n from './src/Lenguage/i18n';
import {I18nextProvider} from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';
import messaging from '@react-native-firebase/messaging';

import {RootSiblingParent} from 'react-native-root-siblings';
import {
  notificationListioner,
  requestUserPermission,
} from './src/Services/Notification';
import {useTranslation} from 'react-i18next';
import {Provider} from 'react-redux';
import {store} from './src/store';
const App = () => {
  const {t, i18n} = useTranslation();

  useEffect( () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('message ....', JSON.stringify(remoteMessage));
      alert(
        'A new Notification message arrived!',
        JSON.stringify(remoteMessage),
      );
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    requestUserPermission();
    notificationListioner();

    // getLocation()
  }, []);
  const [loading, setLoading] = useState();
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 1000);
  }, []);

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </I18nextProvider>
      </Provider>
    </RootSiblingParent>
  );
};

export default App;
