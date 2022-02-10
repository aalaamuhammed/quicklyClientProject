import React, {useEffect, useState} from 'react';

import {connect} from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Alert,
} from 'react-native';
import store from '../features/redux/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HeaderComponent} from '../components/core/Header';
import {actions as orderActions} from '../modules/order';
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
    paddingTop: 10,
  },
  container2: {
    paddingHorizontal: 10,
    // alignItems: 'center',
  },
  IconStyle: {
    paddingVertical: 15,
    color: config.colors.mainBgColor,
  },
  Titletext: {
    ...common.fontstyles,
    color: config.colors.mainBgColor,
    fontFamily: 'Cairo-Bold',
    fontSize: 14,
    margin: 5,
  },
  titleTextStyle: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
    color: config.colors.darkGrayColor,
    paddingVertical: 15,
  },
});
const company = [
  {
    key: 'quickly',
    text: lang.makeComplaint.Quickly,
    status: 0,
  },
  {
    key: 'company',
    text: lang.makeComplaint.ExecutorCompany,
    status: 2,
  },
  {
    key: 'engineer',
    text: lang.makeComplaint.Engineer,
    status: 3,
  },
];
const MakeComplaintScreen = props => {
  const {
    handleSubmit,
    control,
    formState: {errors, isDirty, isValid},
    getValues,
    setValue,
    setError,
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = data => {
    props.makeComplaint({
      data: {...data, order_id: props.route.params.order_id},
      redirectToMainScreen: () => props.navigation.goBack(),
    });
  };
  useEffect(() => {
    if (props.appReducer.backendErrors.comment)
      setError('comment', {
        type: 'manual',
        message: props.appReducer.backendErrors.comment[0],
      });
    if (props.appReducer.backendErrors.from)
      setError('from', {
        type: 'manual',
        message: props.appReducer.backendErrors.from[0],
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
          toggleDrawer={() => props.navigation.toggleDrawer()}
          headerbtn2={() => props.navigation.goBack()}>
          {lang.makeComplaint.title}
        </HeaderComponent>
      </View>

      <View style={styles.subitemStyle}>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{...styles.container2, paddingVertical: 5}}>
            <View style={common.radio.radioContainer}>
              <Text
                style={{
                  ...styles.titleTextStyle,
                  fontSize: 11,
                }}>
                {lang.makeComplaint.complaintOn}
              </Text>
              {company.map(item => {
                return (
                  <Controller
                    key={item.key}
                    defaultValue=""
                    name="from"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: lang.Validation.required,
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      //   <RadioButton
                      //     value={value}
                      //     color={'#fff'}
                      //     uncheckedColor={'#fff'}
                      //     status={value === item.key ? 'checked' : 'unchecked'}
                      //     onPress={() => {
                      //       setValue('gender', item.key);
                      //     }}
                      //   />

                      <TouchableOpacity
                        disabled={props.route.params.status < item.status}
                        onPress={() => {
                          setValue('from', item.key, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }}
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                          style={{
                            justifyContent: 'center',
                            width: 15,
                            height: 15,
                            backgroundColor:
                              value === item.key
                                ? config.colors.mainBgColor
                                : '#fff',
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor:
                              props.route.params.status < item.status
                                ? config.colors.darkGrayColor
                                : config.colors.mainBgColor,
                          }}>
                          {value === item.key && (
                            <MaterialCommunityIcons
                              name={'check'}
                              color={'#fff'}
                            />
                          )}
                        </View>
                        <Text
                          style={{
                            ...styles.Titletext,
                            color:
                              props.route.params.status < item.status
                                ? config.colors.darkGrayColor
                                : config.colors.mainBgColor,
                          }}>
                          {item.text}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                );
              })}
              <Text
                style={{
                  ...styles.titleTextStyle,
                  fontSize: 11,
                }}>
                {lang.makeComplaint.complaintReason}
              </Text>
              <Controller
                defaultValue=""
                name="comment"
                control={control}
                rules={{
                  required: {value: true, message: lang.Validation.required},
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputField
                    containerStyles={{
                      paddingHorizontal: 0,
                      marginHorizontal: 0,
                      height: 90,
                    }}
                    value={value}
                    multiline={true}
                    selectTextOnFocus={false}
                    numberOfLines={5}
                    inputTextStyle={{textAlignVertical: 'top'}}
                    //   ErrorStyle={{height:100}}
                    secureTextEntry={false}
                    onChangeText={value => onChange(value)}
                    error={errors.comment?.message}
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
                  loadingprop={props.appReducer.loading}
                  onPress={handleSubmit(onSubmit)}>
                  {lang.forgotPassword.send}
                </FormButton>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  makeComplaint: data => orderActions.makeComplaint(data)(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MakeComplaintScreen);
