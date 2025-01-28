import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

// Correctly import the PNG image
import SplashScreenImage from '../assets/images/Splash_Screen.png';

const SplashScreen = ({ onSplashComplete }) => {
  const [fadeAnim] = useState(new Animated.Value(1)); // Initial opacity is 1

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        if (onSplashComplete) {
          onSplashComplete();
        }
      }, 1000); 
    }, 4000); 

    // Cleanup timer
    return () => clearTimeout(timer);
  }, [fadeAnim, onSplashComplete]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.splashImage, opacity: fadeAnim }}>
        <Image
          source={SplashScreenImage}
          style={styles.splashImage}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  splashImage: {
    width: '105%',  
    height: '105%', 
  },

  ...(width <= 360 && height <= 740
    ? {
      splashImage: {
        width: '101%', 
        height: '102%',
      },
      }
    : {}),
});

export default SplashScreen;
