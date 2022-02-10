import React, {useRef, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';
import 'react-native-gesture-handler';
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
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {HeaderComponent} from '../components/core/Header';
import {actions as appActions} from '../modules/app';
import {actions as OthersActions} from '../modules/other';
import {actions as OrderActions} from '../modules/order';
import lang from '../localization';
import store from '../features/redux/store';
import common from '../assets/common';
import config from '../assets/config.json';
// import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import ComplatedComp from '../components/general/orders/ComplatedOrders';
import CurrentComp from '../components/general/orders/CurrentOrders';
import WarrantyComp from '../components/general/orders/WarrantyOrders';
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
    // paddingVertical: 10,
    marginVertical: 10,
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
    fontSize: 9,
    color: config.colors.darkGrayColor,
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
});
const {height} = Dimensions.get('screen');

const OrdersScreen = props => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  // const [routes] = React.useState([
  //     { key: 'first', title: lang.order.currentOrders },
  //     { key: 'second', title: lang.order.oldOrders },
  //     { key: 'third', title: lang.order.warrantyOrders },
  // ]);

  const FirstRoute = () => <CurrentComp navigation={props.navigation} />;

  const SecondRoute = () => <ComplatedComp navigation={props.navigation} />;
  const ThirdRoute = () => <WarrantyComp navigation={props.navigation} />;
  // const renderScene = SceneMap({
  //     first: FirstRoute,
  //     second: SecondRoute,
  //     third: ThirdRoute,
  // });
  // const renderTabBar = props => (
  //     <View style={{ alignItems: 'center' }}>
  //         <TabBar
  //             {...props}
  //             indicatorStyle={{
  //                 backgroundColor: config.colors.mainBgColor, borderTopRightRadius: 20,
  //                 borderTopLeftRadius: 20,
  //             }}
  //             style={{ backgroundColor: 'transparent', width: '90%', elevation: 0 }}
  //             labelStyle={{ ...common.fontstyles, color: config.colors.mainBgColor, }}
  //         />
  //     </View>);

  // useEffect(() => {
  //     const backAction = () => {
  //         props.navigation.goBack()
  //         return true;
  //     };

  //     const backHandler = BackHandler.addEventListener(
  //         'hardwareBackPress',
  //         backAction,
  //     );

  //     return () => backHandler.remove();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      // SetsubLoading(true)
      props.ComplatedOrders();
      props.CurrentOrders();
      props.WarrantyOrders();
      // props.LoadGovernorates().then(respo => {
      //     props.getAllAddresses().then(respo => {
      //         SetsubLoading(false)
      //     });
      // })
    }, []),
  );

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
    init();
  }, [index]);
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
          {lang.order.title}
        </HeaderComponent>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setIndex(0)}
            style={{
              borderBottomColor:
                index == 0 ? config.colors.mainBgColor : 'transparent',
              borderBottomWidth: 2,
              paddingVertical: 10,
              width: '30%',
            }}>
            <Text
              style={{
                color: index == 0 ? '#fff' : '#ffffffcc',
                textAlign: 'center',
              }}>
              {' '}
              {lang.order.currentOrders}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIndex(1)}
            style={{
              borderBottomColor:
                index == 1 ? config.colors.mainBgColor : 'transparent',
              borderBottomWidth: 2,
              paddingVertical: 10,
              width: '30%',
            }}>
            <Text
              style={{
                color: index == 1 ? '#fff' : '#ffffffcc',
                textAlign: 'center',
              }}>
              {' '}
              {lang.order.oldOrders}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIndex(2)}
            style={{
              borderBottomColor:
                index == 2 ? config.colors.mainBgColor : 'transparent',
              borderBottomWidth: 2,
              paddingVertical: 10,
              width: '30%',
            }}>
            <Text
              style={{
                color: index == 2 ? '#fff' : '#ffffffcc',
                textAlign: 'center',
              }}>
              {' '}
              {lang.order.warrantyOrders}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <TabView
                indicatorStyle={{ backgroundColor: 'white' }}
                style={{
                    backgroundColor: config.colors.maindarkcolor,

                }}
                navigationState={{ index, routes }}
                renderTabBar={renderTabBar}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            /> */}
      {/* <View style={styles.subitemStyle}> */}
      {index == 0 && FirstRoute()}
      {index == 1 && SecondRoute()}
      {index == 2 && ThirdRoute()}
      {/* </View> */}
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  LoadGovernorates: () => OthersActions.LoadGovernorates()(dispatch, getState),
  toggleLanguages: data => appActions.toggleLanguages(data)(dispatch),
  CurrentOrders: () => OrderActions.CurrentOrders()(dispatch),
  ComplatedOrders: () => OrderActions.ComplatedOrders()(dispatch),
  WarrantyOrders: () => OrderActions.WarrantyOrders()(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
  OtherReducer: state.OtherReducer,
  AddressReducer: state.AddressReducer,
  OrderReducer: state.OrderReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);
