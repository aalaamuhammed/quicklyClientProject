import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/Home';
import TransportedDevicesScreen from '../screens/TransportedDevices';
import TransportedDeviceStatusScreen from '../screens/TransportedDeviceStatus';
import EngineerProfileScreen from '../screens/EngineerProfile';
import MakeComplaintScreen from '../screens/MakeComplaint';
const Approutes = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'TransportedDevices',
    component: TransportedDevicesScreen,
  }, 
  {
    name: 'TransportedDeviceStatus',
    component: TransportedDeviceStatusScreen,
  }, 
  {
    name: 'EngineerProfile',
    component: EngineerProfileScreen,
  }, 
  {
    name: 'MakeComplaint',
    component: MakeComplaintScreen,
  },  
];
const Stack = createStackNavigator();

const NewsStack = (props) => (
  <Stack.Navigator
    initialRouteName={'TransportedDevices'}
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


export default  NewsStack ;
