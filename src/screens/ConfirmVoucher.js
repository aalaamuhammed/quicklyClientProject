import React, {useRef, useEffect, useState} from 'react';

import {connect} from 'react-redux';
import {
  StyleSheet,
  Animated,
  FlatList,
  I18nManager,
  Dimensions,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  Easing,
  Text,
  View,
  Pressable,
  Image,
  Modal,
  findNodeHandle,
  useWindowDimensions,
} from 'react-native';
import {Rating} from 'react-native-rating-element';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FormButton from '../components/material/FormButton';
import {HeaderComponent} from '../components/core/Header';
import DropdownModal from '../components/material/DropdownModal';
import {actions as appActions} from '../modules/app';
import {actions as OthersActions} from '../modules/other';
import {actions as profileActions} from '../modules/profile';
import {actions as OrderActions} from '../modules/order';
import {actions as invoiceActions} from '../modules/invoice';
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
    fontSize: 12,
    color: config.colors.darkGrayColor,
  },
  subTextStyle: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Bold',
    fontSize: 13,
    color: config.colors.mainBgColor,
  },
  dateTextStyle: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Bold',
    fontSize: 16,
    color: config.colors.lightGrayColor,
  },
  valueStyle: {
    ...common.fontstyles,
    fontSize: 12,
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

const ConfirmVoucherScreen = props => {
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
    SetRatingVisible(true);
    // SetVisable(false);
  };
  // useEffect(() => {
  //     SetsubLoading(true)
  //     props.WarrantyOrders().then(respo => {

  //     })

  // }, []);
  const makeRating = data => {
    // SetRatingVisible(false);
    props.makeReview({
      ...data,
      engineer_id:
        props.VoucherReducer.voucherDetails.order.company_engineers[0].id,
    });
  };
  useEffect(() => {
    if (props.InvoiceReducer.doneRating == true) {
      SetRatingVisible(false);
      props.resetReview();
    }
  }, [props.InvoiceReducer.doneRating]);
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
    props.ProfileInfo();
  }, []);
  const [Visible, SetVisable] = useState(false);
  const [CompanyVisible, SetCompanyVisible] = useState(false);
  const [SuccessVisible, SetSuccessVisible] = useState(false);
  const [cancelVisible, SetcancelVisible] = useState(false);
  const [ConfirmVisible, SetconfirmVisible] = useState(false);
  const [ratingVisible, SetRatingVisible] = useState(false);

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
          {lang.Receipt.title}
        </HeaderComponent>
        <Modal animationType="slide" transparent={true} visible={Visible}>
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
                            numberOfLines={5}
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
                  textStyles={{color: '#fff'}}
                  loadingprop={props.appReducer.loading && !subLoading}
                  styleprops={{
                    borderColor: 'transparent',
                    backgroundColor: config.colors.mainBgColor,
                  }}
                  onPress={() => {
                    SetCompanyVisible(true);
                  }}>
                  {lang.btns.Confirm}
                </FormButton>
                <FormButton
                  onPress={() => {
                    SetSuccessVisible(true);
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
                  }}>
                  {lang.btns.Confirm}
                </FormButton>
              </View>
            </View>
          </View>
        </Modal>
        <Modal animationType="slide" transparent={true} visible={ratingVisible}>
          <View style={styles.mainView}>
            <View style={styles.subView}>
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
                        {lang.statement.RateCustomer}
                      </Text>

                      <Controller
                        defaultValue=""
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

              <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <FormButton
                  textStyles={{color: '#fff'}}
                  loadingprop={props.appReducer.loading && !subLoading}
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={ConfirmVisible}>
          <View style={styles.mainView}>
            <View style={styles.subView}>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 5,
                    }}>
                    <Text
                      style={{
                        ...styles.titleTextStyle,
                        fontSize: 13,
                        color: config.colors.mainBgColor,
                        marginHorizontal: 3,
                      }}>
                      {lang.Receipt.sendReceipt}
                    </Text>
                    <Text
                      style={{
                        ...styles.titleTextStyle,
                        fontSize: 13,
                        color: config.colors.darkGrayColor,
                        marginHorizontal: 3,
                      }}>
                      {lang.Receipt.ShippingCosts}
                    </Text>
                  </View>
                </View>
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
                    SetconfirmVisible(false);
                  }}>
                  {lang.btns.Send}
                </FormButton>
                <FormButton
                  onPress={() => {
                    SetconfirmVisible(false);
                  }}>
                  {lang.btns.Reject}
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
            {lang.Receipt.receiptNo}
          </Text>
          {props.VoucherReducer.voucherDetails && (
            <Text
              style={{
                color: config.colors.darkGrayColor,
                fontFamily: 'Cairo-Bold',
                textAlign: 'center',
                fontSize: 16,
              }}>
              {props.VoucherReducer.voucherDetails.code}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.subitemStyle}>
        {!props.appReducer.loading &&
          !subLoading &&
          props.VoucherReducer.voucherDetails && (
            <ScrollView>
              <View style={{paddingHorizontal: 10, flex: 1}}>
                <View style={styles.HeaderStyles}>
                  <Text
                    style={{
                      ...styles.titleTextStyle,
                    }}>
                    {props.VoucherReducer.voucherDetails.order.created_at}
                  </Text>
                </View>

                {props.VoucherReducer.voucherDetails.order && (
                  <View>
                    <Text
                      style={{
                        ...styles.titleTextStyle,
                      }}>
                      {lang.order.CustomerDetails}
                    </Text>
                    {/* client info */}
                    {props.ProfileReducer.userInformation && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 5,
                        }}>
                        <View
                          style={{
                            width: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Svg.Profile
                            style={{
                              color: config.colors.mainBgColor,
                              width: 10,
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            ...styles.subTextStyle,
                            marginHorizontal: 4,
                          }}>
                          {lang.Bill.clientName}
                        </Text>
                        <View style={{marginHorizontal: 5}}>
                          <Text
                            style={{
                              ...styles.subTextStyle,
                              color: '#000',
                            }}>
                            {props.ProfileReducer.userInformation.fname +
                              ' ' +
                              props.ProfileReducer.userInformation.lname}
                          </Text>
                        </View>
                      </View>
                    )}
                    {props.VoucherReducer.voucherDetails.order
                      .order_location && (
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 10,
                          }}>
                          <Svg.Iconphone
                            style={{color: config.colors.mainBgColor}}
                          />
                          <Text
                            style={{
                              ...styles.subTextStyle,
                              marginHorizontal: 4,
                            }}>
                            {lang.addresses.phoneNo}
                          </Text>
                          <View style={{marginHorizontal: 5}}>
                            <Text
                              style={{
                                ...styles.subTextStyle,
                                color: '#000',
                              }}>
                              {
                                props.VoucherReducer.voucherDetails.order
                                  .order_location.phone
                              }
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 10,
                          }}>
                          <Svg.Iconlocationon
                            style={{color: config.colors.mainBgColor}}
                          />
                          <Text
                            style={{
                              ...styles.subTextStyle,
                              marginHorizontal: 4,
                            }}>
                            {lang.addresses.Address}
                          </Text>
                          <View style={{marginHorizontal: 5}}>
                            <Text
                              style={{
                                ...styles.subTextStyle,
                                color: '#000',
                              }}>
                              {props.VoucherReducer.voucherDetails.order
                                .order_location.governorate.name +
                                ' , ' +
                                props.VoucherReducer.voucherDetails.order
                                  .order_location.city.name}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View style={{marginHorizontal: 5}}>
                            <Text
                              style={{
                                ...styles.titleTextStyle,
                                color: '#000',
                              }}>
                              {/* {props.VoucherReducer.voucherDetails.order.order_location.street} */}
                            </Text>
                          </View>
                          <View style={{marginHorizontal: 5}}>
                            <Text
                              style={{
                                ...styles.titleTextStyle,
                                color: config.colors.mainBgColor,
                              }}>
                              {lang.addresses.building}
                            </Text>
                          </View>
                          <View style={{marginHorizontal: 5}}>
                            <Text
                              style={{
                                ...styles.titleTextStyle,
                                color: '#000',
                              }}>
                              {
                                props.VoucherReducer.voucherDetails.order
                                  .order_location.building_no
                              }
                            </Text>
                          </View>
                          <View style={{marginHorizontal: 5}}>
                            <Text
                              style={{
                                ...styles.titleTextStyle,
                                color: config.colors.mainBgColor,
                              }}>
                              {lang.addresses.floor}
                            </Text>
                          </View>
                          <View style={{marginHorizontal: 5}}>
                            <Text
                              style={{
                                ...styles.titleTextStyle,
                                color: '#000',
                              }}>
                              {
                                props.VoucherReducer.voucherDetails.order
                                  .order_location.floor_no
                              }
                            </Text>
                          </View>
                          <View style={{marginHorizontal: 5}}>
                            <Text
                              style={{
                                ...styles.titleTextStyle,
                                color: config.colors.mainBgColor,
                              }}>
                              {lang.addresses.apartment}
                            </Text>
                          </View>
                          <View style={{marginHorizontal: 5}}>
                            <Text
                              style={{
                                ...styles.titleTextStyle,
                                color: '#000',
                              }}>
                              {
                                props.VoucherReducer.voucherDetails.order
                                  .order_location.flat_no
                              }
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                    <View
                      style={{
                        maxWidth: '40%',
                        borderBottomColor: config.colors.darkGrayColor,
                        borderBottomWidth: 1,
                        marginHorizontal: '30%',
                        marginVertical: 20,
                      }}
                    />

                    {/* end client info */}
                  </View>
                )}
                <View>
                  <Text
                    style={{
                      ...styles.titleTextStyle,
                      fontSize: 11,
                    }}>
                    {lang.order.problemDetails}
                  </Text>
                  {props.VoucherReducer.voucherDetails.order && (
                    <View
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 5,
                        }}>
                        <View
                          style={{
                            width: 20,
                            marginHorizontal: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Svg.Profile
                            style={{
                              color: config.colors.mainBgColor,
                              width: 10,
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            ...styles.subTextStyle,
                          }}>
                          {lang.itemReport.categoryDevice}
                        </Text>
                        <View style={{marginHorizontal: 5}}>
                          <Text
                            style={{
                              ...styles.subTextStyle,
                              color: '#000',
                            }}>
                            {
                              props.VoucherReducer.voucherDetails.order.device
                                .name
                            }
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 5,
                        }}>
                        <View
                          style={{
                            width: 20,
                            marginHorizontal: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Svg.Profile
                            style={{
                              color: config.colors.mainBgColor,
                              width: 10,
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            ...styles.subTextStyle,
                          }}>
                          {lang.itemReport.deviceBrand}
                        </Text>
                        <View style={{marginHorizontal: 5}}>
                          <Text
                            style={{
                              ...styles.subTextStyle,
                              color: '#000',
                            }}>
                            {
                              props.VoucherReducer.voucherDetails.order
                                .device_brand.name
                            }
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  <View
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                    }}>
                    <View
                      style={{
                        width: 20,
                        marginHorizontal: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {/* <Svg.Iconphone style={{ color: config.colors.mainBgColor, width: 10 }} /> */}
                      <MaterialCommunityIcons
                        name={'check'}
                        style={{
                          fontSize: 20,
                          color: config.colors.mainBgColor,
                        }}
                        color={config.colors.mainBgColor}
                      />
                    </View>
                    <Text
                      style={{
                        ...styles.subTextStyle,
                        marginHorizontal: 4,
                      }}>
                      {lang.Bill.theDeal}
                    </Text>
                    <View style={{marginHorizontal: 5}}>
                      <Text
                        style={{
                          ...styles.subTextStyle,
                          color: '#000',
                        }}>
                        {
                          props.VoucherReducer.voucherDetails.order
                            .repair_summary
                        }
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
                    }}
                  />
                </View>
                {props.VoucherReducer.voucherDetails.order.company && (
                  <View>
                    <Text
                      style={{
                        ...styles.titleTextStyle,
                        fontSize: 11,
                      }}>
                      {lang.order.CompanyDetails}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      <Text
                        style={{
                          ...styles.subTextStyle,
                          marginHorizontal: 4,
                        }}>
                        {lang.order.fixingExecutor}
                      </Text>
                      <View style={{marginHorizontal: 5}}>
                        <Text
                          style={{
                            ...styles.subTextStyle,
                            color: '#000',
                          }}>
                          {props.VoucherReducer.voucherDetails.order.company
                            .fname +
                            ' ' +
                            props.VoucherReducer.voucherDetails.order.company
                              .lname}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      <Text
                        style={{
                          ...styles.subTextStyle,
                          marginHorizontal: 4,
                        }}>
                        {lang.order.Manager}
                      </Text>
                      <View style={{marginHorizontal: 5}}>
                        <Text
                          style={{
                            ...styles.subTextStyle,
                            color: '#000',
                          }}>
                          {
                            props.VoucherReducer.voucherDetails.order.company
                              .name
                          }
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      <Text
                        style={{
                          ...styles.subTextStyle,
                          marginHorizontal: 4,
                        }}>
                        {lang.order.Address}
                      </Text>
                      <View style={{marginHorizontal: 5}}>
                        <Text
                          style={{
                            ...styles.subTextStyle,
                            color: '#000',
                          }}>
                          {
                            props.VoucherReducer.voucherDetails.order.company
                              .address
                          }
                        </Text>
                      </View>
                    </View>
                    {props.VoucherReducer.voucherDetails.order &&
                      props.VoucherReducer.voucherDetails.order.company
                        .hasExtraTax && (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 5,
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              ...styles.titleTextStyle,
                              fontSize: 13,
                            }}>
                            {lang.Bill.AddtionaltexsShouldBe}
                          </Text>
                        </View>
                      )}
                    <View
                      style={{
                        maxWidth: '40%',
                        borderBottomColor: config.colors.darkGrayColor,
                        borderBottomWidth: 1,
                        marginHorizontal: '30%',
                        marginVertical: 20,
                      }}
                    />
                  </View>
                )}

                <View>
                  <Text
                    style={{
                      ...styles.titleTextStyle,
                      fontSize: 11,
                    }}>
                    {lang.Bill.price}
                  </Text>
                  <View>
                    <View
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      <View style={{marginHorizontal: 5}}>
                        <Text
                          style={{
                            ...styles.subTextStyle,
                            color: '#000',
                          }}>
                          {lang.Bill.cost}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          borderBottomColor: config.colors.darkGrayColor,
                          borderBottomWidth: 1,
                        }}
                      />

                      <Text
                        style={{
                          ...styles.subTextStyle,
                          marginHorizontal: 4,
                        }}>
                        {props.VoucherReducer.voucherDetails.order.cost}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      <View style={{marginHorizontal: 5}}>
                        <Text
                          style={{
                            ...styles.subTextStyle,
                            color: '#000',
                          }}>
                          {lang.Bill.fees}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          borderBottomColor: config.colors.darkGrayColor,
                          borderBottomWidth: 1,
                        }}
                      />

                      <Text
                        style={{
                          ...styles.subTextStyle,
                          marginHorizontal: 4,
                        }}>
                        {props.VoucherReducer.voucherDetails.order.fees}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      <View style={{marginHorizontal: 5}}>
                        <Text
                          style={{
                            ...styles.subTextStyle,
                            color: '#000',
                          }}>
                          {lang.Bill.Tax}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          borderBottomColor: config.colors.darkGrayColor,
                          borderBottomWidth: 1,
                        }}
                      />

                      <Text
                        style={{
                          ...styles.subTextStyle,
                          marginHorizontal: 4,
                        }}>
                        {props.VoucherReducer.voucherDetails.order.taxes}
                      </Text>
                    </View>
                    {/* {props.VoucherReducer.voucherDetails.order.coupon_discount != null && <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                                        <View style={{ marginHorizontal: 5 }}>
                                            <Text
                                                style={{
                                                    ...styles.subTextStyle,
                                                    color: '#000',
                                                }}>
                                                {lang.Bill.discount}
                                            </Text>

                                        </View>
                                        <View style={{ flex: 1, borderBottomColor: config.colors.darkGrayColor, borderBottomWidth: 1, }} />

                                        <Text
                                            style={{
                                                ...styles.subTextStyle,
                                                marginHorizontal: 4,
                                            }}>
                                            {props.VoucherReducer.voucherDetails.order.coupon_discount}
                                        </Text>

                                    </View>} */}
                  </View>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginVertical: 5,
                    backgroundColor: config.colors.maindarkcolor,
                    borderRadius: 5,
                    padding: 5,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        ...styles.subTextStyle,
                        marginHorizontal: 4,
                        color: '#fff',
                        fontSize: 12,
                      }}>
                      {lang.order.total + ' : '}
                    </Text>
                    <View style={{marginHorizontal: 5}}>
                      <Text
                        style={{
                          ...styles.subTextStyle,
                        }}>
                        {parseInt(
                          props.VoucherReducer.voucherDetails.order.taxes,
                        ) +
                          parseInt(
                            props.VoucherReducer.voucherDetails.order.cost,
                          ) +
                          parseInt(
                            props.VoucherReducer.voucherDetails.order.fees,
                          )}
                      </Text>
                    </View>
                  </View>
                  {!props.VoucherReducer.voucherDetails.order.coupon_discount !=
                    null && (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          ...styles.subTextStyle,
                          marginHorizontal: 4,
                          color: '#fff',
                          fontSize: 12,
                        }}>
                        {lang.Bill.discount + ' : '}
                      </Text>
                      <View style={{marginHorizontal: 5}}>
                        <Text
                          style={{
                            ...styles.subTextStyle,
                          }}>
                          {
                            props.VoucherReducer.voucherDetails.order
                              .coupon_discount
                          }
                        </Text>
                      </View>
                    </View>
                  )}
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        ...styles.subTextStyle,
                        marginHorizontal: 4,
                        color: '#fff',
                        fontSize: 12,
                      }}>
                      {lang.Bill.paymentAmount + ':'}
                    </Text>
                    <View style={{marginHorizontal: 5}}>
                      <Text
                        style={{
                          ...styles.subTextStyle,
                        }}>
                        {props.VoucherReducer.voucherDetails.amount}
                      </Text>
                    </View>
                    <View style={{marginHorizontal: 5}}>
                      <Text
                        style={{
                          ...styles.titleTextStyle,
                          color: '#fff',
                          fontSize: 10,
                        }}>
                        {lang.Bill.paymentAmount2}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{flexDirection: 'row', marginVertical: 5}}>
                  <View style={{width: 15, alignItems: 'center'}}>
                    <Svg.Iconlocationon style={{color: '#FAC900'}} />
                  </View>
                  <Text
                    style={{
                      ...styles.titleTextStyle,
                      marginHorizontal: 4,
                      color: '#FAC900',
                    }}>
                    {lang.Bill.warrentyWarning}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <View style={{marginHorizontal: 5}}>
                    <Text
                      style={{
                        ...styles.subTextStyle,
                        color: '#000',
                      }}>
                      {lang.Receipt.TransportDevice}
                    </Text>
                  </View>

                  <Text
                    style={{
                      ...styles.subTextStyle,
                      marginHorizontal: 4,
                    }}>
                    {props.VoucherReducer.voucherDetails.status ===
                      'assignAnotherDate' && lang.Receipt.no}
                    {props.VoucherReducer.voucherDetails.status ===
                      'shippedDevice.confirm' && lang.Receipt.yes}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      ...styles.subTextStyle,
                      marginHorizontal: 4,
                    }}>
                    {lang.Bill.PaymentMathod}
                  </Text>
                  <View style={{marginHorizontal: 5}}>
                    {props.VoucherReducer.voucherDetails.order
                      .payment_method_id != 1 && (
                      <Image
                        source={require('../assets/images/visa.png')}
                        width={10}
                      />
                    )}
                    {props.VoucherReducer.voucherDetails.order
                      .payment_method_id == 1 && (
                      <Text
                        style={{
                          ...styles.subTextStyle,
                          color: '#000',
                        }}>
                        {
                          props.VoucherReducer.voucherDetails.order
                            .payment_method.name
                        }
                      </Text>
                    )}
                  </View>
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
                      onSubmit();
                    }}>
                    {lang.Bill.pay}
                  </FormButton>
                  {/* <FormButton
                                // icon={'map-marker'}
                                textStyles={{ fontSize: 12 }}
                                styleprops={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 0,
                                    maxWidth: '60%',
                                }}
                                onPress={() => { SetVisable(true); }}>
                                {lang.btns.Reject}
                            </FormButton> */}
                </View>
              </View>
            </ScrollView>
          )}
        {props.appReducer.loading && !subLoading && (
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
  makeReview: data => invoiceActions.makeReview(data)(dispatch),
  CurrentOrders: () => OrderActions.WarrantyOrders()(dispatch),
  resetReview: () => invoiceActions.resetReview()(dispatch),
  ProfileInfo: () => profileActions.ProfileInfo()(dispatch),
  engineerProfile: data => OrderActions.engineerProfile(data)(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
  OtherReducer: state.OtherReducer,
  ProfileReducer: state.ProfileReducer,
  OrderReducer: state.OrderReducer,
  VoucherReducer: state.VoucherReducer,
  InvoiceReducer: state.InvoiceReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmVoucherScreen);
