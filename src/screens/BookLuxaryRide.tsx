import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import IIcon from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../utils/JsonSlice';
import Dropdowncom from '../components/Dropdowncom';
import { useNavigation } from '@react-navigation/native';
import ProfileModal from '../components/ProfileModal';
import Toast from 'react-native-toast-message';


const LuxuryRideBooking = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const jsonData = useSelector((state: any) => state.jsonData.data);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  const handleUpdate = (f: any, v: any) => {
    dispatch(updateField({ field: f, value: v }));
  };

  const handleDateChange = (date: Date) => {
    const selectedDate = new Date(date.toDateString());
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate >= today) {
      handleUpdate('date', date.toDateString());
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid Date',
        text2: 'You cannot book for a past date.'
      });
    }
  };

  const handleDone = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(jsonData.date);

    // Check if all required fields are filled
    if (!jsonData.source || !jsonData.destination || !jsonData.pickupPoint || !jsonData.date) {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please fill all the fields before proceeding.'
      });
      return;
    }

    // Check if the selected date is valid
    if (selectedDate >= today) {
      navigation.navigate("FinalScreen" as never);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid Date',
        text2: 'You cannot book for a past date.'
      });
    }
  };


  const toggleProfileModal = () => {
    setModalVisible(!modalVisible);
  };

  const source = [
    { label: 'Gangtok', value: 'gk' },
    { label: 'Siliguri', value: 'si' },
    { label: 'Darjeeling', value: 'dj' },
  ];
  const destination = [
    { label: 'Nathula', value: 'na' },
    { label: 'Lachung', value: 'la' },
  ];
  const pickupPoints = [
    { label: 'Kazi Road Power Office', value: 'krpo' },
    { label: 'Nam Nang Legislative Assembly', value: 'nnla' },
    { label: 'Zero Point', value: 'zp' },
    { label: 'White Hill', value: 'wh' },
    { label: 'Chanmari Forest Check Post', value: 'cfcp' },
  ];

  const content = [
    { key: 'dropdown-source', component: <Dropdowncom label="Select source location" iconname="location-dot" color="green" data={source} onSelect={(item) => handleUpdate('source', item)} focusColor="#81D742" /> },
    { key: 'dropdown-destination', component: <Dropdowncom label="Select destination location" iconname="location-crosshairs" color="red" data={destination} onSelect={(item) => handleUpdate('destination', item)} focusColor="#81D742" /> },
    { key: 'dropdown-pickup', component: <Dropdowncom label="Select pickup point" iconname="truck-pickup" color="black" data={pickupPoints} onSelect={(item) => handleUpdate('pickupPoint', item)} focusColor="#81D742" /> },
    { key: 'date-text', component: <Text className="mt-8 mb-2">Select your departure date: {jsonData.date}</Text> },


    {
      key: 'calendar', component: (
        <View style={{
          backgroundColor: 'white',
          borderWidth: 1, // Ensures all borders are shown
          borderColor: 'gray', // Set border color
          borderRadius: 10, // Rounded corners
          marginBottom: 40,
          marginTop: 16,
          width: width * 0.8,  // 80% of the screen width for responsiveness
          alignSelf: 'center',
          height: width * 0.8, // Height adjusted to 70% of width to maintain aspect ratio
          maxWidth: width,     // Ensure it doesn't exceed screen width
          padding: 4,
          // overflow: 'hidden',  // To avoid any child component overflow cutting off the border
        }}>
          <Calendar
            onDayPress={handleDateChange}
            markedDates={{
              [jsonData.date]: { selected: true, selectedColor: '#4CAF50', selectedTextColor: '#FFFFFF' }
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
            theme={{
              todayTextColor: '#81D742',
              arrowColor: 'green',
              textMonthFontSize: 16,         // Reduced the font size of the month title
              textDayHeaderFontSize: 12,     // Reduced the font size of the day headers (S, M, T, etc.)
              textDayFontSize: 10,           // Reduced the font size of day numbers (1, 2, 3, etc.)
              textDayStyle: {
                fontSize: 10,                // Ensure the font size is reduced for day numbers
                color: '#000000',            // Ensure black color for all days
              },
              selectedDayBackgroundColor: '#4CAF50',
              selectedDayTextColor: '#FFFFFF',
              todayBackgroundColor: '#E8E8E8',
              'stylesheet.calendar.header': {
                week: {
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  backgroundColor: '#81D74270', // Semi-transparent green for the header
                  borderRadius: 4,
                },
              },
              // Optional styling for individual day cells (to reduce size further)
              'stylesheet.day.basic': {
                base: {
                  width: 30,        // Adjust width for day cells
                  height: 30,       // Adjust height for day cells
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                text: {
                  color: '#000000',  // Set the color for the day text
                  fontSize: 10,      // Apply reduced font size for the days
                },
              },
            }}
            renderArrow={(direction: 'left' | 'right') =>
              direction === 'left' ? (
                <IIcon name="angle-left" size={28} color="green" style={{ marginLeft: 10 }} />
              ) : (
                <IIcon name="angle-right" size={28} color="green" style={{ marginRight: 10 }} />
              )
            }
          />
        </View>
      )
    },

    {
      key: 'done-button', component: (
        <TouchableOpacity onPress={handleDone} style={{
          width: width * 0.8,
          backgroundColor: '#4CAF50',
          padding: 12,
          borderRadius: 8,
          marginTop: 16,
          alignSelf: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 5
        }}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>DONE</Text>
        </TouchableOpacity>
      )
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="flex-row items-center justify-between mt-2">
        <Image source={require('../../assets/Images/try.png')} className="w-28 h-28 self-end" resizeMode="contain" />

        {/* Profile Modal on the right */}
        <TouchableOpacity onPress={toggleProfileModal} className="p-2">
          <ProfileModal modalVisible={modalVisible} toggleModal={toggleProfileModal} />
        </TouchableOpacity>
      </View>

      <Text className="text-3xl font-bold mb-4">Book Your Luxury Ride</Text>
      <Text className="text-gray-600 mb-6">Experience the comfort of our luxury cars, Innova and Xylo, for your next journey.</Text>

      {/* Use FlatList for content */}
      <FlatList
        data={content}
        renderItem={({ item }) => <View key={item.key}>{item.component}</View>}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingHorizontal: 30, paddingBottom: 10 }}
      />

      {/* Toast Message */}
      <Toast />
    </SafeAreaView>
  );
};

export default LuxuryRideBooking;