import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import config from '../../assets/config.json';
import common from '../../assets/common';
import LoadingImg from '../../assets/images/loadingImg';
import ReloadImg from '../../assets/images/reloadImg';
import Redoalt from '../../assets/images/redoalt';
import {HeaderComponent} from '../core/Header';
import lang from '../../localization';
const styles = StyleSheet.create({
  loading: {
    position: 'absolute',

    backgroundColor: '#fff',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  LoadingText: {
    padding: 5,
    color: config.colors.darkGrayColor,
  },
  viewStyle: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const ReloadComp = props => (
  <View style={styles.loading}>
    <HeaderComponent fontColor={config.colors.mainBgColor} toggleDrawer={()=>props.navigation.toggleDrawer()} >
      {lang.home.title}
    </HeaderComponent>
    <View style={styles.viewStyle}>
    <ReloadImg heigth={150} style={{margin:20}}  />
            <Text style={{...styles.LoadingText,fontSize:15}}>{lang.home.noInternet}</Text>
            <Text  style={{...styles.LoadingText,fontSize:10}}>{lang.home.TryAgain}</Text>
           <TouchableOpacity>
            <Redoalt style={{margin:10,color:config.colors.darkGrayColor,}} width={25} onPress={props.recheck}/>
           </TouchableOpacity>
    </View> 
    {/* <View style={styles.viewStyle}>
      <LoadingImg />
      <Text style={styles.LoadingText}>{props.pageTitle}</Text>
    </View> */}
  </View>
);

const mapStateToProps = state => ({
  appReducer: state.appReducer,
});
export default connect(mapStateToProps, null)(ReloadComp);
