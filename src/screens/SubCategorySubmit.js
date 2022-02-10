import React, {useRef, useState, useEffect} from 'react';

import {useSelector, useDispatch, connect} from 'react-redux';
import {
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Platform,
  Keyboard,
  Modal,
  Dimensions,
  View,
} from 'react-native';
import {HeaderComponent} from '../components/core/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownModal from '../components/material/DropdownModal';
import DropdownComp from '../components/material/MultiSelect';
import InputField from '../components/material/InputField';
import config from '../assets/config.json';
import FormButton from '../components/material/FormButton';
import common from '../assets/common';
import lang from '../localization';
import {actions as orderActions} from '../modules/order';
import {actions as categoryActions} from '../modules/categories';
import store from '../features/redux/store';
import {Card, Title, Appbar} from 'react-native-paper';
import {SvgUri} from 'react-native-svg';
import LoadingComp from '../components/material/LoadingComp';
import {useForm, Controller} from 'react-hook-form';
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
    backgroundColor: config.colors.maindarkcolor + 'cc',
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
    paddingTop: 20,
  },
  subitemsimageStyle: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 40,
    bottom: 0,
    justifyContent: 'center',
  },
  subitemsTitle: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Regular',
    fontSize: 20,
    color: '#fff',
  },
  textStyle: {
    fontFamily: 'Cairo-Regular',
    fontSize: 13,
    color: config.colors.mainBgColor,
    fontWeight: '500',
    // width: 85,
  },
  BreadCrumb: {
    fontFamily: 'Cairo-Regular',
    fontSize: 10,
    color: config.colors.darkGrayColor,
    fontWeight: '500',
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
});

const SubCategorySubmitScreen = props => {
  const [loadingSub, setLoadingSub] = useState(false);
  const DropdownRef = useRef(null);
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
    props
      .SetOrderParam({...props.OrderReducer.currentOrderProcess, ...data})
      .then(respo => {
        props.navigation.navigate('ChooseService');
      });
  };
  // const { isDirty, isValid } = formState;
  //   useEffect(() => {
  //   if (formState.errors.firstName) {
  //     // do the your logic here
  //   }
  // }, [formState]);
  useEffect(() => {
    setLoadingSub(true);
    if (props.OrderReducer.currentOrderProcess.sub_category_id) {
      props
        .LoadDevices(props.OrderReducer.currentOrderProcess.sub_category_id)
        .then(res => {
          setLoadingSub(false);
        });
    } else {
      props.navigation.goBack();
    }
  }, []);
  const [area, setArea] = useState('');
  const [deviceName, setDeviceName] = useState();
  const [brandName, setBrandName] = useState();
  const [devicesVisible, setDevicesVisible] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [editBrand, setEditBrand] = useState(false);
  return (
    <View
      nestedScrollEnabled={true}
      style={{
        ...styles.mainContaier,
        backgroundColor: props.categoriesReducer.devices.color + 'cc',
      }}>
      <View
        style={{
          ...styles.viewStyle,
          backgroundColor: '#fff',
        }}>
        {/* <DropdownModal
          close={() => setDevicesVisible(false)}
          Visible={devicesVisible}
          modalTitle={lang.itemReport.categoryDevice}>
          {!props.appReducer.loading && !loadingSub && (
            <ScrollView
              style={{
                flex: 1,
              }}>
              {props.categoriesReducer.devices.devices &&
                props.categoriesReducer.devices.devices.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.name}
                      onPress={() => {
                        setLoadingSub(true);
                        setValue('device_id', item.id);
                        setDeviceName(item.name);
                        setValue('brand_id', null);
                        setBrandName(null);
                        props.LoadDeviceBrands(item.id).then(res => {
                          setLoadingSub(false);
                          //var s = props.governmentReducer.governorates;
                          //setGov(s);
                        });
                        setDevicesVisible(false);
                        setEditBrand(true);
                      }}>
                      <Text style={styles.modalDataStyles}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          )}
          {props.appReducer.loading && loadingSub && (
            <View style={{ flex: 1 }}>
              <LoadingComp
                showHeader={false}
                navigation={props.navigation}
                pageTitle={lang.home.title}
              />
            </View>
          )}
        </DropdownModal>
        <DropdownModal
          close={() => setBrandVisible(false)}
          Visible={brandVisible}
          modalTitle={lang.itemReport.deviceBrand}>
          {!props.appReducer.loading && !loadingSub && (
            <ScrollView
              style={{
                flex: 1,
              }}>
              {props.categoriesReducer.deviceBrands.brands &&
                props.categoriesReducer.deviceBrands.brands.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.name}
                      onPress={() => {
                        setValue('brand_id', item.id);
                        setBrandName(item.name);
                        setBrandVisible(false);
                      }}>
                      <Text style={styles.modalDataStyles}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          )}
          {props.appReducer.loading && loadingSub && (
            <View style={{ flex: 1 }}>
              <LoadingComp
                showHeader={false}
                navigation={props.navigation}
                pageTitle={lang.home.title}
              />
            </View>
          )}
        </DropdownModal> */}
        <Modal animationType="slide" transparent={true} visible={brandVisible}>
          <View style={styles.mainView}>
            <View style={styles.subView}>
              <View style={styles.closeModel}>
                <Appbar.Action
                  icon={'close'}
                  size={18}
                  style={{margin: 5}}
                  color={config.colors.mainBgColor}
                  onPress={() => setBrandVisible(false)}
                />
              </View>
              <Text style={styles.modalTitleStyles}>
                {lang.itemReport.chooseDevice}
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
                    setBrandVisible(false);
                  }}>
                  {lang.btns.Ok}
                </FormButton>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.subitemsimageStyle}>
          <Image
            style={{width: 250, height: 100}}
            source={{uri: props.categoriesReducer.devices.icon}}
          />
        </View>

        <ImageBackground
          style={{
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingBottom: 5,
            height: 150,
            backgroundColor: props.categoriesReducer.devices.color + 'cc',
          }}>
          <HeaderComponent
            fontColor={'#fff'}
            headerbtn2={() => props.navigation.goBack()}
          />

          <Text style={styles.subitemsTitle}>
            {props.categoriesReducer.devices.name}
          </Text>
        </ImageBackground>
      </View>
      <View style={styles.subitemStyle}>
        <ScrollView
          style={{paddingHorizontal: 10}}
          keyboardShouldPersistTaps="always">
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.BreadCrumb} onPress={() => {}}>
              {props.categoriesReducer.subcategories.name}
            </Text>
            <MaterialCommunityIcons
              style={{
                fontSize: 18,
                color: config.colors.darkGrayColor,
              }}
              name={'chevron-' + common.dir}
            />
            <Text style={styles.BreadCrumb} onPress={() => {}}>
              {props.categoriesReducer.devices.name}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <ScrollView
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{
                display: 'flex',
                width: screenWidth,
              }}>
              <View style={{flex: 1, width: screenWidth, flexDirection: 'row'}}>
                <Text style={{...styles.textStyle, marginTop: 15}}>
                  {' '}
                  {lang.itemReport.categoryDevice}{' '}
                </Text>
                {/* comment this  */}
                {/* <View style={{flex: 1}}> */}
                <Controller
                  defaultValue=""
                  name="device_id"
                  control={control}
                  rules={{
                    required: {value: true, message: lang.Validation.required},
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    // <InputField
                    //   containerStyles={{
                    //     paddingHorizontal: 0,
                    //     marginHorizontal: 0,
                    //   }}

                    //   value={deviceName}
                    //   selectTextOnFocus={false}
                    //   keyboardType={'none'}
                    //   onFocus={() => {setDevicesVisible(true)}}
                    //   posticon={
                    //     <MaterialCommunityIcons
                    //       style={{
                    //         fontSize: 22,
                    //         color: config.colors.darkGrayColor,
                    //       }}
                    //       name={'menu-down'}
                    //       onPress={() => setDevicesVisible(true)}
                    //     />
                    //   }
                    //   placeholder={lang.itemReport.categoryDevice}
                    //   secureTextEntry={false}
                    //   onChangeText={value => onChange(value)}
                    //   error={errors.device_id?.message}
                    // />
                    <DropdownComp
                      items={props.categoriesReducer.devices.devices}
                      error={errors.device_id?.message}
                      onSelectedItemsChange={value => {
                        onChange(value[0]);
                        setDeviceName(value);
                        setValue('brand_id', '');
                        setBrandName();

                        props.LoadDeviceBrands(value[0]).then(res => {
                          setLoadingSub(false);
                          //var s = props.governmentReducer.governorates;
                          //setGov(s);
                        });
                      }}
                      label={lang.itemReport.categoryDevice}
                      uniqueKey="id"
                      single={true}
                      selectedItems={deviceName}
                      selectText={deviceName}
                      searchInputPlaceholderText={lang.forms_fields.chooseValue}
                      displayKey="name"
                    />
                  )}
                />
              </View>
            </ScrollView>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <ScrollView
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{
                display: 'flex',
                width: screenWidth,
              }}>
              <View style={{flex: 1, width: screenWidth, flexDirection: 'row'}}>
                <Text style={{...styles.textStyle, marginTop: 15}}>
                  {lang.itemReport.deviceBrand}
                </Text>
                {/* <View style={{ flex: 1 }}> */}
                <Controller
                  defaultValue=""
                  name="brand_id"
                  control={control}
                  rules={{
                    required: {value: true, message: lang.Validation.required},
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    // <InputField
                    //   containerStyles={{
                    //     paddingHorizontal: 0,
                    //     marginHorizontal: 0,
                    //   }}
                    //   editable={editBrand}
                    //   value={brandName}
                    //   onFocus={() => {
                    //     getValues('device_id')
                    //       ? setBrandVisible(true)
                    //       : setBrandVisible(false);
                    //   }}
                    //   selectTextOnFocus={false}
                    //   posticon={
                    //     <MaterialCommunityIcons
                    //       style={{
                    //         fontSize: 22,
                    //         color: config.colors.darkGrayColor,
                    //       }}
                    //       name={'menu-down'}
                    //       onPress={() => {
                    //         getValues('device_id').length > 2
                    //           ? setBrandVisible(true)
                    //           : setBrandVisible(false);
                    //       }}
                    //     />
                    //   }
                    //   placeholder={lang.itemReport.deviceBrand}
                    //   secureTextEntry={false}
                    //   onChangeText={value => onChange(value)}
                    //   maxLength={25}
                    //   error={errors.brand_id?.message}
                    // />
                    <DropdownComp
                      items={props.categoriesReducer.deviceBrands.brands}
                      error={errors.brand_id?.message}
                      DropdownRef1={DropdownRef}
                      // hideDropdown={true}
                      //  ref={(component) => { this.multiSelect = component }}
                      onToggleList={() => {
                        if (getValues('device_id') !== '') {
                          setBrandVisible(false);
                        } else {
                          setBrandVisible(true);
                          DropdownRef.current._clearSelectorCallback();
                        }
                      }}
                      onSelectedItemsChange={value => {
                        onChange(value[0]);
                        setBrandName(value);
                      }}
                      label={lang.itemReport.deviceBrand}
                      uniqueKey="id"
                      single={true}
                      selectedItems={brandName}
                      selectText={brandName}
                      searchInputPlaceholderText={lang.forms_fields.chooseValue}
                      displayKey="name"
                    />
                  )}
                />
              </View>
            </ScrollView>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{...styles.textStyle, marginTop: 15, width: 95}}>
              {' '}
              {lang.itemReport.deviceDamage}{' '}
            </Text>
            <View style={{flex: 1}}>
              <Controller
                defaultValue=""
                name="complaint"
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
                    numberOfLines={Platform.OS === 'ios' ? null : 5}
                    minHeight={Platform.OS === 'ios' && 4 ? 20 * 4 : null}
                    inputTextStyle={{textAlignVertical: 'top'}}
                    //   ErrorStyle={{height:100}}
                    placeholder={lang.itemReport.deviceDamage}
                    secureTextEntry={false}
                    onChangeText={value => onChange(value)}
                    error={errors.complaint?.message}
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
                backgroundColor:
                  !isDirty || !isValid
                    ? config.colors.darkGrayColor
                    : config.colors.mainBgColor,
                maxWidth: '70%',
              }}
              disabled={!isDirty || !isValid}
              loadingprop={props.appReducer.loading && !loadingSub}
              onPress={handleSubmit(onSubmit)}>
              {lang.btns.Next}
            </FormButton>
          </View>
        </ScrollView>
      </View>
      {/* {props.appReducer.loading && (
        <LoadingComp
          showHeader={true}
          navigation={props.navigation}
          pageTitle={lang.home.title}
        />
      )} */}
    </View>
  );
};

// const mapDispatchToProps = (dispatch) => ({
// dispatch})

const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  LoadDevices: data => categoryActions.LoadDevices(data)(dispatch, getState),
  LoadDeviceBrands: data =>
    categoryActions.LoadDeviceBrands(data)(dispatch, getState),
  SetOrderParam: data => orderActions.SetOrderParam(data)(dispatch, getState),
  //unloadUser: () => authActions.unloadUser()(dispatch, getState),
});

const mapStateToProps = state => ({
  OrderReducer: state.OrderReducer,
  categoriesReducer: state.categoriesReducer,
  appReducer: state.appReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubCategorySubmitScreen);
