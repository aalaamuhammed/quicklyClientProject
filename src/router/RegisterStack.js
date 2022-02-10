import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import WelcomeScreen from '../screens/WelcomeScreen';
import LogInScreen from '../screens/LogIn';
import RegisterScreen from '../screens/Register';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import ConfirmCodeScreen from '../screens/ConfirmCode';
import ChatScreen from '../screens/CS_Chat';
import ResetPasswordScreen from '../screens/ResetPassword';
const Approutes = [
 
  {
    name: 'Welcome',
    component: WelcomeScreen,
  },
  {
    name: 'Register',
    component: RegisterScreen,
  }, 
  {
    name: 'ConfirmCode',
    component: ConfirmCodeScreen,
  }, 
  {
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,
  },
  {
    name: 'ResetPassword',
    component: ResetPasswordScreen,
  }, 
  {
    name: 'ChatScreen',
    component: ChatScreen,
  },
];
const Stack = createStackNavigator();

const RegisterStack = (props) => (
  <Stack.Navigator
    initialRouteName={'Register'}
    headerMode="screen"
    screenOptions={{
      headerShown: false,
    }}>
    {Approutes.map((route, index) => (
      <Stack.Screen
        key={index}
        name={route.name}
        component={route.component}
        options={{
          headerShown: false,
        }}
      />
    ))}
  </Stack.Navigator>
);


export default  RegisterStack ;
