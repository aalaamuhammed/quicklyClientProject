import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import WelcomeScreen from '../screens/WelcomeScreen';
import LogInScreen from '../screens/LogIn';
import RegisterScreen from '../screens/Register';
import SettingsScreen from '../screens/Settings';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import ConfirmCodeScreen from '../screens/ConfirmCode';
import ChangePasswordScreen from '../screens/ChangePassword';
import AddressesScreen from '../screens/Addresses';
import CreditCardsScreen from '../screens/CreditCards';
import HomeScreen from '../screens/Home';
import AddressDetailsScreen from '../screens/AddressDetails'; 
import ResetPasswordScreen from '../screens/ResetPassword';
import SubCategorySubmitScreen from '../screens/SubCategorySubmit';
import ChooseServiceScreen from '../screens/ChooseService';
import SetFixingTimeScreen from '../screens/SetFixingTime';
import AddAddressScreen from '../screens/AddNewAddress';
import AddCreditScreen from '../screens/AddCredit';
import UpdateAddressScreen from '../screens/UpdateOldAddress';
import OrderAddressScreen from '../screens/OrderAddress';
import UpdateCreditScreen from '../screens/UpdateCreditCard';
import PaymentMethodScreen from '../screens/PaymentMethod';
import WarrantyOrderScreen from '../screens/WarrantyOrder';
import MakeComplaintScreen from '../screens/MakeComplaint';
import ConfirmInvoiceScreen from '../screens/ConfirmInvoice';
import ConfirmFinishingDeviceScreen from '../screens/ConfirmFinishingDevice';
import TransportedDeviceStatusScreen from '../screens/TransportedDeviceStatus';
import ConfirmVoucherScreen from '../screens/ConfirmVoucher';
import NotificationScreen from '../screens/Notifications';
import OrderDetailsScreen from '../screens/OrderDetails';
import ChatScreen from '../screens/CS_Chat';
import NewsDetailsScreen from '../screens/NewsDetails';
import HowToUseScreen from '../screens/HowToUse';
import HowToUseDetailsScreen from '../screens/HowToUseDetails';
import RolesScreen from '../screens/Roles';
import AboutQuicklyScreen from '../screens/AboutQuickly';

import ConfirmStatementScreen from '../screens/ConfirmStatement';
import EngineerProfileScreen from '../screens/EngineerProfile';
const Approutes = [
  {
    name: 'Home',
    component: HomeScreen,
  },
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
    name: 'ChangePassword',
    component: ChangePasswordScreen,
  },
  {
    name: 'Addresses',
    component: AddressesScreen,
  },
  {
    name: 'Notification',
    component: NotificationScreen,
  },
  {
    name: 'AddNewAddresses',
    component: AddAddressScreen,
  },
  {
    name: 'NewsDetails',
    component: NewsDetailsScreen,
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
  {
    name: 'updateOldAddress',
    component: UpdateAddressScreen,
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
    name: 'TransportedDeviceStatus',
    component: TransportedDeviceStatusScreen,
  },
  {
    name: 'MakeComplaint',
    component: MakeComplaintScreen,
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
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,
  },
  {
    name: 'ResetPassword',
    component: ResetPasswordScreen,
  },
  {
    name: 'Settings',
    component: SettingsScreen,
  }, 
  {
    name: 'WarrantyOrder',
    component: WarrantyOrderScreen,
  }, 
  {
    name: 'OrderDetails',
    component: OrderDetailsScreen,
  },
  {
    name: 'ChatScreen',
    component: ChatScreen,
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
];
const Stack = createStackNavigator();

const HomeStack = (props) => (
  <Stack.Navigator
    initialRouteName={props.mainRoute}
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


export default  HomeStack ;
