import React, {useEffect} from 'react';
import {actions as appActions} from '../modules/app';
import {actions as authActions} from '../modules/auth';
import store from '../features/redux/store';
import {BackHandler, View} from 'react-native';
import {connect} from 'react-redux';
import DrawerRoute from '../router/DrawerNavigator';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
const WelcomeScreen = props => {
  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
        props.navigation.navigate('Notifications');
      },
      popInitialNotification: true,
      requestPermissions: true,
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
    });
  }, []);
  // useEffect(() => {
  //   const backAction = () => {

  //     // const navigation = props.navigation;
  //     // console.log(' navigation.canGoBack();', navigation.canGoBack())
  //     // let canGoBack = navigation.canGoBack();
  //     // return canGoBack ? navigation.goBack() : navigation.replace('Screens');
  //     // return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);
  return <DrawerRoute navigation={props.navigation} />;
};

export default WelcomeScreen;
