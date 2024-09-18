import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Toast from 'react-native-toast-message';

type OTPInputProps = {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  onChange: (name: 'otp1' | 'otp2' | 'otp3' | 'otp4', value: string) => void;
  onVerify: (otp: string) => Promise<boolean>;
};

const OTPInput: React.FC<OTPInputProps> = ({ otp1, otp2, otp3, otp4, onChange, onVerify }) => {
  const [isVerifyEnabled, setIsVerifyEnabled] = useState(false);

  useEffect(() => {
    setIsVerifyEnabled(otp1 !== '' && otp2 !== '' && otp3 !== '' && otp4 !== '');
  }, [otp1, otp2, otp3, otp4]);

  const handleChange = (value: string, name: 'otp1' | 'otp2' | 'otp3' | 'otp4', nextInputRef?: React.RefObject<TextInput>) => {
    if (/[^0-9]/.test(value)) return; // Only allow digits
    onChange(name, value);
    if (value.length === 1 && nextInputRef) {
      nextInputRef.current?.focus();
    }
  };

  const handleVerify = async () => {
    const otp = `${otp1}${otp2}${otp3}${otp4}`;
    const isVerified = await onVerify(otp);

    Toast.show({
      type: isVerified ? 'success' : 'error',
      position: 'top',
      text1: isVerified ? 'OTP Verified' : 'OTP Verification Failed',
      text2: isVerified ? 'Your OTP has been verified successfully.' : 'Please check your OTP and try again.',
    });
  };

  const otpRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  return (
    <View className="flex flex-row items-center justify-between w-full mb-3">
      <View className="flex flex-row justify-start">
        <TextInput
          className="w-12 h-12 border border-gray-300 rounded-lg text-center text-2xl mx-2 px-2"
          keyboardType="number-pad"
          maxLength={1}
          value={otp1}
          onChangeText={(value) => handleChange(value, 'otp1', otpRefs[1])}
          ref={otpRefs[0]}
        />
        <TextInput
          className="w-12 h-12 border border-gray-300 rounded-lg text-center text-2xl mx-2 px-2"
          keyboardType="number-pad"
          maxLength={1}
          value={otp2}
          onChangeText={(value) => handleChange(value, 'otp2', otpRefs[2])}
          ref={otpRefs[1]}
        />
        <TextInput
          className="w-12 h-12 border border-gray-300 rounded-lg text-center text-2xl mx-2 px-2"
          keyboardType="number-pad"
          maxLength={1}
          value={otp3}
          onChangeText={(value) => handleChange(value, 'otp3', otpRefs[3])}
          ref={otpRefs[2]}
        />
        <TextInput
          className="w-12 h-12 border border-gray-300 rounded-lg text-center text-2xl mx-2 px-2"
          keyboardType="number-pad"
          maxLength={1}
          value={otp4}
          onChangeText={(value) => handleChange(value, 'otp4')}
          ref={otpRefs[3]}
        />
      </View>
      <TouchableOpacity
        className={`bg-white py-4 px-6 rounded-lg border border-[#81D742] ml-2 ${isVerifyEnabled ? 'bg-[#81D742]' : ''}`}
        onPress={handleVerify}
        disabled={!isVerifyEnabled}
      >
        <Text className={`font-bold ${isVerifyEnabled ? 'text-white' : 'text-[#81D742]'}`}>
          Verify
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPInput;
