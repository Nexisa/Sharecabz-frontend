import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/AntDesign';
const TermsScreen = () => {
  const navigation = useNavigation();

  return (<ScrollView>
    <SafeAreaView className='p-0 '>
    <LinearGradient  colors={['#b4ec51', '#429321']} style={styles.linearGradient}>
      <View style={styles.container}>
      <TouchableOpacity className=' bg-slate-300 w-8 rounded-full p-2' onPress={navigation.goBack} >
          <Icon size={20} name="arrowleft" className=" h-1/2 text-gray-500" />
        </TouchableOpacity>

        <Text style={styles.heading}>Terms & Condition</Text>
        <View style={styles.crossContainer}>
          <Text className='font-bold text-lg'>Special Rules and Charges for Certain Customers, Pets and Baggage</Text>
          <Text style={styles.description}>
            {'\n'}{'\n'}1. ShareCabz does not offer special fares for children, students, or unaccompanied minors.
            {'\n'}{'\n'}2. Bookings are non-transferable. ShareCabz is not liable if a booking is used or refunded by someone other than the intended customer. 
            {'\n'}{'\n'}3. Name, origin, or destination changes are not allowed.
            {'\n'}{'\n'}4. Date or time changes can be made up to 24 hours before departure by contacting customer care and paying a Rs.100 rescheduling fee.
          </Text>
        </View>
        <View className='my-5' style={styles.detailBox}>
        <Text className='font-bold text-lg my-2'>Important Points for ShareCabz Passengers:</Text>
          <View style={styles.tableRow}>
            <Text className='font-bold my-2' style={styles.tableCell}>Terms & Condition</Text>
            <Text className='font-bold my-2' style={styles.tableCell}>Description</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Driver/Car Details</Text>
            <Text style={styles.tableCell}>Shared one hour before pickup.</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Luggage</Text>
            <Text style={styles.tableCell}>Max 2 bags per passenger.</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Prohibited Items</Text>
            <Text style={styles.tableCell}>Alcohol and contraband.
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Emergency Contact</Text>
            <Text style={styles.tableCell}>+91 7908970509</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Valid Booking Required</Text>
            <Text style={styles.tableCell}>Report non-booked 
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Feedback</Text>
            <Text style={styles.tableCell}>feedback@ShareCabz.com
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Safety Priority</Text>
            <Text style={styles.tableCell}>Especially for female passengers.
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Timeliness</Text>
            <Text style={styles.tableCell}>Arrive on time; cabs wait 15 mins max
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Seat Ticket</Text>
            <Text style={styles.tableCell}>Required for all passengers, including children 3 and up.
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Delays</Text>
            <Text style={styles.tableCell}> Not liable for delays due to traffic, landslides, or other unforeseen events.

            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
    </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    height: 1200
    
  },
  container: {
    marginHorizontal: 20,
    marginTop: '10%',
  },
  backButton: {
    backgroundColor: '#3D881B',
        width: 110,
        height: 46,
        top: 40,
        borderRadius: 10,
  },
  backButtonText: {
    fontSize: 20,
    textAlign: 'center',
    padding: 9,
    color: '#000',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '7%',
    textAlign: 'center',
  },
  crossContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    height: '45%', 
    borderRadius: 15,
    backgroundColor: '#EFEEEE94',
    padding: 20,
  },
  
  description: {
    fontFamily: 'Roboto',
    // fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'left',
  },
  detailBox: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: '50%',
    marginBottom: 30,
    padding: 3,
    borderRadius: 10,
    backgroundColor: '#EFEEEE94',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 1,
    // borderBottomWidth: 1,
    fontWeight: 'bold',
    backgroundColor: '#EFEEEE94',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    padding: 3,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default TermsScreen;
