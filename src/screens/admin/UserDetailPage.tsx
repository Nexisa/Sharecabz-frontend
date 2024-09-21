import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

// Define types for your stack
type RootStackParamList = {
  AdminHome: undefined;
  DriverAllocation: { bookingId: string };
  UserDetailPage: { bookingId: string }; // Include bookingId here
};

// Define types for navigation and route props
type UserDetailPageNavigationProp = StackNavigationProp<RootStackParamList, 'UserDetailPage'>;
type UserDetailPageRouteProp = RouteProp<RootStackParamList, 'UserDetailPage'>;

const UserDetailPage = () => {
  const navigation = useNavigation<UserDetailPageNavigationProp>();
  const route = useRoute<UserDetailPageRouteProp>(); // Ensure the route type is used
  
  const bookingId = route.params.bookingId; // No need for optional chaining here since bookingId is defined in the route params

  const [userDetails, setUserDetails] = useState({
    username: '', // Added username field
    email: '',
    phone: '',
    sourceLocation: '',
    destinationLocation: '',
    pickupLocation: '',
    date: '',
    time: '',
    totalSeats: '',
    paymentStatus: '',
  });
  
  const api = process.env.EXPO_PUBLIC_API; // Use your actual environment variable

  // Utility function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date); // Formats the date as 'DD/MM/YYYY'
  };

  // Utility function to format time
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }); // Formats time as 'hh:mm AM/PM'
  };

  const fetchUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      const response = await fetch(`${api}/booking/getbooking/${bookingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log('Error fetching user details:', response.statusText);
        return;
      }

      const res = await response.json();
      const data = res.booking;

      // Ensure you map the correct field names from your API response
      setUserDetails({
        username: data.userId.username || 'N/A', // Assuming 'username' exists on userId
        email: data.userId.email || 'N/A',
        phone: data.userId.phone || 'N/A', // Ensure phone exists on userId
        sourceLocation: data.sourceLocation || 'N/A',
        destinationLocation: data.destinationLocation || 'N/A',
        pickupLocation: data.pickupPoint || 'N/A',
        date: formatDate(data.startDate), // Format date using the custom function
        time: formatTime(data.departureTime), // Format time using the custom function
        totalSeats: data.seats.toString() || 'N/A', // Convert seats to string
        paymentStatus: data.paymentStatus || 'N/A',
      });
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    if (bookingId) {
      fetchUserDetails();
    }
  }, [bookingId]);

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex-row items-center p-6">
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="ml-5 text-lg mt-10">User Booking Details</Text>
      </View>

      <View className="items-center mt-24 mb-5">
        <Image
          className="w-20 h-20 rounded-full mb-3"
          source={require('../../../assets/Images/profile_image.png')}
        />
        <Text className="text-xl font-bold text-gray-800">{userDetails.username || 'N/A'}</Text>
        <Text className="text-sm text-gray-600">{userDetails.email}</Text>
      </View>

      <View className="px-4 mb-5">
        <Text className="font-bold py-1">Email</Text>
        <TextInput className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-100 text-gray-700" value={userDetails.email} editable={false} />

        <Text className="font-bold py-1">Phone</Text>
        <TextInput className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-100 text-gray-700" value={userDetails.phone} editable={false} />

        <Text className="font-bold py-1">Source Location</Text>
        <TextInput className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-100 text-gray-700" value={userDetails.sourceLocation} editable={false} />

        <Text className="font-bold py-1">Destination Location</Text>
        <TextInput className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-100 text-gray-700" value={userDetails.destinationLocation} editable={false} />

        <Text className="font-bold py-1">Pickup Location</Text>
        <TextInput className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-100 text-gray-700" value={userDetails.pickupLocation} editable={false} />

        <Text className="font-bold py-1">Date</Text>
        <TextInput className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-100 text-gray-700" value={userDetails.date} editable={false} />

        <Text className="font-bold py-1">Time</Text>
        <TextInput className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-100 text-gray-700" value={userDetails.time} editable={false} />

        <Text className="font-bold py-1">Total Seats</Text>
        <TextInput className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-100 text-gray-700" value={userDetails.totalSeats} editable={false} />
      </View>

      <View className="flex-row justify-between px-4 mb-6">
        <TouchableOpacity onPress={() => navigation.navigate('AdminHome')} className="bg-red-500 py-4 px-6 rounded-lg flex-1 mr-2 items-center">
          <Text className="text-white font-bold text-base">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('DriverAllocation', { bookingId })} className="bg-green-500 py-4 px-6 rounded-lg flex-1 ml-2 items-center">
          <Text className="text-white font-bold text-base">Next Page</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserDetailPage;