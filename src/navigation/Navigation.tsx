import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa desde Ionicons
import EntypoIcon from 'react-native-vector-icons/Entypo'; // Importa desde Entypo

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

// Define el Stack Navigator
const Stack = createNativeStackNavigator();

// Define el Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Tus vistas dentro de las tabs
import SettingsTab from '../screens/SettingsTab';
import MenuView from '../screens/MenuView';
import MediaView from '../screens/MediaView';

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          } else if (route.name === 'Tupperfy') {
            iconName = 'video';
          } else if (route.name === 'Menu') {
            iconName = 'calendar';
          }

          // Usando Ionicons
          if (route.name === 'Home' || route.name === 'Settings' || route.name === 'Menu') {
            return <Icon name={iconName} size={size} color={color} />;
          }
          // Usando Entypo
          return <EntypoIcon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Menu" component={MenuView} />
      <Tab.Screen name="Tupperfy" component={MediaView} />
      <Tab.Screen name="Settings" component={SettingsTab} />
    </Tab.Navigator>
  );
};

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInView} />
        <Stack.Screen name="LogIn" component={LogInView} />
        <Stack.Screen name="CreateAccount" component={CreateAccountView} />
        <Stack.Screen name="FavoriteDishesForm" component={FavoriteDishesForm} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordView} />
        <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
        <Stack.Screen name="PaymentSelection" component={PaymentSelection} />
        <Stack.Screen name="AddPayment" component={AddPayment} />
        <Stack.Screen name="CodeInput" component={CodeInput} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="HomePage" component={HomeTabs} />
        <Stack.Screen name="DishDetails" component={DishDetails} />
        <Stack.Screen name="CartView" component={CartView} />
        <Stack.Screen name="OrderPayment" component={OrderPayment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
