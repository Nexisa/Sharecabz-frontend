import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../utils/Slice';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from '@expo/vector-icons/Entypo';
const { width, height } = Dimensions.get('window');

const BookingDoneScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const handleButtonPress = () => {
        dispatch(login());
        navigation.navigate('Home' as never);
    }

    return (
        <LinearGradient
            colors={['#b4ec51', '#429321']}
            className="flex-1"
        >
            <SafeAreaView className="flex-1">
                <View className="flex-1 items-center justify-center">
                    <Image
                        source={require('../../assets/Tick.png')}
                        className="w-1/2 h-1/3 resizeMode-contain"
                    />
                </View>
                <View className="bg-white rounded-t-3xl h-1/3 p-8 items-center justify-between">
                    <Text className="text-3xl font-bold text-black text-center mb-4">
                        Thank You for Booking
                    </Text>
                    <View className="w-full items-center">
                    <Entypo name="location" size={50} color="red" />
                    </View>
                    <TouchableOpacity
                        onPress={handleButtonPress}
                        className="bg-[#81D742] w-2/3 rounded-2xl py-3"
                    >
                        <Text className="text-black text-xl font-semibold text-center">
                            DONE
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default BookingDoneScreen;