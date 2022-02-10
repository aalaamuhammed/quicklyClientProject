import {createStackNavigator} from '@react-navigation/stack';
import React from 'react'; 
import ConfirmInvoiceScreen from '../screens/ConfirmInvoice';
import ConfirmFinishingDeviceScreen from '../screens/ConfirmFinishingDevice';
 import ConfirmVoucherScreen from '../screens/ConfirmVoucher';
import NotificationScreen from '../screens/Notifications';
import OrderDetailsScreen from '../screens/OrderDetails';
import TransportedDeviceStatusScreen from '../screens/TransportedDeviceStatus';
import PaymentPageScreen from '../screens/PaymentPage';
import MainScreen from '../screens/Main';
 
import ConfirmStatementScreen from '../screens/ConfirmStatement';
import EngineerProfileScreen from '../screens/EngineerProfile';
const Approutes = [
  {
    name: 'Main',
    component: MainScreen,
  },
  {
    name: 'Notification',
    component: NotificationScreen,
  },
  {
    name: 'EngineerProfile',
    component: EngineerProfileScreen,
  },
  {
    name: 'ConfirmInvoice',
    component: ConfirmInvoiceScreen,
  },
  {
    name: 'ConfirmFinishingDevice',
    component: ConfirmFinishingDeviceScreen,
  },
  {
    name: 'ConfirmVoucher',
    component: ConfirmVoucherScreen,
  },
  {
    name: 'ConfirmStatement',
    component: ConfirmStatementScreen,
  },
  {
    name: 'OrderDetails',
    component: OrderDetailsScreen,
  }, 
  {
    name: 'PaymentPage',
    component: PaymentPageScreen,
  }, 
  {
    name: 'TransportedDeviceStatus',
    component: TransportedDeviceStatusScreen,
  }, 
];
const Stack = createStackNavigator();

const NotificationStack = (props) => (
  <Stack.Navigator
    initialRouteName={'Notification'}
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


export default  NotificationStack ;
