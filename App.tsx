import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RootNav from './src/navigation/RootNav';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';

import { store } from './src/utils/Store'; 
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();


export default function App() {
 

  return (
    <Provider store={store}>
      <NavigationContainer>
    <RootNav/>
    <Toast />
    </NavigationContainer>
    </Provider>
  );
}
