import React, {useRef, useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch, connect} from 'react-redux';
import {
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  PermissionsAndroid,
  Platform,
  BackHandler,
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
import {actions as otherActions} from '../modules/other';
import {actions as categoryActions} from '../modules/categories';
import store from '../features/redux/store';
import {Appbar} from 'react-native-paper';
import {SvgUri} from 'react-native-svg';
import LoadingComp from '../components/material/LoadingComp';
import {useForm, Controller} from 'react-hook-form';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
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
    backgroundColor: '#232323',
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
    fontFamily: 'Cairo-Regular',
    fontSize: 20,
    color: '#fff',
  },
  textStyle: {
    fontFamily: 'Cairo-Regular',
    fontSize: 13,
    color: config.colors.mainBgColor,
    fontWeight: '500',
    width: 85,
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
const PricingRequestScreen = props => {
  const DropdownRef1 = useRef(null);
  const DropdownRef2 = useRef(null);
  const DropdownRef3 = useRef(null);
  const [loadingSub, setLoadingSub] = useState(false);
  const [imageRes, setImageRes] = useState(null);
  useEffect(() => {
    checkCam();
  }, []);
  const checkCam = async () => {
    if (Platform.OS !== 'android') {
      Geolocation.requestAuthorization();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log("You can use the camera");
        } else {
          // console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  const lunchLibrary = () => {
    launchImageLibrary(
      {
        title: lang.profile.uploadImage,
        mediaType: 'photo',
        allowsEditing: true,
        cameraType: 'back',

        cancelButtonTitle: lang.btns.Cancel,
        takePhotoButtonTitle: lang.profile.takeImage,
        chooseFromLibraryButtonTitle: lang.profile.choose_from_library,
      },

      response => {
        if (!response.error && !response.didCancel) {
          setRequestImage(response.assets[0].uri);
          setImageRes(response.assets[0]);
        } else {
        }
      },
    );
    //  }
  };
  const lunchCam = () => {
    launchCamera(
      {
        title: lang.profile.uploadImage,
        mediaType: 'photo',
        allowsEditing: true,
        cameraType: 'back',

        cancelButtonTitle: lang.btns.Cancel,
        takePhotoButtonTitle: lang.profile.takeImage,
        chooseFromLibraryButtonTitle: lang.profile.choose_from_library,
      },

      response => {
        if (!response.error && !response.didCancel && !response.errorCode) {
          setRequestImage(response.assets[0].uri);
          setImageRes(response.assets[0]);
        } else {
        }
      },
    );
    //  }
  };
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
    props.pricingRequest({
      data: data,
      image: imageRes,
      redirectToMainScreen: () => props.navigation.goBack(),
    });
  };
  useEffect(() => {
    setLoadingSub(true);
    props.PricingRequestImage();
    props.LoadMainCategories().then(res => {
      setLoadingSub(false);
    });

    //  setLoadingSub(true);
    //     if(props.route.params.subCategoryId){
    //     props.LoadDevices(props.route.params.subCategoryId).then(res => {
    //       setLoadingSub(false);
    //     });
    //   }else{
    //     props.navigation.goBack();

    //   }
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      setValue('device_id', null);
      setCatName();
      setSubName();
      setDeviceName();
      setBrandName();
      setRequestImage(null);
      setImageRes();
      setValue('brand_id', '');
      setValue('comment', '');
      setValue('image', '');
      setValue('SubCat_id', '');
      setValue('cat_id', '');
    }, []),
  );
  useEffect(() => {
    if (props.appReducer.backendErrors.device_id)
      setError('device_id', {
        type: 'manual',
        message: props.appReducer.backendErrors.device_id[0],
      });
    if (props.appReducer.backendErrors.brand_id)
      setError('brand_id', {
        type: 'manual',
        message: props.appReducer.backendErrors.brand_id[0],
      });
    if (props.appReducer.backendErrors.comment)
      setError('comment', {
        type: 'manual',
        message: props.appReducer.backendErrors.comment[0],
      });
    if (props.appReducer.backendErrors.image)
      setError('image', {
        type: 'manual',
        message: props.appReducer.backendErrors.image[0],
      });
  }, [props.appReducer.backendErrors]);
  const [imageVisible, setImageVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleMessage, setVisibleMessage] = useState(null);
  const [requestImage, setRequestImage] = useState(null);
  const {user} = props.authReducer;
  const [area, setArea] = useState('');
  const [catName, setCatName] = useState();
  const [subName, setSubName] = useState();
  const [deviceName, setDeviceName] = useState();
  const [brandName, setBrandName] = useState();
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [SubVisible, setSubVisible] = useState(false);
  const [devicesVisible, setDevicesVisible] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [editSub, setEditSub] = useState(false);
  const [ediDevice, setEdiDevice] = useState(false);
  const [editBrand, setEditBrand] = useState(false);
  return (
    <View nestedScrollEnabled={true} style={styles.mainContaier}>
      <View
        style={{
          ...styles.viewStyle,
          backgroundColor: config.colors.maindarkcolor,
        }}>
        <Modal animationType="slide" transparent={true} visible={imageVisible}>
          <View style={styles.mainView}>
            <View style={styles.subView}>
              <View style={styles.closeModel}>
                <Appbar.Action
                  icon={'close'}
                  size={18}
                  style={{margin: 5}}
                  color={config.colors.mainBgColor}
                  onPress={() => setImageVisible(false)}
                />
              </View>
              <Text style={styles.modalTitleStyles}>
                {lang.itemReport.pickImageTitle}
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
                    setImageVisible(false);
                    lunchCam();
                  }}>
                  {lang.itemReport.lunchCamera}
                </FormButton>
                <FormButton
                  textStyles={{fontSize: 12}}
                  onPress={() => {
                    setImageVisible(false);
                    lunchLibrary();
                  }}>
                  {lang.itemReport.lunchStudio}
                </FormButton>
              </View>
            </View>
          </View>
        </Modal>
        <Modal animationType="slide" transparent={true} visible={visible}>
          <View style={styles.mainView}>
            <View style={styles.subView}>
              <View style={styles.closeModel}>
                <Appbar.Action
                  icon={'close'}
                  size={18}
                  style={{margin: 5}}
                  color={config.colors.mainBgColor}
                  onPress={() => {
                    setVisibleMessage(null);
                    setVisible(false);
                  }}
                />
              </View>
              <Text style={styles.modalTitleStyles}>{visibleMessage}</Text>
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
                    setVisibleMessage(null);
                    setVisible(false);
                  }}>
                  {lang.btns.Ok}
                </FormButton>
              </View>
            </View>
          </View>
        </Modal>

        <DropdownModal
          close={() => setCategoryVisible(false)}
          Visible={categoryVisible}
          modalTitle={lang.itemReport.category}>
          {!props.appReducer.loading && !loadingSub && (
            <ScrollView
              style={{
                flex: 1,
              }}>
              {props.categoriesReducer.categories.length > 0 &&
                props.categoriesReducer.categories.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.name}
                      onPress={() => {
                        setLoadingSub(true);
                        setValue('cat_id', item.id);
                        setCatName(item.name);
                        props.LoadSubCategories(item.id).then(res => {
                          setLoadingSub(false);
                          //var s = props.governmentReducer.governorates;
                          //setGov(s);
                        });
                        setCategoryVisible(false);
                        setEditSub(true);
                      }}>
                      <Text style={styles.modalDataStyles}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          )}
          {props.appReducer.loading && loadingSub && (
            <View style={{flex: 1}}>
              <LoadingComp
                showHeader={false}
                navigation={props.navigation}
                pageTitle={lang.home.title}
              />
            </View>
          )}
        </DropdownModal>
        <DropdownModal
          close={() => setSubVisible(false)}
          Visible={SubVisible}
          modalTitle={lang.itemReport.subcategory}>
          {!props.appReducer.loading && !loadingSub && (
            <ScrollView
              style={{
                flex: 1,
              }}>
              {props.categoriesReducer.subcategories_devices &&
                props.categoriesReducer.subcategories_devices.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.name}
                      onPress={() => {
                        setLoadingSub(true);
                        setValue('SubCat_id', item.id);
                        setSubName(item.name);
                        props.LoadDevices(item.id).then(res => {
                          setLoadingSub(false);
                          //var s = props.governmentReducer.governorates;
                          //setGov(s);
                        });
                        setSubVisible(false);
                        setEdiDevice(true);
                      }}>
                      <Text style={styles.modalDataStyles}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          )}
          {props.appReducer.loading && loadingSub && (
            <View style={{flex: 1}}>
              <LoadingComp
                showHeader={false}
                navigation={props.navigation}
                pageTitle={lang.home.title}
              />
            </View>
          )}
        </DropdownModal>
        <DropdownModal
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
            <View style={{flex: 1}}>
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
            <View style={{flex: 1}}>
              <LoadingComp
                showHeader={false}
                navigation={props.navigation}
                pageTitle={lang.home.title}
              />
            </View>
          )}
        </DropdownModal>

        <View style={styles.subitemsimageStyle}>
          <Image
            style={{width: 250, height: 100}}
            source={
              requestImage
                ? {uri: requestImage}
                : {uri: props.OtherReducer.PricingBImage}
            }
          />
        </View>

        <ImageBackground
          style={{
            justifyContent: 'space-between',

            paddingLeft: 10,
            paddingBottom: 5,
            height: Platform.OS == 'ios' ? 180 : 150,
            backgroundColor: config.colors.maindarkcolor + 'aa',
          }}>
          <HeaderComponent
            fontColor={'#fff'}
            headerbtn2={() => props.navigation.goBack()}
            toggleDrawer={() => props.navigation.toggleDrawer()}>
            {lang.drawer.pricingRequest}
          </HeaderComponent>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setImageVisible(true)}>
              <Image
                style={{
                  width: 120,
                  height: 60,
                  margin: 5,
                  borderWidth: 1,
                  borderColor: '#fff',
                  resizeMode: 'stretch',
                  backgroundColor: 'transparent',
                }}
                source={
                  requestImage
                    ? {uri: requestImage}
                    : {uri: props.OtherReducer.PricingBImage}
                }
              />
            </TouchableOpacity>
            {props.appReducer.backendErrors.image && (
              <Text
                style={{
                  fontFamily: 'Cairo-Regular',
                  fontSize: 10,
                  color: 'red',
                }}>
                {props.appReducer.backendErrors.image[0]}
              </Text>
            )}
          </View>
        </ImageBackground>
      </View>
      <View style={styles.subitemStyle}>
        <ScrollView
          style={{paddingHorizontal: 10}}
          keyboardShouldPersistTaps="always">
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
                  {lang.itemReport.category}
                </Text>
                {/* <View style={{flex: 1}}> */}
                <Controller
                  defaultValue=""
                  name="cat_id"
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
                    //   value={catName}
                    //   selectTextOnFocus={false}
                    //   onFocus={() => setCategoryVisible(true)}
                    //   posticon={
                    //     <MaterialCommunityIcons
                    //       style={{
                    //         fontSize: 22,
                    //         color: config.colors.darkGrayColor,
                    //       }}
                    //       name={'menu-down'}
                    //       onPress={() => setCategoryVisible(true)}
                    //     />
                    //   }
                    //   placeholder={lang.itemReport.category}
                    //   secureTextEntry={false}
                    //   onChangeText={value => onChange(value)}
                    //   error={errors.cat_id?.message}
                    // />
                    <DropdownComp
                      items={props.categoriesReducer.categories}
                      error={errors.cat_id?.message}
                      onSelectedItemsChange={value => {
                        onChange(value[0]);
                        setCatName(value);
                        setValue('SubCat_id', '');
                        setSubName();
                        setValue('device_id', '');
                        setDeviceName();
                        setValue('brand_id', '');
                        setBrandName();
                        props.LoadSubCategories(value[0]).then(res => {
                          setLoadingSub(false);
                          //var s = props.governmentReducer.governorates;
                          //setGov(s);
                        });
                      }}
                      label={lang.itemReport.category}
                      uniqueKey="id"
                      single={true}
                      selectedItems={catName}
                      selectText={catName}
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
                  {lang.itemReport.subcategory}
                </Text>
                {/* <View style={{flex: 1}}> */}
                <Controller
                  defaultValue=""
                  name="SubCat_id"
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
                    //   editable={editSub}
                    //   value={subName}
                    //   selectTextOnFocus={false}
                    //   onFocus={() => {
                    //     getValues('cat_id')
                    //       ? setSubVisible(true)
                    //       : setSubVisible(false);
                    //   }}
                    //   posticon={
                    //     <MaterialCommunityIcons
                    //       style={{
                    //         fontSize: 22,
                    //         color: config.colors.darkGrayColor,
                    //       }}
                    //       name={'menu-down'}
                    //       onPress={() => {
                    //         getValues('cat_id')
                    //           ? setSubVisible(true)
                    //           : setSubVisible(false);
                    //       }}
                    //     />
                    //   }
                    //   placeholder={lang.itemReport.subcategory}
                    //   secureTextEntry={false}
                    //   onChangeText={value => onChange(value)}
                    //   error={errors.SubCat_id?.message}
                    // />
                    <DropdownComp
                      items={props.categoriesReducer.subcategories_devices}
                      error={errors.SubCat_id?.message}
                      DropdownRef1={DropdownRef1}
                      // hideDropdown={true}
                      //  ref={(component) => { this.multiSelect = component }}
                      onToggleList={() => {
                        if (getValues('cat_id') !== '') {
                          setVisible(false);
                        } else {
                          setVisible(true);
                          setVisibleMessage(lang.itemReport.ChooseCat);
                          DropdownRef1.current._clearSelectorCallback();
                        }
                      }}
                      onSelectedItemsChange={value => {
                        onChange(value[0]);
                        props.LoadDevices(value[0]).then(res => {
                          setLoadingSub(false);
                          //var s = props.governmentReducer.governorates;
                          //setGov(s);
                        });
                        setSubName(value);
                        setValue('device_id', '');
                        setDeviceName();
                        setValue('brand_id', '');
                        setBrandName();
                      }}
                      label={lang.itemReport.subcategory}
                      uniqueKey="id"
                      single={true}
                      selectedItems={subName}
                      selectText={subName}
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
                  {lang.itemReport.categoryDevice}
                </Text>
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
                    //   editable={ediDevice}
                    //   value={deviceName}
                    //   selectTextOnFocus={false}
                    //   onFocus={() => {
                    //     getValues('SubCat_id')
                    //       ? setDevicesVisible(true)
                    //       : setDevicesVisible(false);
                    //   }}
                    //   posticon={
                    //     <MaterialCommunityIcons
                    //       style={{
                    //         fontSize: 22,
                    //         color: config.colors.darkGrayColor,
                    //       }}
                    //       name={'menu-down'}
                    //       onPress={() => {
                    //         getValues('SubCat_id')
                    //           ? setDevicesVisible(true)
                    //           : setDevicesVisible(false);
                    //       }}
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
                      DropdownRef1={DropdownRef2}
                      // hideDropdown={true}
                      //  ref={(component) => { this.multiSelect = component }}
                      onToggleList={() => {
                        if (getValues('SubCat_id') !== '') {
                          setVisible(false);
                        } else {
                          setVisible(true);
                          setVisibleMessage(lang.itemReport.ChooseSub);
                          DropdownRef2.current._clearSelectorCallback();
                        }
                      }}
                      onSelectedItemsChange={value => {
                        onChange(value[0]);

                        setDeviceName(value);
                        props.LoadDeviceBrands(value[0]).then(res => {
                          setLoadingSub(false);
                          //var s = props.governmentReducer.governorates;
                          //setGov(s);
                        });
                        setValue('brand_id', '');
                        setBrandName();
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
                {/* <View style={{flex: 1}}> */}
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
                      DropdownRef1={DropdownRef3}
                      // hideDropdown={true}
                      //  ref={(component) => { this.multiSelect = component }}
                      onToggleList={() => {
                        if (getValues('device_id') !== '') {
                          setVisible(false);
                        } else {
                          setVisible(true);
                          setVisibleMessage(lang.itemReport.chooseDevice);
                          DropdownRef3.current._clearSelectorCallback();
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
            <Text style={{...styles.textStyle, marginTop: 15, width: 105}}>
              {' '}
              {lang.itemReport.comment}{' '}
            </Text>
            <View style={{flex: 1}}>
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
                      height: 120,
                    }}
                    value={value}
                    multiline={true}
                    selectTextOnFocus={false}
                    numberOfLines={Platform.OS === 'ios' ? null : 7}
                    minHeight={Platform.OS === 'ios' && 6 ? 20 * 6 : null}
                    inputTextStyle={{textAlignVertical: 'top'}}
                    //   ErrorStyle={{height:100}}
                    placeholder={lang.itemReport.writeComment}
                    secureTextEntry={false}
                    onChangeText={value => onChange(value)}
                    error={errors.comment?.message}
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
                  !isDirty || !isValid || !imageRes
                    ? config.colors.darkGrayColor
                    : config.colors.mainBgColor,
                maxWidth: '70%',
              }}
              disabled={!isDirty || !isValid || !imageRes}
              loadingprop={props.appReducer.loading && !loadingSub}
              onPress={handleSubmit(onSubmit)}>
              {lang.drawer.pricingRequest}
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
  PricingRequestImage: () =>
    otherActions.PricingRequestImage()(dispatch, getState),
  LoadMainCategories: () =>
    categoryActions.LoadMainCategories()(dispatch, getState),

  LoadSubCategories: data =>
    categoryActions.LoadSubCategories(data)(dispatch, getState),
  LoadDevices: data => categoryActions.LoadDevices(data)(dispatch, getState),
  pricingRequest: data => otherActions.pricingRequest(data)(dispatch, getState),
  LoadDeviceBrands: data =>
    categoryActions.LoadDeviceBrands(data)(dispatch, getState),
  //unloadUser: () => authActions.unloadUser()(dispatch, getState),
});

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  categoriesReducer: state.categoriesReducer,
  OtherReducer: state.OtherReducer,
  appReducer: state.appReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PricingRequestScreen);
