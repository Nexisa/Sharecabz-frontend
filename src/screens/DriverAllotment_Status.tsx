import React from 'react';
import { View, ImageBackground, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../utils/Slice'; 
import { useNavigation } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';


const AllotmentStatusPage = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleButtonPress = () => {
        dispatch(login());
        navigation.navigate('AdminHome' as never); //Redirect To the Booking Details Page .....
    }

return (
    <LinearGradient 
    style={styles.container}
    colors={['#FFFFFF', '#FFFFFF']}>
        <Image
            source={require('../../assets/Tick.png')}
            style={styles.image}
        />
        <View style={styles.messageBox}>
            <Text className='font-extrabold text-5xl' style={styles.title}>DRIVER ALLOTTED SUCCESSFULLY </Text>
            <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
                <Text style={styles.buttonText}>DONE</Text>
            </TouchableOpacity>
        </View>
     </LinearGradient>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 270, // Increased width
        height: 270, // Increased height
        position: 'absolute',
        top: '25%',
        marginBottom: 20,
    },
    messageBox: {
        position: 'absolute',
        bottom: 0.1,
        width: '100%',
        height: '40%',
        backgroundColor: 'white',
        top: '70%',
        padding: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        color: 'black',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#81D742',
        width: 332,
        height: 56,
        top: 50,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default AllotmentStatusPage;