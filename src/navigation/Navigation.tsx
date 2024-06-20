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
          } else if (route.name === 'Mi Menu') {
            iconName = 'calendar'; // Nombre del ícono de calendario en Ionicons
          } else if (route.name === 'Tupperfy') {
            return <EntypoIcon name="video" size={size} color={color} />; // Icono de video de Entypo
          } else if (route.name === 'Profile') {
            return <FontAwesome5Icon name="user-alt" size={23} color={color} />;
          }

          // Usando Ionicons para el ícono de calendario
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Mi Menu" component={MenuView} />
      <Tab.Screen name="Tupperfy" component={MediaView} />
      <Tab.Screen name="Profile" component={UserProfile} />
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
