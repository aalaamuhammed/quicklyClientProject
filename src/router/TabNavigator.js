import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; 
import MainPage from '../screens/Main';  
import config from '../assets/config.json';
import common from '../assets/common';
import lang from '../localization'; 
import * as Svg from '../assets/images';
import ProfileScreen from '../screens/Profile';
import NotificationStack from './NotificationStack'; 
import OrderStack from './OrderStack'
const Tab = createBottomTabNavigator();

const TabNavigator = props => {
  return (
    <Tab.Navigator
      initialRouteName={'Main'}
      tabBarOptions={{
        activeTintColor: config.colors.maindarkcolor,
        inactiveTintColor: config.colors.mainBgColor,
        labelStyle: {
          ...common.fontstyles,
        },
      }}>
          <Tab.Screen
        name="Main"
        component={MainPage}
        options={{
          tabBarLabel: lang.drawer.home,
          tabBarIcon: ({color, size}) => (
            <Svg.Home width={size} style={{color: color}} />
          ),
        }}
      />
        <Tab.Screen
        name="Notifications"
        component={NotificationStack}
        options={{
          tabBarLabel: lang.drawer.notifications,
          tabBarIcon: ({color, size}) => (
            <Svg.Notifications width={size} style={{color: color}} />
          ),
        }}
      />
       
       <Tab.Screen
        name="Orders"
        component={OrderStack}
        options={{
          tabBarLabel: lang.drawer.orders,
          tabBarIcon: ({color, size}) => (
            <Svg.Legal width={size} style={{color: color}} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          color: config.colors.mainBgColor,
          tabBarLabel: lang.drawer.profile,
          tabBarIcon: ({color, size}) => (
            <Svg.Profile width={size} style={{color: color}} />
          ),
        }}
      />
     
      
     
    </Tab.Navigator>
  );
};
 
export default TabNavigator;
