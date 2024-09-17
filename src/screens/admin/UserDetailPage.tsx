import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UserDetailPage = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    console.log('Back button pressed');
    navigation.goBack();
  };
  const fetchUserDetails = () => {
    // Fetch user details from API
    console.log('Fetching user details');
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
        <Text style={styles.name}>Emily Smith</Text>
        <Text style={styles.username}>@emilysmith</Text>
      </View>

      {/* User Booking Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Email</Text>
        <TextInput style={styles.input} value="emily.smith@example.com" editable={false} />
        <Text style={styles.title}>Phone</Text>
        <TextInput style={styles.input} value="+1 234 567 8901" editable={false} />
        <Text style={styles.title}>Source Location</Text>
        <TextInput style={styles.input} value="Gangtok" editable={false} placeholder="Source Location" />
        <Text style={styles.title}>Destination Location</Text>
        <TextInput style={styles.input} value="Lachung" editable={false} placeholder="Destination Location" />
        <Text style={styles.title}>Pickup Location</Text>
        <TextInput style={styles.input} value="Kazi Road power house" editable={false} placeholder="Pickup Location" />
        <Text style={styles.title}>Date</Text>
        <TextInput style={styles.input} value="20/09/2024" editable={false} />
        <Text style={styles.title}>Time</Text>
        <TextInput style={styles.input} value="07:00 AM" editable={false} />
        <Text style={styles.title}>Total Seats</Text>
        <TextInput style={styles.input} value="5" editable={false} placeholder="Total Seats" />

        {/* Payment Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Payment Status</Text>
          <Text style={styles.statusCompleted}>Completed</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText} onPress={() => navigation.navigate("AdminHome" as never)}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("DriverAllocation" as never)} style={styles.nextButton}>
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
    marginTop:100,
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
    padding:5,
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
    padding:5,
  },
  statusCompleted: {
    fontSize: 20,
    color: '#28a745', // Green color for completed
    fontWeight: 'bold',
    padding:5,
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
