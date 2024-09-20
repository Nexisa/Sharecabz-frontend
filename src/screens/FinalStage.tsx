import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../utils/JsonSlice';
import ProfileModal from '../components/ProfileModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  RideBookingScreen: undefined;
  Booking: undefined;
};

type RideBookingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RideBookingScreen'
>;

interface Props {
  navigation: RideBookingScreenNavigationProp;
}

const RideBookingScreen: React.FC<Props> = ({ navigation }) => {
  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedHour, setSelectedHour] = useState('07');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedMeridiem, setSelectedMeridiem] = useState('AM');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = process.env.EXPO_PUBLIC_API;
  const dispatch = useDispatch();
  const jsonData = useSelector((state: any) => state.jsonData.data);

  const handleUpdate = (field: string, value: any) => {
    dispatch(updateField({ field, value }));
  };

  const incrementPassenger = () => {
    const newCount = passengerCount < 8 ? passengerCount + 1 : passengerCount;
    setPassengerCount(newCount);
    handleUpdate('passengerno', newCount);
  };

  const decrementPassenger = () => {
    const newCount = passengerCount > 1 ? passengerCount - 1 : passengerCount;
    setPassengerCount(newCount);
    handleUpdate('passengerno', newCount);
  };

  const onTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) {
      let hours = selectedDate.getHours();
      let minutes = selectedDate.getMinutes();

      // Round minutes to nearest 15
      minutes = Math.round(minutes / 15) * 15;
      if (minutes === 60) {
        hours += 1;
        minutes = 0;
      }

      const ampm = hours >= 12 ? 'PM' : 'AM';
      const newHour = (hours % 12 || 12).toString().padStart(2, '0');
      const newMinute = minutes.toString().padStart(2, '0');
      setSelectedHour(newHour);
      setSelectedMinute(newMinute);
      setSelectedMeridiem(ampm);
      handleUpdate('departureTime', `${newHour}:${newMinute} ${ampm}`);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const toggleProfileModal = () => {
    setModalVisible(!modalVisible);
  };

  const booking = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert("Error", "Authentication token not found.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${apiUrl}/booking/createbooking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          sourceLocation: jsonData.source?.label || '',
          destinationLocation: jsonData.destination?.label || '',
          pickupPoint: jsonData.pickupPoint?.label || '',
          departureTime: jsonData.departureTime || '',
          seats: jsonData.seats || 1,
          startDate: jsonData.date || '',
          endDate: jsonData.date || '',
        }),
      });
      const result = await response.json();

      if (response.status !== 201) {
        Alert.alert("Booking Error", result.message);
      } else {
        navigation.navigate('Booking');
      }
    } catch (error: any) {
      console.error("Booking error:", error.message);
      Alert.alert("Booking Error", "An error occurred while booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Top Section */}
      <View className="flex-row justify-between items-center mb-4 bg-white rounded-xl p-6 shadow-md">
        <TouchableOpacity onPress={handleBackPress} className="p-2 mt-8">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleProfileModal} className=" mt-4">
          <ProfileModal modalVisible={modalVisible} toggleModal={toggleProfileModal} />
        </TouchableOpacity>
      </View>

      {/* Ride Info Card */}
      <View className="bg-white rounded-xl p-4 mx-8 mb-8 mt-12 shadow-md">
        <LinearGradient
          colors={['#84FAB0', '#8FD3F4']}
          className="flex-row justify-between items-center p-6 rounded-lg mb-4"
        >
          <Text className="text-lg font-bold">{jsonData.source?.label || 'Source not selected'}</Text>
          <FontAwesome name="bus" size={24} color="black" />
          <Text className="text-lg font-bold">{jsonData.destination?.label || 'Destination not selected'}</Text>
          <Text className="text-sm font-light">2 hrs</Text>
        </LinearGradient>

        {/* Ride Details */}
        <View className="space-y-8">
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-600">Seats Starting from:</Text>
            <Text className="text-sm font-bold">Rs. 1000</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-600">Available Seats:</Text>
            <Text className="text-sm font-bold">8</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-sm text-gray-600">Departure Time:</Text>
            <TouchableOpacity
              className="border border-gray-300 px-4 py-2 rounded-md"
              onPress={() => setShowTimePicker(true)}
            >
              <Text className="text-sm">{`${selectedHour}:${selectedMinute} ${selectedMeridiem}`}</Text>
            </TouchableOpacity>
          </View>

          {showTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              is24Hour={false}
              display="spinner"
              onChange={onTimeChange}
              minuteInterval={15}
            />
          )}

          <View className="flex-row justify-between items-center">
            <Text className="text-sm text-gray-600">No. of Passengers:</Text>
            <View className="flex-row items-center">
              <TouchableOpacity onPress={decrementPassenger} className="bg-gray-200 p-2 rounded-full">
                <Ionicons name="remove" size={24} color="black" />
              </TouchableOpacity>
              <Text className="mx-4 text-lg font-bold">{passengerCount}</Text>
              <TouchableOpacity onPress={incrementPassenger} className="bg-gray-200 p-2 rounded-full">
                <Ionicons name="add" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Car Images */}
        <Text className="text-xs text-gray-500 text-center my-8">
          Either a Xylo or Innova will be sent according to availability
        </Text>
        <View className="flex-row justify-around mb-4">
          <Image source={require('../../assets/Images/car1.png')} className="w-24 h-16" />
          <Image source={require('../../assets/Images/car2.png')} className="w-24 h-16" />
        </View>

        {/* Features */}
        <View className="flex-row justify-around mb-4">
          <View className="flex items-center">
            <FontAwesome name="snowflake-o" size={24} color="black" />
            <Text className="text-sm mt-1">Air Conditioned</Text>
          </View>
          <View className="flex items-center">
            <Ionicons name="fast-food-outline" size={24} color="black" />
            <Text className="text-sm mt-1">Travel Snacks</Text>
          </View>
        </View>
        <View className="flex items-center mb-4">
          <FontAwesome name="suitcase" size={24} color="black" />
          <Text className="text-sm mt-1">1 Cabin Luggage</Text>
        </View>
      </View>

      {/* Booking Button */}
      <View className="mx-8 mb-8">
        <TouchableOpacity
          onPress={booking}
          disabled={isLoading}
          className={`bg-[#8CC63F]  p-4 rounded-lg shadow-md ${isLoading ? 'opacity-50' : ''}`}
        >
          <Text className="text-white text-center font-bold">{isLoading ? 'Booking...' : 'DONE'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RideBookingScreen;
