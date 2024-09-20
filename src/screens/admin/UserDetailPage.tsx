import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDetailPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //get bookingId from prev screen
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
const api = process.env.EXPO_PUBLIC_API;
  // Function to fetch user details from API
  const fetchUserDetails = async () => {
    try {
      // Fetch data from the API
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${api}/booking/getbooking/${bookingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const res=await response.json();
      const data = res.booking;
      //console.log('User details:', data);
      // Set the state with the fetched data
      setUserDetails({
        email: data.userId.email,
        phone: data.userId.phone,
        sourceLocation: data.sourceLocation,
        destinationLocation: data.destinationLocation,
        pickupLocation: data.pickupPoint,
        date: data.startDate,
        time: data.time,
        totalSeats: data.seats,
        paymentStatus: data.paymentStatus,
      });
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    // Fetch user details on component mount
    fetchUserDetails();
  }, []);

  const handleBackPress = () => {
    console.log('Back button pressed');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View className="absolute top-1 left-0 right-0 flex-row px-2 ">
        {/* Back Icon on the left */}
        <TouchableOpacity onPress={handleBackPress} className="p-2 mt-14 ">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="p-2 mt-14 ">User Booking Details</Text>
      </View>

      <View style={styles.userDetail}>
        <Image
          style={styles.avatar}
          source={require('../../../assets/Images/profile_image.png')} 
        />
        <Text style={styles.name}>{userDetails.username || "N/A"}</Text>
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
        <TextInput style={styles.input} value={userDetails.date} editable={false}/>
        
        <Text style={styles.title}>Time</Text>
        <TextInput style={styles.input} value={userDetails.time} editable={false}/>
        
        <Text style={styles.title}>Total Seats</Text>
        <TextInput style={styles.input} value={userDetails.totalSeats} editable={false} />

        {/* Payment Status */}
        {/* <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Payment Status</Text>
      
        </View> */}

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('AdminHome' as never)} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('DriverAllocation' as never,{bookingId} as never)} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next Page</Text>
          </TouchableOpacity>
        </View>
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
  statusContainer: {
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    padding: 5,
  },
  statusCompleted: {
    fontSize: 20,
    color: '#28a745', // Green color for completed
    fontWeight: 'bold',
    padding: 5,
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
