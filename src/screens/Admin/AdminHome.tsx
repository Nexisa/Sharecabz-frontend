import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logout } from "../../utils/Slice";

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

const AdminHome = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const api = process.env.EXPO_PUBLIC_API;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
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
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
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

  const renderItem = ({ item }: { item: Booking }) => (
    <TouchableOpacity onPress={() => handlePress(item._id)} style={styles.row}>
      <Text style={styles.name}>{item.username || 'N/A'}</Text>
      <Text style={styles.bookingId}>B{item._id.slice(-6)}</Text>
      <Ionicons name="eye-outline" size={24} color="#000" />
    </TouchableOpacity>
  );

  const handlePress = (bookingId: string) => {
    // Navigate to booking details page
    navigation.navigate("UserDetailPage" as never, { bookingId } as never);
  };

  const openmodal = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    dispatch(logout());
    navigation.navigate('SignIn' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" />
          <Text style={styles.searchText}>Search By booking Id...</Text>
        </View>
        <TouchableOpacity onPress={openmodal}>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Booking Details</Text>

      <View style={styles.listHeader}>
        <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
          <Text style={styles.headerText}>Name</Text>
          <Ionicons
            name={sortOrder === "asc" ? "arrow-up" : "arrow-down"}
            size={16}
            color="#000"
          />
        </TouchableOpacity>
        <Text style={styles.headerTextLeft}>Booking ID</Text>
      </View>

      <FlatList
        data={sortedBookings}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  searchText: {
    marginLeft: 10,
    color: "#000000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
  },
  headerTextLeft: {
    fontWeight: "bold",
    marginRight: 63,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  name: {
    flex: 1,
  },
  bookingId: {
    flex: 1,
    textAlign: "center",
  },
});


export default AdminHome;