import React, {useState, useEffect, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {connect} from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
  ScrollView,
  BackHandler,
  Pressable,
  Modal,
  Easing,
  Image,
  Text,
  View,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HeaderComponent} from '../components/core/Header';
import {actions as appActions} from '../modules/app';
import {actions as notificationsActions} from '../modules/notifications';
import {actions as OrderActions} from '../modules/order';
import {actions as VoucherActions} from '../modules/voucher';
import {actions as InvoiceActions} from '../modules/invoice';
import FormButton from '../components/material/FormButton';
import lang from '../localization';
import store from '../features/redux/store';
import common from '../assets/common';
import config from '../assets/config.json';
import * as Svg from '../assets/images';
import LoadingComp from '../components/material/LoadingComp';
import NoDataComp from '../components/material/NoDataComp';
import PushNotification from 'react-native-push-notification';
const {height} = Dimensions.get('screen');

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
  fieldContainer: {
    ...common.fields.fieldContainer,
    flex: 0,
    paddingVertical: 10,
    marginVertical: 10,
  },
  seenNotifications: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  titleTextStyle: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
    color: config.colors.darkGrayColor,
  },
  linkText: {
    ...common.fontstyles,
    fontSize: 13,
    marginHorizontal: 10,
    paddingVertical: 15,
    borderBottomColor: config.colors.lightGrayColor,
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

const NotificationScreen = props => {
  const renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        if (item.read == 0) props.MarkAsRead(item.id);
        var types = [2, 3, 4, 5, 6, 11];
        var types2 = [9, 10];
        var types3 = [21, 22, 23];
        var types4 = [7, 31, 32];
        if (types.includes(parseInt(item.payload.notificationType))) {
          props.OrderDetails({
            id: item.payload.orderID,
            redirectToMainScreen: () =>
              props.navigation.navigate('OrderDetails'),
          });
        } else if (types4.includes(parseInt(item.payload.notificationType))) {
          props.getInvoiceDetails({
            invoice_id: item.payload.invoiceID,
            redirectToMainScreen: () =>
              props.navigation.navigate('ConfirmInvoice'),
          });
        } else if (parseInt(item.payload.notificationType) === 8) {
          props.getVoucherDetails({
            voucher_id: item.payload.voucherId,
            redirectToMainScreen: () =>
              props.navigation.navigate('ConfirmStatement'),
          });
        } else if (types2.includes(parseInt(item.payload.notificationType))) {
          props.getVoucherDetails({
            voucher_id: item.payload.voucherId,
            redirectToMainScreen: () =>
              props.navigation.navigate('ConfirmVoucher'),
          });
        } else if (types3.includes(parseInt(item.payload.notificationType))) {
          // props.getVoucherDetails({ voucher_id: item.payload.voucherId, redirectToMainScreen: () => props.navigation.navigate('ConfirmVoucher') })
          props.OrderDetails({
            id: item.payload.orderID,
            redirectToMainScreen: () =>
              props.navigation.navigate('TransportedDeviceStatus'),
          });
        }
      }}
      style={[
        styles.fieldContainer,
        item.read == 1 ? styles.seenNotifications : null,
      ]}>
      <Image
        style={{
          height: 40,
          width: 40,
          borderRadius: 50,
          borderWidth: 1,
          resizeMode: 'contain',
        }}
        source={{uri: item.img}}
      />
      <Text
        style={{
          ...styles.titleTextStyle,
          fontSize: 11,
          marginHorizontal: 10,
          maxWidth: '80%',
        }}>
        {item.body}
      </Text>
      <Text
        style={{
          ...styles.titleTextStyle,
          fontSize: 11,
          marginHorizontal: 5,
          position: 'absolute',
          bottom: 0,
          end: 0,
        }}>
        {item.created_at}
      </Text>
    </Pressable>
  );
  let translateY = useRef(new Animated.ValueXY()).current;
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
    props.NotificationsReducer.notifications.length > 0 && init();
  }, [props.NotificationsReducer.notifications]);

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
  // useEffect(() => {
  //     props.getAllNotifications();
  // }, [])
  useFocusEffect(
    React.useCallback(() => {
      props.getAllNotifications();
    }, []),
  );
  return (
    <View nestedScrollEnabled={true} style={styles.mainContaier}>
      <View
        style={{
          ...styles.viewStyle,
          backgroundColor: config.colors.maindarkcolor,
        }}>
        <HeaderComponent
          fontColor={'#fff'}
          headerbtn2={() => props.navigation.goBack()}
          toggleDrawer={() => props.navigation.toggleDrawer()}>
          {lang.drawer.notifications}
        </HeaderComponent>
      </View>

      <View style={styles.subitemStyle}>
        {/* <ScrollView style={{ paddingHorizontal: 10 }}> */}
        {/* {!props.appReducer.loading && ( */}
        <View style={{padding: 10, flex: 1}}>
          {props.NotificationsReducer.notifications.length > 0 && (
            <Animated.FlatList
              data={props.NotificationsReducer.notifications}
              renderItem={renderItem}
              // fadeDuration={0}
              keyExtractor={item => item.id}
              style={[{transform: [{translateY: translateY.y}]}]}
            />
          )}
          {props.NotificationsReducer.notifications.length < 1 && (
            <NoDataComp
              navigation={props.navigation}
              NoDataText={lang.addresses.nodata}
            />
          )}
        </View>
        {/* )} */}
        {props.appReducer.loading && (
          // <View style={{ flex: 1 }}>
          <LoadingComp showHeader={false} navigation={props.navigation} />
          // </View>
        )}
        {/* <Pressable onPress={()=>{props.navigation.navigate('ConfirmVoucher')}} style={styles.fieldContainer}>
                        <Image style={{ height: 40, width: 40, borderRadius: 50, borderWidth: 1, resizeMode: 'contain' }} source={require('../assets/logo.png')} />
                        <Text style={{
                            ...styles.titleTextStyle,
                            fontSize: 11,
                            marginHorizontal: 10,
                            maxWidth: '80%'
                        }}>
                            نحتاج تأكيدك لنقل جهاز الديب فريزر الخاص بك إلى
                            مركز الصيانة     نحتاج تأكيدك لنقل جهاز الديب فريزر الخاص بك إلى
                            مركز الصيانة
                            </Text>
                        <Text style={{
                            ...styles.titleTextStyle,
                            fontSize: 11,
                            marginHorizontal: 5,
                            position: 'absolute',
                            bottom: 0,
                            end: 0
                        }}>
                            Receipt
                            </Text>
                    </Pressable>
                    <Pressable  onPress={()=>{props.navigation.navigate('ConfirmInvoice')}} style={[styles.fieldContainer, styles.seenNotifications]}> 
                        <Image style={{ height: 45, width: 45, borderRadius: 50, borderWidth: 1, resizeMode: 'contain' }} source={require('../assets/logo.png')} />
                        <Text style={{
                            ...styles.titleTextStyle,
                            fontSize: 11,
                            marginHorizontal: 10,
                            maxWidth: '80%'
                        }}>
                            نحتاج تأكيدك لنقل جهاز الديب فريزر الخاص بك إلى
                            مركز الصيانة
                            نحتاج تأكيدك لنقل جهاز الديب فريزر الخاص بك إلى
                           مركز الصيانة     </Text>
                        <Text style={{
                            ...styles.titleTextStyle,
                            fontSize: 11,
                            marginHorizontal: 5,
                            position: 'absolute',
                            bottom: 0,
                            end: 0
                        }}>
                            Bill
                            </Text>
                    </Pressable>    
                  <Pressable onPress={()=>{props.navigation.navigate('ConfirmStatement')}} style={styles.fieldContainer}>
                        <Image style={{ height: 40, width: 40, borderRadius: 50, borderWidth: 1, resizeMode: 'contain' }} source={require('../assets/logo.png')} />
                        <Text style={{
                            ...styles.titleTextStyle,
                            fontSize: 11,
                            marginHorizontal: 10,
                            maxWidth: '80%'
                        }}>
                            نحتاج تأكيدك لنقل جهاز الديب فريزر الخاص بك إلى
                            مركز الصيانة     نحتاج تأكيدك لنقل جهاز الديب فريزر الخاص بك إلى
                            مركز الصيانة
                            </Text>
                        <Text style={{
                            ...styles.titleTextStyle,
                            fontSize: 11,
                            marginHorizontal: 5,
                            position: 'absolute',
                            bottom: 0,
                            end: 0
                        }}>
                            Statement
                            </Text>
                    </Pressable>
                   <Pressable  onPress={()=>{props.navigation.navigate('ConfirmFinishingDevice')}} style={[styles.fieldContainer, styles.seenNotifications]}>
                        <Image style={{ height: 45, width: 45, borderRadius: 50, borderWidth: 1, resizeMode: 'contain' }} source={require('../assets/logo.png')} />
                        <Text style={{
                            ...styles.titleTextStyle,
                            fontSize: 11,
                            marginHorizontal: 10,
                            maxWidth: '80%'
                        }}>
                            نحتاج تأكيدك لنقل جهاز الديب فريزر الخاص بك إلى
                            مركز الصيانة
                            نحتاج تأكيدك لنقل جهاز الديب فريزر الخاص بك إلى
                           مركز الصيانة     </Text>
                        <Text style={{
                            ...styles.titleTextStyle,
                            fontSize: 11,
                            marginHorizontal: 5,
                            position: 'absolute',
                            bottom: 0,
                            end: 0
                        }}>
                            FinishedDevices
                            </Text>
                    </Pressable>
                  */}
        {/* </ScrollView> */}
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  OrderDetails: data => OrderActions.OrderDetails(data)(dispatch),
  getVoucherDetails: data => VoucherActions.getVoucherDetails(data)(dispatch),
  getInvoiceDetails: data => InvoiceActions.getInvoiceDetails(data)(dispatch),
  toggleLanguages: data => appActions.toggleLanguages(data)(dispatch),
  getAllNotifications: () =>
    notificationsActions.getAllNotifications()(dispatch),
  MarkAsRead: data => notificationsActions.MarkAsRead(data)(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
  NotificationsReducer: state.NotificationsReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
