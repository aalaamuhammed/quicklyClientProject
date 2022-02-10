import React, {useState, useEffect} from 'react';

import {connect} from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Modal,
  Text,
  View,
  Alert,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HeaderComponent} from '../components/core/Header';
import {actions as appActions} from '../modules/app';
import {actions as pagesActions} from '../modules/pages';
import FormButton from '../components/material/FormButton';
import lang from '../localization';
import {Card, Avatar, Appbar, Paragraph} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import store from '../features/redux/store';
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
  changeLanguageText: {
    ...common.fontstyles,
    fontSize: 13,
    color: '#fff',
    textAlign: 'right',
  },
  languageStyle: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  checked: {
    height: '100%',
    backgroundColor: config.colors.mainBgColor,
    padding: 5,
    color: '#fff',
    alignItems: 'center',
    width: 55,
    borderRadius: 3,
  },
  unchecked: {
    backgroundColor: '#fff',
    padding: 5,
    width: 55,
    height: '100%',
    alignItems: 'center',
    color: config.colors.maindarkcolor,
    borderRadius: 3,
  },
  linkText: {
    ...common.fontstyles,
    fontSize: 13,
    marginHorizontal: 10,
    marginVertical: 0,
    paddingVertical: 0,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    flex: 1,
    // fontFamily: common.BoldFontFamily,
    color: config.colors.mainBgColor,
  },
  IconStyle: {
    paddingVertical: 15,
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
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 300,
    backgroundColor: 'white',
    justifyContent: 'center',
    // borderRadius: 20,
    padding: 5,
    paddingVertical: 20,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
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
const company = [
  {
    key: 'Quickly',
    text: lang.makeComplaint.Quickly,
  },
  {
    key: 'ExecutorCompany',
    text: lang.makeComplaint.ExecutorCompany,
  },
  {
    key: 'Engeneer',
    text: lang.makeComplaint.Engineer,
  },
];
const CustomerServiceScreen = props => {
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: {errors},
    setError,
  } = useForm();
  const onSubmit = data => {
    props.ChangePassword(data);
  };

  const [visible, setVisible] = useState(false);
  // useEffect(() => {
  //   const backAction = () => {
  //     props.navigation.goBack()
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);
  useEffect(() => {
    props.getSupportInfo();
  }, []);

  useEffect(() => {}, [props.PagesReducer.support_info]);
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
          {lang.customerService.title}
        </HeaderComponent>
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
            <View style={{paddingHorizontal: 20}}>
              <View
                style={{
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: config.colors.lightGrayColor,
                }}>
                <Text
                  style={{
                    ...styles.linkText,
                    color: config.colors.darkGrayColor,
                  }}>
                  {lang.customerService.customerServiceChat}
                </Text>
                <Controller
                  defaultValue=""
                  name="company"
                  control={control}
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
                      onPress={() => {
                        setValue('company', 0);
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          width: 15,
                          height: 15,
                          backgroundColor:
                            value === 0 ? config.colors.mainBgColor : '#fff',
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: config.colors.mainBgColor,
                        }}>
                        {value === 0 && (
                          <MaterialCommunityIcons
                            name={'check'}
                            color={'#fff'}
                          />
                        )}
                      </View>
                      <Text style={styles.linkText}>{'Quickly'}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View
                style={{
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    ...styles.linkText,
                    color: config.colors.darkGrayColor,
                  }}>
                  {lang.customerService.OtherServicesAvailable}
                </Text>
                {company.map(item => {
                  return (
                    <Controller
                      key={item.key}
                      defaultValue=""
                      name="company"
                      control={control}
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
                          onPress={() => {
                            setValue('company', item.key);
                          }}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                          }}>
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
                              borderColor: config.colors.mainBgColor,
                            }}>
                            {value === item.key && (
                              <MaterialCommunityIcons
                                name={'check'}
                                color={'#fff'}
                              />
                            )}
                          </View>
                          <Text style={styles.linkText}>{item.text}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  );
                })}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FormButton
                icon={'message'}
                textStyles={{color: '#fff', fontSize: 12, marginHorizontal: 10}}
                styleprops={{
                  borderColor: 'transparent',
                  backgroundColor: config.colors.mainBgColor,
                  margin: 40,
                  maxWidth: '50%',
                }}
                loadingprop={props.appReducer.loading}
                onPress={() => props.navigation.navigate('ChatScreen')}>
                {lang.customerService.sendMessage}
              </FormButton>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.subitemStyle}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              marginHorizontal: 20,
              marginVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: config.colors.lightGrayColor,
            }}>
            <View>
              <Text
                style={{
                  ...styles.linkText,
                  color: config.colors.darkGrayColor,
                }}>
                {' '}
                {lang.customerService.address}{' '}
              </Text>
              {Object.keys(props.PagesReducer.support_info).length > 0 &&
                props.PagesReducer.support_info.address && (
                  <Text style={{...styles.linkText, fontSize: 15}}>
                    {' '}
                    {props.PagesReducer.support_info.address}
                  </Text>
                )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                maxWidth: '50%',
              }}>
              <FormButton
                icon={'map-marker'}
                textStyles={{color: '#fff', fontSize: 10, marginHorizontal: 10}}
                styleprops={{
                  borderColor: 'transparent',
                  backgroundColor: config.colors.mainBgColor,
                  margin: 10,
                }}
                onPress={() =>
                  Linking.openURL(
                    `geo:${props.PagesReducer.support_info.lat}-${props.PagesReducer.support_info.long}`,
                  )
                }>
                {/* onPress={()=>props.navigate.navigate('ConfirmCode')}> */}
                {lang.customerService.locationOnMap}
              </FormButton>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              marginHorizontal: 20,
              marginVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: config.colors.lightGrayColor,
            }}>
            <View>
              <Text
                style={{
                  ...styles.linkText,
                  color: config.colors.darkGrayColor,
                }}>
                {' '}
                {lang.customerService.phone}
              </Text>
              {Object.keys(props.PagesReducer.support_info).length > 0 &&
                props.PagesReducer.support_info.phone && (
                  <Text style={{...styles.linkText, fontSize: 15}}>
                    {' '}
                    {props.PagesReducer.support_info.phone}
                  </Text>
                )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                maxWidth: '50%',
              }}>
              <FormButton
                icon={'phone'}
                textStyles={{color: '#fff', fontSize: 10, marginHorizontal: 10}}
                styleprops={{
                  borderColor: 'transparent',
                  backgroundColor: config.colors.mainBgColor,
                  margin: 10,
                }}
                onPress={() =>
                  Linking.openURL(
                    `tel:${props.PagesReducer.support_info.phone}`,
                  )
                }>
                {lang.customerService.callNow}
              </FormButton>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              marginHorizontal: 20,
              marginVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: config.colors.lightGrayColor,
            }}>
            <View>
              <Text
                style={{
                  ...styles.linkText,
                  color: config.colors.darkGrayColor,
                }}>
                {' '}
                {lang.customerService.email}{' '}
              </Text>
              {Object.keys(props.PagesReducer.support_info).length > 0 &&
                props.PagesReducer.support_info.email && (
                  <Text style={{...styles.linkText, fontSize: 15}}>
                    {' '}
                    {props.PagesReducer.support_info.email}
                  </Text>
                )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                maxWidth: '50%',
              }}>
              <FormButton
                icon={'message'}
                textStyles={{color: '#fff', fontSize: 10, marginHorizontal: 10}}
                styleprops={{
                  borderColor: 'transparent',
                  backgroundColor: config.colors.mainBgColor,
                  margin: 10,
                }}
                onPress={() =>
                  Linking.openURL(
                    'mailto:' + props.PagesReducer.support_info.email,
                  )
                }>
                {lang.customerService.sendMessage}
              </FormButton>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text
              style={{
                ...styles.linkText,
                color: config.colors.darkGrayColor,
                fontSize: 15,
              }}>
              {' '}
              {lang.customerService.socialMedia}
            </Text>
            <View
              style={{
                marginHorizontal: 20,
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {Object.keys(props.PagesReducer.support_info).length > 0 &&
                props.PagesReducer.support_info.facebook && (
                  <Svg.Facebook
                    onPress={() =>
                      Linking.openURL(props.PagesReducer.support_info.facebook)
                    }
                    style={{
                      marginHorizontal: 10,
                      color: config.colors.mainBgColor,
                      width: 100,
                      height: 100,
                    }}
                  />
                )}
              {Object.keys(props.PagesReducer.support_info).length > 0 &&
                props.PagesReducer.support_info.twitter && (
                  <Svg.twitter
                    onPress={() =>
                      Linking.openURL(props.PagesReducer.support_info.twitter)
                    }
                    style={{
                      marginHorizontal: 10,
                      color: config.colors.mainBgColor,
                      width: 100,
                      height: 100,
                    }}></Svg.twitter>
                )}
              {Object.keys(props.PagesReducer.support_info).length > 0 &&
                props.PagesReducer.support_info.whatsapp && (
                  <Svg.whatsapp
                    onPress={() =>
                      Linking.openURL(
                        'whatsapp://send?phone=' +
                          props.PagesReducer.support_info.whatsapp,
                      )
                    }
                    style={{
                      marginHorizontal: 10,
                      color: config.colors.mainBgColor,
                      width: 100,
                      height: 100,
                    }}></Svg.whatsapp>
                )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FormButton
              icon={'message'}
              textStyles={{color: '#fff', fontSize: 12, marginHorizontal: 10}}
              styleprops={{
                borderColor: 'transparent',
                backgroundColor: config.colors.mainBgColor,
                margin: 40,
                maxWidth: '50%',
              }}
              loadingprop={props.appReducer.loading}
              onPress={() => setVisible(true)}>
              {lang.customerService.sendMessage}
            </FormButton>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  getSupportInfo: () => pagesActions.getSupportInfo()(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
  PagesReducer: state.PagesReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerServiceScreen);
