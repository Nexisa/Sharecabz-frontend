import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet, Text, TouchableOpacity, Image, SafeAreaView, Dimensions, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../utils/Slice';
import { useNavigation } from '@react-navigation/native';
import ProfileModal from '../components/ProfileModal';
import { Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');


const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);

    const handleButtonPress = () => {
        dispatch(login());
        navigation.navigate('Book' as never);
    }
    
    const toggleProfileModal = () => {
        console.log('Toggling profile modal. Current state:', modalVisible);
        setModalVisible(!modalVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../../assets/image.png')}
                style={styles.backgroundImage}
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.headerContainer}>
                            <Image
                                style={styles.logo}
                                source={require('../../assets/Images/logo-removebg-preview.png')}
                            />
                        </View>
                        <TouchableOpacity onPress={toggleProfileModal} className="p-2 mt-6">
                            <ProfileModal modalVisible={modalVisible} toggleModal={toggleProfileModal} />
                        </TouchableOpacity>
                    </View>
                        
                    <View style={styles.textContainer}>
                        <Text style={styles.introText}>We are introducing ShareCabz.</Text>

                        <Text style={styles.luxuryText}>
                            Luxury{'\n'}Ride Sharing{'\n'}Service
                        </Text>
                        <Text style={styles.description}>
                            Sharecabz offers a user-friendly platform for booking rides with confidence. 
                            Enjoy seamless payments, comfortable vehicles, and top-tier service for a smooth travel experience.
                        </Text>
                        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
                            <Text style={styles.buttonText}>Get Your Ride Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    content: {
        flex: 1,
    
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerContainer: {
        width: 100,
        height: 100,
        flexDirection: 'row',
    },
    logo: {
       width: 100,
       height: 100,
       marginTop: 25,
    },
    textContainer: {
        width: width * 0.65,
        height: width * 0.7, 
        paddingLeft: height * 0.02, 
        paddingTop: height * 0.02,
    },
    introText: {
        fontFamily: 'Roboto',
        fontSize: width * 0.05,
        color: '#449906',
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    luxuryText: {
        fontFamily: 'RobotoSlab-Variable',
        fontSize: width * 0.08,
        color: '#3B3B3B',
        fontWeight: 'bold',
        marginBottom: height * 0.02,
        letterSpacing: 1,
        
    },
    description: {
        fontFamily: 'Roboto',
        fontSize: width * 0.035,
        color: 'black',
        marginBottom: height * 0.03,
        lineHeight: width * 0.06,
    },
    button: {
        backgroundColor: '#2C2C2C',
        borderRadius: 10,
        padding: width * 0.04,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: width * 0.04,
    },
});

export default HomeScreen;