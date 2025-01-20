// import React, { useState, useEffect } from 'react';
// import { Dimensions, Animated } from 'react-native';
// import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
// import { useFonts } from 'expo-font';
// import PickYourChoice from "../assets/images/pick_your_choice.png"; 
// import RestartIcon from "../assets/images/restart_icon.png";
// import GameBg from "../assets/images/gameBg.png";

// // Human and Robot Images
// import HumanRock from "../assets/images/human_rock.png"; 
// import HumanScissors from "../assets/images/human_scissors.png";
// import HumanPaper from "../assets/images/human_paper.png";

// import RobotRock from "../assets/images/robot_fist.png"; 
// import RobotScissors from "../assets/images/robot_scissors.png"; 
// import RobotPaper from "../assets/images/robot_hand.png"; 

// const { height, width } = Dimensions.get('window');

// const GameScreen = () => {
//   const [loaded] = useFonts({
//     BebasKai: require('../assets/fonts/BebasKai.ttf'), 
//     SFProDisplayRegular: require('../assets/fonts/SFProDisplayRegular.otf'),
//   });

//   const [userChoice, setUserChoice] = useState(null);  
//   const [aiChoice, setAiChoice] = useState(null); 
//   const [result, setResult] = useState(null); 
//   const [gameOver, setGameOver] = useState(false); 
//   const [gameResults, setGameResults] = useState([]); 

//   const [rockAnimation] = useState(new Animated.Value(0)); 
//   const [animationLooping, setAnimationLooping] = useState(true); 
//   const [imageSource, setImageSource] = useState(HumanRock); 
//   const [robotImageSource, setRobotImageSource] = useState(RobotRock);
  
  
//   const determineWinner = (userChoice, aiChoice) => {
//     const rules = {
//       Rock: "Scissors",
//       Paper: "Rock",
//       Scissors: "Paper",
//     };

//     if (userChoice === aiChoice) {
//       return "draw";
//     }
//     return rules[userChoice] === aiChoice ? "win" : "lose";
//   };

//   const getRandomChoice = () => {
//     const choices = ["Rock", "Paper", "Scissors"];
//     const randomIndex = Math.floor(Math.random() * choices.length);
//     return choices[randomIndex];
//   };

//   const handleChoice = (choice) => {
//     if (gameResults.length >= 5) return;

//     setUserChoice(choice);

//     // Show the selected option's image temporarily
//     if (choice === "Rock") {
//       setImageSource(HumanRock);
//     } else if (choice === "Paper") {
//       setImageSource(HumanPaper);
//     } else if (choice === "Scissors") {
//       setImageSource(HumanScissors);
//     }

//     // After 2 seconds, change back to rock image
//     setTimeout(() => {
//       setImageSource(HumanRock);
//     }, 2000);

//     const aiGeneratedChoice = getRandomChoice(); 
//     setAiChoice(aiGeneratedChoice);

//     // Set the robot's image based on AI choice
//     if (aiGeneratedChoice === "Rock") {
//       setRobotImageSource(RobotRock);
//     } else if (aiGeneratedChoice === "Paper") {
//       setRobotImageSource(RobotPaper);
//     } else if (aiGeneratedChoice === "Scissors") {
//       setRobotImageSource(RobotScissors);
//     }

//     setTimeout(() => {
//       setRobotImageSource(RobotRock); 
//     }, 2000);

//     const gameResult = determineWinner(choice, aiGeneratedChoice); 
//     setResult(gameResult);
//     setGameOver(true);

//     setGameResults((prevResults) => [...prevResults, gameResult]);

//     setAnimationLooping(false); 
//   };

//   const restartGame = () => {
//     setUserChoice(null);
//     setAiChoice(null);
//     setResult(null);
//     setGameOver(false); 
//     setGameResults([]); 
//     setImageSource(HumanRock); 
//     setRobotImageSource(RobotRock);  
//     setAnimationLooping(true); 
//   };

//   const startRockAnimation = () => {
//     rockAnimation.setValue(0); 
//     if (animationLooping) {
//       Animated.sequence([ 
//         Animated.timing(rockAnimation, {
//           toValue: -30, 
//           duration: 500, 
//           useNativeDriver: true,
//         }),
//         Animated.timing(rockAnimation, {
//           toValue: 0, 
//           duration: 500, 
//           useNativeDriver: true,
//         }),
//       ]).start(() => startRockAnimation()); 
//     }
//   };

//   useEffect(() => {
//     startRockAnimation();
//   }, []); 

//   return (
//     <ImageBackground source={GameBg} style={styles.container}>
//       <Image source={PickYourChoice} style={styles.headingImage} />

//       <View style={styles.circleContainer}>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <View
//             key={index}
//             style={[ 
//               styles.circle,
//               gameResults[index] === "win" && styles.circleWin,
//               gameResults[index] === "lose" && styles.circleLose,
//               gameResults[index] === "draw" && styles.circleDraw,
//             ]}
//           />
//         ))}
//       </View>

//       <View style={styles.optionsContainer}>
//         <TouchableOpacity
//           style={[styles.optionBox, gameResults.length >= 5 && styles.disabledOption]}
//           onPress={() => handleChoice("Rock")}
//           disabled={gameResults.length >= 5} 
//         >
//           <View style={styles.optionTextContainer}>
//             <Text style={styles.optionLabel}>ROCK</Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.optionBox, gameResults.length >= 5 && styles.disabledOption]}
//           onPress={() => handleChoice("Paper")}
//           disabled={gameResults.length >= 5} 
//         >
//           <View style={styles.optionTextContainer}>
//             <Text style={styles.optionLabel}>PAPER</Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.optionBox, gameResults.length >= 5 && styles.disabledOption]}
//           onPress={() => handleChoice("Scissors")}
//           disabled={gameResults.length >= 5} 
//         >
//           <View style={styles.optionTextContainer}>
//             <Text style={styles.optionLabel}>SCISSORS</Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.rockContainer}>
//         <Animated.Image
//           source={imageSource} 
//           style={[styles.rockImage, { transform: [{ translateY: rockAnimation }] }]} 
//         />
//         <Animated.Image
//           source={robotImageSource}  // Use robot's image based on AI choice
//           style={[styles.rockImage, { transform: [{ translateY: rockAnimation }] }]} 
//         />
//       </View>

//       <View style={styles.resultContainer}>
//         {gameResults.length < 5 ? (
//           <Text style={styles.resultText}>
//             {result === "win" && "You won this round!"}
//             {result === "lose" && "You lost this round."}
//             {result === "draw" && "It's a draw!"}
//           </Text>
//         ) : (
//           <Text style={styles.resultText}>
//             Click the icon to play again!.
//           </Text>
//         )}
//       </View>

//       <TouchableOpacity onPress={restartGame} style={styles.restartButton}>
//         <Image source={RestartIcon} style={styles.restartIcon} />
//       </TouchableOpacity>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 30,
//     left: 20,
//   },
//   backButtonText: {
//     marginTop: 10,
//     fontSize: 20,
//     color: '#ffffff',
//     fontFamily: 'BebasKai'
//   },
//   headingImage: {
//     width: 100,
//     height: 200,
//     marginTop: '20%',
//     zIndex: 1,
//   },
//   circleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginVertical: 20,
//   },
//   circle: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: 'white',
//     marginHorizontal: 5,
//   },
//   circleWin: {
//     backgroundColor: 'green',
//   },
//   circleLose: {
//     backgroundColor: 'red',
//   },
//   circleDraw: {
//     backgroundColor: 'yellow',
//   }, 
   
//   optionsContainer: {
//     flexDirection: 'row',  
//     justifyContent: 'center',  
//     width: '80%',
//   },

//   optionBox: {
//     alignItems: 'center',
//     width: 100,  
//     height: 100,
//     justifyContent: 'center',
//     marginTop: 0,  
//   },

//   optionTextContainer: {
//     backgroundColor: 'black',
//     padding: 10,
//     borderRadius: 5,
//     width: 85,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  

//   optionLabel: {
//     fontSize: 20,
//     color: '#ffffff',
//     fontFamily: 'BebasKai',
//   },
//   resultText: {
//     fontSize: 25,
//     marginTop: 20,
//     color: '#ffffff',
//     fontFamily: 'BebasKai',
//   },
//   resultContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   choiceContainer: {
//     alignItems: 'center',
//   },
//   choiceLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   choiceDisplay: {
//     alignItems: 'center',
//   },
//   resultWon: {
//     color: 'green',
//   },
//   resultLost: {
//     color: 'red',
//   },
//   resultDraw: {
//     color: 'yellow',
//   },
  // rockContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   width: '100%',
  //   marginTop: 40,
  // },
  // rockImage: {
  //   width: width * 0.4, 
  //   height: height * 0.165,
  // },
  // restartButton: {
  //   marginTop: '10%',
  //   padding: 10,
  // },
  // restartIcon: {
  //   width: 50,
  //   height: 50,
  // },
// });

// export default GameScreen;




import React, { useState, useEffect } from 'react';
import { Dimensions, Animated } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useFonts } from 'expo-font';
import PickYourChoice from "../assets/images/pick_your_choice.png"; 
import RestartIcon from "../assets/images/restart_icon.png";
import GameBg from "../assets/images/gameBg.png";

// Human and Robot Images
import HumanRock from "../assets/images/human_rock.png"; 
import HumanScissors from "../assets/images/human_scissors.png";
import HumanPaper from "../assets/images/human_paper.png";

import RobotRock from "../assets/images/robot_fist.png"; 
import RobotScissors from "../assets/images/robot_scissors.png"; 
import RobotPaper from "../assets/images/robot_hand.png"; 

const { height, width } = Dimensions.get('window');

const GameScreen = () => {
  const [loaded] = useFonts({
    BebasKai: require('../assets/fonts/BebasKai.ttf'), 
    SFProDisplayRegular: require('../assets/fonts/SFProDisplayRegular.otf'),
  });

  const [userChoice, setUserChoice] = useState(null);  
  const [aiChoice, setAiChoice] = useState(null); 
  const [result, setResult] = useState(null); 
  const [gameOver, setGameOver] = useState(false); 
  const [gameResults, setGameResults] = useState([]); 

  const [rockAnimation] = useState(new Animated.Value(0)); 
  const [animationLooping, setAnimationLooping] = useState(true); 
  const [imageSource, setImageSource] = useState(HumanRock); 
  const [robotImageSource, setRobotImageSource] = useState(RobotRock);
  
  const [scaleAnim] = useState(new Animated.Value(0));  // Animation for scaling text

  const [showOverlay, setShowOverlay] = useState(false);  // State for overlay visibility

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
      setImageSource(HumanRock);
    } else if (choice === "Paper") {
      setImageSource(HumanPaper);
    } else if (choice === "Scissors") {
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
    setShowOverlay(false);  // Reset overlay visibility
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

    if (wins > losses) return "YOU WON";
    if (losses > wins) return "YOU LOST";
    return "IT WAS A DRAW";
  };

  // Show overlay for 3 seconds
  useEffect(() => {
    if (gameResults.length >= 5) {
      setShowOverlay(true);
      Animated.spring(scaleAnim, {
        toValue: 1,  // Grow the text size
        useNativeDriver: true,
      }).start();
  
      setTimeout(() => {
        setShowOverlay(false);
      }, 3000); // Hide overlay after 3 seconds
    }
  }, [gameResults]);

  return (
    <ImageBackground source={GameBg} style={styles.container}>
      <Image source={PickYourChoice} style={styles.headingImage} />

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
        ) : (
          <Text style={styles.resultText}>
            Click the icon to play again!
          </Text>
        )}
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

      <TouchableOpacity onPress={restartGame} style={styles.restartButton}>
        <Image source={RestartIcon} style={styles.restartIcon} />
      </TouchableOpacity>
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
    width: '100%',
    marginTop: 40,
  },
  rockImage: {
    width: width * 0.4, 
    height: height * 0.165,
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
    height,
    width,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});

export default GameScreen;
