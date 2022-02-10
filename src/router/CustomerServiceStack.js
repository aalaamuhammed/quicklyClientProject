import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/Home';
import ChatScreen from '../screens/CS_Chat';
import CustomerServiceScreen from '../screens/CustomerService';

const Approutes = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'ChatScreen',
    component: ChatScreen,
  },
  {
    name: 'CustomerServices',
    component: CustomerServiceScreen,
  },
];
const Stack = createStackNavigator();

const CustomerServiceStack = (props) => (
  <Stack.Navigator
    initialRouteName={'CustomerServices'}
    
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


export default  CustomerServiceStack ;
