import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import OTPInput from '../components/OTPInput';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Home: undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

type FormData = {
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmpassword: string;
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmpassword: '',
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
  });
  const [isOTPSent, setIsOTPSent] = useState(false);

  const apiUrl = process.env.EXPO_PUBLIC_API;

  const handleChange = (name: keyof FormData, value: string) => {
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
    const { username, phone, email, password, confirmpassword, otp1, otp2, otp3, otp4 } = formData;
    const requiredFields = { username, phone, email, password, confirmpassword, otp1, otp2, otp3, otp4 };

    const emptyFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value.trim())
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: `Please fill in all fields. Missing: ${emptyFields.join(', ')}`,
      });
      return false;
    }

    if (!isValidEmail(email)) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Invalid Email',
        text2: 'Invalid email address',
      });
      return false;
    }

    if (password !== confirmpassword) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Passwords do not match',
      });
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const fullOtp = formData.otp1 + formData.otp2 + formData.otp3 + formData.otp4;

        const signUpData = {
          username: formData.username.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          password: formData.password,
          confirmpassword: formData.confirmpassword,
          otp: fullOtp, 
        };

        const response = await fetch(`${apiUrl}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signUpData),
        });

        const data = await response.json();
        if (response.ok) {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Success',
            text2: 'Account Created Successfully',
          });
          navigation.navigate('SignIn');
        } else {
          throw new Error(data.message || 'Failed to sign up');
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: error instanceof Error ? error.message : 'An error occurred during sign up',
        });
      }
    }
  };

  const handleSendOTP = async () => {
    if (!isValidEmail(formData.email)) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Invalid Email',
        text2: 'Please provide a valid email address to send OTP',
      });
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/sendotp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsOTPSent(true);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'OTP Sent',
          text2: 'Please check your email for the OTP',
        });
      } else {
        throw new Error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: error instanceof Error ? error.message : 'An error occurred while sending OTP',
      });
    }
  };

  const renderInputField = (
    placeholder: string,
    name: keyof FormData,
    secureTextEntry = false,
    isEmailField = false
  ) => (
    <View style={{ width: '100%', marginBottom: 15 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{
            flex: isEmailField ? 1 : undefined,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 25,
            padding: 10,
            paddingHorizontal: 15,
            color: '#000',
            width: isEmailField ? '80%' : '100%',
          }}
          placeholder={placeholder}
          placeholderTextColor="#7A7A7A"
          secureTextEntry={secureTextEntry}
          onChangeText={(value) => handleChange(name, value)}
          value={formData[name]}
        />
        {isEmailField && (
          <TouchableOpacity
            onPress={handleSendOTP}
            disabled={!formData.email || !isValidEmail(formData.email)}
            style={{
              backgroundColor: '#81D742',
              padding: 15,
              borderRadius: 10,
              marginLeft: 10,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              {isOTPSent ? 'Resend OTP' : 'Send OTP'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#81D742', justifyContent: 'center', alignItems: 'center', paddingVertical: 40 }}>
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
          {renderInputField('Phone Number', 'phone')}
          {renderInputField('E-mail', 'email', false, true)}

          {/* OTP Input */}
          <OTPInput
            otp1={formData.otp1}
            otp2={formData.otp2}
            otp3={formData.otp3}
            otp4={formData.otp4}
            onChange={(name, value) => handleChange(name, value)}
          />

          {renderInputField('Password', 'password', true)}
          {renderInputField('Confirm Password', 'confirmpassword', true)}

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
            <Text style={{ color: '#7A7A7A' }}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
