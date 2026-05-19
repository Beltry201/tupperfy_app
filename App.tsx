import React from 'react';
import { SafeAreaView } from 'react-native';
import NavigationStack from './src/navigation/Navigation';
import { AppProvider } from './src/context/AppContext';

const App = () => {
  return (
    <AppProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationStack />
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;