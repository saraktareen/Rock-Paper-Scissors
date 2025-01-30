import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Modal, Switch, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

import ResultWinBg from '../assets/images/Result_Win_Bg.png';  
import ResultLoseBg from '../assets/images/Result_Lose_Bg.png';
import ResultDrawBg from '../assets/images/Result_Draw_Bg.png';

import WinIcon from '../assets/images/Win_Icon.png'; 
import LoseIcon from '../assets/images/Lose_Icon.png'; 
import DrawIcon from '../assets/images/Draw_Icon.png'; 
import HomeIcon from '../assets/images/Home_Icon.png'; 
import SettingsIcon from '../assets/images/Settings_Icon.png'; 
import RestartIcon from '../assets/images/restart_icon.png'; 

import SoundIcon from '../assets/images/Sound_Icon.png'; 
import MusicIcon from '../assets/images/Music_Icon.png'; 
import SettingsTutorialIcon from '../assets/images/Settings_Tutorial_Icon.png'; 
import SettingsHomeIcon from '../assets/images/Settings_Home_Icon.png'; 

// import ConfettiCannon from 'react-native-confetti-cannon';  // Import confetti cannon

import WinSound from '../assets/audios/WinningSound.mp3';
import LoseSound from '../assets/audios/LosingSound.wav';
import DrawSound from '../assets/audios/DrawingSound.wav';
import HomeScreen from './HomeScreen';
import GameScreen from './GameScreen';


const ResultScreen = ( ) => {
  const [gameResults, setGameResults] = useState([]);
  const [matchResult, setMatchResult] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(ResultWinBg);
  const [resultIcon, setResultIcon] = useState(WinIcon);
  const [roundsWon, setRoundsWon] = useState(0);
  const [activeScreen, setActiveScreen] = useState("ResultScreen");
  const [showConfetti, setShowConfetti] = useState(false); // State for controlling confetti animation
  const [isModalVisible, setIsModalVisible] = useState(false); // To toggle modal visibility

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [bgmEnabled, setBgmEnabled] = useState(false);
  const [tutorialEnabled, setTutorialEnabled] = useState(false);
  const [homeEnabled, setHomeEnabled] = useState(false);


  


  const goSettingsScreen = () => {
    setIsModalVisible(true); // Show the modal when the settings icon is clicked
  };

  const closeModal = () => {
    setIsModalVisible(false); // Close the modal
  };


  useEffect(() => {
    AsyncStorage.getItem('gameResults')
      .then((data) => {
        if (data) {
          const results = JSON.parse(data);
          setGameResults(results);
          calculateMatchResult(results);
        }
      })
      .catch((error) => console.error('Error retrieving game results:', error));
  }, []);

  useEffect(() => {
    if (matchResult === 'You Won!') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
    }
  }, [matchResult]);

  // const calculateMatchResult = (results) => {
  //   const wins = results.filter((result) => result.toLowerCase() === 'win').length;
  //   const losses = results.filter((result) => result.toLowerCase() === 'lose').length;

  //   setRoundsWon(wins);

  //   if (wins > losses) {
  //     setMatchResult('You Won!');
  //     setBackgroundImage(ResultWinBg);
  //     setResultIcon(WinIcon);
  //     playSound(WinSound); 
  //   } else if (losses > wins) {
  //     setMatchResult('You Lost!');
  //     setBackgroundImage(ResultLoseBg);
  //     setResultIcon(LoseIcon); 
  //     playSound(LoseSound);  // Play Losing sound

  //   } else {
  //     setMatchResult('You Drew!');
  //     setBackgroundImage(ResultDrawBg); 
  //     setResultIcon(DrawIcon); 
  //     playSound(DrawSound);  // Play Drawing sound

  //   }
  // };

  // const playSound = (soundFile) => {
  //   const sound = new Sound(soundFile, Sound.MAIN_BUNDLE, (error) => {
  //     if (error) {
  //       console.log('Failed to load the sound', error);
  //     } else {
  //       sound.play(() => sound.release());
  //     }
  //   });
  // };


  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  };
  
  const calculateMatchResult = (results) => {
    const wins = results.filter((result) => result.toLowerCase() === 'win').length;
    const losses = results.filter((result) => result.toLowerCase() === 'lose').length;
  
    setRoundsWon(wins);
  
    if (wins > losses) {
      setMatchResult('You Won!');
      setBackgroundImage(ResultWinBg);
      setResultIcon(WinIcon);
      playSound(WinSound); // Play winning sound
    } else if (losses > wins) {
      setMatchResult('You Lost!');
      setBackgroundImage(ResultLoseBg);
      setResultIcon(LoseIcon);
      playSound(LoseSound); // Play losing sound
    } else {
      setMatchResult('You Drew!');
      setBackgroundImage(ResultDrawBg);
      setResultIcon(DrawIcon);
      playSound(DrawSound); // Play drawing sound
    }
  };
  

  const getCircleColor = (result) => {
    switch (result.toLowerCase()) {
      case 'win':
        return 'green';
      case 'lose':
        return 'red';
      case 'draw':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  if (activeScreen === "HomeScreen") {
    return <HomeScreen/>;
  }

  if (activeScreen === "GameScreen") {
    return <GameScreen/>;
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>

      <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            {/* Outer modal container with blue background */}
            <View style={styles.overlayContent}>
              {/* Close button in the top right corner */}
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>

              {/* Title for Settings */}
              <Text style={styles.modalText}>Settings</Text>

              {/* Inner rectangle with color 184C89 and white border */}
              <View style={styles.innerRectangle}>
                
                {/* Individual white containers for Sound and BGM */}
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

                


              <View style={styles.whiteContainer}>
              <TouchableOpacity
                style={styles.settingsContainer}
                onPress={() => {
                  setActiveScreen("HomeScreen");
                }}
              >
                <Image source={SettingsHomeIcon} style={styles.settingsicon} />
                <Text style={styles.containerText}>Home</Text>
                <Switch
                  style={{ visibility: 'hidden' }} 
                  disabled={true} 
                />
              </TouchableOpacity>
            </View>


              </View>
            </View>
          </View>
      </Modal>




        {/* {showConfetti && (
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 0 }}
            fallSpeed={2500}
            explosionSpeed={5}
          />
        )} */}

        <Image source={resultIcon} style={styles.icon} />
        <Text style={styles.matchResult}>{matchResult}</Text>
        <View style={styles.circleContainer}>
          {gameResults.map((result, index) => (
            <View
              key={index}
              style={[styles.circle, { backgroundColor: getCircleColor(result) }]} />
          ))}
        </View>
        <Text style={styles.roundsWonText}>Rounds Won: {roundsWon}</Text>
        
        {matchResult === 'You Lost!' || matchResult === 'You Drew!' ? (
          <Text style={styles.betterLuckText}>Better Luck Next Time</Text>
        ) : null}

        <View style={styles.squareContainer}>
        <TouchableOpacity style={styles.square} onPress={() => setActiveScreen("HomeScreen")}>
          <Image source={HomeIcon} style={styles.homeIcon} />
        </TouchableOpacity>



          <TouchableOpacity style={styles.square} onPress={() => setActiveScreen("GameScreen")}>
            <Image source={RestartIcon} style={styles.homeIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.square} onPress={goSettingsScreen}>
            <Image source={SettingsIcon} style={styles.homeIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
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
    fontFamily: 'BebasKai'
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
    color: 'black',  // Text color set to red
  },











  icon: {
    width: 80,
    height: 80,
    marginTop: '40%',
  },

  matchResult: {
    fontSize: 55,
    fontFamily: 'BebasKai',
    color: 'white',
    marginTop: '5%',
    textAlign: 'center',
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  squareContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    width: '80%',
    marginTop: '20%',
  },
  square: {
    width: 50,
    height: 50,
    backgroundColor: '#F3BF57',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8.9,
  },
  homeIcon: {
    width: 30,
    height: 30,
  },
  roundsWonText: {
    fontSize: 25,
    fontFamily: 'BebasKai',
    color: 'white',
    marginTop: 20,
  },
  betterLuckText: {
    fontSize: 20,
    fontFamily: 'BebasKai',
    color: 'white',
    marginTop: 10,
  },
});

export default ResultScreen;
