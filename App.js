import React, {useEffect} from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import RootStackNavigator from './src/navigation/RootStackNavigator';


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}

export default App;