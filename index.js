import { AppRegistry, Text, View } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

const someArray = [1, 2, 3];
const someObject = { key: 'value' };

const component = (
  <View>
    {someArray.map(item => <Text key={item}>{item}</Text>)}
  </View>
);
