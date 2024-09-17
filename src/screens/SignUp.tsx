import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Home: undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

type FormData = {
  username: string;
  phoneNumber: string;
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    phoneNumber: '',
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (name: keyof FormData, value: string) => {
    if (name === 'username') {
      if (/[^a-zA-Z]/.test(value)) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Username can only contain letters (a-z or A-Z)',
        });
      }
      value = value.replace(/[^a-zA-Z]/g, '');
    }

    if (name === 'phoneNumber') {
      if (/[^0-9]/.test(value)) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Phone Number can only contain digits (0-9)',
        });
      }
      value = value.replace(/[^0-9]/g, '');
    }

    if (name === 'otp') {
      if (/[^0-9]/.test(value)) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'OTP can only contain digits (0-9)',
        });
      }
      value = value.replace(/[^0-9]/g, '');
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const { username, phoneNumber, email, otp, password, confirmPassword } = formData;

    if (!username || !phoneNumber || !email || !otp || !password || !confirmPassword) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Please fill in all fields',
      });
      return false;
    }
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Passwords do not match',
      });
      return false;
    }
    if (!isValidEmail(email)) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Invalid email address',
      });
      return false;
    }

    return true;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Account Created Successfully',
      });
      navigation.navigate('SignIn');
    }
  };

  const renderInputField = (
    placeholder: string,
    name: keyof FormData,
    secureTextEntry = false
  ) => (
    <View style={{ width: '100%', marginBottom: 15 }}>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 25,
          padding: 10,
          paddingHorizontal: 15,
          color: '#000',
        }}
        placeholder={placeholder}
        placeholderTextColor="#7A7A7A"
        secureTextEntry={secureTextEntry}
        onChangeText={(value) => handleChange(name, value)}
        value={formData[name]}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#81D742', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, backgroundColor: '#81D742', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, zIndex: -1 }} />

      <View style={{ width: '90%', maxWidth: 400, backgroundColor: '#fff', borderRadius: 10, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 5, alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000', marginVertical: 20 }}>
          SIGN UP
        </Text>

        <Image
          source={require('../../assets/Images/logo.jpg')}
          style={{ width: 200, height: 100, marginBottom: 20 }}
        />

        {renderInputField('User Name', 'username')}
        {renderInputField('Phone Number', 'phoneNumber')}
        {renderInputField('E-mail', 'email')}
        {renderInputField('OTP', 'otp')}
        {renderInputField('Password', 'password', true)}
        {renderInputField('Confirm Password', 'confirmPassword', true)}

        <TouchableOpacity
          style={{
            backgroundColor: '#81D742',
            paddingVertical: 15,
            borderRadius: 25,
            marginVertical: 20,
            alignItems: 'center',
            width: '100%',
          }}
          onPress={handleSignUp}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#7A7A7A' }}>
            Already have an account? <Text style={{ color: '#81D742', fontWeight: 'bold' }}>SIGN IN</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

export default SignUpScreen;