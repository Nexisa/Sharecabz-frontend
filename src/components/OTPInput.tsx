import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import Toast from 'react-native-toast-message';

type OTPInputProps = {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  onChange: (name: 'otp1' | 'otp2' | 'otp3' | 'otp4', value: string) => void;
};

const OTPInput: React.FC<OTPInputProps> = ({ otp1, otp2, otp3, otp4, onChange }) => {
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

  const otpRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  return (
    <View className= "px-2 py-5">
      <View className="flex-row items-center justify-between w-full">
        {/* Left side: Text */}
        <Text className="flex-1 text-lg pr-2.5" style={{ color: '#7A7A7A' }}>Enter OTP</Text>

        {/* Right side: OTP input boxes */}
        <View className="flex-row">
          <TextInput
            className="w-10 h-10 border border-gray-300 rounded-lg text-center mx-1 text-xl"
            keyboardType="number-pad"
            maxLength={1}
            value={otp1}
            onChangeText={(value) => handleChange(value, 'otp1', otpRefs[1])}
            ref={otpRefs[0]}
          />
          <TextInput
            className="w-10 h-10 border border-gray-300 rounded-lg text-center mx-1 text-xl"
            keyboardType="number-pad"
            maxLength={1}
            value={otp2}
            onChangeText={(value) => handleChange(value, 'otp2', otpRefs[2])}
            ref={otpRefs[1]}
          />
          <TextInput
            className="w-10 h-10 border border-gray-300 rounded-lg text-center mx-1 text-xl"
            keyboardType="number-pad"
            maxLength={1}
            value={otp3}
            onChangeText={(value) => handleChange(value, 'otp3', otpRefs[3])}
            ref={otpRefs[2]}
          />
          <TextInput
            className="w-10 h-10 border border-gray-300 rounded-lg text-center mx-1 text-xl"
            keyboardType="number-pad"
            maxLength={1}
            value={otp4}
            onChangeText={(value) => handleChange(value, 'otp4')}
            ref={otpRefs[3]}
          />
        </View>
      </View>
    </View>
  );
};

export default OTPInput;
