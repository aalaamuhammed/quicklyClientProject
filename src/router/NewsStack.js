import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/Home';
import NewsDetailsScreen from '../screens/NewsDetails';
import NewsScreen from '../screens/News';
const Approutes = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'NewsDetails',
    component: NewsDetailsScreen,
  }, 
  {
    name: 'News',
    component: NewsScreen,
  }, 
];
const Stack = createStackNavigator();

const NewsStack = (props) => (
  <Stack.Navigator
    initialRouteName={'News'}
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
