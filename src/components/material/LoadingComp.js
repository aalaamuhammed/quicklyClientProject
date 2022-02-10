import React from 'react';
import {TouchableOpacity,ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import config from '../../assets/config.json';
import common from '../../assets/common';
import LoadingImg from '../../assets/images/loadingImg';
import {HeaderComponent} from '../core/Header';
import lang from '../../localization';
const styles = StyleSheet.create({
  loading: {
    position: 'absolute',

    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  LoadingText: {
    padding: 10,
    color: config.colors.darkGrayColor,
    fontFamily: 'Cairo-Regular',
  },
  viewStyle: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const LoadingComp = props => (
  <View
    style={{
      ...styles.loading,
      backgroundColor: !props.showHeader ?'#ffffffcc': '#ffffffff',
      borderTopRightRadius: !props.showHeader ? 20 : 0,
      borderTopLeftRadius: !props.showHeader ? 20 : 0,
    }}>
    {/* {props.showHeader && (
      <HeaderComponent
        toggleDrawer={() => props.navigation.toggleDrawer()}
        fontColor={config.colors.mainBgColor}>
         
        {lang.home.title}
      </HeaderComponent>
    )} */}

    <View style={styles.viewStyle}>
      <LoadingImg />
 {/* <ActivityIndicator size="large" color={config.colors.mainBgColor}/> */}
      <Text style={styles.LoadingText}>{lang.home.loading}</Text>
    </View>
  </View>
);

const mapStateToProps = state => ({
  appReducer: state.appReducer,
});
export default connect(mapStateToProps, null)(LoadingComp);
