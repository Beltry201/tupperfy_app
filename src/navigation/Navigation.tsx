import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa desde Ionicons
import EntypoIcon from 'react-native-vector-icons/Entypo'; // Importa desde Entypo
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'; // Importa desde Feather

// Importa tus vistas
import LogInView from '../views/authentication/LogIn';
import SignInView from '../views/authentication/SignIn';
import CreateAccountView from '../views/authentication/CreateAccount';
import ForgotPasswordView from '../views/authentication/ForgotPassword';
import FavoriteDishesForm from '../views/authentication/FavoriteDishesForm';
import AddPaymentMethod from '../views/authentication/AddPaymentMethod';
import PaymentSelection from '../views/authentication/PaymentSelection';
import AddPayment from '../views/authentication/AddPayment';
import CodeInput from '../views/authentication/CodeInput';
import ResetPassword from '../views/authentication/ResetPassword';
import HomePage from '../screens/HomePage';
import DishDetails from '../views/orders/DishDetails';
import OrderPayment from '../views/orders/OrderPayment';
import CartView from '../views/orders/CartView';

// Tus vistas dentro de las tabs
import MenuView from '../screens/MenuView';
import MediaView from '../screens/MediaView';
import UserProfile from '../screens/UserProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'user';
          } else if (route.name === 'Tupperfy') {
            iconName = 'video';
          } else if (route.name === 'Profile') {
            return <FontAwesome5Icon name="user-alt" size={23} color={color} />;
          } else if (route.name === 'Menu') {
            iconName = 'calendar';
          }

          // Usando Ionicons
          if (route.name === 'Home' || route.name === 'Menu') {
            return <Icon name={iconName} size={size} color={color} />;
          }
          // Usando Entypo
          return <EntypoIcon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Tab.Screen name="Menu" component={MenuView} options={{ headerShown: false }} />
      <Tab.Screen name="Tupperfy" component={MediaView} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={UserProfile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Pantallas con encabezado */}
        <Stack.Screen name="LogIn" component={LogInView} />
        <Stack.Screen name="CreateAccount" component={CreateAccountView} />
        
        {/* Pantallas sin encabezado */}
        <Stack.Screen name="SignIn" component={SignInView} options={{ headerShown: false }} />
        <Stack.Screen name="FavoriteDishesForm" component={FavoriteDishesForm} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordView} options={{ headerShown: false }} />
        <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentSelection" component={PaymentSelection} options={{ headerShown: false }} />
        <Stack.Screen name="AddPayment" component={AddPayment} options={{ headerShown: false }} />
        <Stack.Screen name="CodeInput" component={CodeInput} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="DishDetails" component={DishDetails} options={{ headerShown: false }} />
        <Stack.Screen name="CartView" component={CartView} options={{ headerShown: false }} />
        <Stack.Screen name="OrderPayment" component={OrderPayment} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
