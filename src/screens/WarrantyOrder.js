import React, {useRef, useEffect, useState} from 'react';

import {connect} from 'react-redux';
import {
  StyleSheet,
  Animated,
  FlatList,
  I18nManager,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Easing,
  Text,
  View,
  Pressable,
  Platform,
  Image,
  Modal,
  findNodeHandle,
  useWindowDimensions,
} from 'react-native';
import {Rating} from 'react-native-rating-element';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FormButton from '../components/material/FormButton';
import {HeaderComponent} from '../components/core/Header';
import DropdownModal from '../components/material/DropdownModal';
import {actions as appActions} from '../modules/app';
import {actions as OthersActions} from '../modules/other';
import {actions as OrderActions} from '../modules/order';
import lang from '../localization';
import store from '../features/redux/store';
import common from '../assets/common';
import {cities, governorate} from '../localization/citiesandlocations';
import config from '../assets/config.json';
import * as Svg from '../assets/images';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {Avatar} from 'react-native-paper';
import NoDataComp from '../components/material/NoDataComp';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LoadingComp from '../components/material/LoadingComp';
import ComplatedComp from '../components/general/orders/ComplatedOrders';
import CurrentComp from '../components/general/orders/CurrentOrders';
import WarrantyComp from '../components/general/orders/WarrantyOrders';
import InputField from '../components/material/InputField';
import {useForm, Controller} from 'react-hook-form';
const styles = StyleSheet.create({
  HeaderStyles: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
  },
  helpStyles: {
    alignItems: 'center',
    marginHorizontal: 4,
    marginVertical: 0,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  helpText: {
    color: '#FAC900',
    marginHorizontal: 3,
    fontSize: 11,
    fontFamily: 'Cairo-Regular',
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
    paddingTop: 10,
  },
  fieldContainer: {
    ...common.fields.fieldContainer,
    flex: 0,
    paddingVertical: 10,
    marginVertical: 10,
  },
  titleTextStyle: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Bold',
    fontSize: 11,
    color: config.colors.darkGrayColor,
  },
  subTextStyle: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Bold',
    fontSize: 13,
    color: config.colors.mainBgColor,
  },
  valueStyle: {
    ...common.fontstyles,
    fontSize: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#FAC90077',
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
});
const {height} = Dimensions.get('screen');

const WarrantyOrderScreen = props => {
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
    SetVisable(false);
  };
  // useEffect(() => {
  //     SetsubLoading(true)
  //     props.WarrantyOrders().then(respo => {

  //     })

  // }, []);
  const [Visible, SetVisable] = useState(false);
  const [CompanyVisible, SetCompanyVisible] = useState(false);
  const [SuccessVisible, SetSuccessVisible] = useState(false);
  const [cancelVisible, SetcancelVisible] = useState(false);
  const getWords = monthCount => {
    function getPlural(number, word) {
      return (number === 1 && word.one) || word.other;
    }

    var months = {one: lang.order.month, other: lang.order.months},
      years = {one: lang.order.year, other: lang.order.years},
      m = monthCount % 12,
      y = Math.floor(monthCount / 12);
    var result1 = null;
    var result2 = null;

    y && (result1 = y + ' ' + getPlural(y, years));
    m && (result2 = m + ' ' + getPlural(m, months));
    var x = result1 ? (result2 ? result1 + '-' + result2 : result1) : result2;
    return x;
  };

  let translateY = useRef(new Animated.ValueXY()).current;
  const [subLoading, SetsubLoading] = useState(false);
  let init = async () => {
    Animated.timing(translateY.y, {
      useNativeDriver: true,
      toValue: 1,
      duration: 350,
      easing: Easing.linear,
      delay: 350,
    }).start();
  };
  useEffect(() => {}, []);
  useEffect(() => {
    translateY.setValue({x: 0, y: height});
    props.OrderReducer.WarrantyOrders.length > 0 && init();
  }, [props.OrderReducer.WarrantyOrders]);
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
          {lang.order.warrantyOrders}
        </HeaderComponent>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.OrderReducer.maintainanceDialog}>
          <View style={styles.mainView}>
            <View style={styles.subView}>
              <View>
                <ScrollView>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, marginHorizontal: 5}}>
                      <Text
                        style={{
                          ...styles.titleTextStyle,
                          fontSize: 11,
                          color: config.colors.mainBgColor,
                          marginHorizontal: 3,
                        }}>
                        {lang.order.maintenanceRequest}
                      </Text>
                      <Controller
                        defaultValue=""
                        name="complaint"
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
                            numberOfLines={Platform.OS === 'ios' ? null : 5}
                            minHeight={
                              Platform.OS === 'ios' && 4 ? 20 * 4 : null
                            }
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
                </ScrollView>
              </View>

              <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <FormButton
                  textStyles={{color: '#fff', fontSize: 12}}
                  loadingprop={props.appReducer.loading && !subLoading}
                  styleprops={{
                    borderColor: 'transparent',
                    backgroundColor:
                      !isDirty || !isValid
                        ? config.colors.darkGrayColor
                        : config.colors.mainBgColor,
                  }}
                  disabled={!isDirty || !isValid}
                  onPress={() => {
                    props.warrantyProblem({
                      problem: getValues('complaint'),
                      order_id: props.OrderReducer.OrderDetails.id,
                    });
                  }}>
                  {lang.btns.Confirm}
                </FormButton>
                <FormButton
                  textStyles={{fontSize: 12}}
                  onPress={() => {
                    props.setWarrantyDialog(false);
                  }}>
                  {lang.creditCards.cancelbtn}
                </FormButton>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={SuccessVisible}>
          <View style={styles.mainView}>
            <View style={styles.subView}>
              <View>
                <ScrollView>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Avatar.Icon
                      size={90}
                      style={{
                        margin: 20,
                        borderColor: config.colors.mainBgColor,
                        borderWidth: 1,
                      }}
                      theme={{
                        colors: {
                          primary: 'transparent',
                        },
                      }}
                      icon={'check'}
                      color={config.colors.mainBgColor}
                    />

                    <Text
                      style={{
                        ...styles.titleTextStyle,
                        fontSize: 11,
                        textAlign: 'center',
                        color: config.colors.mainBgColor,
                        marginHorizontal: 3,
                      }}>
                      {lang.order.successMaintenanceRequest}
                    </Text>
                  </View>
                </ScrollView>
              </View>

              <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <FormButton
                  textStyles={{color: '#fff'}}
                  loadingprop={props.appReducer.loading && !subLoading}
                  styleprops={{
                    borderColor: 'transparent',
                    backgroundColor: config.colors.mainBgColor,
                  }}
                  onPress={() => {
                    SetSuccessVisible(false);
                    SetVisable(false);
                  }}>
                  {lang.btns.Confirm}
                </FormButton>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={CompanyVisible}>
          <View style={styles.mainView}>
            <View style={styles.subView}>
              <View>
                <ScrollView>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, marginHorizontal: 5}}>
                      <Text
                        style={{
                          ...styles.titleTextStyle,
                          fontSize: 11,
                          color: config.colors.mainBgColor,
                          marginHorizontal: 3,
                        }}>
                        {lang.order.ChangeCompany1 +
                          '.................. ' +
                          lang.order.ChangeCompany2}
                      </Text>
                    </View>
                  </View>
                </ScrollView>
              </View>

              <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <FormButton
                  textStyles={{color: '#fff'}}
                  loadingprop={props.appReducer.loading && !subLoading}
                  styleprops={{
                    borderColor: 'transparent',
                    backgroundColor: config.colors.mainBgColor,
                  }}
                  onPress={() => {
                    SetCompanyVisible(false);
                    SetVisable(false);
                    SetSuccessVisible(true);
                  }}>
                  {lang.btns.Confirm}
                </FormButton>
                <FormButton
                  onPress={() => {
                    SetCompanyVisible(false);
                    SetcancelVisible(true);
                  }}>
                  {lang.creditCards.cancelbtn}
                </FormButton>
              </View>
            </View>
          </View>
        </Modal>
        <Modal animationType="slide" transparent={true} visible={cancelVisible}>
          <View style={styles.mainView}>
            <View style={styles.subView}>
              <View>
                <ScrollView>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, marginHorizontal: 5}}>
                      <Text
                        style={{
                          ...styles.titleTextStyle,
                          fontSize: 11,
                          color: config.colors.mainBgColor,
                          marginHorizontal: 3,
                        }}>
                        {lang.order.rejectCompanyChange}
                      </Text>
                    </View>
                  </View>
                </ScrollView>
              </View>

              <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <FormButton
                  textStyles={{color: '#fff'}}
                  loadingprop={props.appReducer.loading && !subLoading}
                  styleprops={{
                    borderColor: 'transparent',
                    backgroundColor: config.colors.mainBgColor,
                  }}
                  onPress={() => {
                    SetcancelVisible(false);
                    SetVisable(false);
                  }}>
                  {lang.btns.Confirm}
                </FormButton>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{marginVertical: 5}}>
          <Text
            style={{
              color: config.colors.darkGrayColor,
              fontFamily: 'Cairo-Bold',
              textAlign: 'center',
              fontSize: 12,
            }}>
            {lang.order.orderNo}
          </Text>
          <Text
            style={{
              color: config.colors.darkGrayColor,
              fontFamily: 'Cairo-Bold',
              textAlign: 'center',
              fontSize: 18,
            }}>
            {props.OrderReducer.OrderDetails.order_serial_no}
          </Text>
        </View>
      </View>
      <View style={styles.subitemStyle}>
        {!props.appReducer.loading && !subLoading && (
          <ScrollView>
            <View style={{padding: 10, flex: 1}}>
              {props.OrderReducer.OrderDetails.complains.length > 0 && (
                <View style={styles.HeaderStyles}>
                  <TouchableOpacity
                    disabled={
                      props.OrderReducer.OrderDetails.complains[
                        props.OrderReducer.OrderDetails.complains.length - 1
                      ].status == 'hold'
                    }
                    style={styles.helpStyles}
                    onPress={() =>
                      props.navigation.navigate('MakeComplaint', {
                        order_id: props.OrderReducer.OrderDetails.id,
                        status: props.OrderReducer.OrderDetails.status,
                      })
                    }>
                    <Text
                      style={{
                        ...styles.helpText,
                        color:
                          props.OrderReducer.OrderDetails.complains[
                            props.OrderReducer.OrderDetails.complains.length - 1
                          ].status == 'hold'
                            ? config.colors.darkGrayColor
                            : config.colors.mainBgColor,
                      }}>
                      {lang.makeComplaint.title}
                    </Text>
                    <Svg.Iconhelpcircle
                      style={{
                        color:
                          props.OrderReducer.OrderDetails.complains[
                            props.OrderReducer.OrderDetails.complains.length - 1
                          ].status == 'hold'
                            ? config.colors.darkGrayColor
                            : config.colors.mainBgColor,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {props.OrderReducer.OrderDetails.complains.length < 1 && (
                <View style={styles.HeaderStyles}>
                  <TouchableOpacity
                    // disabled={props.OrderReducer.OrderDetails.complains[props.OrderReducer.OrderDetails.complains.length-1].status!='hold'}
                    style={styles.helpStyles}
                    onPress={() =>
                      props.navigation.navigate('MakeComplaint', {
                        order_id: props.OrderReducer.OrderDetails.id,
                        status: props.OrderReducer.OrderDetails.status,
                      })
                    }>
                    <Text style={styles.helpText}>
                      {lang.makeComplaint.title}
                    </Text>
                    <Svg.Iconhelpcircle style={{color: '#FAC900'}} />
                  </TouchableOpacity>
                </View>
              )}
              <Text
                style={{
                  ...styles.titleTextStyle,
                }}>
                {lang.order.WarrantyDetails}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    ...styles.subTextStyle,
                  }}>
                  {lang.order.WarrantyPeriod}
                </Text>
                <View style={styles.valueStyle}>
                  <Text
                    style={{
                      ...styles.subTextStyle,
                      color: config.colors.mainBgColor,
                    }}>
                    {getWords(props.OrderReducer.OrderDetails.warranty)}
                  </Text>
                </View>
              </View>
              <View style={{justifyContent: 'center'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{
                        ...styles.titleTextStyle,
                        fontSize: 11,
                      }}>
                      {lang.order.WarrantyStart}
                    </Text>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: config.colors.darkGrayColor,
                        borderRadius: 5,
                      }}></View>
                    <Text
                      style={{
                        ...styles.titleTextStyle,
                        fontSize: 11,
                        color: config.colors.mainBgColor,
                      }}>
                      {props.OrderReducer.OrderDetails.warrantyStart}
                    </Text>
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View
                      style={{
                        ...styles.fieldContainer,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                      }}>
                      <View>
                        <Text
                          style={{
                            ...styles.titleTextStyle,
                            fontSize: 6,
                          }}>
                          {lang.order.Warrantyleft}
                        </Text>

                        <Text
                          style={{
                            ...styles.titleTextStyle,
                            fontSize: 9,
                          }}>
                          {getWords(
                            props.OrderReducer.OrderDetails.warranty_period,
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{
                        ...styles.titleTextStyle,
                        fontSize: 11,
                      }}>
                      {lang.order.WarrantyEnd}
                    </Text>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: config.colors.darkGrayColor,
                        borderRadius: 5,
                      }}></View>
                    <Text
                      style={{
                        ...styles.titleTextStyle,
                        fontSize: 11,
                        color: config.colors.mainBgColor,
                      }}>
                      {props.OrderReducer.OrderDetails.warrantyEnd}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    maxWidth: '40%',
                    borderBottomColor: config.colors.darkGrayColor,
                    borderBottomWidth: 1,
                    marginHorizontal: '30%',
                    marginVertical: 20,
                  }}></View>
              </View>
              <Text
                style={{
                  ...styles.titleTextStyle,
                  fontSize: 11,
                }}>
                {lang.order.problemDetails}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <Svg.deviceIcon />
                  <Text
                    style={{
                      ...styles.subTextStyle,
                      marginHorizontal: 4,
                    }}>
                    {lang.itemReport.categoryDevice}
                  </Text>
                  <View style={{marginHorizontal: 5}}>
                    <Text
                      style={{
                        ...styles.subTextStyle,
                        color: '#000',
                      }}>
                      {props.OrderReducer.OrderDetails.device.name}
                    </Text>
                  </View>
                </View>
                {props.OrderReducer.OrderDetails.device_brand != null && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <Svg.deviceIcon />
                    <Text
                      style={{
                        ...styles.subTextStyle,
                        marginHorizontal: 4,
                      }}>
                      {lang.itemReport.deviceBrand}
                    </Text>
                    <View style={{marginHorizontal: 5}}>
                      <Text
                        style={{
                          ...styles.subTextStyle,
                          color: '#000',
                        }}>
                        {props.OrderReducer.OrderDetails.device_brand.name}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              <Text
                style={{
                  ...styles.titleTextStyle,
                  fontSize: 11,
                  color: config.colors.mainBgColor,
                }}>
                {lang.itemReport.deviceDamage}
              </Text>
              <View style={styles.fieldContainer}>
                <Text
                  style={{
                    ...styles.titleTextStyle,
                    fontSize: 11,
                  }}>
                  {props.OrderReducer.OrderDetails.complaint}
                </Text>
              </View>
              <View
                style={{
                  maxWidth: '40%',
                  borderBottomColor: config.colors.darkGrayColor,
                  borderBottomWidth: 1,
                  marginHorizontal: '30%',
                  marginVertical: 20,
                }}
              />

              <View style={{justifyContent: 'center', marginVertical: 5}}>
                {props.OrderReducer.OrderDetails.company_engineers.length >
                  0 && (
                  <View>
                    <Text
                      style={{
                        ...styles.titleTextStyle,
                        fontSize: 11,
                      }}>
                      {lang.order.FixingExecutorData}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          props.engineerProfile({
                            data: props.OrderReducer.OrderDetails
                              .company_engineers[0].id,
                            redirectToMainScreen: () =>
                              props.navigation.navigate('EngineerProfile', {
                                backPage: 'OrderDetails',
                              }),
                          })
                        }
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <Image
                          style={{
                            height: 40,
                            width: 40,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: config.colors.mainBgColor,
                          }}
                          source={{
                            uri: props.OrderReducer.OrderDetails
                              .company_engineers[0].profile_pic,
                          }}
                        />
                        <View style={{paddingHorizontal: 10}}>
                          <Text
                            style={{
                              ...styles.titleTextStyle,
                              fontSize: 11,
                            }}>
                            {lang.order.fixingExecutor}
                          </Text>
                          <Text
                            style={{
                              ...styles.titleTextStyle,
                              fontSize: 14,
                              color: config.colors.mainBgColor,
                            }}>
                            {props.OrderReducer.OrderDetails
                              .company_engineers[0].fname +
                              ' ' +
                              props.OrderReducer.OrderDetails
                                .company_engineers[0].lname}
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            {/* <Rating
                                                        readonly
                                                        fractions={1}
                                                        startingValue={props.OrderReducer.OrderDetails.company_engineers[0].rate}
                                                        // onFinishRating={this.ratingCompleted}
                                                        imageSize={15}
                                                    /> */}
                            <Rating
                              rated={parseFloat(
                                props.OrderReducer.OrderDetails
                                  .company_engineers[0].rating,
                              )}
                              totalCount={5}
                              ratingColor={config.colors.mainBgColor}
                              ratingBackgroundColor="#d4d4d4"
                              size={16}
                              readonly // by default is false
                              icon="ios-star"
                              direction="row"
                            />
                            <Text
                              style={{
                                ...styles.titleTextStyle,
                                fontSize: 14,
                                color: '#FAC900',
                              }}>
                              {props.OrderReducer.OrderDetails
                                .company_engineers[0].reviews_count %
                                1 >
                              0.0
                                ? '+'
                                : ''}
                              {
                                props.OrderReducer.OrderDetails
                                  .company_engineers[0].reviews_count
                              }
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <FormButton
                                            // icon={'map-marker'}
                                            textStyles={{ color: '#fff', fontSize: 12, marginVertical: 5 }}
                                            styleprops={{
                                                borderColor: 'transparent',
                                                backgroundColor: config.colors.mainBgColor,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 0
                                            }}
                                            onPress={() => { SetVisable(false); }}>
                                            {lang.order.EngineerLocation}
                                        </FormButton>
                                    </View> */}
                    </View>
                  </View>
                )}
                {props.OrderReducer.OrderDetails.company != null && (
                  <View
                    style={{
                      marginVertical: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <Image
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 50,
                          borderWidth: 1,
                          borderColor: config.colors.mainBgColor,
                        }}
                        source={{
                          uri: props.OrderReducer.OrderDetails.company
                            .profile_pic,
                        }}
                      />
                      <View style={{paddingHorizontal: 10}}>
                        <Text
                          style={{
                            ...styles.titleTextStyle,
                            fontSize: 11,
                          }}>
                          {lang.order.Manager}
                        </Text>
                        <Text
                          style={{
                            ...styles.titleTextStyle,
                            fontSize: 14,
                            color: config.colors.mainBgColor,
                          }}>
                          {props.OrderReducer.OrderDetails.company.fname +
                            ' ' +
                            props.OrderReducer.OrderDetails.company.lname}
                        </Text>
                      </View>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                      <Text
                        style={{
                          ...styles.titleTextStyle,
                          fontSize: 11,
                        }}>
                        {lang.order.ExecutorCompany}
                      </Text>
                      <Text
                        style={{
                          ...styles.titleTextStyle,
                          fontSize: 14,
                          color: config.colors.mainBgColor,
                        }}>
                        {props.OrderReducer.OrderDetails.company.name}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FormButton
                  // icon={'map-marker'}
                  textStyles={{color: '#fff', fontSize: 12}}
                  styleprops={{
                    borderColor: 'transparent',
                    backgroundColor: config.colors.mainBgColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                    maxWidth: '60%',
                  }}
                  onPress={() => {
                    props.setWarrantyDialog(true);
                  }}>
                  {lang.order.maintenanceRequest}
                </FormButton>
              </View>
            </View>
          </ScrollView>
        )}
        {props.appReducer.loading && subLoading && (
          <View style={{flex: 1}}>
            <LoadingComp
              showHeader={false}
              navigation={props.navigation}
              pageTitle={lang.home.title}
            />
          </View>
        )}
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  engineerProfile: data => OrderActions.engineerProfile(data)(dispatch),
  CurrentOrders: () => OrderActions.WarrantyOrders()(dispatch),
  warrantyProblem: data => OrderActions.warrantyProblem(data)(dispatch),
  setWarrantyDialog: data => OrderActions.setWarrantyDialog(data)(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
  OtherReducer: state.OtherReducer,
  OrderReducer: state.OrderReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WarrantyOrderScreen);
