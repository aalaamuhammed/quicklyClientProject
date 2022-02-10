import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeStack2 from './HomeStack';
import SettingStack from './SettingStack';
const Approutes = [
  {
    name: 'Home2',
    component: HomeStack2,
  },
  {
    name: 'Welcome',
    component: WelcomeScreen,
  },
  // {
  //   name: 'Settings',
  //   component: SettingStack,
  // },
];
const Stack = createStackNavigator();

const MainStack = (props) => (
  <Stack.Navigator
    initialRouteName={'Welcome'}
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


export default  MainStack ;
