import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProfileModal from '../components/ProfileModal';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
const { width, height } = Dimensions.get('window');

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const ContactUs: React.FC = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleBackPress = () => {
      console.log('Back button pressed');
      navigation.goBack();
  };

  const toggleProfileModal = () => {
      console.log('Toggling profile modal. Current state:', modalVisible);
      setModalVisible(!modalVisible);
  };


  return (
    <View style={styles.container}>
      <LinearGradient colors={['#CAF880', '#71CE7E']} style={styles.linearGradient}>
        <View className="absolute top-2 left-0 right-0 flex-row justify-between px-2 z-10">
          {/* Back Icon on the left */}
          <TouchableOpacity onPress={handleBackPress} className="p-2 mt-14 ">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          {/* Profile Modal on the right */}
          <TouchableOpacity onPress={toggleProfileModal} className="p-2 mt-6">
            <ProfileModal
              modalVisible={modalVisible}
              toggleModal={toggleProfileModal}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          
            <View style={styles.header}>
              <Text style={styles.headerText}>Having any issue</Text>
              <Text style={styles.subHeaderText}>We are here to help you 24/7</Text>
              <View style={styles.icons}>
                <FontAwesome6 name="facebook-f" size={24} color='#707070' />
                <FontAwesome6 name="x-twitter" size={24} color='#707070' />
                <FontAwesome6 name="instagram" size={24} color='#707070' />
                <FontAwesome6 name="whatsapp" size={24} color='#707070' />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  Linking.openURL("whatsapp://send?text=Hello&phone=+YOURNUMBER")
                }
              >
                <FontAwesome6 name="whatsapp" size={24} color="#81D742" />
                <Text style={styles.buttonText}>Get Support on WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => Linking.openURL("mailto:support@example.com")}
              >
                <FontAwesome6 name="user" size={24} color="#81D742" />
                <Text style={styles.buttonText}>Contact our support team</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => Linking.openURL("mailto:support@example.com")}
              >
                <FontAwesome6 name="envelope" size={24} color="#81D742" />
                <Text style={styles.buttonText}>Send us an email</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                For Support {'\n'}connect@siteexample.com
              </Text>
              <Text style={styles.footerText}>Join Us {'\n'}jobs@siteexample.com</Text>
              <Text style={styles.footerText}>
                Everything Us {'\n'}help@siteexample.com
              </Text>
            </View>
          
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  linearGradient: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: "98%",
    height: "92%",
    backgroundColor: 'rgba(238, 238, 238, 0.6)',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    marginBottom: width * 0.4,
    marginLeft: width * 0.02,
    padding: 20,
    marginTop: width * 0.2,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: '#707070',
    fontSize: 13,
  },
  icons: {
    paddingTop:10,
    flexDirection: 'row',
    gap: 8,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',

  },
  button: {
    flexDirection: 'row',
    gap: width * 0.03,
    width:width * 0.5,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginLeft:50,
    marginRight:50,
  },
  buttonText: {
    color: '#707070',
    fontSize: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 60,
    gap: 40,
    padding: 40,
  },
  footerText: {
    color: '#333',
    textAlign: 'center',
    fontSize: 8,
  },
});

export default ContactUs;
