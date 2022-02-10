import React, {useState, useRef, useEffect, createContext} from 'react';
import {I18nManager, StatusBar, Platform, NativeModules} from 'react-native';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import {Provider} from 'react-redux';
import {enableScreens} from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
// import Store from './src/config/store'
import store from './src/features/redux/store';
import config from './src/assets/config.json';
import Screens from './src/screens/Screens';
import PushNotification from 'react-native-push-notification';
import NetInfo from '@react-native-community/netinfo';
// import SplashScreen from 'react-native-splash-screen';
import BootSplash from 'react-native-bootsplash';
import lang from './src/localization/localization';
import ReloadComp from './src/components/material/reloadComp';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
enableScreens();
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: config.colors.mainBgColor,
    // accent: '#fff',
  },
};
let bootSplashLogo = require('./src/assets/logo.png');

// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function (token) {
//     console.log('TOKEN:', token);
//   },

//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification: function (notification) {
//     console.log('NOTIFICATION1:', notification);

//     // process the notification
//     // (required) Called when a remote is received or opened, or local notification is opened
//   //   notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },

//   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
//   onAction: function (notification) {
//     console.log('ACTION:', notification.action);
//     console.log('NOTIFICATION2:', notification);
//     // process the action
//   },

//   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//   onRegistrationError: function (err) {
//     console.error(err.message, err);
//   },

//   // IOS ONLY (optional): default: all - Permissions to register.
//   // permissions: {
//   //   alert: true,
//   //   badge: true,
//   //   sound: true,
//   // },

//   // Should the initial notification be popped automatically
//   // default: true

//   popInitialNotification: true,

//   /**
//    * (optional) default: true
//    * - Specified if permissions (ios) and token (android and ios) will requested or not,
//    * - if not, you must call PushNotificationsHandler.requestPermissions() later
//    * - if you are not using remote notification or do not have Firebase installed, use this:
//    *     requestPermissions: Platform.OS === 'ios'
//    */

//   requestPermissions: true,
// });
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 45 : StatusBar.currentHeight;
let App = () => {
  const setUpLanguage = () => {
    const getDeviceDefaultLanguage = () => {
      const deviceLanguage =
        Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
          : NativeModules.I18nManager.localeIdentifier;
      if (deviceLanguage.search('ar') !== -1) {
        return 'ar';
      }
      return 'en';
    };

    const switchToRTL = () => {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
      RNRestart.Restart();
    };

    const switchToLTR = () => {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      RNRestart.Restart();
    };

    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value !== 'true') {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        AsyncStorage.setItem('lang', getDeviceDefaultLanguage()).then(() => {
          if (getDeviceDefaultLanguage() === 'ar') {
            if (!I18nManager.isRTL) {
              switchToRTL();
            }
          } else if (getDeviceDefaultLanguage() === 'en') {
            if (I18nManager.isRTL) {
              switchToLTR();
            }
          }
        });
      } else {
        AsyncStorage.getItem('lang').then(savedLanguage => {
          if (savedLanguage === 'ar') {
            if (!I18nManager.isRTL) {
              switchToRTL();
            }
          } else if (savedLanguage === 'en') {
            if (I18nManager.isRTL) {
              switchToLTR();
            }
          }
        });
      }
    });
  };

  useEffect(() => {
    setUpLanguage();
  });
  const [connectionOn, setConnection] = useState(true);

  const CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === 'android') {
      NetInfo.fetch().then(state => {
        if (state.isConnected && state.isInternetReachable) {
          setConnection(true);
        } else {
          setConnection(false);
        }
      });
    }
  };

  useEffect(() => {
    CheckConnectivity();
  });

  let [bootSplashIsVisible, setBootSplashIsVisible] = useState(true);
  let [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] = useState(false);
  let opacity = useRef(new Animated.Value(1));
  let translateY = useRef(new Animated.Value(0));

  let init = async () => {
    // You can uncomment this line to add a delay on app startup
    // await fakeApiCallWithoutBadNetwork(3000);

    await BootSplash.hide();

    Animated.stagger(250, [
      Animated.spring(translateY.current, {
        useNativeDriver: true,
        toValue: -150,
      }),
      // Animated.spring(translateY.current, {
      //   useNativeDriver: true,
      //   toValue: Dimensions.get("window").height,
      // }),
    ]).start();

    Animated.timing(opacity.current, {
      useNativeDriver: true,
      toValue: 0,
      duration: 150,
      delay: 350,
    }).start(() => {
      setBootSplashIsVisible(false);
    });
  };
  useEffect(() => {
    bootSplashLogoIsLoaded && init();
  }, [bootSplashLogoIsLoaded]);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          {/* {connectionOn && ( */}
          <Screens />

          {bootSplashIsVisible && (
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                styles.bootsplash,
                {opacity: opacity.current},
              ]}>
              <Animated.Image
                source={bootSplashLogo}
                fadeDuration={0}
                onLoadEnd={() => setBootSplashLogoIsLoaded(true)}
                style={[
                  styles.logo,
                  {transform: [{translateY: translateY.current}]},
                ]}
              />
            </Animated.View>
          )}
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  bootsplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
});
export default App;
