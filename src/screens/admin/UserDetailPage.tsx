import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  AdminHome: undefined;
  DriverAllocation: { bookingId: string };
  UserDetailPage: { bookingId: string }; 
};

type UserDetailPageNavigationProp = StackNavigationProp<RootStackParamList, 'UserDetailPage'>;
type UserDetailPageRouteProp = RouteProp<RootStackParamList, 'UserDetailPage'>;

const UserDetailPage = () => {
  const navigation = useNavigation<UserDetailPageNavigationProp>();
  const route = useRoute<UserDetailPageRouteProp>();
  
  const bookingId = route.params.bookingId;

  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    phone: '',
    sourceLocation: '',
    destinationLocation: '',
    pickupLocation: '',
    date: '',
    departureTime: '',
    totalSeats: '',
    paymentStatus: '',
  });
  const [loading, setLoading] = useState<boolean>(true); // Added loading state
  
  const api = process.env.EXPO_PUBLIC_API;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date); 
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

      setUserDetails({
        username: data.username || 'N/A',
        email: data.userId?.email || 'N/A',
        phone: data.userId?.phone || 'N/A',
        sourceLocation: data.sourceLocation || 'N/A',
        destinationLocation: data.destinationLocation || 'N/A',
        pickupLocation: data.pickupPoint || 'N/A',
        date: formatDate(data.startDate),
        departureTime: data.departureTime,
        totalSeats: data.seats ? data.seats.toString() : 'N/A',
        paymentStatus: data.paymentStatus || 'N/A',
      });

      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.log('Error fetching user details:', error);
      setLoading(false); // Set loading to false in case of error
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

  const renderDetailItem = (label: string, value: string) => (
    <View className="mb-4">
      <Text className="text-sm font-bold text-gray-600 mb-1">{label}</Text>
      <TextInput 
        className="border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700" 
        value={value} 
        editable={false} 
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        <View className="flex-row items-center p-4 border-b border-gray-200 bg-white mt-6">
          <TouchableOpacity onPress={handleBackPress} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text className="text-lg font-bold ml-4">User Booking Details</Text>
        </View>

        {loading ? ( // Show loading indicator when fetching data
          <View className="flex-1 justify-center items-center mt-10">
            <ActivityIndicator size="large" color="#00ff00" />
            <Text className="mt-3 text-gray-500">Loading...</Text>
          </View>
        ) : (
          <>
            <View className="items-center py-6 bg-white mb-4">
              <Image
                className="w-24 h-24 rounded-full mb-3"
                source={require('../../../assets/Images/profile_image.png')}
              />
              <Text className="text-xl font-bold text-gray-800">{userDetails.username || 'N/A'}</Text>
              <Text className="text-sm text-gray-600">{userDetails.email}</Text>
            </View>

            <View className="bg-white rounded-lg mx-4 p-4 mb-6">
              {renderDetailItem('Email', userDetails.email)}
              {renderDetailItem('Phone', userDetails.phone)}
              {renderDetailItem('Source Location', userDetails.sourceLocation)}
              {renderDetailItem('Destination Location', userDetails.destinationLocation)}
              {renderDetailItem('Pickup Location', userDetails.pickupLocation)}
              {renderDetailItem('Date', userDetails.date)}
              {renderDetailItem('Time', userDetails.departureTime)}
              {renderDetailItem('Total Seats', userDetails.totalSeats)}
            </View>

            <View className="flex-row justify-between px-4 mb-6">
              <TouchableOpacity 
                onPress={() => navigation.navigate('AdminHome')} 
                className="bg-red-500 py-4 px-6 rounded-lg flex-1 mr-2 items-center"
              >
                <Text className="text-white font-bold text-base">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => navigation.navigate('DriverAllocation', { bookingId })} 
                className="bg-green-500 py-4 px-6 rounded-lg flex-1 ml-2 items-center"
              >
                <Text className="text-white font-bold text-base">Next Page</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDetailPage;
