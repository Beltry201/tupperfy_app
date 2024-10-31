import React from 'react';
import { SafeAreaView } from 'react-native';
import NavigationStack from './src/navigation/Navigation';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationStack />
    </SafeAreaView>
  );
};

export default App;