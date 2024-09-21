import React from 'react';
import { View,  Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const DriverAllotment_Status = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const handleButtonPress = () => {
        navigation.navigate('AdminHome' as never);
    }

    return (
        <LinearGradient
            colors={['#CAF880', '#71CE7E']}
            className="flex-1"
        >
            <SafeAreaView className="flex-1">
                <View className="flex-1 items-center justify-center">
                    <Image
                        source={require('../../../assets/Tick.png')}
                        className="w-1/2 h-1/3 resizeMode-contain"
                    />
                </View>
                <View className="bg-white rounded-t-3xl h-1/3 p-8 items-center justify-between">
                    <Text className="text-3xl font-bold text-black text-center mb-4">
                        Driver Alloted Successfully 
                    </Text>
                    
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

export default DriverAllotment_Status;