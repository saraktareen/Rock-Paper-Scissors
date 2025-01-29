import React, { useState, useEffect } from 'react';
import { Dimensions, Animated } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet, Button, ImageBackground, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResultScreen from './ResultScreen'
import GameBg from "../assets/images/gameBg.png";

import RockSound from "../assets/audios/Rock.mp3";
import ScissorSound from "../assets/audios/Scissors.mp3";
import PaperSound from "../assets/audios/Paper.mp3";
import WinningSound from "../assets/audios/WinningSound.mp3";
import LosingSound from "../assets/audios/LosingSound.wav";
import DrawingSound from "../assets/audios/DrawingSound.wav";

import HumanRock from "../assets/images/human_rock.png"; 
import HumanScissors from "../assets/images/human_scissors.png";
import HumanPaper from "../assets/images/human_paper.png";

import RobotRock from "../assets/images/robot_fist.png"; 
import RobotScissors from "../assets/images/robot_scissors.png"; 
import RobotPaper from "../assets/images/robot_hand.png"; 

const { height, width } = Dimensions.get('window');

const playSound = async (soundFile) => {
  const { sound } = await Audio.Sound.createAsync(soundFile);
  await sound.playAsync();
  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.didJustFinish) {
      sound.unloadAsync();
    }
  });
};



const GameScreen = ( {onGameEnd} ) => {
  const [loaded] = useFonts({
    BebasKai: require('../assets/fonts/BebasKai.ttf'), 
    SFProDisplayRegular: require('../assets/fonts/SFProDisplayRegular.otf'),
  });

  const [userChoice, setUserChoice] = useState(null);  
  const [aiChoice, setAiChoice] = useState(null); 
  const [result, setResult] = useState(null); 
  const [gameOver, setGameOver] = useState(false); 

  const [rockAnimation] = useState(new Animated.Value(0)); 
  const [animationLooping, setAnimationLooping] = useState(true); 
  const [imageSource, setImageSource] = useState(HumanRock); 
  const [robotImageSource, setRobotImageSource] = useState(RobotScissors);
  
  const [scaleAnim] = useState(new Animated.Value(0));  
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeScreen, setActiveScreen] = useState("GameScreen");
  const [gameResults, setGameResults] = useState([]);


  const determineWinner = (userChoice, aiChoice) => {
    const rules = {
      Rock: "Scissors",
      Paper: "Rock",
      Scissors: "Paper",
    };

    if (userChoice === aiChoice) {
      return "draw";
    }
    return rules[userChoice] === aiChoice ? "win" : "lose";
  };

  const getRandomChoice = () => {
    const choices = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const handleChoice = (choice) => {
    if (gameResults.length >= 5) return;

    setUserChoice(choice);

    // Show the selected option's image temporarily
    if (choice === "Rock") {
      playSound(RockSound);
      setImageSource(HumanRock);
    } else if (choice === "Paper") {
      playSound(PaperSound);
      setImageSource(HumanPaper);
    } else if (choice === "Scissors") {
      playSound(ScissorSound);
      setImageSource(HumanScissors);
    }

    // After 2 seconds, change back to rock image
    setTimeout(() => {
      setImageSource(HumanRock);
    }, 2000);

    const aiGeneratedChoice = getRandomChoice(); 
    setAiChoice(aiGeneratedChoice);

    // Set the robot's image based on AI choice
    if (aiGeneratedChoice === "Rock") {
      setRobotImageSource(RobotRock);
    } else if (aiGeneratedChoice === "Paper") {
      setRobotImageSource(RobotPaper);
    } else if (aiGeneratedChoice === "Scissors") {
      setRobotImageSource(RobotScissors);
    }

    setTimeout(() => {
      setRobotImageSource(RobotRock); 
    }, 2000);

    const gameResult = determineWinner(choice, aiGeneratedChoice); 
    setResult(gameResult);
    setGameOver(true);

    setGameResults((prevResults) => [...prevResults, gameResult]);

    setAnimationLooping(false); 
  };

  const restartGame = () => {
    setUserChoice(null);
    setAiChoice(null);
    setResult(null);
    setGameOver(false); 
    setGameResults([]); 
    setImageSource(HumanRock); 
    setRobotImageSource(RobotRock);  
    setAnimationLooping(true); 
    setShowOverlay(false);
  };

  const startRockAnimation = () => {
    rockAnimation.setValue(0); 
    if (animationLooping) {
      Animated.sequence([ 
        Animated.timing(rockAnimation, {
          toValue: -30, 
          duration: 500, 
          useNativeDriver: true,
        }),
        Animated.timing(rockAnimation, {
          toValue: 0, 
          duration: 500, 
          useNativeDriver: true,
        }),
      ]).start(() => startRockAnimation()); 
    }
  };

  useEffect(() => {
    startRockAnimation();
  }, []); 

  // Final Result Calculation
  const calculateFinalResult = () => {
    const wins = gameResults.filter(result => result === "win").length;
    const losses = gameResults.filter(result => result === "lose").length;
    const draws = gameResults.filter(result => result === "draw").length;

  //   if (wins > losses) {
  //     playSound(WinningSound); 
  //     return "YOU WON";
  //   }
  //   if (losses > wins) {
  //     playSound(LosingSound); 
  //     return "YOU LOST";
  //   }
    
  //   playSound(DrawingSound); 
  //   return "DRAWED";
    
  };



useEffect(() => {
  if (gameResults.length >= 5) {
    const finalResult = calculateFinalResult();
    AsyncStorage.setItem("gameResults", JSON.stringify(gameResults));
    setTimeout(() => {
      setActiveScreen("ResultScreen");
    }, 1000);
  }
}, [gameResults]);

if (activeScreen === "ResultScreen") {
  return <ResultScreen results={gameResults} />;
}





  return (
    <ImageBackground source={GameBg} style={styles.container}>
      <View style={styles.PYCcontainer}>

        <Text style={[styles.pick, styles.textSpacing]}>Pick</Text>
        <Text style={[styles.your, styles.textSpacing]}>Your</Text>
        <Text style={styles.choice}>Choice</Text>
      </View>

      <View style={styles.circleContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View
            key={index}
            style={[ 
              styles.circle,
              gameResults[index] === "win" && styles.circleWin,
              gameResults[index] === "lose" && styles.circleLose,
              gameResults[index] === "draw" && styles.circleDraw,
            ]}
          />
        ))}
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.optionBox, gameResults.length >= 5 && styles.disabledOption]}
          onPress={() => handleChoice("Rock")}
          disabled={gameResults.length >= 5} 
        >
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionLabel}>ROCK</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionBox, gameResults.length >= 5 && styles.disabledOption]}
          onPress={() => handleChoice("Paper")}
          disabled={gameResults.length >= 5} 
        >
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionLabel}>PAPER</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionBox, gameResults.length >= 5 && styles.disabledOption]}
          onPress={() => handleChoice("Scissors")}
          disabled={gameResults.length >= 5} 
        >
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionLabel}>SCISSORS</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.rockContainer}>
        <Animated.Image
          source={imageSource} 
          style={[styles.rockImage, { transform: [{ translateY: rockAnimation }] }]} 
        />
        <Animated.Image
          source={robotImageSource}  
          style={[styles.rockImage, { transform: [{ translateY: rockAnimation }] }]} 
        />
      </View>

      <View style={styles.resultContainer}>
        {gameResults.length < 5 ? (
          <Text style={styles.resultText}>
            {result === "win" && "You won this round!"}
            {result === "lose" && "You lost this round."}
            {result === "draw" && "It's a draw!"}
          </Text>
        ) : null }
      </View>

      {/* Overlay and Final Result */}
      {showOverlay && (
        <View style={styles.overlay}>
          <View style={styles.finalResultContainer}>
          <Animated.Text style={[styles.finalResultText, { transform: [{ scale: scaleAnim }] }]}>
            {calculateFinalResult()}
          </Animated.Text>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headingImage: {
    width: 100,
    height: 200,
    marginTop: '20%',
    zIndex: 1,
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
  circleWin: {
    backgroundColor: 'green',
  },
  circleLose: {
    backgroundColor: 'red',
  },
  circleDraw: {
    backgroundColor: 'yellow',
  }, 
  optionsContainer: {
    flexDirection: 'row',  
    justifyContent: 'center',  
    width: '80%',
  },
  optionBox: {
    alignItems: 'center',
    width: 100,  
    height: 100,
    justifyContent: 'center',
    marginTop: 0,  
  },
  optionTextContainer: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: 85,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'BebasKai',
  },
  resultText: {
    fontSize: 25,
    marginTop: '5%',
    color: '#ffffff',
    fontFamily: 'BebasKai',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  rockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '12%',
    width: '100%',
    marginTop: 40,
  },
  rockImage: {
    width: width * 0.435, 
    height: height * 0.175,
  },
  restartButton: {
    marginTop: '5%',
    padding: 10,
  },
  restartIcon: {
    width: 50,
    height: 50,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,

  },
  finalResultContainer: {
    padding: 30,
    top: '3%',
    borderRadius: 10,
  },
  finalResultText: {
    fontSize: 70,
    color: 'white',
    fontFamily: 'BebasKai',
  },
  PYCcontainer: {
    marginTop: '15%',
    zIndex: 1,
    alignItems: 'center',
  },
  pick: {
    fontSize: 70,
    fontFamily: 'BebasKai',
    color: '#ffffff',
    marginBottom: -20, 
  },
  your: {
    fontSize: 65,
    fontFamily: 'BebasKai',
    color: '#ffffff',
  },
  choice: {
    fontSize: 60,
    fontFamily: 'BebasKai',
    color: '#ffffff',

  },
  textSpacing: {
    marginBottom: -20, 
  },
  backButton: {
    padding: 10,                
    alignSelf: 'flex-start',    
    marginLeft: 10,             
    marginTop: 5,              
  },
  backText: {
    fontSize: 20,        
    color: 'white',
    fontFamily: 'BebasKai',       
  },
  backButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
 
  


  ...(width <= 360 && height <= 740
    ? {   
      restartButton: {
        padding: 10,
      }, 
      restartIcon: {
        width: 50,
        height: 50,
      },
      resultText: {
        fontSize: 20,
        marginTop: '1%',
        color: '#ffffff',
        fontFamily: 'BebasKai',
      },
      resultContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 12,
      },
      rockContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 40,
      },
      rockImage: {
        width: width * 0.35, 
        height: height * 0.16,
      },
      headingImage: {
        width: 100,
        height: 200,
        marginTop: '15%',
        zIndex: 1,
      },
      restartIcon: {
        width: 45,
        height: 45,
      },

      }
    : {}),

    ...(width == 430 && height == 932
      ? {   
        restartButton: {
          padding: 10,
        }, 
        restartIcon: {
          width: 60,
          height: 60,
        },
        resultText: {
          fontSize: 35,
          marginTop: '10%',
          color: '#ffffff',
          fontFamily: 'BebasKai',
        },
        resultContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 20,
        },
        rockContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 40,
        },
        rockImage: {
          width: width * 0.4, 
          height: height * 0.17,
        },
        headingImage: {
          width: 100,
          height: 200,
          marginTop: '15%',
          zIndex: 1,
        },
        restartIcon: {
          width: 50,
          height: 50,
        },
  
        }
      : {}),
  
});

export default GameScreen;
