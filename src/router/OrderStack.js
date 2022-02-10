import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MainScreen from '../screens/Main';
import WarrantyOrderScreen from '../screens/WarrantyOrder';
import MakeComplaintScreen from '../screens/MakeComplaint';
import OrderDetailsScreen from '../screens/OrderDetails';
import OrdersScreen from '../screens/OrdersScreen';
import TransportedDeviceStatusScreen from '../screens/TransportedDeviceStatus';

import EngineerProfileScreen from '../screens/EngineerProfile';
const Approutes = [
 
  {
    name: 'Main',
    component: MainScreen,
  },
  {
    name: 'Order',
    component: OrdersScreen,
  },  
  {
    name: 'MakeComplaint',
    component: MakeComplaintScreen,
  },  
  { 
    name: 'WarrantyOrder',
    component: WarrantyOrderScreen,
  }, 
  {
    name: 'TransportedDeviceStatus',
    component: TransportedDeviceStatusScreen,
  }, 
  {
    name: 'OrderDetails',
    component: OrderDetailsScreen,
  },
  {
    name: 'EngineerProfile',
    component: EngineerProfileScreen,
  }, 
];
const Stack = createStackNavigator();

const OrderStack = (props) => (
  <Stack.Navigator
    initialRouteName={'Order'}
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


export default  OrderStack ;
