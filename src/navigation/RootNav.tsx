import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from 'react-native-toast-message';

import { useDispatch, useSelector } from "react-redux";
import { login, selectIsAuthenticated } from "../utils/Slice";

import Home from "../screens/Home";
import BookLuxuryRideScreen from "../screens/BookLuxaryRide";
import SignIn from "../screens/SignIn";
import SignUpScreen from "../screens/SignUp";
import ForgotPassword from "../screens/ForgetPasswordScreen";
import CancellationPopUpScreen from "../screens/CancellationPopUp";
import CancellationPolicyScreen from "../screens/Cancellation_Policy";
import FinalStage from "../screens/FinalStage";
import ProfileScreen from "../screens/Profile";
import BookingDoneScreen from "../screens/BookingDone";
import AboutUs from "../screens/AboutUs";
import TermsScreen from "../screens/TermsAndCondition";
import ContactUs from "../screens/ContactUs";
import FaqScreen from "../screens/FAQ";
import Activity from "../screens/TripDetails";

import AdminHome from "../screens/Admin/AdminHome";
import JsonSlice, { updateField } from "../utils/JsonSlice";
import UserDetailPage from "../screens/Admin/UserDetailPage";
import DriverAllocation from "../screens/Admin/DriverAllocation";
import AllotmentStatusPage from "../screens/Admin/DriverAllotment_Status";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>

);

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Book" component={BookLuxuryRideScreen} />
    <Stack.Screen name="Cancel" component={CancellationPopUpScreen} />
    <Stack.Screen name="Policy" component={CancellationPolicyScreen} />
    <Stack.Screen name="Booking" component={BookingDoneScreen} />
    <Stack.Screen name="Terms" component={TermsScreen} />
    <Stack.Screen name="FAQ" component={FaqScreen} />

    <Stack.Screen name="FinalScreen" component={FinalStage} />
    <Stack.Screen name="Activity" component={Activity} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="About Us" component={AboutUs} />
    <Stack.Screen name="ContactUs" component={ContactUs} />

    <Stack.Screen name="AdminHome" component={AdminHome} />
    <Stack.Screen name="UserDetailPage" component={UserDetailPage} />
    <Stack.Screen name="DriverAllocation" component={DriverAllocation} />
    <Stack.Screen name="Status" component={AllotmentStatusPage} />
  </Stack.Navigator>
);

const RootNav = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const scr = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch(login());
    }
    if (token) {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        if(user?.role==='admin'){
          navigation.navigate('AdminHome' as never);
        }
        else{
          navigation.navigate('Home' as never);
        }

      }
    }
  }
  scr();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </>
  );
};

export default RootNav;
