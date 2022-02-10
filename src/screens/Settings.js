import React, {useState, useEffect} from 'react';

import {connect} from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Modal,
  Text,
  View,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HeaderComponent} from '../components/core/Header';
import {actions as appActions} from '../modules/app';
import FormButton from '../components/material/FormButton';
import lang from '../localization';
import {Card, Avatar, Appbar, Paragraph} from 'react-native-paper';
import store from '../features/redux/store';
import common from '../assets/common';
import config from '../assets/config.json';
import * as Svg from '../assets/images';
import {RadioButton} from 'react-native-paper';
const Languages = [
  {
    key: 'ar',
    text: 'عربي',
  },
  {
    key: 'en',
    text: 'En',
  },
];

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
const SettingsScreen = props => {
  const Links = [
    {
      key: 1,
      link: () => props.navigation.navigate('Addresses'),
      text: lang.settings.addresses,
      icon: <Svg.Iconlocationon width={13} style={styles.IconStyle} />,
    },
    {
      key: 2,
      link: () => props.navigation.navigate('CreditCards'),
      text: lang.settings.creditCards,
      icon: <Svg.Iconcreditcard width={13} style={styles.IconStyle} />,
    },
    {
      key: 3,
      link: () => props.navigation.navigate('ChangePassword'),
      text: lang.settings.changePassword,
      icon: <Svg.Lockpass width={13} style={styles.IconStyle} />,
    },
    {
      key: 4,
      link: () => props.navigation.navigate('Roles'),
      text: lang.settings.roles,
      icon: <Svg.Roles width={13} style={styles.IconStyle} />,
    },
    {
      key: 5,
      link: () => props.navigation.navigate('AboutQuickly'),
      text: lang.settings.aboutus,
      icon: <Svg.Iconinfocircle width={13} style={styles.IconStyle} />,
    },
    {
      key: 6,
      link: () => props.navigation.navigate('HowToUseDetails'),
      text: lang.settings.explainapp,
      icon: <Svg.Expainapp width={13} style={styles.IconStyle} />,
    },
  ];
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState(false);
  // useEffect(() => {
  //   const backAction = () => {
  //     props.navigation.goBack()
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);
  return (
    <View nestedScrollEnabled={true} style={styles.mainContaier}>
      <View
        style={{
          ...styles.viewStyle,
          backgroundColor: config.colors.maindarkcolor,
        }}>
        <HeaderComponent
          fontColor={'#fff'}
          toggleDrawer={() => props.navigation.toggleDrawer()}>
          {lang.settings.title}
        </HeaderComponent>
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
            <Text style={styles.modalTitleStyles}>
              {lang.settings.changeLang}
            </Text>
            <Text style={styles.modalSubTitleStyles}>
              {lang.settings.changeLangMessage}
            </Text>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <FormButton
                textStyles={{color: '#fff', fontSize: 12}}
                styleprops={{
                  borderColor: 'transparent',
                  backgroundColor: config.colors.mainBgColor,
                }}
                onPress={() => {
                  props.toggleLanguages(language);
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

      <View style={styles.languageStyle}>
        <Text style={{...styles.changeLanguageText, textAlign: 'center'}}>
          {lang.settings.changeLang}
        </Text>
        <View
          style={{
            ...styles.languageStyle,
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: 'flex-end',
            paddingHorizontal: 0,
            backgroundColor: '#fff',
            flex: 0,
          }}>
          {Languages.map(item => {
            return (
              <View
                key={item.key}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderRadius: 5,
                }}>
                <TouchableOpacity
                  style={
                    props.appReducer.language === item.key
                      ? styles.checked
                      : styles.unchecked
                  }
                  onPress={() => {
                    if (props.appReducer.language !== item.key) {
                      setLanguage(item.key);
                      setVisible(true);
                    }
                  }}>
                  <Text
                    style={{
                      ...common.fontstyles,
                      fontSize: 13,
                      fontFamily: common.BoldFontFamily,
                      color:
                        props.appReducer.language === item.key
                          ? '#fff'
                          : config.colors.maindarkcolor,
                    }}>
                    {item.text}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.subitemStyle}>
        <ScrollView>
          {Links.map(item => {
            return (
              <TouchableOpacity
                key={item.key}
                style={{
                  flex: 1,
                  marginHorizontal: 15,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={item.link}>
                {item.icon}
                <Text style={styles.linkText}> {item.text} </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View
          style={{
            bottom: 10,
            start: 0,
            end: 0,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            flexDirection: 'column-reverse',
          }}>
          <Text style={styles.linkText}>{lang.settings.generalElectric}</Text>
        </View>
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  toggleLanguages: data => appActions.toggleLanguages(data)(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
