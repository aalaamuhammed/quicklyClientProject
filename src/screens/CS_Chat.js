import React, {useState, useEffect, useRef} from 'react';

import {connect} from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Modal,
  Text,
  View,
  I18nManager,
  Alert,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HeaderComponent} from '../components/core/Header';
import {actions as appActions} from '../modules/app';
import FormButton from '../components/material/FormButton';
import lang from '../localization';
import {Card, Avatar, Appbar, Paragraph} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
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
    alignItems: 'center',
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
    marginVertical: 0,
    paddingVertical: 0,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    flex: 1,
    // fontFamily: common.BoldFontFamily,
    color: config.colors.darkGrayColor,
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
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    // borderRadius: 20,
    padding: 5,
    marginHorizontal: 5,
    marginVertical: 20,
    paddingVertical: 20,
    borderRadius: 15,
    shadowColor: '#455B63',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 16,
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
    top: -20,

    borderRadius: 50,
  },
  SentChat: {
    display: 'flex',
    maxWidth: '90%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  subTextStyle: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Bold',

    color: config.colors.mainBgColor,
    marginHorizontal: 4,
    color: '#fff',
    fontSize: 12,
  },
});
const company = [
  {
    key: 'Quickly',
    text: lang.makeComplaint.Quickly,
  },
  {
    key: 'ExecutorCompany',
    text: lang.makeComplaint.ExecutorCompany,
  },
  {
    key: 'Engeneer',
    text: lang.makeComplaint.Engineer,
  },
];
const ChatScreen = props => {
  const scrollViewRef = useRef();
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: {errors},
    setError,
  } = useForm();
  const onSubmit = data => {
    props.ChangePassword(data);
  };
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
      link: () => props.navigation.navigate('ForgotPassword'),
      text: lang.settings.roles,
      icon: <Svg.Roles width={13} style={styles.IconStyle} />,
    },
    {
      key: 5,
      link: () => props.navigation.navigate('ForgotPassword'),
      text: lang.settings.aboutus,
      icon: <Svg.Iconinfocircle width={13} style={styles.IconStyle} />,
    },
    {
      key: 6,
      link: () => props.navigation.navigate('ForgotPassword'),
      text: lang.settings.explainapp,
      icon: <Svg.Expainapp width={13} style={styles.IconStyle} />,
    },
  ];
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
  return (
    <View nestedScrollEnabled={true} style={styles.mainContaier}>
      <View
        style={{
          ...styles.viewStyle,
          backgroundColor: config.colors.maindarkcolor,
        }}>
        <HeaderComponent
          fontColor={'#fff'}
          headerbtn2={() => props.navigation.goBack()}>
          {lang.customerService.title}
        </HeaderComponent>
        <Text
          style={{
            ...common.fontstyles,
            fontFamily: 'Cairo-Regular',
            fontSize: 20,
            color: '#fff',
            marginHorizontal: 20,
          }}>
          Quickly
        </Text>
      </View>

      <View style={styles.subitemStyle}>
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'column-reverse',
              padding: 5,
            }}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: true})
            }>
            <View
              style={{
                flexDirection: !I18nManager.isRTL ? 'row-reverse' : 'row',
              }}>
              <View
                style={{
                  ...styles.SentChat,
                  backgroundColor: config.colors.maindarkcolor,
                }}>
                <Text
                  style={{
                    ...styles.subTextStyle,
                  }}>
                  السلام عليكم ورحمةاللهوبركاته كنت عاوز استفسر عن حاجة ضرورية
                  بخصوص الد
                </Text>

                <View
                  style={[
                    {marginHorizontal: 5, ...styles.closeModel},
                    !I18nManager.isRTL ? {right: -10} : {left: -10},
                  ]}>
                  <Avatar.Image
                    size={35}
                    source={require('../assets/Shutterstock-1431420185-940054.png')}
                    style={{resizeMode: 'contain', backgroundColor: '#fff'}}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
              }}>
              <View
                style={{
                  ...styles.SentChat,
                  backgroundColor: config.colors.mainBgColor,
                }}>
                <Text
                  style={{
                    ...styles.subTextStyle,
                  }}>
                  وعليكم السلام ورحمةالله تحت امرك يا فندم , قول استفسار حضرتك
                  وهنجاوبك عليه اكيد ان شا الله
                </Text>

                <View
                  style={[
                    {marginHorizontal: 5, ...styles.closeModel},
                    I18nManager.isRTL ? {right: -10} : {left: -10},
                  ]}>
                  <Avatar.Image
                    size={35}
                    source={require('../assets/Shutterstock-1431420185-940054.png')}
                    style={{resizeMode: 'contain', backgroundColor: '#fff'}}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
              }}>
              <View
                style={{
                  ...styles.SentChat,
                  backgroundColor: config.colors.mainBgColor,
                }}>
                <Text
                  style={{
                    ...styles.subTextStyle,
                  }}>
                  وعليكم السلام ورحمةالله تحت امرك يا فندم , قول استفسار حضرتك
                  وهنجاوبك عليه اكيد ان شا الله
                </Text>

                <View
                  style={[
                    {marginHorizontal: 5, ...styles.closeModel},
                    I18nManager.isRTL ? {right: -10} : {left: -10},
                  ]}>
                  <Avatar.Image
                    size={35}
                    source={require('../assets/Shutterstock-1431420185-940054.png')}
                    style={{resizeMode: 'contain', backgroundColor: '#fff'}}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: !I18nManager.isRTL ? 'row-reverse' : 'row',
              }}>
              <View
                style={{
                  ...styles.SentChat,
                  backgroundColor: config.colors.maindarkcolor,
                }}>
                <Text
                  style={{
                    ...styles.subTextStyle,
                  }}>
                  السلام عليكم ورحمةاللهوبركاته كنت عاوز استفسر عن حاجة ضرورية
                  بخصوص الد
                </Text>

                <View
                  style={[
                    {marginHorizontal: 5, ...styles.closeModel},
                    !I18nManager.isRTL ? {right: -10} : {left: -10},
                  ]}>
                  <Avatar.Image
                    size={35}
                    source={require('../assets/Shutterstock-1431420185-940054.png')}
                    style={{resizeMode: 'contain', backgroundColor: '#fff'}}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
              }}>
              <View
                style={{
                  ...styles.SentChat,
                  backgroundColor: config.colors.mainBgColor,
                }}>
                <Text
                  style={{
                    ...styles.subTextStyle,
                  }}>
                  وعليكم السلام ورحمةالله تحت امرك يا فندم , قول استفسار حضرتك
                  وهنجاوبك عليه اكيد ان شا الله
                </Text>

                <View
                  style={[
                    {marginHorizontal: 5, ...styles.closeModel},
                    I18nManager.isRTL ? {right: -10} : {left: -10},
                  ]}>
                  <Avatar.Image
                    size={35}
                    source={require('../assets/Shutterstock-1431420185-940054.png')}
                    style={{resizeMode: 'contain', backgroundColor: '#fff'}}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: !I18nManager.isRTL ? 'row-reverse' : 'row',
              }}>
              <View
                style={{
                  ...styles.SentChat,
                  backgroundColor: config.colors.maindarkcolor,
                }}>
                <Text
                  style={{
                    ...styles.subTextStyle,
                  }}>
                  السلام عليكم ورحمةاللهوبركاته كنت عاوز استفسر عن حاجة ضرورية
                  بخصوص الد
                </Text>

                <View
                  style={[
                    {marginHorizontal: 5, ...styles.closeModel},
                    !I18nManager.isRTL ? {right: -10} : {left: -10},
                  ]}>
                  <Avatar.Image
                    size={35}
                    source={require('../assets/Shutterstock-1431420185-940054.png')}
                    style={{resizeMode: 'contain', backgroundColor: '#fff'}}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={{...styles.subView, alignItems: 'flex-end'}}>
          <View
            style={{
              color: 'blue',
              borderEndWidth: 1,
              flex: 1,
              marignHorizontal: 5,
            }}>
            {/* <Text style={{ ...styles.linkText }}>. . . اكتب شيئا </Text> */}
            <TextInput
              inputTextStyle={{textAlignVertical: 'top'}}
              // style={{backgroundColor:'blue'}}
              multiline={true}
              placeholderTextColor={config.colors.darkGrayColor}
              placeholderStyle={common.fontstyles}
              style={{
                paddingVertical: 0,
                alignItems: 'center',
                ...common.fontstyles,
                textAlign: I18nManager.isRTL ? 'right' : 'left',
              }}
              placeholder={lang.customerService.TypeSomething}
            />
          </View>
          <View style={{paddingHorizontal: 10, height: 22}}>
            <TouchableOpacity
              onPress={() => {
                console.log('chat');
              }}>
              <Svg.SendMessage
                style={
                  !I18nManager.isRTL ? {transform: [{rotate: '180deg'}]} : null
                }
              />
            </TouchableOpacity>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
