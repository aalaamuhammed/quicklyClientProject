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
  useWindowDimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {actions as OrderActions} from '../../../modules/order';
import lang from '../../../localization';
import store from '../../../features/redux/store';
import common from '../../../assets/common';
import config from '../../../assets/config.json';
import * as Svg from '../../../assets/images';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {Card} from 'react-native-paper';
import NoDataComp from '../../material/NoDataComp';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LoadingComp from '../../material/LoadingComp';
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
});
const {height} = Dimensions.get('screen');

const ComplatedComp = props => {
  // useEffect(() => {
  //     SetsubLoading(true)
  //     props.ComplatedOrders().then(respo => {

  //     })

  // }, []);

  const renderItem = ({item}) => (
    <Pressable
      style={styles.fieldContainer}
      onPress={() => {
        props.OrderDetails({
          id: item.id,
          redirectToMainScreen: () => props.navigation.navigate('OrderDetails'),
        });
      }}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            maxWidth: '30%',
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
        </View>

        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingTop: 10, flex: 1}}>
              <Text
                style={{
                  ...styles.titleTextStyle,
                  color: config.colors.mainBgColor,
                }}>
                {lang.order.orderNo + ' ' + item.order_serial_no}{' '}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                top: 10,
                end: 3,
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: 50,
              }}>
              <Text
                style={{
                  ...styles.subTextStyle,
                  fontSize: 6,
                  textAlign: 'center',
                }}>
                {lang.order.orderStatus}{' '}
              </Text>
              <Text
                style={{
                  ...styles.titleTextStyle,
                  fontSize: 8,
                  textAlign: 'center',
                  color: config.colors.mainBgColor,
                }}>
                {lang.order[item.status]}{' '}
              </Text>
            </View>
          </View>
          <Text
            style={{
              ...styles.subTextStyle,
              paddingBottom: 10,
              maxWidth: '70%',
            }}>
            {item.complaint.length > 50
              ? item.complaint.substring(0, 60) + '...'
              : item.complaint}
          </Text>
        </View>
      </View>
    </Pressable>
  );
  let translateY = useRef(new Animated.ValueXY()).current;
  const [subLoading, setSubLoading] = useState(false);
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
    props.OrderReducer.ComplatedOrders.length > 0 && init();
  }, [props.OrderReducer.ComplatedOrders]);
  return (
    <View style={styles.subitemStyle}>
      {/* {!props.appReducer.loading &&( */}
      <View style={{padding: 10, flex: 1}}>
        {props.OrderReducer.ComplatedOrders.length > 0 && (
          <Animated.FlatList
            data={props.OrderReducer.ComplatedOrders}
            renderItem={renderItem}
            // fadeDuration={0}
            keyExtractor={item => item.id}
            style={[{transform: [{translateY: translateY.y}]}]}
          />
        )}
        {props.OrderReducer.ComplatedOrders.length < 1 && (
          <NoDataComp NoDataText={lang.order.nocompleteddata} />
        )}
      </View>
      {/* )} */}
      {props.appReducer.loading && (
        // <View style={{ flex: 1 }}>
        <LoadingComp
          showHeader={false}
          navigation={props.navigation}
          pageTitle={lang.home.title}
        />
        // </View>
      )}
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  OrderDetails: data => OrderActions.OrderDetails(data)(dispatch),
  ComplatedOrders: () => OrderActions.ComplatedOrders()(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
  OtherReducer: state.OtherReducer,
  OrderReducer: state.OrderReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(ComplatedComp);
