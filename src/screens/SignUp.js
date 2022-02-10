import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Text,
  View,
  Modal,
} from 'react-native';
import store from '../features/redux/store';
import {actions as authActions} from '../modules/auth';
import {actions as OthersActions} from '../modules/other';
import InputField from '../components/material/InputField';
import FormButton from '../components/material/FormButton';
import DropdownModal from '../components/material/DropdownModal';
import lang from '../localization';
import config from '../assets/config.json';
import common from '../assets/common';
import {RadioButton, Checkbox, Appbar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Svg from '../assets/images';
import {useForm, Controller} from 'react-hook-form';
import LoadingComp from '../components/material/LoadingComp';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
const genders = [
  {
    key: 'male',
    text: lang.forms_fields.male,
  },
  {
    key: 'femal',
    text: lang.forms_fields.female,
  },
];
const styles = StyleSheet.create({
  modalDataStyles: {
    color: '#000',
    ...common.fontstyles,
    textAlign: 'center',
    fontSize: 14,
    margin: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginHorizontal: 20,
  },
  container2: {
    flexGrow: 1,

    padding: 0,
  },
  Titletext: {
    color: config.colors.fontColor,
    fontSize: 18,
    margin: 10,
    ...common.fontstyles,
    textAlign: 'center',
  },
  TextStyles: {color: '#fff', fontFamily: 'Cairo-Regular'},
  otherRegisteration: {
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
const SignUpScreen = props => {
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
      console.log('data', data);
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      console.log(facebookCredential);
      // console.log(moment(data.expirationTime).toDate());
      auth().signInWithCredential(facebookCredential);
      const user = auth().currentUser;
      console.log('user', user);
      setValue('provider', 'facebook');
      setValue('access_token', data.accessToken);
      setValue('email', user.email);
      setValue(
        'fname',
        user.displayName.substr(0, user.displayName.indexOf(' ')),
      );
      setValue(
        'lname',
        user.displayName.split(' ')[user.displayName.split(' ').length - 1],
      );
      // props.SocialLogin({
      //   data:{
      //     provider:'facebook',
      //     access_token:data.accessToken,
      //     fname:user.displayName.substr(0,user.displayName.indexOf(' ')),
      //     lname:user.displayName.split(" ")[user.displayName.split(" ").length - 1],
      //     profile_pic:user.photoURL,
      //     email:user.email
      //   },
      //   redirectToMainScreen: () => props.navigation.navigate('Welcome')
      // })
    } catch (error) {
      alert(error);
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
      setValue('provider', 'google');
      setValue('access_token', userInfo.idToken);
      setValue('email', userInfo.user.email);
      setValue('fname', userInfo.user.givenName);
      setValue('lname', userInfo.user.familyName);

      // props.SocialLogin({
      //   data:{
      //     provider:'google',
      //     access_token:userInfo.idToken,
      //     fname:userInfo.user.givenName,
      //     lname:userInfo.user.familyName,
      //     profile_pic:userInfo.user.photo,
      //     email:userInfo.user.email

      //   },
      //   redirectToMainScreen: () => props.navigation.navigate('Welcome')
      // })
    } catch (error) {
      // console.log('Message', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // console.log('Play Services Not Available or Outdated');
      } else {
        // console.log('Some Other Error Happened');
      }
    }
  };
  ///////////////////google//////////////////////////////
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
  useEffect(() => {
    setPassowrdSecure(true);
    setValue('gender', 'male');
    setValue('news_service', '0');
  });
  useEffect(() => {
    setLoadingSub(true);
    props.LoadGovernorates().then(respo => {
      setLoadingSub(false);
    });
  }, []);
  useEffect(() => {
    setLoadingMain(props.appReducer.loading);
  }, [props.appReducer.loading]);
  //props.appReducer.loading
  useEffect(() => {
    if (props.appReducer.backendErrors.fname)
      setError('fname', {
        type: 'manual',
        message: props.appReducer.backendErrors.fname[0],
      });
    if (props.appReducer.backendErrors.lname)
      setError('lname', {
        type: 'manual',
        message: props.appReducer.backendErrors.lname[0],
      });
    if (props.appReducer.backendErrors.phone)
      setError('phone', {
        type: 'manual',
        message: props.appReducer.backendErrors.phone[0],
      });
    if (props.appReducer.backendErrors.email)
      setError('email', {
        type: 'manual',
        message: props.appReducer.backendErrors.email[0],
      });
    if (props.appReducer.backendErrors.password)
      setError('password', {
        type: 'manual',
        message: props.appReducer.backendErrors.password[0],
      });
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
    if (props.appReducer.backendErrors.gender)
      setError('gender', {
        type: 'manual',
        message: props.appReducer.backendErrors.gender[0],
      });
    if (props.appReducer.backendErrors.news_service)
      setError('news_service', {
        type: 'manual',
        message: props.appReducer.backendErrors.news_service[0],
      });
  }, [props.appReducer.backendErrors]);
  const [areas, setAreas] = useState([]);
  const [Nogov, setNoGov] = useState(false);
  const [loadingSub, setLoadingSub] = useState(false);
  const [loadingMain, setLoadingMain] = useState(false);
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [editableArea, setEditableArea] = useState(false);
  const [cityVisible, setCityVisible] = useState(false);
  const [areaVisible, setAreaVisible] = useState(false);
  const [passowrdSecure, setPassowrdSecure] = useState(false);
  const [phoneCodes, setPhoneCodes] = useState(['011', '012', '010', '015']);
  const [SecurePassword, setViewPassword] = useState(true);
  const [SecurePassword2, setViewPassword2] = useState(true);

  const settingAreas = id => {
    var cities = props.OtherReducer.governorates.find(s => s.id === id);
    // var newArray = [];
    // props.OtherReducer.governorates.cities.forEach(element => {
    //   if (element.gov_id === id) {
    //     newArray.push(element);
    //   }
    // });
    setAreas(cities.cities);
  };
  async function onSubmit(data) {
    await props.signupUser({
      data: data,
      redirectToMainScreen: phone =>
        props.navigation.navigate('ConfirmCode', {
          phone: phone,
          page: 'signUp',
        }),
    });
  }
  return (
    <View style={{...styles.container2, paddingVertical: 10}}>
      <Modal animationType="slide" transparent={true} visible={Nogov}>
        <View style={styles.mainView}>
          <View style={styles.subView}>
            <View style={styles.closeModel}>
              <Appbar.Action
                icon={'close'}
                size={18}
                style={{margin: 5}}
                color={config.colors.mainBgColor}
                onPress={() => setNoGov(false)}
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
                  setNoGov(false);
                }}>
                {lang.btns.Ok}
              </FormButton>
            </View>
          </View>
        </View>
      </Modal>

      <DropdownModal
        close={() => setAreaVisible(false)}
        Visible={areaVisible}
        modalTitle={lang.signup.area}>
        <ScrollView
          style={{
            flex: 1,
          }}>
          {areas.map(item => {
            return (
              <TouchableOpacity
                key={item.name}
                onPress={() => {
                  setValue('city_id', item.id, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  setArea(lang.lang === 'ar' ? item.name : item.name_en);
                  setAreaVisible(false);
                }}>
                <Text style={styles.modalDataStyles}>
                  {lang.lang === 'ar' ? item.name : item.name_en}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </DropdownModal>
      <DropdownModal
        close={() => setCityVisible(false)}
        Visible={cityVisible}
        modalTitle={lang.signup.city}>
        {!loadingMain && (
          <ScrollView
            style={{
              flex: 1,
            }}>
            {props.OtherReducer.governorates.map(item => {
              return (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => {
                    setValue('governorate_id', item.id, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                    setValue('city_id', '');
                    setCity(lang.lang === 'ar' ? item.name : item.name_en);
                    setArea('');
                    settingAreas(item.id);
                    setCityVisible(false);
                    setEditableArea(true);
                  }}>
                  <Text style={styles.modalDataStyles}>
                    {lang.lang === 'ar' ? item.name : item.name_en}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
        {loadingMain && loadingSub && (
          <View style={{flex: 1}}>
            <LoadingComp
              showHeader={false}
              navigation={props.navigation}
              pageTitle={lang.home.title}
            />
          </View>
        )}
      </DropdownModal>
      <View style={{flexDirection: 'row', padding: 0, margin: 0}}>
        <View style={{...styles.container2, padding: 0, margin: 0}}>
          <Controller
            defaultValue=""
            name="fname"
            control={control}
            rules={{
              required: {value: true, message: lang.Validation.required},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                key={lang.forms_fields.firstName}
                signup={true}
                preicon={<Svg.Profile style={{color: '#FFF'}} />}
                placeholder={lang.forms_fields.firstName}
                placeholderTextColor={'#fff'}
                onBlur={onBlur}
                maxLength={25}
                onChangeText={value =>
                  value.match(/^[A-Za-z]+$/) || value == ''
                    ? onChange(value)
                    : ''
                }
                value={value}
                error={errors.fname?.message}
              />
            )}
          />
        </View>
        <View style={{...styles.container2, padding: 0, margin: 0}}>
          <Controller
            defaultValue=""
            name="lname"
            control={control}
            rules={{
              required: {value: true, message: lang.Validation.required},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                value={value}
                preicon={<Svg.Profile style={{color: '#FFF'}} />}
                placeholder={lang.signup.familyName}
                placeholderTextColor={'#fff'}
                signup={true}
                maxLength={25}
                onChangeText={value =>
                  value.match(/^[A-Za-z]+$/) || value == ''
                    ? onChange(value)
                    : ''
                }
                error={errors.lname?.message}
              />
            )}
          />
        </View>
      </View>
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
            signup={true}
            preicon={<Svg.Iconphone style={{color: '#FFF'}} />}
            keyboardType="phone-pad"
            maxLength={11}
            placeholder={lang.signup.phone}
            placeholderTextColor={'#fff'}
            secureTextEntry={false}
            onChangeText={value => onChange(value)}
            value={value}
            postText={'+2'}
            error={errors.phone?.message}
          />
        )}
      />
      <Controller
        defaultValue=""
        name="email"
        control={control}
        rules={{
          required: {value: true, message: lang.Validation.required},
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: lang.Validation.email,
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputField
            signup={true}
            preicon={<Svg.Mail width={15} style={{color: '#FFF'}} />}
            placeholder={lang.forms_fields.email}
            placeholderTextColor={'#fff'}
            secureTextEntry={false}
            onChangeText={value => onChange(value)}
            value={value}
            error={errors.email?.message}
          />
        )}
      />
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
            signup={true}
            preicon={<Svg.Lockpass style={{color: '#FFF'}} />}
            placeholder={lang.forms_fields.password}
            placeholderTextColor={'#fff'}
            // secureTextEntry={Platform.OS === 'ios'? true:getValues('password').length>0}
            onChangeText={value => onChange(value)}
            value={value}
            error={errors.password?.message}
            onBlur={onBlur}
            postIconFunction={() => setViewPassword(!SecurePassword)}
            secureTextEntry={SecurePassword}
            posticon={
              SecurePassword ? (
                <Svg.Iconeye2
                  onPress={() => setViewPassword(!SecurePassword)}
                />
              ) : (
                <Svg.Iconeyeoff2
                  onPress={() => setViewPassword(!SecurePassword)}
                />
              )
            }
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
            value === getValues('password') || lang.Validation.confirmPassword,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputField
            signup={true}
            preicon={<Svg.Lockpass style={{color: '#FFF'}} />}
            placeholder={lang.forms_fields.password_confirm}
            placeholderTextColor={'#fff'}
            // secureTextEntry={Platform.OS === 'ios'? true:getValues('password_confirm').length>0}
            inputTextStyle={{
              fontFamily: value ? 'Cairo-Regular' : 'Cairo-Regular',
            }}
            onChangeText={value => onChange(value)}
            value={value}
            error={errors.password_confirm?.message}
            postIconFunction={() => setViewPassword2(!SecurePassword2)}
            secureTextEntry={SecurePassword2}
            posticon={
              SecurePassword2 ? (
                <Svg.Iconeye2
                  onPress={() => setViewPassword2(!SecurePassword2)}
                />
              ) : (
                <Svg.Iconeyeoff2
                  onPress={() => setViewPassword2(!SecurePassword2)}
                />
              )
            }
          />
        )}
      />
      <View style={{flexDirection: 'row', padding: 0, margin: 0}}>
        <View style={{...styles.container2, padding: 0, margin: 0}}>
          <Controller
            defaultValue=""
            name="governorate_id"
            control={control}
            rules={{
              required: {value: true, message: lang.Validation.required},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                signup={true}
                preicon={<Svg.Iconlocationon style={{color: '#FFF'}} />}
                //  editable={false}
                selectTextOnFocus={false}
                onFocus={() => {
                  setLoadingSub(true);
                  if (props.OtherReducer.governorates < 1) {
                    props.LoadGovernorates().then(res => {
                      setLoadingSub(false);
                      //var s = props.OtherReducer.governorates;
                      //setGov(s);
                    });
                  }
                  setCityVisible(true);
                }}
                posticon={
                  <MaterialCommunityIcons
                    style={{fontSize: 22, color: '#fff'}}
                    name={'menu-down'}
                    onPress={() => {
                      setCityVisible(true);
                    }}
                  />
                }
                value={city}
                disabled={true}
                placeholder={lang.signup.city}
                placeholderTextColor={'#fff'}
                secureTextEntry={false}
                onChangeText={value => onChange(value)}
                maxLength={25}
                error={errors.governorate_id?.message}
              />
            )}
          />
        </View>
        <View style={{...styles.container2, padding: 0, margin: 0}}>
          <Controller
            defaultValue=""
            name="city_id"
            control={control}
            rules={{
              required: {value: true, message: lang.Validation.required},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                value={area}
                preicon={<Svg.Iconlocation style={{color: '#FFF'}} />}
                //  editable={editableArea}
                Keyboard={false}
                onFocus={() => {
                  getValues('governorate_id') !== ''
                    ? setAreaVisible(true)
                    : setNoGov(true);
                }}
                selectTextOnFocus={false}
                posticon={
                  <MaterialCommunityIcons
                    style={{fontSize: 22, color: '#fff'}}
                    name={'menu-down'}
                    onPress={() => {
                      getValues('governorate_id') != ''
                        ? setAreaVisible(true)
                        : setNoGov(true);
                    }}
                  />
                }
                placeholder={lang.signup.area}
                placeholderTextColor={'#fff'}
                secureTextEntry={false}
                signup={true}
                onChangeText={value => onChange(value)}
                maxLength={25}
                error={errors.city_id?.message}
              />
            )}
          />
        </View>
      </View>
      <View
        style={{
          ...common.radio.radioContainer,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={styles.TextStyles}>{lang.signup.gender}</Text>
        {genders.map(item => {
          return (
            <View key={item.key} style={styles.buttonContainer}>
              <Controller
                defaultValue=""
                name="gender"
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <View>
                    <RadioButton
                      value={value}
                      color={'#fff'}
                      uncheckedColor={'#fff'}
                      status={value === item.key ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setValue('gender', item.key);
                      }}
                    />
                  </View>
                )}
              />
              <Text
                style={{
                  ...styles.TextStyles,
                }}>
                {item.text}
              </Text>
            </View>
          );
        })}
      </View>
      <View
        style={{
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Controller
          defaultValue=""
          name="news_service"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Checkbox
              status={value === '1' ? 'checked' : 'unchecked'}
              uncheckedColor={'#fff'}
              color={'#fff'}
              onPress={() => {
                setValue('news_service', value === '0' ? '1' : '0');
              }}
            />
          )}
        />
        <Text style={styles.TextStyles}>{lang.signup.messagesFeature}</Text>
      </View>
      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
        <FormButton
          styleprops={{
            borderColor:
              !isDirty || !isValid ? config.colors.lightGrayColor : '#fff',
            backgroundColor:
              !isDirty || !isValid ? config.colors.lightGrayColor : '#fff',
          }}
          disabled={!isDirty || !isValid}
          loadingprop={loadingMain && !loadingSub}
          onPress={handleSubmit(onSubmit)}>
          {lang.signup.btn}
        </FormButton>
      </View>
      <View style={styles.otherRegisteration}>
        <Text style={styles.TextStyles}>{lang.signup.registerwith}</Text>
        <TouchableOpacity
          onPress={() => fbAuth()}
          style={{marginHorizontal: 10}}>
          <Svg.Facebook style={{color: '#fff'}} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={signIn}
          loadingprop={loadingMain}
          style={{marginHorizontal: 10}}>
          <Svg.Googlef style={{color: '#fff'}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  signupUser: data => authActions.signupUser(data)(dispatch, getState),
  SocialLogin: data => authActions.SocialLogin(data)(dispatch, getState),
  LoadGovernorates: () => OthersActions.LoadGovernorates()(dispatch, getState),
});

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  appReducer: state.appReducer,
  OtherReducer: state.OtherReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
