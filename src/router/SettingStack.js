import {createStackNavigator} from '@react-navigation/stack';
import React,{useEffect} from 'react';
import SettingsScreen from '../screens/Settings';
import ChangePasswordScreen from '../screens/ChangePassword';
import AddressesScreen from '../screens/Addresses';
import CreditCardsScreen from '../screens/CreditCards';
import AddressDetailsScreen from '../screens/AddressDetails'; 
import AddCreditScreen from '../screens/AddCredit';
import UpdateAddressScreen from '../screens/UpdateOldAddress';
import UpdateCreditScreen from '../screens/UpdateCreditCard';
import AddAddressScreen from '../screens/AddNewAddress';
import HowToUseScreen from '../screens/HowToUse';
import HowToUseDetailsScreen from '../screens/HowToUseDetails';
import RolesScreen from '../screens/Roles';
import AboutQuicklyScreen from '../screens/AboutQuickly';
const Approutes = [
 
  {
    name: 'ChangePassword',
    component: ChangePasswordScreen,
  },
  {
    name: 'Addresses',
    component: AddressesScreen,
  },
  {
    name: 'AddNewAddresses',
    component: AddAddressScreen,
  }, 
  {
    name: 'updateOldAddress',
    component: UpdateAddressScreen,
  }, 
  {
    name: 'CreditCards',
    component: CreditCardsScreen,
  },
  {
    name: 'AddCredit',
    component: AddCreditScreen,
  },
  {
    name: 'UpdateCreditCard',
    component: UpdateCreditScreen,
  },
  {
    name: 'AddressDetails',
    component: AddressDetailsScreen,
  }, 
  {
    name: 'Settings',
    component: SettingsScreen,
  },  
  {
    name: 'HowToUse',
    component: HowToUseScreen,
  },
  {
    name: 'HowToUseDetails',
    component: HowToUseDetailsScreen,
  },
  {
    name: 'AboutQuickly',
    component: AboutQuicklyScreen,
  },
  {
    name: 'Roles',
    component: RolesScreen,
  }, 
];
const Stack = createStackNavigator();

const SettingStack = (props) => {
    
    return(
  <Stack.Navigator
    initialRouteName={'Settings'}
    headerMode="screen"
    screenOptions={{
      headerShown: true,
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
);}


export default  SettingStack ;
