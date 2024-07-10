// Navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

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


// Importa la pantalla CreateMenu
import MenuView from '../screens/MenuView';
import MediaView from '../screens/MediaView';
import UserProfile from '../screens/UserProfile';
import FollowedChefs from '../screens/FollowedChefs';
import OrdersCompleted from '../screens/OrdersCompleted';
import ProfileEdit from '../screens/ProfileEdit';
import OrderStatus from '../views/orders/OrderStatus';
import ProfileData from '../drawer_screens/ProfileData';
import ProfileInfo from '../drawer_screens/ProfileInfo';
import MessagesScreen from '../drawer_screens/MessagesScreen';
import FavoriteChefs from '../drawer_screens/FavoriteChefs';
import TupperfyPremium from '../drawer_screens/TupperfyPremium';
import ReferFriends from '../drawer_screens/ReferFriends';
import PromotionCodes from '../drawer_screens/PromotionCodes';
import SettingsScreen from '../drawer_screens/SettingsScreen';
import WorkWithUs from '../drawer_screens/WorkWithUs';
import UserAddresses from '../drawer_screens/UserAddresses';
import HelpScreen from '../drawer_screens/HelpScreen';
import SupportChat from '../extra_screens/SupportChat';
import ChatScreen from '../extra_screens/ChatScreen';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = 'home';
          } else if (route.name === 'Mi Menu') {
            iconName = 'calendar';
          } else if (route.name === 'Tupperfy') {
            return <EntypoIcon name="youtube" size={size} color={color} />;
          } else if (route.name === 'Perfil') {
            return <FontAwesome5Icon name="user-alt" size={23} color={color} />;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomePage} />
      <Tab.Screen name="Mi Menu" component={MenuView} />
      <Tab.Screen name="Tupperfy" component={MediaView} />
      <Tab.Screen name="Perfil" component={UserProfile} />
    </Tab.Navigator>
  );
};

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
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
        <Stack.Screen name="FollowedChefs" component={FollowedChefs} />
        <Stack.Screen name="OrdersCompleted" component={OrdersCompleted} />
        <Stack.Screen name="OrdersStatus" component={OrderStatus} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
        <Stack.Screen name="ProfileData" component={ProfileData} />
        <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
        <Stack.Screen name="FavoriteChefs" component={FavoriteChefs} />
        <Stack.Screen name="TupperfyPremium" component={TupperfyPremium} />
        <Stack.Screen name="UserAddresses" component={UserAddresses} />
        <Stack.Screen name="ReferFriends" component={ReferFriends} />
        <Stack.Screen name="PromotionCodes" component={PromotionCodes} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="WorkWithUs" component={WorkWithUs} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} />
        <Stack.Screen name="SupportChat" component={SupportChat} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
