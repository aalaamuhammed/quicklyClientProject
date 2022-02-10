import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Text,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import store from '../features/redux/store';
import {actions as authActions} from '../modules/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {actions as appActions} from '../modules/app';
import lang from '../localization';
import config from '../assets/config.json';
import common from '../assets/common';
import SignUpScreen from './SignUp';
import LogInScreen from './LogIn';
import {Appbar, Avatar} from 'react-native-paper';
import * as Svg from '../assets/images';
const styles = StyleSheet.create({
  ScrollViewStyle: {
    flexGrow: 1,
    backgroundColor: config.colors.mainBgColor,
  },

  MainContainer: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#fff',
    zIndex: 0,
  },
  HeaderStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  helpStyles: {
    alignItems: 'center',
    marginHorizontal: 4,
    marginVertical: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  helpText: {
    color: config.colors.mainBgColor,
    marginHorizontal: 3,
    fontSize: 11,
    fontFamily: 'Cairo-Regular',
  },
  logInForm: {
    color: config.colors.mainBgColor,
    fontSize: 18,
    fontFamily: 'Cairo-Regular',
  },
  container2: {
    paddingHorizontal: 10,
    alignItems: 'center',
    zIndex: 99,
  },
  SignupForm: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Cairo-Regular',
  },
  swichbtn: {
    fontFamily: 'Cairo-Regular',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const {height} = Dimensions.get('screen');

const RegisterScreen = props => {
  const [Screen, setScreen] = useState('Login');
  // const [animationValue, setAnimationValue] = useState('100%');
  const [viewState, setViewState] = useState(false);

  let translateY = useRef(new Animated.ValueXY()).current;
  let translateY2 = useRef(new Animated.ValueXY()).current;
  // let animationValue =   useRef(new Animated.Value(0.6)).current;
  // useEffect(() => {
  //   setScreen('Login')
  // });

  const toggleAnimation = () => {
    if (Screen == 'Login') {
      var x = height - 178;
      Animated.timing(translateY, {
        toValue: -x,
        timing: 1500,
        useNativeDriver: true,
      }).start(() => {
        setScreen('Signup');
      });
    } else {
      Animated.timing(translateY.y, {
        useNativeDriver: true,
        toValue: 0,
        duration: 350,
      }).start(setScreen('Login'));
    }
  };
  // let init =  () => {
  //   Animated.timing(translateY.y, {
  //     useNativeDriver: true,
  //     toValue: 1,
  //     duration: 350,
  //   }).start(setScreen('Login'));
  // }
  useEffect(() => {
    translateY.setValue({x: 0, y: 0});
    translateY2.setValue({x: 0, y: 0});
    //init();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setScreen('Login');
      translateY.setValue({x: 0, y: 0});
      translateY2.setValue({x: 0, y: 0});
    }, []),
  );
  // const yInterpolate = animationValue.interpolate({
  //   inputRange: [1, 2],
  //   outputRange: [0, -25],
  // });
  const animatedStyle = {
    // height: animationValue
    transform: [
      // { translateY: animationValue}
      //   { translateY: animationValue.interpolate({
      //     inputRange: [1, 2],
      //     outputRange: [0, -25],
      //   }) },
    ],
  };
  return (
    <ScrollView
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.ScrollViewStyle}>
      {Screen == 'Login' && (
        <Animated.View
          style={{
            ...styles.MainContainer,
            maxHeight: '100%',
            transform: [{translateY: translateY.y}],
          }}>
          <View style={styles.HeaderStyles}>
            <TouchableOpacity
              style={styles.helpStyles}
              onPress={() => props.navigation.navigate('ChatScreen')}>
              <Svg.Iconhelpcircle style={{color: config.colors.mainBgColor}} />
              <Text style={styles.helpText}>{lang.login.requesthelp}</Text>
            </TouchableOpacity>
          </View>
          <LogInScreen navigation={props.navigation} />
        </Animated.View>
      )}
      {Screen == 'Signup' && (
        <Animated.View
          style={{
            ...styles.MainContainer,
            maxHeight: 95,
            transform: [{translateY: translateY2.y}],
          }}>
          <View style={styles.HeaderStyles}>
            <TouchableOpacity
              style={styles.helpStyles}
              onPress={() => props.navigation.navigate('ChatScreen')}>
              <Svg.Iconhelpcircle style={{color: config.colors.mainBgColor}} />
              <Text style={styles.helpText}>{lang.login.requesthelp}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{...styles.swichbtn, paddingVertical: 5}}
            onPress={toggleAnimation}>
            <MaterialCommunityIcons
              style={{
                fontSize: 25,
                color: config.colors.mainBgColor,
              }}
              name={'chevron-down'}
            />

            <Text style={styles.logInForm}> {lang.login.title}</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {Screen == 'Login' && (
        <View style={[styles.container2]}>
          <TouchableOpacity
            style={{...styles.swichbtn, paddingVertical: 20}}
            onPress={toggleAnimation}>
            <MaterialCommunityIcons
              style={{
                fontSize: 25,
                color: '#fff',
              }}
              name={'chevron-up'}
            />

            <Text style={styles.SignupForm}> {lang.signup.btn}</Text>
          </TouchableOpacity>
        </View>
      )}
      {Screen == 'Signup' && <SignUpScreen navigation={props.navigation} />}
    </ScrollView>
  );
};

// const mapDispatchToProps = (dispatch) => ({
// dispatch})

const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  loginUser: data => authActions.loginUser(data)(dispatch, getState),
  // chooseType: (data) => appActions.chooseType(data)(dispatch, getState),
  toggleLanguages: () => appActions.toggleLanguages(),
});

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  appReducer: state.appReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
