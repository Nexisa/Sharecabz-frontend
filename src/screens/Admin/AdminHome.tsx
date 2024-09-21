import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View, TextInput, Alert, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logout } from "../../utils/Slice";
import { StackNavigationProp } from '@react-navigation/stack';

// Define your booking interface
interface Booking {
  _id: string;
  username: string;
  sourceLocation: string;
  destinationLocation: string;
  pickupPoint: string;
  startDate: string;
  endDate: string;
  seats: number;
  paymentStatus: string;
}

// Define navigation parameters for TypeScript
type RootStackParamList = {
  UserDetailPage: { bookingId: string };
  SignIn: undefined;
};

type AdminHomeNavigationProp = StackNavigationProp<RootStackParamList>;

const AdminHome = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);  // New state for refreshing
  const navigation = useNavigation<AdminHomeNavigationProp>();
  const dispatch = useDispatch();
  const api = process.env.EXPO_PUBLIC_API || 'http://localhost:3000/api'; // Fallback URL

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setRefreshing(true);  // Set refreshing to true when fetching starts
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${api}/booking/getallbookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const res = await response.json();
      if (res.success && res.bookings) {
        setBookings(res.bookings);
      } else {
        throw new Error(res.message || "Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      Alert.alert("Error", "Could not fetch bookings. Please try again later.");
    } finally {
      setRefreshing(false);  // Set refreshing to false once fetching is done
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    if (a.username && b.username) {
      return sortOrder === "asc"
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username);
    }
    return 0;
  });

  const filteredBookings = sortedBookings.filter((booking) =>
    booking._id.includes(searchQuery) || booking.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: Booking }) => (
    <TouchableOpacity onPress={() => handlePress(item._id)} className="flex-row justify-between items-center px-5 py-4 border-b border-gray-300">
      <Text className="flex-1">{item.username || 'N/A'}</Text>
      <Text className="flex-1 text-center">B{item._id.slice(-6)}</Text>
      <Ionicons name="eye-outline" size={24} color="#000" />
    </TouchableOpacity>
  );

  const handlePress = (bookingId: string) => {
    navigation.navigate("UserDetailPage", { bookingId });
  };

  const openModal = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    dispatch(logout());
    navigation.navigate('SignIn');
  };

  const onRefresh = () => {
    fetchBookings();  // Call fetchBookings to refresh the data
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center p-2 border-b border-gray-300">
        <View className="flex-1 flex-row items-center bg-gray-200 rounded-full mx-2 px-2 h-10">
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by booking ID or username..."
            className="ml-2 text-black"
          />
        </View>
        <TouchableOpacity onPress={openModal}>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Text className="text-2xl font-bold m-5">Booking Details</Text>

      <View className="flex-row justify-between px-5 py-2 border-b border-gray-300">
        <TouchableOpacity onPress={toggleSortOrder} className="flex-row items-center">
          <Text className="font-bold">Name</Text>
          <Ionicons name={sortOrder === "asc" ? "arrow-up" : "arrow-down"} size={16} color="#000" />
        </TouchableOpacity>
        <Text className="font-bold mr-16">Booking ID</Text>
      </View>

      {filteredBookings.length === 0 ? (
        <Text className="text-center mt-5 text-gray-500">No bookings available</Text>
      ) : (
        <FlatList
          data={filteredBookings}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          initialNumToRender={10}
          removeClippedSubviews={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#000"
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default AdminHome;