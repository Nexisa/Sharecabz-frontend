import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
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
  phoneNumber: string;
  email: string;
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  password: string;
  confirmPassword: string;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    phoneNumber: '',
    email: '',
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    password: '',
    confirmPassword: '',
  });
  const [isOTPSent, setIsOTPSent] = useState(false);

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
    const { username, phoneNumber, email, otp1, otp2, otp3, otp4, password, confirmPassword } = formData;

    // Validate if all fields are filled
    if (!username || !phoneNumber || !email || !otp1 || !otp2 || !otp3 || !otp4 || !password || !confirmPassword) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Please fill in all fields',
      });
      return false;
    }

    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(username)) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Invalid Username',
        text2: 'Username should contain only letters and spaces',
      });
      return false;
    }


    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Invalid Phone Number',
        text2: 'Phone number should contain only numbers (0-9)',
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


    if (password !== confirmPassword) {
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

  const handleSendOTP = () => {
    if (!isValidEmail(formData.email)) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Invalid Email',
        text2: 'Please provide a valid email address to send OTP',
      });
      return;
    }

    setIsOTPSent(true);
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'OTP Sent',
      text2: 'Please check your email for the OTP',
    });
  };

  const handleVerify = async (otp: string) => {
    // Implement your OTP verification logic here
  
    const isVerified = true;

    Toast.show({
      type: isVerified ? 'success' : 'error',
      position: 'top',
      text1: isVerified ? 'OTP Verified' : 'OTP Verification Failed',
      text2: isVerified ? 'Your OTP has been verified successfully.' : 'Please check your OTP and try again.',
    });

    return isVerified;
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
        {renderInputField('E-mail', 'email', false, true)}

        <OTPInput
          otp1={formData.otp1}
          otp2={formData.otp2}
          otp3={formData.otp3}
          otp4={formData.otp4}
          onChange={handleChange}
          onVerify={handleVerify}
        />

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
            Already have an account?
            <Text style={{ color: '#81D742', fontWeight: 'bold' }}> SIGN IN</Text>
          </Text>
        </TouchableOpacity>

      </View>
      <Toast />
    </View>
  );
};

export default SignUpScreen;