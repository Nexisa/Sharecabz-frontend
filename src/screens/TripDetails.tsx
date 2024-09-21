import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/Store';
import { LinearGradient } from 'expo-linear-gradient';
import ProfileModal from '../components/ProfileModal';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

interface Booking {
  _id: string;
  userId: string;
  username: string;
  sourceLocation: string;
  destinationLocation: string;
  pickupPoint: string;
  seats: number;
  startDate: string;
  endDate: string;
  departureTime: string;
  totalDays: number;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const TripDetailsScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingData, setBookingData] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { source, destination, date, time } = useSelector((state: RootState) => state.jsonData.data);

  const toggleProfileModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const fetchBookingData = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API}/booking/user/bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.success) {
        setBookingData(result.bookings[0] || null);
      } else {
        setError('Failed to fetch booking data.');
      }
    } catch (error) {
      setError('An error occurred while fetching booking data.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRide = async () => {
    if (!bookingData) {
      Toast.show({
        text1: 'No ride booked',
        text2: 'Please book a ride before cancelling.',
        type: 'info',
      });
      return;
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API}/booking/deletebooking/${bookingData._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setBookingData(null); // Clear booking data
        Toast.show({
          text1: 'Ride Cancelled',
          text2: 'Your booking has been successfully cancelled.',
          type: 'success',
        });
        navigation.navigate("Cancel" as never); // Navigate to Cancellation PopUp screen
      } else {
        Toast.show({
          text1: 'Error',
          text2: 'Failed to cancel the ride. Please try again.',
          type: 'error',
        });
      }
    } catch (error) {
      Toast.show({
        text1: 'Error',
        text2: 'An error occurred while cancelling the ride.',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  const { width, height } = Dimensions.get('window');

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['rgba(202, 248, 128, 0.72)', 'rgba(113, 206, 126, 0.72)']}
      style={{ flex: 1, paddingTop: 50 }}
    >
      <View className="absolute top-0 left-0 right-0 flex-row justify-between px-4 z-10">
        <TouchableOpacity onPress={handleBackPress} className="p-2 mt-14">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleProfileModal} className="p-2 mt-6">
          <ProfileModal modalVisible={modalVisible} toggleModal={toggleProfileModal} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center mt-24">
        <Image
          source={require('../../assets/Images/bookingconfirmed.png')}
          style={{ width: width * 0.5, height: 150 }}
          className="resize-contain"
        />
      </View>

      <View
        style={{ top: height * 0.5 }} 
        className="absolute bg-white bg-opacity-80 rounded-xl p-5 mx-5 w-11/12 justify-center items-center"
      >
        <Text className="text-2xl font-bold mb-4">Trip Details</Text>

        {bookingData ? (
          <>
            <View className="flex-row justify-between w-full my-3">
              <View className="items-center w-2/5">
                <Text className="text-lg font-bold">Date</Text>
                <Text className="text-base mt-2">{new Date(bookingData.startDate).toLocaleDateString()}</Text>
              </View>
              <View className="items-center w-2/5">
                <Text className="text-lg font-bold">Time</Text>
                <Text className="text-base mt-2">{bookingData.departureTime || "Time not available"}</Text>
              </View>
            </View>

            <View className="flex-row justify-between w-full my-3">
              <View className="items-center w-2/5">
                <Ionicons name="location-sharp" size={24} color="green" />
                <Text className="text-base mt-2">{bookingData.sourceLocation}</Text>
              </View>
              <View className="items-center w-2/5">
                <Ionicons name="location-sharp" size={24} color="red" />
                <Text className="text-base mt-2">{bookingData.destinationLocation}</Text>
              </View>
            </View>
          </>
        ) : (
          <Text className="text-lg font-bold">No booking details available.</Text>
        )}

        <TouchableOpacity
          className={`rounded-lg py-3 px-6 mt-5 ${bookingData ? 'bg-red-600' : 'bg-gray-400'}`}
          onPress={handleCancelRide}
          disabled={!bookingData}
        >
          <Text className="text-white text-lg font-bold">Cancel Ride</Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </LinearGradient>
  );
};

export default TripDetailsScreen;
