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
  Easing,
  Text,
  View,
  Pressable,
  Modal,
  findNodeHandle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FormButton from '../components/material/FormButton';
import {HeaderComponent} from '../components/core/Header';
import DropdownModal from '../components/material/DropdownModal';
import {actions as appActions} from '../modules/app';
import {actions as OthersActions} from '../modules/other';
import {actions as OrderActions} from '../modules/order';
import {actions as AddressActions} from '../modules/address';
import lang from '../localization';
import store from '../features/redux/store';
import common from '../assets/common';
import {cities, governorate} from '../localization/citiesandlocations';
import config from '../assets/config.json';
import * as Svg from '../assets/images';
import {Card} from 'react-native-paper';
import NoDataComp from '../components/material/NoDataComp';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LoadingComp from '../components/material/LoadingComp';
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
  fieldContainer: {
    ...common.fields.fieldContainer,
    paddingVertical: 10,
    marginVertical: 10,
  },
  textStyle: {
    ...common.fontstyles,
    fontSize: 12,
  },
  valueStyle: {
    ...common.fontstyles,
    fontSize: 12,
    paddingVertical: 3,
    width: 40,
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
    color: config.colors.mainBgColor,
    ...common.fontstyles,
    textAlign: 'center',
    fontSize: 16,
    margin: 20,
  },
  titleTextStyle: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Bold',
    fontSize: 11,
    color: config.colors.mainBgColor,
  },
  subTextStyle: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
    color: config.colors.darkGrayColor,
  },
  dateTextStyle: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Bold',
    fontSize: 16,
    color: config.colors.lightGrayColor,
  },
});
const {height} = Dimensions.get('screen');

const TransportedDevicesScreen = props => {
  const getlocation = (gov, city) => {
    var currentgov = props.OtherReducer.governorates.find(s => s.id === gov);
    var currentcity = currentgov.cities.find(s => s.id === city);
    return lang.lang === 'ar'
      ? currentgov.name + ',' + currentcity.name
      : currentgov.name_en + ',' + currentcity.name_en;
  };
  // useEffect(() => {
  //     const backAction = () => {
  //         props.navigation.goBack();
  //         return true;
  //     };

  //     const backHandler = BackHandler.addEventListener(
  //         'hardwareBackPress',
  //         backAction,
  //     );

  //     return () => backHandler.remove();
  // }, []);

  useEffect(() => {
    SetsubLoading(true);
    props.LoadGovernorates().then(respo => {
      props.ShippedOrders().then(respo => {
        SetsubLoading(false);
      });
    });
  }, []);

  const renderItem = ({item}) => (
    <Pressable
      style={styles.fieldContainer}
      onPress={() => {
        props.OrderDetails({
          id: item.id,
          redirectToMainScreen: () =>
            props.navigation.navigate('TransportedDeviceStatus'),
        });
      }}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            maxWidth: '35%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <Text
            style={{
              ...styles.dateTextStyle,

              textAlignVertical: 'center',
              textAlign: 'center',
              // lineHeight:25,
              padding: 0,
              margin: 0,
            }}>
            {item.date}
          </Text>
          {/* <Text
                        style={{
                            ...styles.dateTextStyle,

                            textAlignVertical: 'center',
                            textAlign: 'center',
                            // lineHeight:25,
                            padding: 0,
                            margin: 0
                        }}>
                        {'Day'}
                    </Text> */}
        </View>

        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingTop: 10, flex: 1}}>
              <Text
                style={{
                  ...styles.titleTextStyle,
                  color: config.colors.mainBgColor,
                  paddingBottom: 5,
                }}>
                {lang.order.orderNo + ' ' + item.order_serial_no}{' '}
              </Text>
            </View>
          </View>
          <Text
            style={{
              ...styles.titleTextStyle,
              color: config.colors.darkGrayColor,
              paddingBottom: 5,
            }}>
            {item.order_location.governorate.name +
              ' ' +
              item.order_location.city.name}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  ...styles.titleTextStyle,
                  color: config.colors.darkGrayColor,
                  paddingBottom: 10,
                }}>
                {lang.itemReport.deviceBrand + ' : '}
              </Text>
              <Text
                style={{
                  ...styles.titleTextStyle,
                  color: config.colors.mainBgColor,
                  paddingBottom: 10,
                }}>
                {item.device_brand.name}
              </Text>
            </View>
            {/* <View style={{ flex: 1, flexDirection: 'row', alignItems:'center' }}>
                        <Text
                            style={{
                                ...styles.titleTextStyle,
                                color: config.colors.darkGrayColor,
                                paddingBottom: 10,
                            }}>
                             {lang.order.visitTime+" : "  }
                        </Text>
                        <Text
                            style={{
                                ...styles.titleTextStyle,
                                    color: config.colors.mainBgColor,
                                paddingBottom: 10,
                            }}>
                            {item.time_from+' '+item.time_to}
                        </Text>
                    </View> */}
          </View>
        </View>
      </View>
    </Pressable>
  );
  let translateY = useRef(new Animated.ValueXY()).current;
  const [subLoading, SetsubLoading] = useState(false);
  const [Visible, SetVisable] = useState(false);
  const [currentId, SetCurrentId] = useState(null);
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
    props.OrderReducer.ShippedDevices.length > 0 && init();
  }, [props.OrderReducer.ShippedDevices]);

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
          {lang.drawer.devices}
        </HeaderComponent>
      </View>
      <View style={styles.subitemStyle}>
        {/* {!props.appReducer.loading && !subLoading && ( */}
        <View style={{padding: 10, flex: 1}}>
          {props.OrderReducer.ShippedDevices.length > 0 && (
            <Animated.FlatList
              data={props.OrderReducer.ShippedDevices}
              renderItem={renderItem}
              // fadeDuration={0}
              keyExtractor={item => item.id}
              style={[{transform: [{translateY: translateY.y}]}]}
            />
          )}
          {props.OrderReducer.ShippedDevices.length < 1 && (
            <NoDataComp
              navigation={props.navigation}
              NoDataText={lang.addresses.nodata}
            />
          )}
        </View>
        {/* )} */}
        {props.appReducer.loading && (
          <LoadingComp showHeader={false} navigation={props.navigation} />
        )}
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  getOneAddress: data => AddressActions.getOneAddress(data)(dispatch, getState),
  ShippedOrders: () => OrderActions.ShippedOrders()(dispatch),
  OrderDetails: data => OrderActions.OrderDetails(data)(dispatch),
  LoadGovernorates: () => OthersActions.LoadGovernorates()(dispatch, getState),
  toggleLanguages: data => appActions.toggleLanguages(data)(dispatch),
  deleteAddress: data => AddressActions.deleteAddress(data)(dispatch),
  getAllAddresses: () => AddressActions.getAllAddresses()(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
  OrderReducer: state.OrderReducer,
  OtherReducer: state.OtherReducer,
  AddressReducer: state.AddressReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransportedDevicesScreen);
