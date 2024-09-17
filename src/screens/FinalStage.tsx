import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../utils/JsonSlice';

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

  const dispatch = useDispatch();
  const jsonData = useSelector((state: any) => state.jsonData.data);

  const handleUpdate = (field: string, value: any) => {
    dispatch(updateField({ field, value }));
  };

  const handleWhatsAppPress = () => {
    const message = 'Hello, I want to book a ride!';
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      alert('Make sure WhatsApp is installed on your device.');
    });
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

  const onTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) {
      let hours = selectedDate.getHours();
      let minutes = selectedDate.getMinutes();
      
      // Round minutes to nearest 15-minute interval
      minutes = Math.round(minutes / 15) * 15;
      if (minutes === 60) {
        hours += 1;
        minutes = 0;
      }
      
      const ampm = hours >= 12 ? 'PM' : 'AM';
      setSelectedHour((hours % 12 || 12).toString().padStart(2, '0'));
      setSelectedMinute(minutes.toString().padStart(2, '0'));
      setSelectedMeridiem(ampm);
      handleUpdate('departureTime', `${selectedHour}:${selectedMinute} ${selectedMeridiem}`);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Top Section */}
      <View className="bg-white rounded-xl p-6 mx-4 mt-16 mb-4 shadow-md">
        <TouchableOpacity 
          className="absolute left-4 top-4 w-10 h-10 border border-gray-300 rounded-full items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold mb-2 ml-12">Want to book on your own time?</Text>
        <Text className="text-sm text-gray-500 mb-4 ml-12">
          If You want to book on your own time WhatsApp us
        </Text>
        <TouchableOpacity className="absolute right-6 top-6" onPress={handleWhatsAppPress}>
          <FontAwesome name="whatsapp" size={30} color="#25D366" />
        </TouchableOpacity>
      </View>

      {/* Ride Info Card */}
      <View className="bg-white rounded-xl p-4 mx-4 shadow-md">
        <LinearGradient
          colors={['#84FAB0', '#8FD3F4']}
          className="flex-row justify-between items-center p-6 rounded-lg mb-4"
        >
          <Text className="text-lg font-bold">{jsonData.source.label}</Text>
          <FontAwesome name="bus" size={24} color="black" />
          <Text className="text-lg font-bold">{jsonData.destination.label}</Text>
          <Text className="text-sm font-light">2 hrs</Text>
        </LinearGradient>

        {/* Ride Details */}
        <View className="mb-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-gray-600">Seats Starting from:</Text>
            <Text className="text-sm font-bold">Rs. 1000</Text>
          </View>

          <View className="flex-row justify-between mb-4">
            <Text className="text-sm text-gray-600">Available Seats:</Text>
            <Text className="text-sm font-bold">8</Text>
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm text-gray-600">Departure Time:</Text>
            <TouchableOpacity
              className="border border-gray-300 p-2 rounded-md"
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
        <Text className="text-xs text-gray-500 text-center mb-4">
          Either a Xylo or Innova will be sent according to availability
        </Text>
        <View className="flex-row justify-around mb-4">
          <Image source={require('../../assets/Images/car1.png')} className="w-20 h-16 my-4" />
          <Image source={require('../../assets/Images/car2.png')} className="w-20 h-16 my-4" />
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
          <Text className="text-sm mt-1">1 Trolley & 1 Handbag per seat</Text>
        </View>

        {/* Window Seat Note */}
        <Text className="text-xs text-red-600 text-center mb-4">*Window seat price may be different</Text>

        {/* Done Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Booking')}
          className="bg-[#8CC63F] py-3 px-10 rounded-full items-center"
        >
          <Text className="text-white font-bold text-lg">DONE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RideBookingScreen;