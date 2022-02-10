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
import FormButton from '../components/material/FormButton';
import {actions as pagesActions} from '../modules/pages';
import LoadingComp from '../components/material/LoadingComp';
import lang from '../localization';
import store from '../features/redux/store';
import common from '../assets/common';
import config from '../assets/config.json';
import * as Svg from '../assets/images';
import {WebView} from 'react-native-webview';
const styles = StyleSheet.create({
  mainContaier: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  viewStyle: {
    // flex: 1,
    paddingTop: 0,
    // justifyContent: 'center',
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
  subitemsimageStyle: {
    position: 'absolute',
    width: '100%',
    zIndex: 0,
    top: 0,
    right: 0,
    // bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const EngineerProfileScreen = props => {
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState(false);
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
  useEffect(() => {
    props.getTermsConditions();
  }, []);
  return (
    <View nestedScrollEnabled={true} style={styles.mainContaier}>
      <View
        style={{
          ...styles.viewStyle,
          backgroundColor: '#fff',
        }}
        // source={{uri:props.PagesReducer.terms_condations.image}}
      >
        <View style={styles.subitemsimageStyle}>
          <Image
            style={{
              width: '100%',
              height: 170,
              // resizeMode: 'contain'
            }}
            source={{uri: props.PagesReducer.terms_condations.image}}
          />
        </View>
        <ImageBackground
          style={{
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingBottom: 5,
            height: 170,
            backgroundColor: config.colors.maindarkcolor + 'aa',
          }}
          // imageStyle={{resizeMode:'contain'}}
          // source={{uri:props.PagesReducer.app_description.image}}
        >
          <HeaderComponent
            fontColor={'#fff'}
            headerbtn2={() => props.navigation.goBack()}
            toggleDrawer={() => props.navigation.toggleDrawer()}>
            {lang.settings.roles}
          </HeaderComponent>
          <Text
            style={{
              ...common.fontstyles,
              fontFamily: 'Cairo-Regular',
              fontSize: 20,
              color: '#fff',
              margin: 20,
            }}>
            {props.PagesReducer.terms_condations.title}
          </Text>
        </ImageBackground>
      </View>

      <View style={{...styles.subitemStyle, top: -15}}>
        <ScrollView
          style={{paddingHorizontal: 15}}
          contentContainerStyle={{flex: 1}}>
          {/* <View style={{ paddingVertical: 40 }}>

                        <View>
                            <Text style={{ ...styles.titleTextStyle, color: config.colors.mainBgColor, fontSize: 14 }}>
                                1)   Please contact the owner of the site
                               </Text> 
                        </View>
                        <View>
                            <Text style={{ ...styles.titleTextStyle, color: config.colors.mainBgColor, fontSize: 14 }}>
                                1)   Please contact the owner of the site
                               </Text> 
                        </View>
                        <View>
                            <Text style={{ ...styles.titleTextStyle, color: config.colors.mainBgColor, fontSize: 14 }}>
                                1)   Please contact the owner of the site
                               </Text> 
                        </View>
                        <View>
                            <Text style={{ ...styles.titleTextStyle, color: config.colors.mainBgColor, fontSize: 14 }}>
                                1)   Please contact the owner of the site
                               </Text> 
                        </View>
                        <View>
                            <Text style={{ ...styles.titleTextStyle, color: config.colors.mainBgColor, fontSize: 14 }}>
                                1)   Please contact the owner of the site Please contact the owner of the site Please contact the owner of the site Please contact the owner of the site
                               </Text> 
                        </View>
                    </View> */}
          {props.PagesReducer.terms_condations.content != undefined &&
            !props.appReducer.loading && (
              <WebView
                originWhitelist={['*']}
                //    onNavigationStateChange={onNavigationChange($event)}
                source={{
                  html: `<!DOCTYPE html>\n <html><head>
                                         <title>Web View</title>
                                         <meta http-equiv="content-type" content="text/html; charset=utf-8">
                                         <meta name="viewport" content="width=320, user-scalable=no">
                                         <style type="text/css">
                                         body {
                                           margin: 0;
                                           padding: 0;
                                         }
                                       </style>
                                       </head>  <body>${props.PagesReducer.terms_condations.content}</body></html>`,
                }}
                style={{width: '95%', height: 300, marginTop: 20}}
              />
            )}
          {props.appReducer.loading && (
            // <View style={{ flex: 1 }}>
            <LoadingComp showHeader={false} navigation={props.navigation} />
            // </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  getTermsConditions: () => pagesActions.getTermsConditions()(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
  PagesReducer: state.PagesReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EngineerProfileScreen);
