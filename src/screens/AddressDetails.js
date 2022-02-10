import React, {useRef, useEffect, useState} from 'react';

import {connect} from 'react-redux';
import {
  StyleSheet,
  BackHandler,
  Animated,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Easing,
  Text,
  View,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InputField from '../components/material/InputField';
import FormButton from '../components/material/FormButton';
import {HeaderComponent} from '../components/core/Header';
import {cities, governorate} from '../localization/citiesandlocations';
import DropdownModal from '../components/material/DropdownModal';
import {actions as appActions} from '../modules/app';
import lang from '../localization';
import store from '../features/redux/store';
import common from '../assets/common';
import config from '../assets/config.json';
import * as Svg from '../assets/images';
import {Card} from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useForm, Controller} from 'react-hook-form';
const styles = StyleSheet.create({
  modalDataStyles: {
    color: '#000',
    ...common.fontstyles,
    textAlign: 'center',
    fontSize: 14,
    margin: 20,
  },
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
  fieldContainer: {
    ...common.fields.fieldContainer,
    paddingVertical: 15,
    marginVertical: 10,
  },
  textStyle: {
    ...common.fontstyles,
    fontSize: 13,
    width: 80,
    color: config.colors.mainBgColor,
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000a7',
    alignItems: 'center',
    margin: 0,
    marginTop: 0,
  },
  subView: {
    width: '85%',
    backgroundColor: 'white',
    justifyContent: 'center',
    // borderRadius: 20,
    padding: 5,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    margin: 0,
  },
  modalTitleStyles: {
    color: config.colors.mainBgColor,
    ...common.fontstyles,
    textAlign: 'center',
    fontSize: 16,
    margin: 20,
  },
});

const AddressDetailsScreen = props => {
  const {
    handleSubmit,
    control,
    formState: {errors, isDirty, isValid},
    setValue,
    getValues,
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = data => {
    props.loginUser({
      data: data,
      redirectToMainScreen: () => props.navigation.navigate('Register'),
    });
  };
  const [areas, setAreas] = useState([]);
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [cityVisible, setCityVisible] = useState(false);
  const [areaVisible, setAreaVisible] = useState(false);
  const settingAreas = id => {
    var newArray = [];
    cities.forEach(element => {
      if (element.gov_id === id) {
        newArray.push(element);
      }
    });
    setAreas(newArray);
  };
  const [Visible, SetVisable] = useState(false);
  const [currentId, SetCurrentId] = useState(null);
  useEffect(() => {
    const backAction = () => {
      props.navigation.navigate('Addresses');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

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
          headerbtn2={() => props.navigation.navigate('Addresses')}>
          {lang.addresses.title}
        </HeaderComponent>
      </View>
      <Modal animationType="slide" transparent={true} visible={Visible}>
        <View style={styles.mainView}>
          <View style={styles.subView}>
            <Text style={styles.modalTitleStyles}>
              {lang.addresses.deleteAddress}
            </Text>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <FormButton
                textStyles={{color: '#fff'}}
                styleprops={{
                  borderColor: 'transparent',
                  backgroundColor: config.colors.mainBgColor,
                }}
                onPress={() => {}}>
                {lang.addresses.deletebtn}
              </FormButton>
              <FormButton
                onPress={() => {
                  SetCurrentId(null);
                  SetVisable(false);
                }}>
                {lang.addresses.cancelbtn}
              </FormButton>
            </View>
          </View>
        </View>
      </Modal>
      <DropdownModal Visible={areaVisible} modalTitle={lang.signup.area}>
        {areas.map(item => {
          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => {
                setValue('area', item.name_en);
                setArea(lang.lang === 'ar' ? item.name : item.name_en);
                setAreaVisible(false);
              }}>
              <Text style={styles.modalDataStyles}>
                {lang.lang === 'ar' ? item.name : item.name_en}
              </Text>
            </TouchableOpacity>
          );
        })}
      </DropdownModal>
      <DropdownModal Visible={cityVisible} modalTitle={lang.signup.area}>
        {governorate.map(item => {
          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => {
                setValue('governemt', item.name_en);
                setValue('area', '');
                setCity(lang.lang === 'ar' ? item.name : item.name_en);
                setArea('');
                settingAreas(item.id);
                setCityVisible(false);
              }}>
              <Text style={styles.modalDataStyles}>
                {lang.lang === 'ar' ? item.name : item.name_en}
              </Text>
            </TouchableOpacity>
          );
        })}
      </DropdownModal>

      <View style={styles.subitemStyle}>
        <View style={{padding: 10, flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.textStyle}> {lang.signup.city} </Text>
              <View style={{flex: 1}}>
                <Controller
                  defaultValue=""
                  name="governemt"
                  control={control}
                  rules={{
                    required: {value: true, message: lang.Validation.required},
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <InputField
                      containerStyles={{
                        paddingHorizontal: 0,
                        marginHorizontal: 0,
                      }}
                      editable={false}
                      selectTextOnFocus={false}
                      posticon={
                        <MaterialCommunityIcons
                          style={{
                            fontSize: 22,
                            color: config.colors.darkGrayColor,
                          }}
                          name={'menu-down'}
                          onPress={() => {
                            setCityVisible(true);
                          }}
                        />
                      }
                      value={city}
                      disabled={true}
                      placeholder={lang.signup.city}
                      secureTextEntry={false}
                      onChangeText={value => onChange(value)}
                      maxLength={25}
                      error={errors.governemt?.message}
                    />
                  )}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.textStyle}> {lang.signup.area} </Text>
              <View style={{flex: 1}}>
                <Controller
                  defaultValue=""
                  name="area"
                  control={control}
                  rules={{
                    required: {value: true, message: lang.Validation.required},
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <InputField
                      containerStyles={{
                        paddingHorizontal: 0,
                        marginHorizontal: 0,
                      }}
                      value={area}
                      editable={false}
                      selectTextOnFocus={false}
                      posticon={
                        <MaterialCommunityIcons
                          style={{
                            fontSize: 22,
                            color: config.colors.darkGrayColor,
                          }}
                          name={'menu-down'}
                          onPress={() => {
                            getValues('governemt').length > 2
                              ? setAreaVisible(true)
                              : setAreaVisible(false);
                          }}
                        />
                      }
                      placeholder={lang.signup.area}
                      secureTextEntry={false}
                      onChangeText={value => onChange(value)}
                      maxLength={25}
                      error={errors.area?.message}
                    />
                  )}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.textStyle}> {lang.addresses.Street} </Text>
              <View style={{flex: 1}}>
                <Controller
                  defaultValue=""
                  name="login"
                  control={control}
                  rules={{
                    required: {value: true, message: lang.Validation.required},
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <InputField
                      containerStyles={{
                        paddingHorizontal: 0,
                        marginHorizontal: 0,
                      }}
                      placeholder={lang.addresses.Street}
                      secureTextEntry={false}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}
                      value={value}
                      error={errors.login?.message}
                    />
                  )}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{...styles.textStyle}}>
                {' '}
                {lang.addresses.buildingNo}{' '}
              </Text>
              <View style={{flex: 1}}>
                <Controller
                  defaultValue=""
                  name="building_no"
                  control={control}
                  rules={{
                    required: {value: true, message: lang.Validation.required},
                    validate: value => !isNaN(value) || lang.Validation.NoReq,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <InputField
                      containerStyles={{
                        paddingHorizontal: 0,
                        marginHorizontal: 0,
                      }}
                      placeholder={'0'}
                      inputTextStyle={{textAlign: 'center'}}
                      secureTextEntry={false}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}
                      value={value}
                      error={errors.building_no?.message}
                    />
                  )}
                />
              </View>
              <Text style={{...styles.textStyle, width: 'auto'}}>
                {' '}
                {lang.addresses.floorNo}{' '}
              </Text>
              <View style={{flex: 1}}>
                <Controller
                  defaultValue=""
                  name="floor_no"
                  control={control}
                  rules={{
                    required: {value: true, message: lang.Validation.required},
                    validate: value => !isNaN(value) || lang.Validation.NoReq,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <InputField
                      containerStyles={{
                        paddingHorizontal: 0,
                        marginHorizontal: 0,
                      }}
                      placeholder={'0'}
                      inputTextStyle={{textAlign: 'center'}}
                      secureTextEntry={false}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}
                      value={value}
                      error={errors.floor_no?.message}
                    />
                  )}
                />
              </View>
              <Text style={{...styles.textStyle, width: 'auto'}}>
                {' '}
                {lang.addresses.apartmentNo}{' '}
              </Text>
              <View style={{flex: 1}}>
                <Controller
                  defaultValue=""
                  name="flat_no"
                  control={control}
                  rules={{
                    required: {value: true, message: lang.Validation.required},
                    validate: value => !isNaN(value) || lang.Validation.NoReq,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <InputField
                      containerStyles={{
                        paddingHorizontal: 0,
                        marginHorizontal: 0,
                      }}
                      placeholder={'0'}
                      inputTextStyle={{textAlign: 'center'}}
                      secureTextEntry={false}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}
                      value={value}
                      error={errors.flat_no?.message}
                    />
                  )}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.textStyle}>
                {' '}
                {lang.addresses.fullAddress}{' '}
              </Text>
              <View style={{flex: 1}}>
                <Controller
                  defaultValue=""
                  name="address"
                  control={control}
                  rules={{
                    required: {value: true, message: lang.Validation.required},
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <InputField
                      containerStyles={{
                        paddingHorizontal: 0,
                        marginHorizontal: 0,
                      }}
                      placeholder={lang.addresses.fullAddress}
                      secureTextEntry={false}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}
                      value={value}
                      error={errors.address?.message}
                    />
                  )}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.textStyle}> {lang.addresses.phoneNo} </Text>
              <View style={{flex: 1}}>
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
                      containerStyles={{
                        paddingHorizontal: 0,
                        marginHorizontal: 0,
                      }}
                      keyboardType="phone-pad"
                      maxLength={11}
                      placeholder={lang.addresses.phoneNo}
                      secureTextEntry={false}
                      onChangeText={value => onChange(value)}
                      value={value}
                      postText={'+2'}
                      error={errors.phone?.message}
                    />
                  )}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.textStyle}>
                {' '}
                {lang.addresses.landlineNo + lang.addresses.optional}{' '}
              </Text>
              <View style={{flex: 1}}>
                <Controller
                  defaultValue=""
                  name="landline"
                  control={control}
                  rules={{
                    required: {value: true, message: lang.Validation.required},
                    validate: value => !isNaN(value) || lang.Validation.NoReq,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <InputField
                      containerStyles={{
                        paddingHorizontal: 0,
                        marginHorizontal: 0,
                      }}
                      placeholder={lang.addresses.landlineNo}
                      secureTextEntry={false}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}
                      value={value}
                      error={errors.landline?.message}
                    />
                  )}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <FormButton
                textStyles={{color: '#fff'}}
                styleprops={{
                  borderColor: 'transparent',
                  backgroundColor: config.colors.mainBgColor,
                  maxWidth: '70%',
                }}
                loadingprop={props.appReducer.loading}
                onPress={handleSubmit(onSubmit)}>
                {lang.addresses.save}
              </FormButton>
            </View>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={() => {
                SetCurrentId(id);
                SetVisable(true);
              }}>
              <Svg.Icondeletesweep style={{color: config.colors.dangerColor}} />
              <Text
                style={{marginVertical: 5, color: config.colors.dangerColor}}>
                {lang.addresses.deleteAddressTitle}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  toggleLanguages: data => appActions.toggleLanguages(data)(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressDetailsScreen);
