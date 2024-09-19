import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import Extra from './src/screens/Extra';
import LoadingScreen from './src/components/LoadingScreen';
import RootNav from './src/navigation/RootNav';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { store } from './src/utils/Store';  // Import your store



// Define the stack navigator
const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'RobotoSlab-Variable': require('./assets/fonts/RobotoSlab-VariableFont_wght.ttf'),
  });
};


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <LoadingScreen
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
    <RootNav/>
    <Toast />
    </Provider>
  );
}
