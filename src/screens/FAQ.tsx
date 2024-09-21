import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/AntDesign';
const FaqScreen = () => {
  const navigation = useNavigation();

  return (<ScrollView>
    <SafeAreaView className='p-0 '>
    <LinearGradient  colors={['#b4ec51', '#429321']} style={styles.linearGradient}>
      <View style={styles.container}>
      <TouchableOpacity className=' bg-slate-300 w-8 rounded-full p-2' onPress={navigation.goBack} >
          <Icon size={20} name="arrowleft" className=" h-1/2 text-gray-500" />
        </TouchableOpacity>

        <Text style={styles.heading}>FAQ</Text>
        <View style={styles.crossContainer}>
          <Text style={styles.description}>
          <Text className='font-bold text-lg'>1. What is ShareCabz?</Text>
            {'\n'}ShareCabz is a ride-sharing platform that connects riders with drivers, offering a convenient and affordable way to travel.{'\n'}{'\n'}
            <Text className='font-bold text-lg'>2. How does ShareCabz work?</Text>
            {'\n'} Download the app, create an account, book a ride, and track your driver's location.{'\n'}{'\n'}
            <Text className='font-bold text-lg'>3. Is ShareCabz safe?</Text>
            {'\n'} Yes, ShareCabz prioritizes safety with features like driver verification, emergency assistance, and real-time tracking.{'\n'}{'\n'}
            <Text className='font-bold text-lg'>4. What payment methods are accepted?</Text>
            {'\n'}ShareCabz accepts various payment methods, including credit cards, debit cards, and digital wallets.{'\n'}{'\n'}
            <Text className='font-bold text-lg'>5. Can I cancel a ride after booking?</Text>
            {'\n'} Yes, you can cancel a ride up to a certain time before the scheduled pickup.{'\n'}{'\n'}
            <Text className='font-bold text-lg'>6. How are drivers verified?</Text>
            {'\n'} ShareCabz has strict verification processes in place to ensure the safety and reliability of its drivers.{'\n'}{'\n'}
            <Text className='font-bold text-lg'>7. What should I do if I encounter technical difficulties?</Text>
            {'\n'} Contact ShareCabz's customer support for assistance.{'\n'}{'\n'}

            </Text>
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
    height: 1100
    
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
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: '7%',
    textAlign: 'center',
  },
  crossContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    height: '80%', 
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
});

export default FaqScreen;
