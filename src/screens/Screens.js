// src/views/Home.js
import React, {useEffect, useState} from 'react';
import {Rating} from 'react-native-rating-element';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VersionInfo from 'react-native-version-info';
// import {withNavigation} from 'react-navigation';
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  Modal,
  Text,
  BackHandler,
  View,
  Linking,
} from 'react-native';
import TapNavigator from '../router/TabNavigator';
import MainStack from '../router/MainStack';
import {actions as appActions} from '../modules/app';
import {actions as authActions} from '../modules/auth';
import {actions as profileActions} from '../modules/profile';
import {actions as pagesActions} from '../modules/pages';
import store from '../features/redux/store';
import FormButton from '../components/material/FormButton';
import common from '../assets/common';
import lang from '../localization';
import config from '../assets/config.json';
import PushNotification from 'react-native-push-notification';
import NetInfo from '@react-native-community/netinfo';
import ReloadComp from '../components/material/reloadComp';
import DrawerRoute from '../router/DrawerNavigator';
import RegisterStack from '../router/RegisterStack';
import InputField from '../components/material/InputField';
import {useForm, Controller} from 'react-hook-form';
import {connect} from 'react-redux';
import {Appbar} from 'react-native-paper';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 45 : StatusBar.currentHeight;
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
const Screens = props => {
  const [visible, setVisible] = useState(false);
  const [deviceToken, setDeviceToken] = useState(null);
  const {user, token} = props.authReducer;
  const [upgrade, setUpgrade] = useState(false);

  const {
    handleSubmit,
    control,
    formState: {errors, isDirty, isValid},
    setValue,
    getValues,
  } = useForm({
    mode: 'onChange',
  });
  const openAppStore = () => {
    const link =
      Platform.OS === 'ios'
        ? 'itms-apps://apps.apple.com/tr/app/times-tables-lets-learn/id1055437768?l=tr'
        : 'market://details?id=googoo.android.btgps';
    Linking.canOpenURL(link).then(
      supported => {
        supported && Linking.openURL(link);
      },
      err => console.log(err),
    );
  };
  const makeRating = data => {
    // SetRatingVisible(false);
    props.makeReview({...data}).then(resp => {
      BackHandler.exitApp();
    });
  };

  useEffect(() => {
    props.getAppVersion();
    props.loadUser();
    props.setCurrentLanguage();
  }, []);
  useEffect(() => {
    if (
      props.PagesReducer.app_version &&
      props.PagesReducer.app_version < VersionInfo.appVersion
    ) {
      setUpgrade(true);
    }
  }, [props.PagesReducer.app_version]);

  useEffect(() => {
    const backAction = () => {
      if (props.authReducer.token) props.changeReviewDialog(true);
      else setVisible(true);
      //  BackHandler.exitApp()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',

      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const [connectionOn, setConnection] = useState(true);

  const CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === 'android') {
      NetInfo.fetch().then(state => {
        if (state.isConnected && state.isInternetReachable) {
          setConnection(true);
        } else {
          setConnection(false);
        }
      });
    }
  };

  useEffect(() => {
    CheckConnectivity();
  });
  if (connectionOn) {
    if (token === undefined) {
      props.setCurrentLanguage();
      props.loadUser();
      return <View />;
    } else if (token === null) {
      return (
        <View style={{flex: 1}}>
          <View style={{height: STATUSBAR_HEIGHT, backgroundColor: '#fff'}}>
            <StatusBar
              barStyle={'dark-content'}
              translucent
              backgroundColor={config.colors.mainBgColor}
            />
          </View>
          <Modal animationType="slide" transparent={true} visible={upgrade}>
            <View style={styles.mainView}>
              <View style={styles.subView}>
                {/* <View style={styles.closeModel}>
                    <Appbar.Action
                      icon={'close'}
                      size={18}
                      style={{ margin: 5 }}
                      color={config.colors.mainBgColor}
                      onPress={() => props.changeReviewDialog(false)}
                    />
                  </View> */}
                <View>
                  <ScrollView>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{flex: 1, marginHorizontal: 5}}>
                        <Text
                          style={{
                            ...styles.titleTextStyle,
                            fontSize: 13,
                            color: config.colors.mainBgColor,
                            margin: 5,
                            textAlign: 'center',
                          }}>
                          {lang.home.newUpdate}
                        </Text>

                        <Text style={styles.modalSubTitleStyles}>
                          {lang.home.newUpdateSubtitle}
                        </Text>
                      </View>
                    </View>
                  </ScrollView>
                </View>

                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                  <FormButton
                    textStyles={{color: '#fff'}}
                    styleprops={{
                      borderColor: 'transparent',
                      backgroundColor: config.colors.mainBgColor,
                    }}
                    // onPress={() => {
                    //     SetRatingVisible(false);
                    //     props.navigation.navigate('Notification');
                    // }}
                    onPress={openAppStore}>
                    {lang.home.updateNow}
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
                    onPress={() => setVisible(false)}
                  />
                </View>
                <Text style={styles.modalTitleStyles}>
                  {lang.home.closeAppTitle}
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
                      setVisible(false);
                      BackHandler.exitApp();
                    }}>
                    {lang.home.closeAppBtn}
                  </FormButton>
                  <FormButton
                    textStyles={{fontSize: 12}}
                    onPress={() => {
                      setVisible(false);
                    }}>
                    {lang.btns.Cancel}
                  </FormButton>
                </View>
              </View>
            </View>
          </Modal>
          <RegisterStack navigation={props.navigation} />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View
            style={{
              height: STATUSBAR_HEIGHT,
              backgroundColor: config.colors.maindarkcolor,
            }}>
            <StatusBar
              barStyle={'light-content'}
              translucent
              backgroundColor={config.colors.mainBgColor}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={props.ProfileReducer.doneReview}>
              <View style={styles.mainView}>
                <View style={styles.subView}>
                  <View style={styles.closeModel}>
                    <Appbar.Action
                      icon={'close'}
                      size={18}
                      style={{margin: 5}}
                      color={config.colors.mainBgColor}
                      onPress={() => props.changeReviewDialog(false)}
                    />
                  </View>
                  <View>
                    <ScrollView>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1, marginHorizontal: 5}}>
                          <Text
                            style={{
                              ...styles.titleTextStyle,
                              fontSize: 13,
                              color: config.colors.mainBgColor,
                              margin: 5,
                              textAlign: 'center',
                            }}>
                            {lang.home.rateApp}
                          </Text>

                          <Controller
                            defaultValue={0}
                            name="rate"
                            control={control}
                            rules={{
                              required: {
                                value: true,
                                message: lang.Validation.required,
                              },
                            }}
                            render={({field: {onChange, onBlur, value}}) => (
                              <Rating
                                rated={value}
                                totalCount={5}
                                ratingColor={config.colors.mainBgColor}
                                ratingBackgroundColor="#d4d4d4"
                                size={32}
                                icon="ios-star"
                                direction="row"
                                onIconTap={value => onChange(value)}
                              />
                            )}
                          />
                          <Controller
                            defaultValue=""
                            name="comment"
                            control={control}
                            rules={{
                              required: {
                                value: true,
                                message: lang.Validation.required,
                              },
                            }}
                            render={({field: {onChange, onBlur, value}}) => (
                              <InputField
                                containerStyles={{
                                  paddingHorizontal: 0,
                                  marginHorizontal: 0,
                                  height: 90,
                                  marginHorizontal: 3,
                                }}
                                value={value}
                                multiline={true}
                                selectTextOnFocus={false}
                                numberOfLines={5}
                                inputTextStyle={{textAlignVertical: 'top'}}
                                //   ErrorStyle={{height:100}}
                                placeholder={lang.statement.comment}
                                secureTextEntry={false}
                                onChangeText={value => onChange(value)}
                                error={errors.comment?.message}
                              />
                            )}
                          />
                        </View>
                      </View>
                    </ScrollView>
                  </View>

                  <View
                    style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <FormButton
                      textStyles={{color: '#fff'}}
                      loadingprop={props.appReducer.loading}
                      styleprops={{
                        borderColor: 'transparent',
                        backgroundColor: config.colors.mainBgColor,
                      }}
                      // onPress={() => {
                      //     SetRatingVisible(false);
                      //     props.navigation.navigate('Notification');
                      // }}
                      onPress={handleSubmit(makeRating)}>
                      {lang.statement.RateNow}
                    </FormButton>
                    <FormButton
                      textStyles={{fontSize: 12}}
                      onPress={() => {
                        props.changeReviewDialog(false);
                        BackHandler.exitApp();
                      }}>
                      {lang.home.closeAppBtn}
                    </FormButton>
                  </View>
                </View>
              </View>
            </Modal>
            <Modal animationType="slide" transparent={true} visible={upgrade}>
              <View style={styles.mainView}>
                <View style={styles.subView}>
                  {/* <View style={styles.closeModel}>
                    <Appbar.Action
                      icon={'close'}
                      size={18}
                      style={{ margin: 5 }}
                      color={config.colors.mainBgColor}
                      onPress={() => props.changeReviewDialog(false)}
                    />
                  </View> */}
                  <View>
                    <ScrollView>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1, marginHorizontal: 5}}>
                          <Text
                            style={{
                              ...styles.titleTextStyle,
                              fontSize: 13,
                              color: config.colors.mainBgColor,
                              margin: 5,
                              textAlign: 'center',
                            }}>
                            {lang.home.newUpdate}
                          </Text>

                          <Text style={styles.modalSubTitleStyles}>
                            {lang.home.newUpdateSubtitle}
                          </Text>
                        </View>
                      </View>
                    </ScrollView>
                  </View>

                  <View
                    style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <FormButton
                      textStyles={{color: '#fff'}}
                      styleprops={{
                        borderColor: 'transparent',
                        backgroundColor: config.colors.mainBgColor,
                      }}
                      // onPress={() => {
                      //     SetRatingVisible(false);
                      //     props.navigation.navigate('Notification');
                      // }}
                      onPress={openAppStore}>
                      {lang.home.updateNow}
                    </FormButton>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.mainView}>
              <View style={styles.subView}>
                <View style={styles.closeModel}>
                  <Appbar.Action
                    icon={'close'}
                    size={18}
                    style={{margin: 5}}
                    color={config.colors.mainBgColor}
                    onPress={() => setVisible(false)}
                  />
                </View>
                <Text style={styles.modalTitleStyles}>
                  {lang.home.closeAppTitle}
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
                      setVisible(false);
                      BackHandler.exitApp();
                    }}>
                    {lang.home.closeAppBtn}
                  </FormButton>
                  <FormButton
                    textStyles={{fontSize: 12}}
                    onPress={() => {
                      setVisible(false);
                    }}>
                    {lang.btns.Cancel}
                  </FormButton>
                </View>
              </View>
            </View>
          </Modal>
          <MainStack navigation={props.navigation} mainRoute={'Welcome'} />
          {/* <DrawerRoute navigation={props.navigation} /> */}
        </View>
      );
    }
  } else {
    // )}
    // {!connectionOn && (
    return (
      <View style={{flex: 1}}>
        <View style={{height: STATUSBAR_HEIGHT, backgroundColor: '#fff'}}>
          <StatusBar
            barStyle={'dark-content'}
            translucent
            backgroundColor={config.colors.mainBgColor}
          />
        </View>
        <ReloadComp recheck={() => CheckConnectivity()} />
      </View>
    );
    // )}
  }
};

const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  loadUser: () => authActions.loadUser()(dispatch, getState),
  // registerPhone: (data) => authActions.registerPhone(data)(dispatch, getState),
  makeReview: data => profileActions.makeReview(data)(dispatch, getState),
  getAppVersion: data => pagesActions.getAppVersion(data)(dispatch, getState),
  changeReviewDialog: data =>
    profileActions.changeReviewDialog(data)(dispatch, getState),
  setCurrentLanguage: () => appActions.setCurrentLanguage()(dispatch, getState),
});
const mapStateToProps = state => ({
  authReducer: state.authReducer,
  categoriesReducer: state.categoriesReducer,
  appReducer: state.appReducer,
  ProfileReducer: state.ProfileReducer,
  PagesReducer: state.PagesReducer,
});
export default connect(mapStateToProps, mapDispatchToProps)(Screens);
