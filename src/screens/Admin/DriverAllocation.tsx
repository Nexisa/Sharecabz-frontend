import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, Modal, Button, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

type DriverAllocationRouteParams = {
  bookingId: string;
};

type DriverAllocationScreenRouteProp = RouteProp<{ params: DriverAllocationRouteParams }, 'params'>;

const DriverAllocation = () => {
  const [driverName, setDriverName] = useState('');
  const [cabNumber, setCabNumber] = useState('');
  const [driverNumber, setDriverNumber] = useState('');
  const [cabModel, setCabModel] = useState('Innova Crysta');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const api = process.env.EXPO_PUBLIC_API;

  const route = useRoute<DriverAllocationScreenRouteProp>();
  const bookingId = route.params?.bookingId;
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');

  const handleDriverAllocation = async () => {
    if (!driverName || !cabNumber || !driverNumber || !cabModel) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Incomplete Form',
        text2: 'Please fill all the fields before proceeding.',
      });
      return;
    }
  
    setIsLoading(true);
  
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token missing');
      }
  
      console.log('Making API request:', {
        url: `${api}/booking/assign-driver/${bookingId}`,
        data: {
          name: driverName,
          contactNumber: driverNumber,
          cabNumber: cabNumber,
          carModel: cabModel,
        },
        token,
      });
  
      const response = await fetch(`${api}/booking/assign-driver/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: driverName,
          contactNumber: driverNumber,
          cabNumber: cabNumber,
          carModel: cabModel,
        }),
      });
  
      const res = await response.json();
      console.log('API response:', res);
  
      if (!response.ok || !res.success) {
        throw new Error(res.message || 'Failed to allocate driver');
      }
  
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Driver Assigned',
        text2: 'Driver details assigned and email sent successfully!',
      });
  
      navigation.navigate('Status' as never);
    } catch (error: unknown) {
      let errorMessage = 'Failed to allocate driver. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Error:', errorMessage);
  
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };
   
  const handleCancelBooking = async () => {
    setIsCancelling(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token missing');
      }

      const response = await fetch(`${api}/booking/deletebooking/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Booking Deleted',
        text2: 'The booking has been successfully cancelled.',
      });

      navigation.navigate('AdminHome' as never);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Failed to cancel booking. Please try again.',
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const handleDriverNumberChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      setDriverNumber(text);
    }
  };

  const handleDriverNameChange = (text: string) => {
    if (/^[a-zA-Z\s]*$/.test(text)) {
      setDriverName(text);
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
        onChangeText={handleDriverNameChange}
        editable={!isLoading && !isCancelling}
      />
      <Text className="text-lg font-semibold mb-2">Cab Number</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-4 mb-6 text-base"
        placeholder="Enter the Cab Number"
        value={cabNumber}
        onChangeText={setCabNumber}
        editable={!isLoading && !isCancelling}
      />
      <Text className="text-lg font-semibold mb-2">Driver's Contact No.</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-4 mb-6 text-base"
        placeholder="Enter the Driver's Contact Number"
        value={driverNumber}
        onChangeText={handleDriverNumberChange}
        keyboardType="numeric"
        editable={!isLoading && !isCancelling}
      />
      <Text className="text-lg font-semibold mb-2">Cab Model</Text>
      <TouchableOpacity
        className="border border-gray-300 rounded-lg p-4 pb-6 mb-6 text-base"
        onPress={() => setIsDropdownVisible(true)}
        disabled={isLoading || isCancelling}
      >
        <Text>{cabModel}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isDropdownVisible}
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-xl p-8 w-4/5">
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
          className={`flex-1 rounded-lg py-4 mr-2 ${
            driverName && cabNumber && driverNumber && cabModel && !isLoading && !isCancelling
              ? 'bg-green-400'
              : 'bg-gray-300'
          }`}
          onPress={handleDriverAllocation}
          disabled={!driverName || !cabNumber || !driverNumber || !cabModel || isLoading || isCancelling}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text
              className={`text-lg font-bold text-center ${
                driverName && cabNumber && driverNumber && cabModel
                  ? 'text-white'
                  : 'text-gray-500'
              }`}
            >
              Allocate Driver
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-red-500 rounded-lg py-4 ml-2"
          onPress={handleCancelBooking}
          disabled={isLoading || isCancelling}
        >
          {isCancelling ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-bold text-center">Cancel Booking</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DriverAllocation;