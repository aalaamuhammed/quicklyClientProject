import React, {useEffect, useState} from 'react';

import {connect} from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  Text,
  View,
  Alert,
} from 'react-native';
import store from '../features/redux/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HeaderComponent} from '../components/core/Header';
import {actions as authActions} from '../modules/auth';
import InputField from '../components/material/InputField';
import FormButton from '../components/material/FormButton';
import {useForm, Controller} from 'react-hook-form';
import lang from '../localization';
import common from '../assets/common';
import config from '../assets/config.json';
import * as Svg from '../assets/images';
import {RadioButton} from 'react-native-paper';
const Languages = [
  {
    key: 'ar',
    text: 'عربي',
  },
  {
    key: 'en',
    text: 'En',
  },
];

const styles = StyleSheet.create({
  mainContaier: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: config.colors.maindarkcolor,
    width: '100%',
    height: '100%',
  },
  viewStyle: {
    paddingTop: 0,
    justifyContent: 'center',
  },
  subitemStyle: {
    justifyContent: 'center',
    flexGrow: 1,
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 30,
  },
  container2: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  IconStyle: {
    paddingVertical: 15,
    color: config.colors.mainBgColor,
  },
});
const ChangePasswordScreen = props => {
  const [SecurePassword1, setViewPassword1] = useState(true);
  const [SecurePassword, setViewPassword] = useState(true);
  const [SecurePassword2, setViewPassword2] = useState(true);

  const {
    handleSubmit,
    control,
    formState: {errors, isDirty, isValid},
    setValue,
    getValues,
    setError,
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = data => {
    props.ChangePassword(data);
  };
  useEffect(() => {
    const backAction = () => {
      props.navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    if (props.appReducer.backendErrors.old_password)
      setError('old_password', {
        type: 'manual',
        message: props.appReducer.backendErrors.old_password[0],
      });
    if (props.appReducer.backendErrors.new_password)
      setError('new_password', {
        type: 'manual',
        message: props.appReducer.backendErrors.new_password[0],
      });
    if (props.appReducer.backendErrors.password_confirm)
      setError('password_confirm', {
        type: 'manual',
        message: props.appReducer.backendErrors.password_confirm[0],
      });
  }, [props.appReducer.backendErrors]);
  return (
    <View nestedScrollEnabled={true} style={styles.mainContaier}>
      <View
        style={{
          ...styles.viewStyle,
          backgroundColor: config.colors.maindarkcolor,
        }}>
        <HeaderComponent
          fontColor={'#fff'}
          headerbtn2={() => props.navigation.goBack()}
          toggleDrawer={() => props.navigation.toggleDrawer()}>
          {lang.ChangePassword.title}
        </HeaderComponent>
      </View>

      <View style={styles.subitemStyle}>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{...styles.container2, paddingVertical: 15}}>
            <Controller
              defaultValue=""
              name="old_password"
              control={control}
              rules={{
                required: {value: true, message: lang.Validation.required},
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  placeholder={lang.ChangePassword.oldPassword}
                  preicon={
                    <Svg.Lockpass
                      style={{color: config.colors.darkGrayColor}}
                    />
                  }
                  posticon={
                    SecurePassword1 ? (
                      <Svg.Iconeye
                        onPress={() => setViewPassword1(!SecurePassword1)}
                      />
                    ) : (
                      <Svg.Iconeyeoff
                        onPress={() => setViewPassword1(!SecurePassword1)}
                      />
                    )
                  }
                  postIconFunction={() => setViewPassword1(!SecurePassword1)}
                  secureTextEntry={SecurePassword1}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  error={errors.old_password?.message}
                />
              )}
            />
            <Controller
              defaultValue=""
              name="new_password"
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
                  placeholder={lang.ChangePassword.NewPassword}
                  preicon={
                    <Svg.Lockpass
                      style={{color: config.colors.darkGrayColor}}
                    />
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
                  error={errors.new_password?.message}
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
                  value === getValues('new_password') ||
                  lang.Validation.confirmPassword,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  preicon={
                    <Svg.Lockpass
                      style={{color: config.colors.darkGrayColor}}
                    />
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
                  backgroundColor:
                    !isDirty || !isValid
                      ? config.colors.darkGrayColor
                      : config.colors.mainBgColor,

                  maxWidth: '70%',
                }}
                disabled={!isDirty || !isValid}
                onPress={handleSubmit(onSubmit)}>
                {lang.forgotPassword.btn}
              </FormButton>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  ChangePassword: data => authActions.ChangePassword(data)(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordScreen);
