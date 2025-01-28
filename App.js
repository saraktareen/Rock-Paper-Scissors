import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import TutorialScreen from './components/TutorialScreen';
import GameScreen from './components/GameScreen';
import HomeScreen from './components/HomeScreen';
import ResultScreen from './components/ResultScreen';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('SplashScreen');

  const handleSplashComplete = () => setActiveScreen('WelcomeScreen');
  const handleWelcomeContinue = () => setActiveScreen('TutorialScreen');
  const handleTutorialContinue = () => setActiveScreen('HomeScreen');
  const handleGameEnd = () => setActiveScreen('ResultScreen');

 
  return (
    <View style={styles.container}>
      {activeScreen === 'SplashScreen' && (
        <SplashScreen onSplashComplete={handleSplashComplete} />
      )}

      {activeScreen === 'WelcomeScreen' && (
        <WelcomeScreen onContinue={handleWelcomeContinue} />
      )}

      {activeScreen === 'TutorialScreen' && (
        <TutorialScreen onContinue={handleTutorialContinue} />
      )}

      {activeScreen === 'HomeScreen' && <HomeScreen />}

      
      {activeScreen === 'GameScreen' && (
        <GameScreen onGameEnd={handleGameEnd} />)}

      {activeScreen === 'ResultScreen' && <ResultScreen/>}

    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
