import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from '../views/home'; // Importa tus componentes de pantalla
import LogInView from '../views/authentication/LogIn';
import SignInView from '../views/authentication/SignIn';

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignInView}
        />
        <Stack.Screen name="LogIn" component={LogInView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
