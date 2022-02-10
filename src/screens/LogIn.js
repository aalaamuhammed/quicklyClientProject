import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
} from 'react-native';

import store from '../features/redux/store';
import {actions as authActions} from '../modules/auth';
import {actions as appActions} from '../modules/app';
import InputField from '../components/material/InputField';
import toggleLanguages from '../modules/app/actions';
import FormButton from '../components/material/FormButton';
import validate from '../helpers/validation';
import lang from '../localization';
import config from '../assets/config.json';
import common from '../assets/common';
import {HeaderComponent} from '../components/core/Header';
import SignUpScreen from './SignUp';
import {Button, Appbar} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import * as Svg from '../assets/images';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
const styles = StyleSheet.create({
  container2: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  signupbtn: {
    fontSize: 13,
    color: config.colors.darkGrayColor,
    textAlign: 'center',
    marginTop: 5,
    alignSelf: 'center',
    ...common.fontstyles,
  },
  TextStyles: {color: config.colors.mainBgColor, fontFamily: 'Cairo-Regular'},
  otherRegisteration: {
    marginVertical: 25,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const LogInScreen = props => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        setDeviceToken(token.token);
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,

      requestPermissions: true,
    });
  }, []);
  const {
    handleSubmit,
    control,
    formState: {errors, isDirty, isValid},
    setValue,
    setError,
    getValues,
  } = useForm({
    mode: 'onChange',
  });
  const [SecurePassword, setViewPassword] = useState(true);
  const [deviceToken, setDeviceToken] = useState(null);

  const onSubmit = data => {
    setLoadingSub(true);
    props.loginUser({
      data: data,
      token: deviceToken,
      redirectToMainScreen: () => props.navigation.navigate('Welcome'),
    });
  };

  ///////////////////facebook//////////////////////////////
  async function fbAuth() {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        // throw 'User cancelled the login process';
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      auth().signInWithCredential(facebookCredential);
      const user = auth().currentUser;
      props.SocialLogin({
        data: {
          provider: 'facebook',
          access_token: data.accessToken,
          // fname:user.displayName.substr(0,user.displayName.indexOf(' ')),
          // lname:user.displayName.split(" ")[user.displayName.split(" ").length - 1],
          // profile_pic:user.photoURL,
          // email:user.email
        },
        token: deviceToken,
        redirectToMainScreen: () => props.navigation.navigate('Welcome'),
      });
    } catch (error) {
      // alert(error);
    }
  }
  ///////////////////facebook//////////////////////////////

  ///////////////////google//////////////////////////////
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '881023266658-ngs771cj97q73kj5l48os965famt8q6n.apps.googleusercontent.com',
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      iosClientId:
        '881023266658-kbud2b06gui2devbag4g317bsfo8o2ag.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      props.SocialLogin({
        data: {
          provider: 'google',
          access_token: userInfo.idToken,
          // fname:userInfo.user.givenName,
          // lname:userInfo.user.familyName,
          // profile_pic:userInfo.user.photo,
          // email:userInfo.user.email
        },
        token: deviceToken,
        redirectToMainScreen: () => props.navigation.navigate('Welcome'),
      });
    } catch (error) {
      // alert(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // alert('Play Services Not Available or Outdated');
      } else {
        // alert('Some Other Error Happened');
      }
    }
  };
  ///////////////////google//////////////////////////////
  useEffect(() => {
    setLoadingMain(props.appReducer.loading);
    if (!props.appReducer.loading) setLoadingSub(false);
  }, [props.appReducer.loading]);
  const [loadingMain, setLoadingMain] = useState(false);
  const [loadingSub, setLoadingSub] = useState(false);
  const [phoneCodes, setPhoneCodes] = useState(['011', '012', '010', '015']);
  // const phoneCodes =[011,012,010,015];
  return (
    <View>
      <View style={styles.container2}>
        <Image
          style={{width: 150, height: 150, resizeMode: 'contain'}}
          source={require('../assets/logo.png')}
        />
      </View>
      <View style={{...styles.container2, paddingVertical: 15}}>
        <Controller
          defaultValue=""
          name="login"
          control={control}
          rules={{
            required: {value: true, message: lang.Validation.required},
            validate: {
              // valid: value =>
              // phoneCodes.includes(value.substring(0,3)) ||
              //           lang.Validation.EgyptionNo,

              valid2: value => !isNaN(value) || lang.Validation.NoReq,
            },
            minLength: {value: 11, message: lang.Validation.minPhoneNo},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputField
              placeholder={lang.signup.phone}
              preicon={
                <Svg.Iconphone style={{color: config.colors.darkGrayColor}} />
              }
              keyboardType="phone-pad"
              maxLength={11}
              secureTextEntry={false}
              onBlur={onBlur}
              postText={'+2'}
              onChangeText={onChange}
              value={value}
              error={errors.login?.message}
            />
          )}
        />
        <Controller
          defaultValue=""
          name="password"
          control={control}
          rules={{
            required: {value: true, message: lang.Validation.required},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputField
              placeholder={lang.forms_fields.password}
              preicon={
                <Svg.Lockpass style={{color: config.colors.darkGrayColor}} />
              }
              posticon={
                SecurePassword ? (
                  <Svg.Iconeye
                    onPress={() => setViewPassword(!SecurePassword)}
                  />
                ) : (
                  <Svg.Iconeyeoff
                    onPress={() => setViewPassword(!SecurePassword)}
                  />
                )
              }
              postIconFunction={() => setViewPassword(!SecurePassword)}
              secureTextEntry={SecurePassword}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              error={errors.password?.message}
            />
          )}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <FormButton
            loadingprop={loadingMain && loadingSub}
            onPress={handleSubmit(onSubmit)}>
            {lang.login.title}
          </FormButton>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ForgotPassword')}>
            <Text style={styles.signupbtn}>{lang.login.forgot_password}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otherRegisteration}>
          <Text style={styles.TextStyles}>{lang.signup.registerwith}</Text>
          <TouchableOpacity
            onPress={() => fbAuth()}
            style={{marginHorizontal: 10}}>
            <Svg.Facebook style={{color: config.colors.mainBgColor}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={signIn} style={{marginHorizontal: 10}}>
            <Svg.Google style={{color: config.colors.mainBgColor}} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// const mapDispatchToProps = (dispatch) => ({
// dispatch})

const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  loginUser: data => authActions.loginUser(data)(dispatch, getState),
  SocialLogin: data => authActions.SocialLogin(data)(dispatch, getState),
  // chooseType: (data) => appActions.chooseType(data)(dispatch, getState),
  toggleLanguages: () => appActions.toggleLanguages(),
  // registerPhone: (data) => authActions.registerPhone(data)(dispatch, getState),
});

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  appReducer: state.appReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen);
