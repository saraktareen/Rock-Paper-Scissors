import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

import WelcomeScreenBg from '../assets/images/WelcomeScreen_Bg.png'; 
import RPS_Logo from '../assets/images/RPS_Logo.png';
import Line from '../assets/images/WelcomeScreen_Line.png';

export default function WelcomeScreen({ onContinue }) {
  const [loaded] = useFonts({
    BebasKai: require('../assets/fonts/BebasKai.ttf'), 
    SFProDisplayRegular: require('../assets/fonts/SFProDisplayRegular.otf'),
  });

  if (!loaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
    return (
    <View style={styles.welcomeScreen}>
      <Image source={WelcomeScreenBg} style={styles.backgroundImage} />

      <View style={styles.logoContainer}>
        {/* <Image source={RPS_Logo} /> */}
        <Text style={[styles.text, { fontSize: 60 }]}>Rock</Text>
        <Text style={[styles.text, { fontSize: 55 }]}>Paper</Text>
        <Text style={[styles.text, { fontSize: 50 }]}>Scissors</Text>
        <Image source={Line} style={styles.line} />

      </View>


      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>
          Hey there! We're a passionate team dedicated to delivering top-notch quality assurance. 
          If you've had a great experience with our services, could you take a moment to rate us? 
          Your feedback means the world to us and helps others discover the quality we strive to provide. 
          Thank you!
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeScreen: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: -1, 
    position: 'absolute', 
    top: 0,
    left: 0,
  },
  logoContainer: {
    position: 'absolute',
    top: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  text: {
    fontFamily: 'QUANTU1H',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: -10, 
  },
  
  line: {
    position: 'absolute',
    top: '110%', 
    left: '50%',
    transform: [{ translateX: '-50%' }],
  },
  welcomeTextContainer: {
    position: 'absolute',
    top: '38%', 
    maxWidth: '90%',
    padding: 20,
    zIndex: 1,
  },
  welcomeText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'SFProDisplayRegular',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '10%', 
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#ffffff',
    borderRadius: 42,
    width: '80%', 
    paddingVertical: 15, 
    fontSize: 23.11,
    color: '#000000',
    borderWidth: 0,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'BebasKai',
  },


  ...(width <= 360 && height <= 740
    ? {
      
      

      
      }
    : {}),


 



});

