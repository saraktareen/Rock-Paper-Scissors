import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import RPS_Logo from '../assets/images/RPS_Logo.png'; 
import play_icon from '../assets/images/play_icon.png';
import tutorial_icon from '../assets/images/tutorial_icon.png';
import TutorialScreen from './TutorialScreen'; 
import GameScreen from './GameScreen';  // Import GameScreen

const HomeScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('Home'); // Track current screen

  const handleContinue = () => {
    setCurrentScreen('Home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Tutorial':
        return <TutorialScreen onContinue={handleContinue} />; 
      case 'Game':
        return <GameScreen />;
      default:
        return (
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image source={RPS_Logo} style={styles.logo} />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => setCurrentScreen('Game')}
              >
                <Text style={styles.buttonText}>Play</Text>
                <Image source={play_icon} style={styles.buttonIcon} />
              </TouchableOpacity>

              {/* Tutorial Button */}
              <TouchableOpacity
                style={styles.tutorialButton}
                onPress={() => setCurrentScreen('Tutorial')} // Set state to navigate to Tutorial Screen
              >
                <Text style={styles.buttonText}>Help & Tutorial</Text>
                <Image source={tutorial_icon} style={styles.buttonIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.circle}></View>
          </View>
        );
    }
  };

  return renderScreen();
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#791680',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: '15%', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  logo: {
    width: 150,
    height: 150,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: '80%',
  },
  playButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
    width: '81%',
    paddingVertical: 10,
    marginTop: 20,
    height: 55,
  },
  tutorialButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
    width: '81%',
    paddingVertical: 10,
    marginTop: 20,
    height: 55,
  },
  buttonText: {
    fontFamily: 'BebasKai',
    color: 'black',
    fontSize: 23.11,
  },
  buttonIcon: {
    position: 'absolute',
    right: 15,
    top: '35%',
    width: 30,
    height: 30,
  },
  circle: {
    backgroundColor: 'black',
    position: 'absolute',
    top: '59%',
    left: '0%',
  },
});

export default HomeScreen;
