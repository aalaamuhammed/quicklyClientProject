import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import WelcomeScreen from '../screens/WelcomeScreen';
import MainScreen from '../screens/Main';
import SubCategorySubmitScreen from '../screens/SubCategorySubmit';
import ChooseServiceScreen from '../screens/ChooseService';
import SetFixingTimeScreen from '../screens/SetFixingTime';
import AddAddressScreen from '../screens/AddNewAddress';
import AddCreditScreen from '../screens/AddCredit';
import PaymentMethodScreen from '../screens/PaymentMethod';
import OrderAddressScreen from '../screens/OrderAddress';

const Approutes = [
  {
    name: 'Main',
    component: MainScreen,
  },  
  {
    name: 'AddNewAddresses',
    component: AddAddressScreen,
  },  
  {
    name: 'PaymentMethod',
    component: PaymentMethodScreen,
  }, 
  {
    name: 'OrderAddress',
    component: OrderAddressScreen,
  },
  {
    name: 'AddCredit',
    component: AddCreditScreen,
  },
  {
    name: 'SubCategorySubmit',
    component: SubCategorySubmitScreen,
  },
  {
    name: 'ChooseService',
    component: ChooseServiceScreen,
  },
  {
    name: 'SetFixingTime',
    component: SetFixingTimeScreen,
  },
];
const Stack = createStackNavigator();

const HomeStack2 = (props) => (
  <Stack.Navigator
    initialRouteName={'SubCategorySubmit'}
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


export default  HomeStack2 ;
