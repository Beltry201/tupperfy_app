import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInView from '../views/authentication/LogIn';
import SignInView from '../views/authentication/SignIn';
import CreateAccountView from '../views/authentication/CreateAccount';
import ForgotPasswordView from '../views/authentication/ForgotPassword';



const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInView} />
        <Stack.Screen name="LogIn" component={LogInView} />
        <Stack.Screen name="CreateAccount" component={CreateAccountView} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
