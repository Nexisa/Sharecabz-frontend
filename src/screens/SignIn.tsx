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
import Loading from '../components/Loading';
// import AdminHome from './Admin/AdminHome';

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

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [eye, setEye] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const dispatch = useDispatch();
  const apiUrl = process.env.EXPO_PUBLIC_API;

  const handleSignIn = async () => {
    if (!email || !password) {
      showToast('error', 'Please fill in all fields');
      return;
    }
  
    setLoading(true);
    try {
      const req = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const res = await handleApiResponse(req);
  
      if (!res || !req.ok) {
        throw new Error(res?.message || 'Login failed');
      }
  
      await saveUserData(res);
      showToast('success', `Welcome, ${res.user.username}`);
      handleNavigation(res.user.role);
  
    } catch (error: unknown) {
      if (error instanceof Error) {
        showToast('error', error.message);
      } else {
        showToast('error', 'An unknown error occurred during sign-in.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleApiResponse = async (req: Response) => {
    const textResponse = await req.text();
    try {
      return JSON.parse(textResponse);
    } catch (err) {
      console.error('Error parsing response:', err);
      return { message: textResponse };
    }
  };

  const saveUserData = async (res: any) => {
    await AsyncStorage.setItem('token', res.token);
    await AsyncStorage.setItem('user', JSON.stringify({
      name: res.user.username,
      role: res.user.role,
      phoneNumber: res.user.phone,
      email: res.user.email,
      image: res.user.image,
    }));
    dispatch(login());
  };

  const handleNavigation = (role: string) => {
    if (role === 'admin') {
      navigation.navigate('AdminHome' as never);
    } else if (role === 'user') {
      navigation.navigate('Home' as never);
    } else {
      showToast('error', 'Invalid Role');
    }
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    Toast.show({
      type,
      position: 'top',
      text1: type === 'success' ? 'Sign In' : 'Error',
      text2: message,
    });
  };

  if (loading) {
    return <Loading visible={loading} />;
  }

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
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text className="text-gray-500">Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#81D742] py-4 rounded-full my-5 items-center w-full"
          onPress={handleSignIn}
        >
          <Text className="text-white font-bold">SIGN IN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text className="text-center mt-5 text-gray-500">
            Don’t have an account?{' '}
            <Text className="text-[#81D742] font-bold">SIGN UP</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </View>
  );
};

export default SignInScreen;
