import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../utils/Slice';
import { updateProfile } from '../utils/ProfileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
<<<<<<< HEAD
=======
import Toast from 'react-native-toast-message';

>>>>>>> c5acdc6 (new)
const { width } = Dimensions.get('window');

// Define the navigation prop type
type RootStackParamList = {
  ProfileScreen: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(require('../../assets/Images/profile_image.png'));
  const [isChanged, setIsChanged] = useState(false);
<<<<<<< HEAD
  
  const data=useSelector((state:any) => state.profileData?.data);
  
  
=======
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const profileData = useSelector((state: any) => state.profileData.data); // Accessing profile data from Redux

>>>>>>> c5acdc6 (new)
  const [userData, setUserData] = useState({
    name: profileData.name || 'Sonia',
    phoneNumber: profileData.phone || '+91 XXXXXXXXXX',
    email: profileData.email || 'abc@gmail.com',
    password: '**********',
    feedback: '',
  });
<<<<<<< HEAD
  const loaddata = async () => {
    await AsyncStorage.getItem('user').then((user) => {
      if (user) {
        setUserData(JSON.parse(user));
      }
    });
  }
  loaddata();
const dispatch = useDispatch();
  // Refs for each input field
=======

>>>>>>> c5acdc6 (new)
  const inputRefs = {
    name: useRef<TextInput>(null),
    phoneNumber: useRef<TextInput>(null),
    email: useRef<TextInput>(null),
    password: useRef<TextInput>(null),
    feedback: useRef<TextInput>(null),
  };

  const [errors, setErrors] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    feedback: ''
  });

<<<<<<< HEAD
=======
  useEffect(() => {
    loaddata();
  }, []);

  const loaddata = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserData(parsedUser);
        
        // Dispatching actions for each field to Redux
        for (const [key, value] of Object.entries(parsedUser)) {
          dispatch(updateProfile({ field: key, value }));
        }

        if (parsedUser.profileImage) {
          setProfileImage({ uri: parsedUser.profileImage });
        }
        console.log('User data loaded:', parsedUser);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load user data',
      });
    }
  };

>>>>>>> c5acdc6 (new)
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSignOut = () => {
<<<<<<< HEAD
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: async() =>
      {
        
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
        dispatch(logout()),
        navigation.navigate('SignIn' as never) }}
    ]);
  };

  const handleChangeProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
      setIsChanged(true);
=======
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('user');
              await AsyncStorage.removeItem('token');
              dispatch(logout());
              navigation.navigate('SignIn');
              Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'You have been signed out',
              });
            } catch (error) {
              console.error('Error during sign out:', error);
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to sign out',
              });
            }
          },
        },
      ]
    );
  };

  const handleChangeProfileImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        if (selectedAsset.uri) {
          setProfileImage({ uri: selectedAsset.uri });
          setIsChanged(true);
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Profile image updated',
          });
        } else {
          throw new Error('Selected image has no URI');
        }
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update profile image',
      });
>>>>>>> c5acdc6 (new)
    }
  };

  const handleEdit = (field: keyof typeof userData, value: string) => {
<<<<<<< HEAD
=======
    if (field === 'name') {
      const nameValid = /^[a-zA-Z\s]+$/.test(value);
      if (!nameValid) {
        setErrors((prev) => ({ ...prev, name: 'Name must contain only letters' }));
        Toast.show({
          type: 'error',
          text1: 'Invalid Name',
          text2: 'Name must contain only alphabetical characters',
        });
      } else {
        setErrors((prev) => ({ ...prev, name: '' }));
      }
    }

>>>>>>> c5acdc6 (new)
    if (field === 'phoneNumber') {
      const phoneNumberValid = /^\d{10}$/.test(value);
      if (!phoneNumberValid) {
        setErrors((prev) => ({ ...prev, phoneNumber: 'Phone number must be exactly 10 digits' }));
      } else {
        setErrors((prev) => ({ ...prev, phoneNumber: '' }));
      }
    }

    if (field === 'email') {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!emailValid) {
        setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    }

    // Dispatch the action to update Redux state
    dispatch(updateProfile({ field, value }));
    setUserData((prev) => ({ ...prev, [field]: value }));
    setIsChanged(true);
  };

<<<<<<< HEAD

  const handleConfirmChanges = () => {
    console.log('User data updated:', userData);
    setIsChanged(false);
    Alert.alert('Confirm Changes', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => console.log('user details updated success') },
    ]);
=======
  const handleConfirmChanges = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const apiUrl = `${process.env.EXPO_PUBLIC_API}/user/update`;
      const formData = new FormData();
      formData.append('username', userData.name);
      formData.append('phone', userData.phoneNumber);
      formData.append('email', userData.email);
      formData.append('password', userData.password);

      if (profileImage && profileImage.uri.startsWith('file://')) {
        formData.append('image', {
          uri: profileImage.uri,
          name: 'profileImage.jpg',
          type: 'image/jpeg',
        });
      }

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Profile updated successfully',
        });
        setIsChanged(false);

        const updatedUserData = { ...userData, profileImage: profileImage?.uri };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
        // Update Redux with the new data
        for (const [key, value] of Object.entries(updatedUserData)) {
          dispatch(updateProfile({ field: key, value }));
        }
      } else {
        const errorText = await response.text();
        throw new Error(`Server responded with status ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Failed to update profile: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
>>>>>>> c5acdc6 (new)
  };

  const openKeyboard = (field: keyof typeof inputRefs) => {
    inputRefs[field].current?.focus();
  };


  return (
    <SafeAreaView className='p-4'>
<<<<<<< HEAD
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
      {/* Header with Back Button and Logo */}
      <View className="flex-row justify-between items-center mb-5">
        <TouchableOpacity onPress={handleBackPress} className="p-2">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Image
          source={require('../../assets/Images/try.png')}
          className="w-28 h-28 self-end"
          resizeMode="contain"
        />
      </View>

      {/* Profile Section */}
      <View className="items-center mb-8">
        <View className="relative">
          <TouchableOpacity onPress={handleChangeProfileImage} className="flex items-center">
            <Image source={profileImage} className="w-20 h-20 rounded-full" />
            <TouchableOpacity onPress={handleChangeProfileImage} className="absolute bottom-0 right-0 bg-white p-2 rounded-lg shadow">
              <FontAwesome name="pencil" size={16} color="black" />
=======
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-row justify-between items-center mb-5">
          <TouchableOpacity onPress={handleBackPress} className="p-2">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Image
            source={require('../../assets/Images/try.png')}
            className="w-28 h-28 self-end"
            resizeMode="contain"
          />
        </View>

        <View className="items-center mb-8">
          <View className="relative">
            <TouchableOpacity onPress={handleChangeProfileImage} className="flex items-center">
              <Image 
                source={getImageSource()} 
                className="w-20 h-20 rounded-full" 
                onError={(e) => console.error('Image loading error:', e.nativeEvent.error)}
              />
              <TouchableOpacity onPress={handleChangeProfileImage} className="absolute bottom-0 right-0 bg-white p-2 rounded-lg shadow">
                <FontAwesome name="pencil" size={16} color="black" />
              </TouchableOpacity>
>>>>>>> c5acdc6 (new)
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <Text className="text-xl font-bold mt-3">{userData.name}</Text>
        <Text className="text-gray-500">{userData.phoneNumber}</Text>
      </View>

<<<<<<< HEAD
      {/* Info Section */}
      <View className="w-full bg-gray-100 rounded-lg p-5 mb-8">
        {(['name', 'phoneNumber', 'email', 'password', 'feedback'] as Array<
          keyof typeof userData
        >).map((field, index) => (
          <View className="mb-4" key={index}>
            <Text className="font-bold mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
=======
        <View className="w-full bg-gray-100 rounded-lg p-5 mb-8">
          {(['name', 'phoneNumber', 'email', 'password', 'feedback'] as Array<keyof typeof userData>).map((field, index) => (
            <View className="mb-4" key={index}>
              <Text className="font-bold mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Text>
              <View className="flex-row items-center border-b border-gray-300">
                <TextInput
                  ref={inputRefs[field]}
                  className={`flex-1 text-lg p-2 ${errors[field] ? 'border-b border-red-500' : ''}`}
                  value={userData[field]}
                  onChangeText={(text) => handleEdit(field, text)}
                  placeholder={`Enter your ${field}`}
                  secureTextEntry={field === 'password'}
                />
                <TouchableOpacity onPress={() => openKeyboard(field)} className="ml-2">
                  <FontAwesome name="pencil" size={18} color="gray" />
                </TouchableOpacity>
              </View>
              {errors[field] ? (
                <Text className="text-red-500 text-xs mt-1">{errors[field]}</Text>
              ) : null}
            </View>
          ))}
        </View>

        <View className="flex-row justify-between w-full px-6">
          <TouchableOpacity
            className={`w-2/5 p-4 rounded-xl ${isChanged ? 'bg-green-500' : 'bg-gray-300'} mr-8`}
            onPress={handleConfirmChanges}
            disabled={!isChanged || isLoading}
          >
            <Text className={`text-center text-lg font-bold ${isChanged ? 'text-white' : 'text-gray-500'}`}>
              {isLoading ? 'Updating...' : 'Done'}
>>>>>>> c5acdc6 (new)
            </Text>
            <View className="flex-row items-center border-b border-gray-300">
              <TextInput
                ref={inputRefs[field]}
                className={`flex-1 text-lg p-2 ${errors[field] ? 'border-b border-red-500' : ''
                  }`}
                value={userData[field]}
                onChangeText={(text) => handleEdit(field, text)}
                placeholder={`Enter your ${field}`}
                secureTextEntry={field === 'password'}
              />
              <TouchableOpacity
                onPress={() => openKeyboard(field)}
                className="ml-2"
              >
                <FontAwesome name="pencil" size={18} color="gray" />
              </TouchableOpacity>
            </View>
            {errors[field] ? (
              <Text className="text-red-500 text-xs mt-1">{errors[field]}</Text>
            ) : null}
          </View>
        ))}
      </View>

      {/* Sign Out and Confirm Changes Buttons */}
      <View className="flex-row justify-between w-full">
        <TouchableOpacity
          className={` w-2/5 p-4  rounded-xl ${isChanged ? 'bg-green-500' : 'bg-gray-300'} mr-8`}
          onPress={handleConfirmChanges}
          disabled={!isChanged}
        >
          <Text className={`text-center text-lg font-bold ${isChanged ? 'text-white' : 'text-gray-500'}`}>
            Done
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut} className="flex-row w-2/5 items-center p-4 bg-white rounded-xl border border-red-500">
          <Ionicons name="log-out-outline" size={24} color="red" />
          <Text className="ml-2 text-red-500 text-lg">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
