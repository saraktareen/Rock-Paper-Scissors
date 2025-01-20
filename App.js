
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import TutorialScreen from './components/TutorialScreen';
import GameScreen from './components/GameScreen';
import HomeScreen from './components/HomeScreen';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('SplashScreen');

  const handleContinue = () => {
    setActiveScreen('HomeScreen'); 
  };

  const handleBack = () => {
    setActiveScreen('HomeScreen'); 
  };



  return (
    <View style={styles.container}>
      {activeScreen === 'SplashScreen' && (
        <SplashScreen onSplashComplete={() => setActiveScreen('WelcomeScreen')} />
      )}

      {activeScreen === 'WelcomeScreen' && (
        <WelcomeScreen onContinue={() => setActiveScreen('TutorialScreen')} />
    )}

        {activeScreen === 'TutorialScreen' && (
        <TutorialScreen onContinue={handleContinue} />
    )}
        {activeScreen === 'HomeScreen' && <HomeScreen />}

        {activeScreen === 'GameScreen' && (
        <GameScreen handleGoBack={handleBack} />
      )}
          </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
