import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/Store';
import { LinearGradient } from 'expo-linear-gradient';
import ProfileModal from '../components/ProfileModal';
import { useNavigation } from '@react-navigation/native';

const TripDetailsScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch data from jsonSlice
  const { source, destination, date, time, bookingId } = useSelector((state: RootState) => state.jsonData.data);
  const toggleProfileModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const { width, height } = Dimensions.get('window');

  return (
    <LinearGradient
      colors={['rgba(202, 248, 128, 0.72)', 'rgba(113, 206, 126, 0.72)']}
      style={{ flex: 1, paddingTop: 50 }}
    >
      {/* Top header with back button and profile modal */}
      <View className="absolute top-0 left-0 right-0 flex-row justify-between px-4 z-10">
        {/* Back Icon */}
        <TouchableOpacity onPress={handleBackPress} className="p-2 mt-14">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Profile Icon */}
        <TouchableOpacity onPress={toggleProfileModal} className="p-2 mt-6">
          <ProfileModal modalVisible={modalVisible} toggleModal={toggleProfileModal} />
        </TouchableOpacity>
      </View>

      {/* Trip Illustration */}
      <View className="flex-1 items-center mt-24">
        <Image
          source={require('../../assets/Images/bookingconfirmed.png')}
          style={{ width: width * 0.5, height: 150 }}
          className="resize-contain"
        />
      </View>

      {/* Trip Details */}
      <View
        style={{ top: height * 0.5 }} // Adjusted to lift the card higher
        className="absolute bg-white bg-opacity-80 rounded-xl p-5 mx-5 w-11/12 justify-center items-center"
      >
        <Text className="text-2xl font-bold mb-4">Trip Details</Text>

        <View className="flex-row justify-between w-full my-3">
          <View className="items-center w-2/5">
            <Text className="text-lg font-bold">Date</Text>
            <Text className="text-base mt-2">{date || 'N/A'}</Text>
          </View>
          <View className="items-center w-2/5">
            <Text className="text-lg font-bold">Time</Text>
            <Text className="text-base mt-2">{time || 'N/A'}</Text>
          </View>
        </View>

        <View className="flex-row justify-between w-full my-3">
          <View className="items-center w-2/5">
            <Ionicons name="location-sharp" size={24} color="green" />
            <Text className="text-base mt-2">{source?.label || 'Source'}</Text>
          </View>
          <View className="items-center w-2/5">
            <Ionicons name="location-sharp" size={24} color="red" />
            <Text className="text-base mt-2">{destination?.label || 'Destination'}</Text>
          </View>
        </View>

        <Text className="mt-4 text-base text-gray-600">Booking ID: {bookingId || 'N/A'}</Text>

        {/* Cancel Ride Button */}
        <TouchableOpacity className="bg-red-600 rounded-lg py-3 px-6 mt-5" onPress={() => navigation.navigate("Cancel" as never)}>
          <Text className="text-white text-lg font-bold">Cancel Ride</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default TripDetailsScreen;
