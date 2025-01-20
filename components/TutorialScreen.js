import React from 'react';
import { Dimensions, View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import WelcomeText from '../assets/images/Welcome-To-The-Tutorial.png';
import GameRules from '../assets/images/Game_Rules.png'; 

const { width, height } = Dimensions.get('window'); 

const TutorialScreen = ({ onContinue }) => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Image source={WelcomeText} style={styles.textInCircle} />
      </View>

      <View style={styles.rulesContainer}>
        <Image source={GameRules} style={styles.gameRulesImage} />
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
  container: {
    backgroundColor: '#791680',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    width: '120%', 
    height: 290,
    backgroundColor: '#000000',
    position: 'absolute',
    top: 0,
    borderBottomLeftRadius: 250,
    borderBottomRightRadius: 250,
    overflow: 'hidden', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  textInCircle: {
    width: '40%', 
    height: undefined, 
    aspectRatio: 1, 
    resizeMode: 'contain', 
  },
  rulesContainer: {
    marginTop: '28%', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameRulesImage: {
    width: width * 0.71, 
    height: height * 0.75, 
    resizeMode: 'contain', 
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
});

export default TutorialScreen;
