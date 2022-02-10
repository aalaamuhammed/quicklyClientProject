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
import {Rating, AirbnbRating} from 'react-native-ratings';
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
    fontSize: 15,
    color: config.colors.mainBgColor,
  },
  dateTextStyle: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Bold',
    fontSize: 18,
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
const {height} = Dimensions.get('screen');

const OrderDetailsScreen = props => {
  const labels = [
    lang.order.confirmOrder,
    lang.order.receiveOrder,
    lang.order.onTheWay,
    lang.order.Done,
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
  const [timeVisible, setTimeVisible] = useState(false);
  // useEffect(() => {
  //     SetsubLoading(true)
  //     props.WarrantyOrders().then(respo => {

  //     })

  // }, []);
  const [times, setTimes] = useState([
    {
      id: 1,
      time: '9:11',
      time_from: '09:00',
      time_to: '11:00',
      formate: 'am',
    },
    {
      id: 2,
      time: '11:1',
      time_from: '11:00',
      time_to: '13:00',
      formate: 'pm',
    },
    {
      id: 3,
      time: '3:6',
      time_from: '15:00',
      time_to: '18:00',
      formate: 'pm',
    },
    {
      id: 4,
      time: '6:9',
      time_from: '18:00',
      time_to: '21:00',
      formate: 'pm',
    },
  ]);
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
  const [date, Setdate] = useState(null);
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
    const backAction = () => {
      props.navigation.navigate('Notification');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
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
          {lang.FinisingDevice.title}
        </HeaderComponent>
        <Modal animationType="slide" transparent={true} visible={timeVisible}>
          <View style={styles.mainView}>
            <View style={styles.subView}>
              <View style={styles.closeModel}>
                <Appbar.Action
                  icon={'close'}
                  size={18}
                  style={{margin: 5}}
                  color={config.colors.mainBgColor}
                  onPress={() => setTimeVisible(false)}
                />
              </View>
              <View>
                <View style={common.radio.radioContainer}>
                  <Text style={styles.modalTitleStyles}>
                    {lang.order.SetTime}
                  </Text>

                  {times.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => {
                        Setdate(item.id);
                      }}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          justifyContent: 'center',
                          width: 15,
                          height: 15,
                          backgroundColor:
                            date === item.id
                              ? config.colors.mainBgColor
                              : '#fff',
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: config.colors.mainBgColor,
                        }}>
                        {date === item.id && (
                          <MaterialCommunityIcons
                            name={'check'}
                            color={'#fff'}
                          />
                        )}
                      </View>
                      <Text
                        style={{...styles.subTextStyle, marginHorizontal: 5}}>
                        {item.time_from +
                          '-' +
                          item.time_to +
                          ' ' +
                          item.formate}
                      </Text>
                      {/* <Text style={styles.subTextStyle}>{'dfdsf'}</Text> */}
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                  <FormButton
                    textStyles={{color: '#fff', fontSize: 12}}
                    styleprops={{
                      borderColor: 'transparent',
                      backgroundColor: config.colors.mainBgColor,
                    }}
                    onPress={() => {
                      setTimeVisible(false);
                    }}>
                    {lang.FinisingDevice.select}
                  </FormButton>
                </View>
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
            {!date && (
              <View>
                <Text
                  style={{
                    ...styles.subTextStyle,
                    color: '#fff',
                  }}>
                  {lang.FinisingDevice.TimeNotSet}
                </Text>
              </View>
            )}
            {date && (
              <View>
                <Text
                  style={{
                    ...styles.subTextStyle,
                    color: '#fff',
                  }}>
                  {lang.FinisingDevice.TimeHasBeenSelected}
                </Text>
                <Text style={styles.subTextStyle}>{'date'}</Text>
              </View>
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
            onPress={() => setTimeVisible(true)}
            loadingprop={false}>
            {/* <Svg.Iconlocationon width={12} height={12} style={{color: '#FFF'}} /> */}

            {lang.FinisingDevice.select}
          </FormButton>
        </View>
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
                  fontSize: 18,
                }}>
                {'#312433'}
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
                  {lang.order.WarrantyDetails}
                </Text>
              </View>
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
                    {'item.flat_no'}
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
                    {'item.flat_no'}
                  </Text>
                </View>
              </View>
              <View
                style={{
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
                    {'item.flat_no'}
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
                    {'453'}
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
                    {'4565'}
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
                    {'4565'}
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
                      {'item.'}
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
                      {'item'}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  maxWidth: '40%',
                  borderBottomColor: config.colors.darkGrayColor,
                  borderBottomWidth: 1,
                  marginHorizontal: '30%',
                  marginVertical: 10,
                }}></View>

              <Text
                style={{
                  ...styles.titleTextStyle,
                  fontSize: 11,
                }}>
                {lang.order.FixingExecutorData}
              </Text>
              <View style={{justifyContent: 'center', marginVertical: 5}}>
                <View
                  style={{
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
                      source={require('../assets/logo.png')}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('EngineerProfile', {
                          backPage: 'ConfirmFinishingDevice',
                        })
                      }
                      style={{paddingHorizontal: 10}}>
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
                        مصطفي عادل محمد
                      </Text>

                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Rating
                          readonly
                          fractions={1}
                          startingValue={4}
                          // onFinishRating={this.ratingCompleted}
                          imageSize={15}
                        />
                        <Text
                          style={{
                            ...styles.titleTextStyle,
                            fontSize: 14,
                            color: '#FAC900',
                          }}>
                          +4
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
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
                      source={require('../assets/logo.png')}
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
                        مصطفي عادل محمد
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
                      مصطفي عادل محمد
                    </Text>
                  </View>
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
                  onPress={() => {}}>
                  {lang.btns.Confirm}
                </FormButton>
                <FormButton
                  // icon={'map-marker'}
                  textStyles={{fontSize: 12}}
                  styleprops={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                    maxWidth: '60%',
                  }}
                  onPress={() => {}}>
                  {lang.btns.Cancel}
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
  CurrentOrders: () => OrderActions.WarrantyOrders()(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
  OtherReducer: state.OtherReducer,
  OrderReducer: state.OrderReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen);
