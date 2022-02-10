import React, {useState} from 'react';
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

const ResetPasswordScreen = props => {
  const [SecurePassword, setViewPassword] = useState(true);
  const [SecurePassword2, setViewPassword2] = useState(true);

  const {
    handleSubmit,
    control,
    getValues,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = data => {
    props.resetPassword({
      data: {
        ...data,
        phone: props.route.params.phone,
        code: props.route.params.code,
      },
      redirectToMainScreen: () => props.navigation.navigate('Register'),
    });
  };
  return (
    <ScrollView
      nestedScrollEnabled={true}
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
          <Text style={styles.titleStyle}>{lang.forgotPassword.title}</Text>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{...styles.container2, paddingVertical: 15}}>
          <Controller
            defaultValue=""
            name="password"
            control={control}
            rules={{
              required: {value: true, message: lang.Validation.required},
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                message: lang.Validation.passwordwrog,
              },
              minLength: {value: 8, message: lang.Validation.passwordwrog},
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
          <Controller
            defaultValue=""
            name="password_confirm"
            control={control}
            rules={{
              required: {value: true, message: lang.Validation.required},
              validate: value =>
                value === getValues('password') ||
                lang.Validation.confirmPassword,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                preicon={
                  <Svg.Lockpass style={{color: config.colors.darkGrayColor}} />
                }
                posticon={
                  SecurePassword2 ? (
                    <Svg.Iconeye
                      onPress={() => setViewPassword2(!SecurePassword2)}
                    />
                  ) : (
                    <Svg.Iconeyeoff
                      onPress={() => setViewPassword2(!SecurePassword2)}
                    />
                  )
                }
                postIconFunction={() => setViewPassword2(!SecurePassword2)}
                placeholder={lang.forms_fields.password_confirm}
                secureTextEntry={SecurePassword2}
                onChangeText={value => onChange(value)}
                value={value}
                error={errors.password_confirm?.message}
              />
            )}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <FormButton
              textStyles={{color: '#fff'}}
              styleprops={{
                borderColor: 'transparent',
                backgroundColor: '#CC3333',
              }}
              loadingprop={props.appReducer.loading}
              onPress={handleSubmit(onSubmit)}>
              {lang.forgotPassword.btn}
            </FormButton>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

// const mapDispatchToProps = (dispatch) => ({
// dispatch})

const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  resetPassword: data => authActions.resetPassword(data)(dispatch, getState),
  // chooseType: (data) => appActions.chooseType(data)(dispatch, getState),
  toggleLanguages: () => appActions.toggleLanguages(),
});

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  appReducer: state.appReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordScreen);
