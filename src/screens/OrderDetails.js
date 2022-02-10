import React, {useRef, useEffect, useState} from 'react';

import {connect} from 'react-redux';
import {
  StyleSheet,
  Animated,
  FlatList,
  I18nManager,
  BackHandler,
  Dimensions,
  ScrollView,
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
// import { Rating, AirbnbRating } from 'react-native-ratings';
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
import {Appbar, Avatar} from 'react-native-paper';
import NoDataComp from '../components/material/NoDataComp';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LoadingComp from '../components/material/LoadingComp';
import StepIndicator from 'react-native-step-indicator';
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
const {height} = Dimensions.get('screen');

const OrderDetailsScreen = props => {
  // const labels = [lang.order["1"], lang.order["2"],
  // lang.order["5"], lang.order["7"]];
  const canceledlabels = [lang.order['1'], lang.order['10']];
  const rejectedlabels = [
    lang.order['1'],
    lang.order['2'],
    lang.order['5'],
    lang.order['12'],
  ];
  const AssignedAnotherDaylabels = [
    lang.order['1'],
    lang.order['2'],
    lang.order['11'],
    lang.order['7'],
  ];

  const customStyles = {
    stepIndicatorSize: 20,
    currentStepIndicatorSize: 20,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 1,
    stepStrokeCurrentColor: config.colors.mainBgColor,
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: config.colors.mainBgColor,
    stepStrokeUnFinishedColor: '#fff',
    separatorFinishedColor: config.colors.mainBgColor,
    separatorUnFinishedColor: '#fff',
    stepIndicatorFinishedColor: config.colors.maindarkcolor,
    stepIndicatorUnFinishedColor: config.colors.maindarkcolor,
    stepIndicatorCurrentColor: config.colors.maindarkcolor,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fff',
    stepIndicatorLabelFinishedColor: config.colors.mainBgColor,
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#fff',
    labelSize: 13,
    currentStepLabelColor: config.colors.mainBgColor,
    labelFontFamily: 'Cairo-Bold',
  };
  useEffect(() => {
    const backAction = () => {
      // feedBack ?
      props.navigation.goBack();
      //:
      //   props.navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const [labels, SetLabels] = useState([
    lang.order['1'],
    lang.order['2'],
    lang.order['5'],
    lang.order['7'],
  ]);

  const [currentPosition, SetcurrentPosition] = useState();
  const [showlable, SetShowLabel] = useState(true);
  const [deleteVisible, setDeleteVisible] = useState(false);
  useEffect(() => {
    var status2 = [2, 3, 4];

    if (props.OrderReducer.OrderDetails.status === '1') {
      SetcurrentPosition(0);
    } else if (
      status2.includes(parseInt(props.OrderReducer.OrderDetails.status))
    ) {
      SetcurrentPosition(1);
    } else if (props.OrderReducer.OrderDetails.status === '5') {
      SetcurrentPosition(2);
    } else if (props.OrderReducer.OrderDetails.status === '7') {
      SetcurrentPosition(3);
    } else if (props.OrderReducer.OrderDetails.status === '10') {
      SetcurrentPosition(1);
      setCountSteps(2);
      SetLabels(canceledlabels);
    } else if (props.OrderReducer.OrderDetails.status === '12') {
      SetcurrentPosition(3);
      setCountSteps(4);
      SetLabels(rejectedlabels);
    } else if (props.OrderReducer.OrderDetails.status === '11') {
      SetcurrentPosition(2);
      setCountSteps(4);
      SetLabels(AssignedAnotherDaylabels);
    }
  }, [props.OrderReducer.OrderDetails]);

  // let currentPosition = useRef(0).current;
  const handleScroll = event => {
    // const { animatedOpacityValue, showBlueView } = this.state;
    const scrollPosition = event.nativeEvent.contentOffset.y;

    if (scrollPosition > 0) {
      SetShowLabel(false);
    } else {
      SetShowLabel(true);
    }
  };
  let translateY = useRef(new Animated.ValueXY()).current;
  const [subLoading, SetsubLoading] = useState(false);
  const [isDeleted, SetisDeleted] = useState(true);
  const [countSteps, setCountSteps] = useState(4);
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
          paddingBottom: 40,
        }}>
        <HeaderComponent
          fontColor={'#fff'}
          toggleDrawer={() => props.navigation.toggleDrawer()}
          headerbtn2={() => props.navigation.goBack()}>
          {lang.order.title}
        </HeaderComponent>
        <Modal animationType="slide" transparent={true} visible={deleteVisible}>
          <View style={styles.mainView}>
            <View style={styles.subView}>
              <View style={styles.closeModel}>
                <Appbar.Action
                  icon={'close'}
                  size={18}
                  style={{margin: 5}}
                  color={config.colors.mainBgColor}
                  onPress={() => {
                    props.setCanceledFalse();
                    setDeleteVisible(false);
                    props.navigation.goBack();
                  }}
                />
              </View>
              {!props.OrderReducer.isCanceled && (
                <View>
                  <Text style={styles.modalTitleStyles}>
                    {lang.order.deleteOrder}
                  </Text>
                  <View
                    style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <FormButton
                      textStyles={{color: '#fff', fontSize: 12}}
                      styleprops={{
                        borderColor: 'transparent',
                        backgroundColor: config.colors.mainBgColor,
                      }}
                      loadingprop={props.appReducer.loading}
                      onPress={() => {
                        props.cancelOrder(props.OrderReducer.OrderDetails.id);
                      }}>
                      {lang.order.delete}
                    </FormButton>
                    <FormButton
                      textStyles={{fontSize: 11}}
                      onPress={() => {
                        setDeleteVisible(false);
                      }}>
                      {lang.order.cancel}
                    </FormButton>
                  </View>
                </View>
              )}
              {props.OrderReducer.isCanceled && (
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
                        onPress={() => {
                          props.setCanceledFalse();
                          setDeleteVisible(false);
                          props.navigation.goBack();
                        }}
                        color={config.colors.mainBgColor}
                      />

                      <Text
                        style={{
                          ...styles.modalTitleStyles,
                          textAlign: 'center',
                        }}>
                        {lang.order.DeleteDone}
                      </Text>
                    </View>
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
        </Modal>
        <StepIndicator
          customStyles={customStyles}
          stepCount={countSteps}
          currentPosition={currentPosition}
          labels={labels}
          renderLabel={position => {
            return (
              <Text
                style={{
                  fontFamily: 'Cairo-Bold',
                  fontSize: 11,
                  color:
                    position.stepStatus == 'unfinished'
                      ? '#fff'
                      : config.colors.mainBgColor,
                }}>
                {position.label}
              </Text>
            );
          }}
          renderStepIndicator={position => {
            return (
              <View
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor:
                    position.stepStatus == 'unfinished'
                      ? '#fff'
                      : config.colors.mainBgColor,
                  borderRadius: 6,
                }}></View>
            );
          }}
        />
      </View>
      <View style={{...styles.subitemStyle}}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: -35,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              width: 90,
              height: 90,
              borderRadius: 50,
            }}>
            <View>
              {showlable && (
                <Text
                  style={{
                    color: config.colors.darkGrayColor,
                    fontFamily: 'Cairo-Bold',
                    textAlign: 'center',
                    fontSize: 12,
                  }}>
                  {lang.order.orderNo}
                </Text>
              )}
              <Text
                style={{
                  color: config.colors.mainBgColor,
                  fontFamily: 'Cairo-Bold',
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                {props.OrderReducer.OrderDetails.order_serial_no}
              </Text>
            </View>
          </View>
        </View>
        {!props.appReducer.loading && !subLoading && (
          <ScrollView
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{marginVertical: 15}}>
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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    ...styles.titleTextStyle,
                  }}>
                  {lang.order.CustomerDetails}
                </Text>
                <Text
                  style={{
                    ...styles.titleTextStyle,
                  }}>
                  {props.OrderReducer.OrderDetails.created_at}
                </Text>
              </View>
              {props.OrderReducer.OrderDetails.order_location && (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <Svg.Iconphone style={{color: config.colors.mainBgColor}} />
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
                        {props.OrderReducer.OrderDetails.order_location.phone}
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
                        {props.OrderReducer.OrderDetails.order_location
                          .governorate.name +
                          ' , ' +
                          props.OrderReducer.OrderDetails.order_location.city
                            .name}
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
                        {props.OrderReducer.OrderDetails.order_location.street}
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
                          props.OrderReducer.OrderDetails.order_location
                            .building_no
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
                          props.OrderReducer.OrderDetails.order_location
                            .floor_no
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
                        {props.OrderReducer.OrderDetails.order_location.flat_no}
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
                }}></View>

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
                  <Svg.deviceIcon style={{color: config.colors.mainBgColor}} />
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
                    <Svg.deviceIcon
                      style={{color: config.colors.mainBgColor}}
                    />
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
                  marginVertical: 10,
                }}></View>
              <View
                style={{
                  alignItems: 'center',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    ...styles.titleTextStyle,
                    fontSize: 11,
                  }}>
                  {lang.order.visitTime}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  <View style={{marginHorizontal: 5}}>
                    <Text
                      style={{
                        ...styles.subTextStyle,
                        color: '#000',
                      }}>
                      {props.OrderReducer.OrderDetails.date}
                    </Text>
                  </View>
                  <View style={{marginHorizontal: 5}}>
                    <Text
                      style={{
                        ...styles.subTextStyle,
                        color: '#000',
                      }}>
                      {props.OrderReducer.OrderDetails.time_from +
                        ' : ' +
                        props.OrderReducer.OrderDetails.time_to}
                    </Text>
                  </View>
                </View>
              </View>

              {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <FormButton
                                    styleprops={{
                                        maxWidth: '60%'
                                    }}
                                    loadingprop={props.appReducer.loading}
                                    onPress={() => { }}>
                                    {lang.login.title}
                                </FormButton>
                            </View> */}
              {parseInt(props.OrderReducer.OrderDetails.status) === 1 && (
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableOpacity
                    onPress={() => setDeleteVisible(true)}
                    style={{
                      maxWidth: '60%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name={'close'}
                      color={config.colors.mainBgColor}
                    />
                    <Text
                      style={{
                        ...styles.titleTextStyle,
                        fontSize: 12,
                      }}>
                      {lang.order.cancelOrder}
                    </Text>
                  </TouchableOpacity>
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
                              fontSize: 13,
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
                                fontSize: 13,
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
                            fontSize: 13,
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
                          fontSize: 13,
                          color: config.colors.mainBgColor,
                        }}>
                        {props.OrderReducer.OrderDetails.company.name}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <FormButton
                                    onPress={() => props.navigation.navigate('customerService')}
                                    styleprops={{
                                        maxWidth: '60%'
                                    }} >
                                    {lang.drawer.customerService}
                                </FormButton>
                            </View> */}
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
  OrderDetails: data => OrderActions.OrderDetails(data)(dispatch),
  cancelOrder: data => OrderActions.cancelOrder(data)(dispatch),
  setCanceledFalse: () => OrderActions.setCanceledFalse()(dispatch),
  engineerProfile: data => OrderActions.engineerProfile(data)(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
  OtherReducer: state.OtherReducer,
  OrderReducer: state.OrderReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen);
