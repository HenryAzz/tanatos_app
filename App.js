import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RNBootSplash from 'react-native-bootsplash';
import RootNavigation from './src/navigations';

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true}); // fade with 220ms default duration
    // RNBootSplash.hide(); // Set the duration to 50 milliseconds (0.05 seconds)
  }, []);

  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default App;
