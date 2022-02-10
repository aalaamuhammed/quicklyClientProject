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
import DropdownComp from '../components/material/MultiSelect';
import {actions as AddressActions} from '../modules/address';
import {actions as OthersActions} from '../modules/other';
import {actions as appActions} from '../modules/app';
import lang from '../localization';
import store from '../features/redux/store';
import common from '../assets/common';
import config from '../assets/config.json';
import * as Svg from '../assets/images';
import {Appbar, Avatar, Checkbox} from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useForm, Controller} from 'react-hook-form';
import MapModal from '../components/material/mapComp';
import LoadingComp from '../components/material/LoadingComp';
const screenWidth = Dimensions.get('window').width;
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
    // width: 80,
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
    ...common.fontstyles,
    color: config.colors.mainBgColor,
    ...common.fontstyles,
    textAlign: 'center',
    fontSize: 13,
    marginVertical: 5,
    marginHorizontal: 30,
  },
  modalSubTitleStyles: {
    ...common.fontstyles,
    color: config.colors.darkGrayColor,
    ...common.fontstyles,
    textAlign: 'center',
    fontSize: 13,
    marginVertical: 5,
    marginHorizontal: 30,
  },
  closeModel: {
    backgroundColor: '#FFF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    position: 'absolute',
    top: -15,
    right: 10,
    borderRadius: 50,
  },
  positionChoosen: {
    color: '#fff',
    ...common.fontstyles,
    fontSize: 14,
  },
  currentPosition: {
    color: config.colors.darkGrayColor,
    ...common.fontstyles,
    fontSize: 12,
  },
});

const AddAddressScreen = props => {
  const DropdownRef = useRef(null);
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
    props.addAddress({
      data: {...data, lat: position.latitude, long: position.longitude},
      redirectToMainScreen: () =>
        props.navigation.navigate(props.route.params.page),
    });
  };
  const [areas, setAreas] = useState([]);
  const [city, setCity] = useState();
  const [area, setArea] = useState();
  const [loadingSub, setLoadingSub] = useState(false);
  const [cityVisible, setCityVisible] = useState(false);
  const [editableArea, setEditableArea] = useState(false);
  const [areaVisible, setAreaVisible] = useState(false);
  const [phoneCodes, setPhoneCodes] = useState(['011', '012', '010', '015']);
  const settingAreas = id => {
    var cities = props.OtherReducer.governorates.find(s => s.id === id);

    setAreas(cities.cities);
  };
  const [Visible, SetVisable] = useState(false);
  const [position, SetPosition] = useState(null);
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
    setValue('set_default', '0');
    SetVisable(true);
  }, []);

  useEffect(() => {
    if (props.appReducer.backendErrors.governorate_id)
      setError('governorate_id', {
        type: 'manual',
        message: props.appReducer.backendErrors.governorate_id[0],
      });
    if (props.appReducer.backendErrors.city_id)
      setError('city_id', {
        type: 'manual',
        message: props.appReducer.backendErrors.city_id[0],
      });
    if (props.appReducer.backendErrors.street)
      setError('street', {
        type: 'manual',
        message: props.appReducer.backendErrors.street[0],
      });
    if (props.appReducer.backendErrors.building_no)
      setError('building_no', {
        type: 'manual',
        message: props.appReducer.backendErrors.building_no[0],
      });
    if (props.appReducer.backendErrors.floor_no)
      setError('floor_no', {
        type: 'manual',
        message: props.appReducer.backendErrors.floor_no[0],
      });
    if (props.appReducer.backendErrors.flat_no)
      setError('flat_no', {
        type: 'manual',
        message: props.appReducer.backendErrors.flat_no[0],
      });
    if (props.appReducer.backendErrors.address)
      setError('address', {
        type: 'manual',
        message: props.appReducer.backendErrors.address[0],
      });
    if (props.appReducer.backendErrors.phone)
      setError('phone', {
        type: 'manual',
        message: props.appReducer.backendErrors.phone[0],
      });
    if (props.appReducer.backendErrors.phone)
      setError('landline', {
        type: 'manual',
        message: props.appReducer.backendErrors.landline[0],
      });
    if (props.appReducer.backendErrors.set_default)
      setError('set_default', {
        type: 'manual',
        message: props.appReducer.backendErrors.set_default[0],
      });
  }, [props.appReducer.backendErrors]);
  const sendDataToParent = index => {
    // the callback. Use a better name
    SetPosition(index);
    SetVisable(false);
  };

  return (
    <View nestedScrollEnabled={true} style={styles.mainContaier}>
      <MapModal Visible={Visible} sendDataToParent={sendDataToParent} />
      <View
        style={{
          ...styles.viewStyle,
          backgroundColor: config.colors.maindarkcolor,
        }}>
        <HeaderComponent
          fontColor={'#fff'}
          toggleDrawer={() => props.navigation.toggleDrawer()}
          headerbtn2={() => props.navigation.goBack()}>
          {lang.addresses.title}
        </HeaderComponent>
        <Modal animationType="slide" transparent={true} visible={areaVisible}>
          <View style={styles.mainView}>
            <View style={styles.subView}>
              <View style={styles.closeModel}>
                <Appbar.Action
                  icon={'close'}
                  size={18}
                  style={{margin: 5}}
                  color={config.colors.mainBgColor}
                  onPress={() => setAreaVisible(false)}
                />
              </View>
              <Text style={styles.modalTitleStyles}>
                {lang.addresses.chooseGov}
              </Text>
              {/* <Text style={styles.modalSubTitleStyles}>
              {lang.drawer.confirmLogout}
            </Text> */}
              <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <FormButton
                  textStyles={{color: '#fff', fontSize: 12}}
                  styleprops={{
                    borderColor: 'transparent',
                    backgroundColor: config.colors.mainBgColor,
                  }}
                  onPress={() => {
                    setAreaVisible(false);
                  }}>
                  {lang.btns.Ok}
                </FormButton>
              </View>
            </View>
          </View>
        </Modal>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{paddingHorizontal: 10, maxWidth: '60%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Avatar.Icon
                size={12}
                style={{
                  margin: 2,
                  borderColor: config.colors.maindarkcolor,
                  borderWidth: 1,
                }}
                theme={{
                  colors: {
                    primary: '#fff',
                  },
                }}
                icon={'check'}
                color={config.colors.maindarkcolor}
              />

              <Text style={styles.positionChoosen}>
                {' '}
                {lang.addresses.Locationselected}
              </Text>
            </View>
            {position && (
              <Text style={styles.currentPosition}>{position.governorate}</Text>
            )}
            {props.appReducer.backendErrors.lat && (
              <Text style={{...styles.currentPosition, color: 'red'}}>
                {props.appReducer.backendErrors.lat[0]}
              </Text>
            )}
            {props.appReducer.backendErrors.long && (
              <Text style={{...styles.currentPosition, color: 'red'}}>
                {props.appReducer.backendErrors.long[0]}
              </Text>
            )}
          </View>
          <FormButton
            textStyles={{color: '#fff', fontSize: 12}}
            styleprops={{
              borderColor: 'transparent',
              backgroundColor: config.colors.mainBgColor,
              paddingVertical: 0,
              maxWidth: '30%',
            }}
            onPress={() => SetVisable(true)}
            loadingprop={false}>
            {/* <Svg.Iconlocationon width={12} height={12} style={{color: '#FFF'}} /> */}

            {lang.addresses.selectLocation}
          </FormButton>
        </View>
      </View>

      <View style={styles.subitemStyle}>
        <View style={{padding: 10, flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ScrollView
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{
                  display: 'flex',
                  width: screenWidth,
                }}>
                <View
                  style={{flex: 1, width: screenWidth, flexDirection: 'row'}}>
                  <Text style={{...styles.textStyle, marginTop: 15, width: 70}}>
                    {lang.signup.city}{' '}
                  </Text>
                  {/* <View style={{flex: 1}}> */}
                  <Controller
                    defaultValue=""
                    name="governorate_id"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: lang.Validation.required,
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <DropdownComp
                        items={props.OtherReducer.governorates}
                        error={errors.governorate_id?.message}
                        onSelectedItemsChange={value => {
                          onChange(value[0]);
                          setValue('city_id', '');
                          setCity(value);
                          setArea();
                          settingAreas(value[0]);
                        }}
                        label={lang.signup.city}
                        uniqueKey="id"
                        single={true}
                        selectedItems={city}
                        selectText={city}
                        searchInputPlaceholderText={
                          lang.forms_fields.chooseValue
                        }
                        displayKey={lang.lang === 'ar' ? 'name' : 'name_en'}
                      />
                    )}
                  />
                </View>
              </ScrollView>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ScrollView
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{
                  display: 'flex',
                  width: screenWidth,
                }}>
                <View
                  style={{flex: 1, width: screenWidth, flexDirection: 'row'}}>
                  <Text style={{...styles.textStyle, marginTop: 15, width: 70}}>
                    {lang.signup.area}{' '}
                  </Text>
                  {/* <View style={{flex: 1}}> */}
                  <Controller
                    defaultValue=""
                    name="city_id"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: lang.Validation.required,
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      // <InputField
                      //   containerStyles={{
                      //     paddingHorizontal: 0,
                      //     marginHorizontal: 0,
                      //   }}
                      //   value={area}
                      //   editable={editableArea}
                      //   selectTextOnFocus={false}
                      //   onFocus={() => {
                      //     getValues('governorate_id')
                      //       ? setAreaVisible(true)
                      //       : setAreaVisible(false);
                      //   }}
                      //   posticon={
                      //     <MaterialCommunityIcons
                      //       style={{
                      //         fontSize: 22,
                      //         color: config.colors.darkGrayColor,
                      //       }}
                      //       name={'menu-down'}
                      //       onPress={() => {
                      //         getValues('governorate_id')
                      //           ? setAreaVisible(true)
                      //           : setAreaVisible(false);
                      //       }}
                      //     />
                      //   }
                      //   placeholder={lang.signup.area}
                      //   secureTextEntry={false}
                      //   onChangeText={value => onChange(value)}
                      //   maxLength={25}
                      //   error={errors.city_id?.message}
                      // />
                      <DropdownComp
                        items={areas}
                        error={errors.brand_id?.message}
                        DropdownRef1={DropdownRef}
                        // hideDropdown={true}
                        //  ref={(component) => { this.multiSelect = component }}
                        onToggleList={() => {
                          if (getValues('governorate_id') !== '') {
                            setAreaVisible(false);
                          } else {
                            setAreaVisible(true);
                            DropdownRef.current._clearSelectorCallback();
                          }
                        }}
                        onSelectedItemsChange={value => {
                          onChange(value[0]);

                          setArea(value);
                        }}
                        label={lang.signup.area}
                        uniqueKey="id"
                        single={true}
                        selectedItems={area}
                        selectText={area}
                        searchInputPlaceholderText={
                          lang.forms_fields.chooseValue
                        }
                        displayKey={lang.lang === 'ar' ? 'name' : 'name_en'}
                      />
                    )}
                  />
                </View>
              </ScrollView>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{...styles.textStyle, width: 90}}>
                {lang.addresses.Street}{' '}
              </Text>
              <View style={{flex: 1}}>
                <Controller
                  defaultValue=""
                  name="street"
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
                      error={errors.street?.message}
                    />
                  )}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{...styles.textStyle, width: 90}}>
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
                        marginHorizontal: 5,
                      }}
                      maxLength={4}
                      keyboardType="phone-pad"
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
                {lang.addresses.floorNo}
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
                        marginHorizontal: 5,
                      }}
                      maxLength={4}
                      keyboardType="phone-pad"
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
                {lang.addresses.apartmentNo}
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
                        marginHorizontal: 5,
                      }}
                      maxLength={4}
                      keyboardType="phone-pad"
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
              <Text style={{...styles.textStyle, width: 90}}>
                {lang.addresses.fullAddress}
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
              <Text style={{...styles.textStyle, width: 90}}>
                {lang.addresses.phoneNo}{' '}
              </Text>
              <View style={{flex: 1}}>
                <Controller
                  defaultValue=""
                  name="phone"
                  control={control}
                  rules={{
                    required: {value: true, message: lang.Validation.required},
                    validate: {
                      valid: value =>
                        phoneCodes.includes(value.substring(0, 3)) ||
                        lang.Validation.EgyptionNo,

                      valid2: value => !isNaN(value) || lang.Validation.NoReq,
                    },
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
              <Text style={{...styles.textStyle, width: 90}}>
                {lang.addresses.landlineNo + lang.addresses.optional}
              </Text>
              <View style={{flex: 1}}>
                <Controller
                  defaultValue=""
                  name="landline"
                  control={control}
                  rules={{
                    validate: value => !isNaN(value) || lang.Validation.NoReq,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <InputField
                      containerStyles={{
                        paddingHorizontal: 0,
                        marginHorizontal: 0,
                      }}
                      maxLength={8}
                      keyboardType="phone-pad"
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Controller
                defaultValue=""
                name="set_default"
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Checkbox
                    status={value === '1' ? 'checked' : 'unchecked'}
                    uncheckedColor={config.colors.mainBgColor}
                    color={config.colors.mainBgColor}
                    onPress={() => {
                      setValue('set_default', value === '0' ? '1' : '0');
                    }}
                  />
                )}
              />
              <Text style={{...styles.textStyle, width: '100%'}}>
                {lang.addresses.setDefault}
              </Text>
            </View>
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
                loadingprop={props.appReducer.loading && !loadingSub}
                onPress={handleSubmit(onSubmit)}>
                {lang.addresses.save}
              </FormButton>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  toggleLanguages: data => appActions.toggleLanguages(data)(dispatch),
  LoadGovernorates: () => OthersActions.LoadGovernorates()(dispatch, getState),
  addAddress: data => AddressActions.addAddress(data)(dispatch, getState),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
  OtherReducer: state.OtherReducer,
  AddressReducer: state.AddressReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressScreen);
