import React, {useRef, useEffect, useState} from 'react';

import {connect} from 'react-redux';
import {
  StyleSheet,
  Animated,
  FlatList,
  BackHandler,
  I18nManager,
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
import ComplatedComp from '../components/general/orders/ComplatedOrders';
import CurrentComp from '../components/general/orders/CurrentOrders';
import WarrantyComp from '../components/general/orders/WarrantyOrders';
import StepIndicator from 'react-native-step-indicator';
const styles = StyleSheet.create({
  HeaderStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: -10,
    zIndex: 99,
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
    fontSize: 10,
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
});
const {height} = Dimensions.get('screen');

const TransportedDeviceStatusScreen = props => {
  const labels = [
    lang.TransportedDeviceStatus.confirmTransportation,
    lang.TransportedDeviceStatus.doingRepair,
    lang.TransportedDeviceStatus.onTheWay,
    lang.TransportedDeviceStatus.received,
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

  const [currentPosition, SetcurrentPosition] = useState(2);
  const [showlable, SetShowLabel] = useState(true);
  const [deleteVisible, setDeleteVisible] = useState(false);
  // useEffect(() => {
  //     SetsubLoading(true)
  //     props.WarrantyOrders().then(respo => {

  //     })

  // }, []);

  // let currentPosition = useRef(0).current;
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
  useEffect(() => {
    var shippedDevices = [20, 21, 22, 23];

    if (
      shippedDevices.includes(parseInt(props.OrderReducer.OrderDetails.status))
    ) {
      // setCountSteps(4)
      if (props.OrderReducer.OrderDetails.status === '20') {
        SetcurrentPosition(0);
      } else if (props.OrderReducer.OrderDetails.status === '21') {
        SetcurrentPosition(1);
      } else if (props.OrderReducer.OrderDetails.status === '22') {
        SetcurrentPosition(2);
      } else if (props.OrderReducer.OrderDetails.status === '23') {
        SetcurrentPosition(3);
      }
    }
  }, [props.OrderReducer.OrderDetails]);
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
          {lang.TransportedDeviceStatus.title}
        </HeaderComponent>
        <StepIndicator
          customStyles={customStyles}
          stepCount={4}
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
              width: 100,
              height: 100,
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
                  fontSize: 18,
                }}>
                {props.OrderReducer.OrderDetails.order_serial_no}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.HeaderStyles}>
          <Text
            style={{
              ...styles.titleTextStyle,
            }}>
            {props.OrderReducer.OrderDetails.created_at}
          </Text>
          {parseInt(props.OrderReducer.OrderDetails.status) != 10 &&
            props.OrderReducer.OrderDetails.complains.length > 0 && (
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
          {parseInt(props.OrderReducer.OrderDetails.status) != 10 &&
            props.OrderReducer.OrderDetails.complains.length < 1 && (
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
        </View>
        {!props.appReducer.loading && (
          <ScrollView
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{marginVertical: 15}}>
            <View style={{padding: 10, flex: 1}}>
              <Text
                style={{
                  ...styles.titleTextStyle,
                  fontSize: 11,
                }}>
                {lang.order.problemDetails}
              </Text>
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
                      style={{color: config.colors.mainBgColor, width: 10}}
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
                      {props.OrderReducer.OrderDetails.device.name}
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
                      style={{color: config.colors.mainBgColor, width: 10}}
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
                      {props.OrderReducer.OrderDetails.device_brand.name}
                    </Text>
                  </View>
                </View>
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
                    color: '#000',
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {props.OrderReducer.OrderDetails.status == '22' && (
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
                      onPress={() =>
                        props.receiveDevice(props.OrderReducer.OrderDetails.id)
                      }>
                      {lang.TransportedDeviceStatus.receive}
                    </FormButton>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        )}
        {props.appReducer.loading && (
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
  CurrentOrders: () => OrderActions.WarrantyOrders()(dispatch),
  engineerProfile: data => OrderActions.engineerProfile(data)(dispatch),
  receiveDevice: data => OrderActions.receiveDevice(data)(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
  OtherReducer: state.OtherReducer,
  OrderReducer: state.OrderReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransportedDeviceStatusScreen);
