import React, {useState, useEffect} from 'react';

import {connect} from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  ImageBackground,
  Modal,
  Image,
  Text,
  View,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HeaderComponent} from '../components/core/Header';
import {actions as appActions} from '../modules/app';
import {actions as pagesActions} from '../modules/pages';
import FormButton from '../components/material/FormButton';
import lang from '../localization';
import {
  Card,
  DefaultTheme,
  Avatar,
  Badge,
  Appbar,
  Paragraph,
} from 'react-native-paper';
import store from '../features/redux/store';
import common from '../assets/common';
import config from '../assets/config.json';
import * as Svg from '../assets/images';
import LoadingComp from '../components/material/LoadingComp';
import {RadioButton} from 'react-native-paper';
import {WebView} from 'react-native-webview';
const PaymentPageScreen = props => {
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
  useEffect(() => {}, []);
  return (
    <View nestedScrollEnabled={true}>
      <WebView
        originWhitelist={['*']}
        //    onNavigationStateChange={onNavigationChange($event)}
        source={{
          html: '',
        }}
        style={{width: '95%', height: '100%'}}
      />
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPageScreen);
