import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

// Correctly import the PNG image
import SplashScreenImage from '../assets/images/Splash_Screen.png';

const SplashScreen = ({ onSplashComplete }) => {
  const [fadeAnim] = useState(new Animated.Value(1)); // Initial opacity is 1

  useEffect(() => {
    // Fade out animation after 4 seconds
    const timer = setTimeout(() => {
      // Trigger the fade-out animation
      Animated.timing(fadeAnim, {
        toValue: 0, // Fade out
        duration: 1000, // 1 second fade out
        useNativeDriver: true,
      }).start();

      // Call onSplashComplete after animation finishes
      setTimeout(() => {
        if (onSplashComplete) {
          onSplashComplete();
        }
      }, 1000); // Call after the fade-out duration
    }, 4000); // Wait for 4 seconds before starting fade-out

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
    backgroundColor: '#30162E',
  },
  splashImage: {
    width: '100%',  // Adjust width
    height: '100%', // Adjust height
  },
});

export default SplashScreen;
