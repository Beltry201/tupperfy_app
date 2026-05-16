import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useApp } from '../context/AppContext';

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
import MenuView from '../screens/MenuView';
import MediaView from '../screens/MediaView';
import UserProfile from '../screens/UserProfile';
import FollowedChefs from '../screens/FollowedChefs';
import OrdersCompleted from '../screens/OrdersCompleted';
import ProfileEdit from '../screens/ProfileEdit';
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
import AIChatScreen from '../screens/AIChatScreen';
import AddressPickerScreen from '../screens/AddressPickerScreen';
import SupportChat from '../extra_screens/SupportChat';
import ChatScreen from '../extra_screens/ChatScreen';
import OrderStatus from '../views/orders/OrderStatus';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const { colors, t } = useApp();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray400,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingTop: 6,
          paddingBottom: 8,
          height: 62,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIcon: ({ color, focused }) => {
          const size = 24;
          if (route.name === t('tabHome')) {
            return <Icon name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
          } else if (route.name === t('tabMenu')) {
            return <Icon name={focused ? 'calendar' : 'calendar-outline'} size={size} color={color} />;
          } else if (route.name === t('tabMedia')) {
            return <MaterialCommunityIcon name={focused ? 'play-box' : 'play-box-outline'} size={size} color={color} />;
          } else if (route.name === t('tabProfile')) {
            return <FontAwesome5Icon name={focused ? 'user-alt' : 'user'} size={22} color={color} />;
          }
          return null;
        },
      })}
    >
      <Tab.Screen name={t('tabHome')} component={HomePage} />
      <Tab.Screen name={t('tabMenu')} component={MenuView} />
      <Tab.Screen name={t('tabMedia')} component={MediaView} />
      <Tab.Screen name={t('tabProfile')} component={UserProfile} />
    </Tab.Navigator>
  );
};

const NavigationStack = () => {
  const { colors, isDark, t } = useApp();

  const navTheme = isDark
    ? { ...DarkTheme, colors: { ...DarkTheme.colors, background: colors.background, card: colors.card, border: colors.border, text: colors.text } }
    : { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: colors.background, card: colors.card, border: colors.border, text: colors.text } };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '700', fontSize: 17 },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen name="SignIn" component={SignInView} options={{ headerShown: false }} />
        <Stack.Screen name="LogIn" component={LogInView} options={{ title: t('navLogin') }} />
        <Stack.Screen name="CreateAccount" component={CreateAccountView} options={{ title: t('navRegister') }} />
        <Stack.Screen name="FavoriteDishesForm" component={FavoriteDishesForm} options={{ title: t('navFavorites') }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordView} options={{ title: t('navForgotPwd') }} />
        <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} options={{ title: t('navPaymentMethod') }} />
        <Stack.Screen name="PaymentSelection" component={PaymentSelection} options={{ title: t('navSelectPayment') }} />
        <Stack.Screen name="AddPayment" component={AddPayment} options={{ title: t('navAddCard') }} />
        <Stack.Screen name="CodeInput" component={CodeInput} options={{ title: t('navVerifyCode') }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: t('navNewPassword') }} />
        <Stack.Screen name="HomePage" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="DishDetails" component={DishDetails} options={{ title: '', headerTransparent: true }} />
        <Stack.Screen name="CartView" component={CartView} options={{ title: t('navCart') }} />
        <Stack.Screen name="OrderPayment" component={OrderPayment} options={{ title: t('navCheckout') }} />
        <Stack.Screen name="FollowedChefs" component={FollowedChefs} options={{ title: t('navFollowedChefs') }} />
        <Stack.Screen name="OrdersCompleted" component={OrdersCompleted} options={{ title: t('navOrders') }} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ title: t('navEditProfile') }} />
        <Stack.Screen name="ProfileInfo" component={ProfileInfo} options={{ title: t('navMyAccount') }} />
        <Stack.Screen name="ProfileData" component={ProfileData} options={{ title: t('navMyData') }} />
        <Stack.Screen name="MessagesScreen" component={MessagesScreen} options={{ title: t('navMessages') }} />
        <Stack.Screen name="FavoriteChefs" component={FavoriteChefs} options={{ title: t('navFavoriteChefs') }} />
        <Stack.Screen name="TupperfyPremium" component={TupperfyPremium} options={{ title: t('navPremium') }} />
        <Stack.Screen name="UserAddresses" component={UserAddresses} options={{ title: t('navAddresses') }} />
        <Stack.Screen name="ReferFriends" component={ReferFriends} options={{ title: t('navRefer') }} />
        <Stack.Screen name="PromotionCodes" component={PromotionCodes} options={{ title: t('navPromos') }} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: t('navSettings') }} />
        <Stack.Screen name="WorkWithUs" component={WorkWithUs} options={{ title: t('navWorkWithUs') }} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} options={{ title: t('navHelp') }} />
        <Stack.Screen name="SupportChat" component={SupportChat} options={{ title: t('navSupportChat') }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: t('navChat') }} />
        <Stack.Screen name="OrderStatus" component={OrderStatus} options={{ title: t('navOrderStatus') }} />
        <Stack.Screen name="AIChatScreen" component={AIChatScreen} options={{ title: t('navAIChat') }} />
        <Stack.Screen name="AddressPickerScreen" component={AddressPickerScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
