import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
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
const styles = StyleSheet.create({
  ScrollViewStyle: {
    flexGrow: 1,
    backgroundColor: config.colors.mainBgColor,
  },

  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  HeaderStyles: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  helpStyles: {
    alignItems: 'center',
    marginHorizontal: 4,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  helpText: {
    color: config.colors.mainBgColor,
    marginHorizontal: 3,
    fontSize: 11,
    fontFamily: 'Cairo-Regular',
  },
  container2: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 20,
    color: config.colors.mainBgColor,
    fontFamily: 'Cairo-Regular',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    borderBottomColor: config.colors.maindarkColor,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  inputContainerFocused: {
    borderColor: config.colors.mainBgColor,
  },
  inputText: {
    color: config.colors.maindarkcolor,
    fontSize: 16,
    fontFamily: 'Menlo-Regular',
  },
  inputTextFocused: {
    color: config.colors.mainBgColor,
    fontSize: 16,
    fontFamily: 'Menlo-Regular',
  },
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
});
const codeDigitsArray = ['1', '2', '3', '4', '5', '6'];

const ConfirmCodeScreen = props => {
  const CODE_LENGTH = 6;
  const [loadingSub, setLoadingSub] = useState(false);

  const {
    handleSubmit,
    control,
    getValues,
    formState: {errors},
  } = useForm();
  const onSubmit = data => {
    props.loginUser({
      data: data,
      redirectToMainScreen: () => props.navigation.navigate('Register'),
    });
  };
  const [code, setCode] = useState('');
  const [containerIsFocused, setContainerIsFocused] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [btnCounter, setBtnCounter] = useState(60);

  const ref = useRef(null);
  useEffect(() => {
    if (btnCounter > 0) {
      setTimeout(() => setBtnCounter(btnCounter - 1), 1000);
    } else {
      setDisabledBtn(false);
      // setBtnCounter(30);
    }
  });
  const handleOnPress = () => {
    setContainerIsFocused(true);
    ref?.current?.focus();
  };

  const handleOnBlur = () => {
    setContainerIsFocused(false);
  };
  const resendCode = () => {
    setLoadingSub(true);
    setDisabledBtn(true);
    setBtnCounter(60);
    // ? props.verifyCodeAfterSignup({
    //     data: {code: code, phone: props.route.params.phone},
    //     redirectToMainScreen: () =>
    //       props.navigation.navigate('register'),
    //   })
    props.route.params.page == 'signUp'
      ? props.resend_SignupCode({phone: props.route.params.phone})
      : props
          .forgotPassword({
            data: {phone: props.route.params.phone},
            redirectToMainScreen: phone =>
              props.navigation.navigate('ConfirmCode', {
                phone: phone,
                page: 'forogtpassword',
              }),
          })
          .then(resp => {
            setLoadingSub(false);
          });
  };

  const toDigitInput = idx => {
    const emptyInputChar = ' ';
    const digit = code[idx] || emptyInputChar;

    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === CODE_LENGTH - 1;
    const isCodeFull = code.length === CODE_LENGTH;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const containerStyle =
      containerIsFocused && isFocused
        ? {...styles.inputContainer, ...styles.inputContainerFocused}
        : styles.inputContainer;
    const inputTextStyle =
      containerIsFocused && isFocused
        ? styles.inputTextFocused
        : styles.inputText;

    return (
      <View key={idx} style={containerStyle}>
        <Text style={inputTextStyle}>{digit}</Text>
      </View>
    );
  };
  return (
    <ScrollView
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.ScrollViewStyle}>
      <View style={styles.HeaderStyles}>
        <Appbar.Action
          icon={'chevron-' + common.diropp}
          size={20}
          style={{padding: 2, marginHorizontal: 2}}
          color={config.colors.mainBgColor}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <View style={styles.MainContainer}>
        <View style={{...styles.container2, paddingVertical: 50}}>
          <Text style={styles.titleStyle}>
            {lang.forgotPassword.ConfirmCode}
          </Text>
        </View>
        <View style={{...styles.container2, paddingVertical: 15}}>
          <SafeAreaView style={styles.container}>
            <Pressable style={styles.inputsContainer} onPress={handleOnPress}>
              {codeDigitsArray.map((v, index) => toDigitInput(index))}
            </Pressable>
            <TextInput
              ref={ref}
              value={code}
              onChangeText={setCode}
              onSubmitEditing={handleOnBlur}
              keyboardType="number-pad"
              returnKeyType="done"
              textContentType="oneTimeCode"
              maxLength={CODE_LENGTH}
              style={styles.hiddenCodeInput}
            />
          </SafeAreaView>
          <View
            style={{
              ...styles.inputsContainer,
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <TouchableOpacity
              disabled={disabledBtn}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => resendCode()}>
              <Svg.Redoalt
                style={{
                  margin: 10,
                  color: disabledBtn
                    ? config.colors.darkGrayColor
                    : config.colors.mainBgColor,
                }}
                width={11}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: disabledBtn
                    ? config.colors.darkGrayColor
                    : config.colors.mainBgColor,
                  fontFamily: 'Cairo-Regular',
                }}>
                {lang.forgotPassword.ResendCode}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 15,
                color: config.colors.mainBgColor,
                fontFamily: 'Cairo-Regular',
              }}>
              {btnCounter}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <FormButton
              textStyles={{color: '#fff'}}
              styleprops={{
                borderColor: 'transparent',
                backgroundColor:
                  code.length !== 6
                    ? config.colors.darkGrayColor
                    : config.colors.mainBgColor,
              }}
              disabled={props.appReducer.loading || code.length !== 6}
              loadingprop={props.appReducer.loading && !loadingSub}
              onPress={() => {
                props.route.params.page === 'signUp'
                  ? props.verifyCodeAfterSignup({
                      data: {code: code, phone: props.route.params.phone},
                      redirectToMainScreen: () =>
                        props.navigation.navigate('Register'),
                    })
                  : props.verifyCode({
                      data: {code: code, phone: props.route.params.phone},
                      redirectToMainScreen: data =>
                        props.navigation.navigate('ResetPassword', data),
                    });
              }}>
              {lang.forgotPassword.Confirm}
            </FormButton>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// const mapDispatchToProps = (dispatch) => ({
// dispatch})

const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  forgotPassword: data => authActions.forgotPassword(data)(dispatch, getState),
  verifyCode: data => authActions.verifyCode(data)(dispatch, getState),
  resend_SignupCode: data =>
    authActions.resend_SignupCode(data)(dispatch, getState),
  verifyCodeAfterSignup: data =>
    authActions.verifyCodeAfterSignup(data)(dispatch, getState),
  // chooseType: (data) => appActions.chooseType(data)(dispatch, getState),
  toggleLanguages: () => appActions.toggleLanguages(),
});

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  appReducer: state.appReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCodeScreen);
