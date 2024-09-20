import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDetailPage = () => {
  // Use 'any' for navigation and route to avoid type errors
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // Get bookingId from route parameters
  const bookingId = route.params?.bookingId;

  // State to store user details fetched from API
  const [userDetails, setUserDetails] = useState({
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

  // Replace this with your actual API endpoint
  const api = process.env.EXPO_PUBLIC_API;

  // Function to fetch user details from API
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
        email: data.userId.email,
        phone: data.userId.phone,
        sourceLocation: data.sourceLocation,
        destinationLocation: data.destinationLocation,
        pickupLocation: data.pickupPoint,
        date: data.startDate,
        time: data.departureTime,
        totalSeats: data.seats,
        paymentStatus: data.paymentStatus,
      });
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    // Fetch user details on component mount
    if (bookingId) {
      fetchUserDetails();
    }
  }, [bookingId]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View className="absolute top-1 left-0 right-0 flex-row px-2">
        <TouchableOpacity onPress={handleBackPress} className="p-2 mt-14">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="p-2 mt-14">User Booking Details</Text>
      </View>

      <View style={styles.userDetail}>
        <Image
          style={styles.avatar}
          source={require('../../../assets/Images/profile_image.png')}
        />
        <Text style={styles.name}>{userDetails.email || 'N/A'}</Text>
        <Text style={styles.username}>{userDetails.email}</Text>
      </View>

      {/* User Booking Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Email</Text>
        <TextInput style={styles.input} value={userDetails.email} editable={false} />

        <Text style={styles.title}>Phone</Text>
        <TextInput style={styles.input} value={userDetails.phone} editable={false} />

        <Text style={styles.title}>Source Location</Text>
        <TextInput style={styles.input} value={userDetails.sourceLocation} editable={false} />

        <Text style={styles.title}>Destination Location</Text>
        <TextInput style={styles.input} value={userDetails.destinationLocation} editable={false} />

        <Text style={styles.title}>Pickup Location</Text>
        <TextInput style={styles.input} value={userDetails.pickupLocation} editable={false} />

        <Text style={styles.title}>Date</Text>
        <TextInput style={styles.input} value={userDetails.date} editable={false} />

        <Text style={styles.title}>Time</Text>
        <TextInput style={styles.input} value={userDetails.time} editable={false} />

        <Text style={styles.title}>Total Seats</Text>
        <TextInput style={styles.input} value={userDetails.totalSeats} editable={false} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('AdminHome')} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('DriverAllocation', { bookingId })} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next Page</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  userDetail: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 14,
    color: '#888',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#dc3545', // Red for cancel
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#28a745', // Green for next page
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserDetailPage;
