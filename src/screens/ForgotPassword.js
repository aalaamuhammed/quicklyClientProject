import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  I18nManager,
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
});

const ForgotPasswordScreen = props => {
  const {
    handleSubmit,
    control,

    getValues,
    setError,
    formState: {errors, isDirty, isSubmitting, touchedFields, submitCount},
  } = useForm();
  const onSubmit = data => {
    props.forgotPassword({
      data: data,
      redirectToMainScreen: phone =>
        props.navigation.navigate('ConfirmCode', {
          phone: phone,
          page: 'forogtpassword',
        }),
    });
  };
  useEffect(() => {
    if (props.appReducer.backendErrors.phone)
      setError('phone', {
        type: 'manual',
        message: props.appReducer.backendErrors.phone[0],
      });
  }, [props.appReducer.backendErrors]);

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
          onPress={() => props.navigation.navigate('Register')}
        />
        <TouchableOpacity
          style={styles.helpStyles}
          onPress={() => props.navigation.navigate('ChatScreen')}>
          <Svg.Iconhelpcircle />
          <Text style={styles.helpText}>{lang.login.requesthelp}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.MainContainer}>
        <View style={{...styles.container2, paddingVertical: 50}}>
          <Text style={styles.titleStyle}>{lang.forgotPassword.sendCode}</Text>
        </View>
        <View style={{...styles.container2, paddingVertical: 15}}>
          <Controller
            defaultValue=""
            name="phone"
            control={control}
            rules={{
              required: {value: true, message: lang.Validation.required},
              validate: value => !isNaN(value) || lang.Validation.NoReq,
              minLength: {value: 11, message: lang.Validation.minPhoneNo},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                preicon={
                  <Svg.Phone
                    style={
                      !I18nManager.isRTL
                        ? {
                            color: config.colors.darkGrayColor,
                            transform: [{rotate: '90deg'}],
                          }
                        : {color: config.colors.darkGrayColor}
                    }
                  />
                }
                keyboardType="phone-pad"
                maxLength={11}
                placeholder={lang.signup.phone}
                secureTextEntry={false}
                onChangeText={value => onChange(value)}
                value={value}
                postText={'+2'}
                error={errors.phone?.message}
              />
            )}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <FormButton
              textStyles={{color: '#fff'}}
              styleprops={{
                borderColor: 'transparent',
                backgroundColor: config.colors.mainBgColor,
              }}
              loadingprop={props.appReducer.loading}
              onPress={handleSubmit(onSubmit)}>
              {/* onPress={()=>props.navigate.navigate('ConfirmCode')}> */}
              {lang.forgotPassword.send}
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
});

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  appReducer: state.appReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordScreen);
