import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, Alert, Modal, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DriverAllocation = () => {
  const [driverName, setDriverName] = useState('');
  const [cabNumber, setCabNumber] = useState('');
  const [driverNumber, setDriverNumber] = useState('');
  const [cabModel, setCabModel] = useState('Innova Crysta');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
const api = process.env.EXPO_PUBLIC_API;
  const route = useRoute();
  //get bookingId from prev screen
  const bookingId = route.params?.bookingId;
  console.log('Booking ID:', bookingId);
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window'); // Get screen width and height dynamically

  const handleDriverAllocation = async() => {
    const token = await AsyncStorage.getItem('token');
    if (!driverName || !cabNumber || !driverNumber || !cabModel) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Incomplete Form',
        text2: 'Please fill all the fields before proceeding.',
      });
      return;
    }
    const response = await fetch(`${api}/booking/getbooking/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        driver: {
          name: driverName, // Replace with the actual driver name
          contactNumber: driverNumber, // Replace with the actual driver contact number
          cabNumber: cabNumber, // Replace with the actual cab number
          carModel: cabModel // Replace with the actual car model
        }
      }),
    });

    const res = await response.json();
    console.log('Driver Allocation Response:', res);
    if (!res.success) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Driver allocation failed. Please try again.',
      });
    }

    console.log('Driver allocated:', driverName, cabNumber, cabModel);
    navigation.navigate('Status' as never); // Redirect to Driver Allotment Status
  };

  const handleCancelBooking = () => {
    console.log('Booking cancelled');
    navigation.navigate('AdminHome' as never); // Redirect to Driver Booking Details
  };

  const handleDriverNumberChange = (text: string) => {
    // Allow only numeric characters
    if (/^\d*$/.test(text)) {
      setDriverNumber(text);
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Invalid Input',
        text2: 'Please enter only numeric values for contact number.',
      });
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 justify-center bg-white px-6">

      <TouchableOpacity className="absolute top-14 left-3 p-2" onPress={goBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text className="text-3xl font-bold text-center mb-10">Driver Details</Text>

      <Text className="text-lg font-semibold mb-2">Driver Name</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-4 mb-6 text-base"
        placeholder="Enter the Driver Name"
        value={driverName}
        onChangeText={(text) => setDriverName(text)}
      />

      <Text className="text-lg font-semibold mb-2">Cab Number</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-4 mb-6 text-base"
        placeholder="Enter the Cab Number"
        value={cabNumber}
        onChangeText={(text) => setCabNumber(text)}
      />

      <Text className="text-lg font-semibold mb-2">Driver's Contact No.</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-4 mb-6 text-base"
        placeholder="Enter the Driver's Contact Number"
        value={driverNumber}
        onChangeText={handleDriverNumberChange}
        keyboardType="numeric"
      />

      <Text className="text-lg font-semibold mb-2">Cab Model</Text>
      <TouchableOpacity
        className="border border-gray-300 rounded-lg p-4 pb-6 mb-6 text-base"
        onPress={() => setIsDropdownVisible(true)}
      >
        <Text>{cabModel}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isDropdownVisible}
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black opacity-80">
          <View className="bg-white rounded-xl p-8">
            <Text className="text-xl font-bold mb-4">Select Cab Model</Text>
            {['Innova Crysta', 'Xylo'].map(model => (
              <TouchableOpacity
                key={model}
                className="p-4 border-b border-gray-300"
                onPress={() => {
                  setCabModel(model);
                  setIsDropdownVisible(false);
                }}
              >
                <Text className="text-base">{model}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Cancel" onPress={() => setIsDropdownVisible(false)} />
          </View>
        </View>
      </Modal>

      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className={`flex-1 rounded-lg py-4 mr-2 ${driverName && cabNumber && driverNumber && cabModel ? 'bg-green-400' : 'bg-gray-300'}`}
          onPress={handleDriverAllocation}
          disabled={!driverName || !cabNumber || !driverNumber || !cabModel}
        >
          <Text className={`text-white text-lg font-bold text-center ${driverName && cabNumber && driverNumber && cabModel ? 'text-white' : 'text-gray-500'}`}>
            Allocate Driver
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-red-500 rounded-lg py-4 ml-2"
          onPress={handleCancelBooking}
        >
          <Text className="text-white text-lg font-bold text-center">Cancel Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DriverAllocation;
