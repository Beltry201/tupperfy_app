import { SafeAreaView } from 'react-native';
import NavigationStack from './navigation/Navigation';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationStack />
    </SafeAreaView>
  );
};

export default App;
