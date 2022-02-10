import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import React, {useState} from 'react';
import HomeScreen from '../screens/Home';
import MainScreen from '../screens/Main';
import {
  I18nManager,
  Image,
  Text,
  Modal,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  View,
} from 'react-native';
import SettingStack from './SettingStack';
import CustomerServiceStack from './CustomerServiceStack';
import PricingRequestScreen from '../screens/PricingRequest';
import LoadingComp from '../components/material/LoadingComp';
import ReloadComp from '../components/material/reloadComp';
import TransportedDevicesScreen from '../screens/TransportedDevices';
import NewsStack from './NewsStack';
import ShippedDevicesStack from './ShippedDevicesStack';

import config from '../assets/config.json';
import common from '../assets/common';
import * as svgs from '../assets/images';
import {Appbar} from 'react-native-paper';
import lang from '../localization';
import {actions as authActions} from '../modules/auth';
import store from '../features/redux/store';
import {connect} from 'react-redux';
import FormButton from '../components/material/FormButton';

const Drawer = createDrawerNavigator();
const styles = StyleSheet.create({
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
const CustomDrawerContent = props => {
  const [visible, setVisible] = useState(false);

  return (
    <DrawerContentScrollView {...props} style={{flex: 1}}>
      <View style={{position: 'absolute', start: 0}}>
        <Appbar.Action
          icon={'close'}
          color={'#fff'}
          onPress={() => {
            props.navigation.closeDrawer();
          }}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <Image source={require('../assets/DarkLogo.png')} style={{  height:300 ,width:120}}></Image> */}
        <svgs.DarkLogo style={{margin: 20}} width={120} height={120} />
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
            <Text style={styles.modalTitleStyles}>{lang.drawer.logout}</Text>
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
                  props.onPressLogout();

                  props.navigation.closeDrawer();
                  props.navigation.navigate('Register');
                }}>
                {lang.btns.Ok}
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

      <DrawerItemList {...props} />
      <DrawerItem
        onPress={() => {
          setVisible(true);
        }}
        label={({focused, color}) => (
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              marginHorizontal: 0,
              marginVertical: 0,
            }}>
            <svgs.Logout
              width={13}
              height={13}
              style={
                !I18nManager.isRTL ? {transform: [{rotate: '180deg'}]} : null
              }
              color={'#fff'}
            />
            <Text
              style={{
                marginHorizontal: 10,
                fontFamily: 'Cairo-Regular',
                fontSize: 12,
                color: '#fff',
              }}>
              {lang.drawer.logout}
            </Text>
          </View>
        )}
      />
      <View
        style={{
          marginVertical: 20,
          bottom: 1,
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: 15,
          // backgroundColor:config.colors.mainBgColor,
        }}>
        <Text style={{color: '#fff', fontSize: 14}}>Version 1</Text>
      </View>
    </DrawerContentScrollView>
  );
};
const DrawerRoute = props => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={propss => (
      <CustomDrawerContent
        {...propss}
        onPressLogout={() => props.unloadUser()}
      />
    )}
    drawerPosition={I18nManager.isRTL ? 'left' : 'right'}
    drawerContentOptions={{
      activeTintColor: config.colors.mainBgColor,
      activeBackgroundColor: 'transparent',
      itemStyle: {marginVertical: 0, paddingVertical: 0, marginHorizontal: 0},
      inactiveTintColor: '#fff',
      inactiveBackgroundColor: 'transparent',

      labelStyle: {
        margin: 0,
      },
    }}
    drawerStyle={{
      backgroundColor: config.colors.maindarkcolor,
      width: 240,
    }}>
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{
        drawerLabel: ({focused, color}) => (
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <svgs.Home width={13} height={13} color={color} />
            <Text
              style={{
                marginHorizontal: 10,
                fontFamily: 'Cairo-Regular',
                fontSize: 12,
                color: color,
              }}>
              {lang.drawer.home}
            </Text>
          </View>
        ),
      }}
    />
    {/* <Drawer.Screen
      name="Orders"
      component={NavOrderScreen}
      options={{
        drawerLabel: ({focused, color}) => (
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <svgs.Legal
              width={13}
              height={13}
              //style={{ transform: [{ rotate: '180deg'}]}}
              color={color}
            />
            <Text
              style={{
                marginHorizontal: 10,
                fontSize: 12,
                fontFamily: 'Cairo-Regular',
                color: color,
              }}>
              {lang.drawer.orders}
            </Text>
          </View>
        ),
      }}
    /> */}
    <Drawer.Screen
      name="pricing"
      component={PricingRequestScreen}
      options={{
        drawerLabel: ({focused, color}) => (
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <svgs.PriceTag
              width={13}
              height={13}
              //style={{ transform: [{ rotate: '180deg'}]}}
              color={color}
            />
            <Text
              style={{
                marginHorizontal: 10,
                fontFamily: 'Cairo-Regular',
                fontSize: 12,
                color: color,
              }}>
              {lang.drawer.pricingRequest}
            </Text>
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="TransportedDevices"
      component={ShippedDevicesStack}
      options={{
        drawerLabel: ({focused, color}) => (
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <svgs.PplCarry
              width={13}
              height={13}
              //style={{ transform: [{ rotate: '180deg'}]}}
              color={color}
            />
            <Text
              style={{
                marginHorizontal: 10,
                fontFamily: 'Cairo-Regular',
                fontSize: 12,
                color: color,
              }}>
              {lang.drawer.devices}
            </Text>
          </View>
        ),
      }}
    />
    {/* <Drawer.Screen
      name="Notification"
      component={NavNotiScreen}
      options={{
        drawerLabel: ({focused, color}) => (
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <svgs.Notifications
              width={13}
              height={13}
              //style={{ transform: [{ rotate: '180deg'}]}}
              color={color}
            />
            <Text
              style={{
                marginHorizontal: 10,
                fontFamily: 'Cairo-Regular',
                fontSize: 12,
                color: color,
              }}>
              {lang.drawer.notifications}
            </Text>
           {props.NotificationsReducer.newNotfication && <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 5,
                backgroundColor: config.colors.mainBgColor,
              }}
            />}
          </View>
        ),
      }}
    /> */}
    <Drawer.Screen
      name="customerService"
      component={CustomerServiceStack}
      options={{
        drawerLabel: ({focused, color}) => (
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <svgs.Support
              width={13}
              height={13}
              //style={{ transform: [{ rotate: '180deg'}]}}
              color={color}
            />
            <Text
              style={{
                marginHorizontal: 10,
                fontFamily: 'Cairo-Regular',
                fontSize: 12,
                color: color,
              }}>
              {lang.drawer.customerService}
            </Text>
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="NewsStack"
      component={NewsStack}
      options={{
        drawerLabel: ({focused, color}) => (
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <svgs.Support
              width={13}
              height={13}
              //style={{ transform: [{ rotate: '180deg'}]}}
              color={color}
            />
            <Text
              style={{
                marginHorizontal: 10,
                fontFamily: 'Cairo-Regular',
                fontSize: 12,
                color: color,
              }}>
              {lang.drawer.news}
            </Text>
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="Settings"
      component={SettingStack}
      options={{
        drawerLabel: ({focused, color}) => (
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <svgs.Settings
              width={13}
              height={13}
              //style={{ transform: [{ rotate: '180deg'}]}}
              color={color}
            />
            <Text
              style={{
                marginHorizontal: 10,
                fontFamily: 'Cairo-Regular',
                fontSize: 12,
                color: color,
              }}>
              {lang.drawer.settings}
            </Text>
          </View>
        ),
      }}
    />
    {/* <Drawer.Screen
      name="logout"
      component={SettingsScreen}
      options={{
        drawerLabel: ({focused, color}) => (
          <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 5}}>
            <svgs.Logout
             width={15}
             height={15}
              style={!I18nManager.isRTL?{ transform: [{ rotate: '180deg'}]}:null}
              color={color}
            />
            <Text
              style={{
                marginHorizontal: 10,
                fontFamily: 'Cairo-Regular',
                fontSize:13,
                color: color,
              }}>
             {lang.drawer.logout}
            </Text>
          </View>
        ),
      }}
    /> */}
  </Drawer.Navigator>
);

const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  unloadUser: () => authActions.unloadUser()(dispatch, getState),
});
const mapStateToProps = state => ({
  authReducer: state.authReducer,
  NotificationsReducer: state.NotificationsReducer,
});
export default connect(mapStateToProps, mapDispatchToProps)(DrawerRoute);
