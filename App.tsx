import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import Extra from './src/screens/Extra';
import { NavigationContainer } from '@react-navigation/native';

//TODO check if asyn signed or not from async then go to..... home or sign in

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Extra" component={Extra} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}