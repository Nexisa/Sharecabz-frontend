import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../utils/Slice";
import { useNavigation } from "@react-navigation/native";
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from "expo-linear-gradient";

const CancellationPopUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleButtonPress = () => {
    dispatch(login());
    navigation.navigate("Home" as never); //Redirect To the Home Page .....
  };

  return (
    <LinearGradient colors={['#CAF880', '#71CE7E']} className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center">
          <Image
            source={require("../../assets/cancellation.png")}
            className="resizeMode-contain"
          />
        </View>
        <View className="bg-white rounded-t-3xl h-1/3 p-8 items-center justify-between">
          <Text className="text-3xl font-bold text-black text-center mb-4">
            OOPS!! SEEMS YOU CANCELLED THE RIDE
          </Text>

          <TouchableOpacity
            onPress={handleButtonPress}
            className="bg-[#81D742] w-2/3 rounded-2xl py-3"
          >
            <Text className="text-black text-xl font-semibold text-center">
              CLOSE
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CancellationPopUpScreen;
