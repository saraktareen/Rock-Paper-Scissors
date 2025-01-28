import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, Switch, StyleSheet, Dimensions } from 'react-native';
import RPS_Logo from '../assets/images/RPS_Logo.png'; 
import play_icon from '../assets/images/play_icon.png';
import tutorial_icon from '../assets/images/tutorial_icon.png';
import settings_icon from '../assets/images/Home_Settings_Icon.png';
import SoundIcon from '../assets/images/Sound_Icon.png'; // Update with actual sound icon
import MusicIcon from '../assets/images/Music_Icon.png'; // Update with actual music icon
import SettingsHomeIcon from '../assets/images/Settings_Home_Icon.png'; // Update with actual home icon

import TutorialScreen from './TutorialScreen'; 
import GameScreen from './GameScreen';  

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('Home'); // Track current screen
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [soundEnabled, setSoundEnabled] = useState(true); // Sound state
  const [bgmEnabled, setBgmEnabled] = useState(true); // BGM state

  const handleContinue = () => {
    setCurrentScreen('Home');
  };

  const goSettingsScreen = () => {
    setIsModalVisible(true); // Show the modal when the settings icon is clicked
  };

  const closeModal = () => {
    setIsModalVisible(false); // Close the modal
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
              <Text style={[styles.text, { fontSize: 60 }]}>Rock</Text>
              <Text style={[styles.text, { fontSize: 55 }]}>Paper</Text>
              <Text style={[styles.text, { fontSize: 50 }]}>Scissors</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => setCurrentScreen('Game')}
              >
                <Text style={styles.buttonText}>Play</Text>
                <Image source={play_icon} style={styles.buttonIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tutorialButton}
                onPress={() => setCurrentScreen('Tutorial')}
              >
                <Text style={styles.buttonText}>Help & Tutorial</Text>
                <Image source={tutorial_icon} style={styles.buttonIcon} />
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={styles.tutorialButton}
                onPress={goSettingsScreen} // Open Settings modal
              >
                <Text style={styles.buttonText}>Settings</Text>
                <Image source={settings_icon} style={styles.buttonIcon} />
              </TouchableOpacity> */}
            </View>

            <View style={styles.circle}></View>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}

      {/* Settings Modal */}
      <Modal 
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.overlayContent}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.modalText}>Settings</Text>

            <View style={styles.innerRectangle}>
              {/* Sound Option */}
              <View style={styles.whiteContainer}>
                <View style={styles.settingsContainer}>
                  <Image source={SoundIcon} style={styles.settingsicon} />
                  <Text style={styles.containerText}>Sound</Text>
                  <Switch 
                    value={soundEnabled} 
                    onValueChange={() => setSoundEnabled(!soundEnabled)} 
                    trackColor={{ false: '#791680', true: '#06ACFF' }} 
                  />
                </View>
              </View>

              {/* BGM Option */}
              <View style={styles.whiteContainer}>
                <View style={styles.settingsContainer}>
                  <Image source={MusicIcon} style={styles.settingsicon} />
                  <Text style={styles.containerText}>BGM</Text>
                  <Switch 
                    value={bgmEnabled} 
                    onValueChange={() => setBgmEnabled(!bgmEnabled)} 
                    trackColor={{ false: '#791680', true: '#06ACFF' }} 
                  />        
                </View>
              </View>

              
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
    width: '81%',
    paddingVertical: 10,
    marginTop: 20,
    height: 55,
  },
  
  tutorialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
    flex: 1,
    left: 20,
  },
  
  buttonIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    right: 15,
  },
  text: { 
    fontFamily: 'QUANTU1H',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: -10, 
  },
  
  circle: {
    backgroundColor: 'black',
    position: 'absolute',
    top: '59%',
    left: '0%',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayContent: {
    backgroundColor: '#06ACFF',
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 5,
    height: 40,
    width: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#184C89',
    fontWeight: 'bold',
    marginLeft: 13,
  },
  modalText: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'BebasKai',
  },
  innerRectangle: {
    marginTop: 20,
    backgroundColor: '#184C89',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  whiteContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    height: 60,
    borderColor: '#173B66',
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 5,
  },
  settingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  settingsicon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  containerText: {
    fontSize: 20,
    fontFamily: 'BebasKai',
    color: 'black',
  },
});

export default HomeScreen;
