import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../utils/Slice';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../components/LoadingScreen';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Home: undefined;
};

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

type Props = {
  navigation: SignInScreenNavigationProp;
};


const SignInScreen: React.FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [eye, setEye] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
const apiUrl = process.env.EXPO_PUBLIC_API;
  const handleSignIn = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Please fill in all fields',
      });
      return;
    }
let res;
    try {
      const req= await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email:email,
          password:password
         }),
      });
   
    
console.log('API URL:', `${apiUrl}/auth/login`);
console.log('Request Body:', JSON.stringify({ 
  email: email,
  password: password
}));
  
try {
  const textResponse = await req.text();
  try {
    res = JSON.parse(textResponse); // Parse JSON if it's valid
  } catch (err) {
    console.error('Error parsing JSON:', err);
    res = { message: textResponse }; // Fallback for non-JSON responses
  }
  
  console.log('Response:', res);
}
 catch (error) {  
  console.error('Error:', error);
  res = { message: 'An error occurred. Please try again.' };
}
/*
<LoadingScreen startAsync={res} onFinish={() => {}} onError={(err) => {
  Toast.show({
    type: 'error',
    position: 'top',
    text1: 'Error',
    text2: 'An error occurred during sign-in. Please try again.',
  });
}} />*/
 console.log('sss');
      console.log(res);
      if (!req.ok) {
        console.log('Error:', res);
        return;
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
      //save res.token in async storage
      dispatch(login())
      await AsyncStorage.setItem('token', res.token);
      await AsyncStorage.setItem('user', JSON.stringify({
        name: res.user.username,
        role: res.user.role,
        phoneNumber: res.user.phone,
        email: res.user.email,
        image: res.user.image,
      }));

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Sign In',
        text2: `Welcome, ${res.user.username}`,
      });

      // TODO: Implement actual role-based navigation
      const role = res.user.role;

      if (role === 'admin') {
        navigation.navigate('AdminHome' as never);
      } else if (role === 'user') {
        navigation.navigate('Home' as never);
      }
      else{
        //show err
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Invalid Role',
        });
      }
    // } catch (error) {
    //   Toast.show({
    //     type: 'error',
    //     position: 'top',
    //     text1: 'Sign In Failed',
    //     text2: 'An error occurred during sign-in. Please try again.',
    //   });
   // }
  };


  return (
    <View className="flex-1 bg-[#81D742] justify-center items-center">
      <View className="absolute top-0 left-0 right-0 h-52 bg-[#81D742] rounded-b-3xl" />

      <View className="w-11/12 max-w-md bg-white rounded-xl p-5 shadow-md items-center">
        <Text className="text-3xl font-bold text-black mb-5">SIGN IN</Text>

        <Image
          source={require('../../assets/Images/logo-removebg-preview.png')}
          className="w-52 h-36 mb-5"
        />

        <TextInput
          className="border border-gray-300 rounded-full py-3 px-4 my-2 w-full text-black"
          placeholder="Email"
          placeholderTextColor="#7A7A7A"
          value={email}
          onChangeText={setEmail}
        />

        <View className="border border-gray-300 rounded-full py-3 px-4 my-2 w-full flex-row items-center">
          <TextInput
            className="flex-1 text-black"
            placeholder="Password"
            placeholderTextColor="#7A7A7A"
            secureTextEntry={eye}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setEye(!eye)}>
            <FontAwesome name={eye ? 'eye-slash' : 'eye'} size={24} color="#7A7A7A" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="self-end my-2"
          onPress={() => navigation.navigate('ForgotPassword' as never)}
        >
          <Text className="text-gray-500">Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#81D742] py-4 rounded-full my-5 items-center w-full"
          onPress={handleSignIn}
        >
          <Text className="text-white font-bold">SIGN IN</Text>
        </TouchableOpacity>

        {/* <View className="items-center my-8">
          <Text className="text-gray-500 mb-4">Or Sign in with</Text>
          <View className="flex-row justify-between w-44">
            <TouchableOpacity>
              <FontAwesome name="google" size={24} color="#4285F4" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="facebook" size={24} color="#3b5998" />
            </TouchableOpacity>
          </View>
        </View> */}

        <TouchableOpacity onPress={() => navigation.navigate('SignUp' as never)}>
          <Text className="text-center mt-5 text-gray-500">
            Don’t have an account?{' '}
            <Text className="text-[#81D742] font-bold">SIGN UP</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Toast Container */}
      <Toast />
    </View>
  );
};

export default SignInScreen;
