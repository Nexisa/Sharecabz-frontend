import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const DriverAllocation = () => {
  const [driverName, setDriverName] = useState('');
  const [cabNumber, setCabNumber] = useState('');
  const [cabModel, setCabModel] = useState('Innova Crysta, Xylo');
  
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window'); // Get screen width and height dynamically

  const handleDriverAllocation = () => {
    console.log('Driver allocated:', driverName, cabNumber, cabModel);
    navigation.navigate('Status' as never);// Redirect to Driver Allotment Status
  };

  const handleCancelBooking = () => {
    console.log('Booking cancelled');
    navigation.navigate('AdminHome' as never);// Redirect to Driver Booking Details
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
        placeholder="Enter the driver name"
        value={driverName}
        onChangeText={(text) => setDriverName(text)}
      />


      <Text className="text-lg font-semibold mb-2">Cab Number</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-4 mb-6 text-base"
        placeholder="Enter the cab number"
        value={cabNumber}
        onChangeText={(text) => setCabNumber(text)}
      />


      <Text className="text-lg font-semibold mb-2">Cab Model</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-4 mb-8 text-base"
        placeholder="Enter the cab model"
        value={cabModel}
        onChangeText={(text) => setCabModel(text)}
      />


      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className="flex-1 bg-green-400 rounded-lg py-4 mr-2"
          onPress={handleDriverAllocation}
          style={{ backgroundColor: 'rgba(129, 215, 66, 1)' }} // Dynamic color
        >
          <Text className="text-white text-lg font-bold text-center">Allocate Driver</Text>
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
