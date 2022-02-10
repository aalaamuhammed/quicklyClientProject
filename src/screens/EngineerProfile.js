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
import {RadioButton} from 'react-native-paper';
import {Rating} from 'react-native-rating-element';
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
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  viewStyle: {
    flex: 1,
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
  return (
    <View nestedScrollEnabled={true} style={styles.mainContaier}>
      <ImageBackground
        style={{
          justifyContent: 'space-between',
          flex: 1,
          // paddingLeft: 10,
          // paddingBottom: 5,
          //    minHeight: 300,
          backgroundColor: config.colors.maindarkcolor + 'aa',
        }}
        source={{uri: props.OrderReducer.engineerProfile.profile_pic}}>
        <View
          style={{
            ...styles.viewStyle,
            paddingBottom: 10,
            backgroundColor: config.colors.maindarkcolor + 'cc',
          }}>
          <HeaderComponent
            fontColor={'#fff'}
            headerbtn2={() => props.navigation.goBack()}
            toggleDrawer={() => props.navigation.toggleDrawer()}>
            {lang.drawer.pricingRequest}
          </HeaderComponent>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View>
              <Avatar.Image
                size={110}
                source={{uri: props.OrderReducer.engineerProfile.profile_pic}}
                style={{resizeMode: 'contain', backgroundColor: '#fff'}}
              />
              <Badge
                size={30}
                theme={{
                  colors: {
                    ...DefaultTheme.colors,
                    // text:'#fff',
                    notification: config.colors.mainBgColor,
                  },
                }}
                style={{marginTop: -30, marginLeft: -50, color: '#fff'}}>
                {props.OrderReducer.engineerProfile.reviews_count % 1 > 0.0
                  ? '+'
                  : ''}
                {props.OrderReducer.engineerProfile.reviews_count}
              </Badge>
            </View>
            {/* <Image style={{ 
                                 width: 120,
                                 height: 120,
                                  borderRadius: 60,
                                   borderWidth: 1,
                                    borderColor: config.colors.mainBgColor,resizeMode:'contain' }} source={require('../assets/logo.png')} />
                        */}
            <Text
              style={{
                ...styles.titleTextStyle,
                fontSize: 16,
                color: '#fff',
                marginVertical: 10,
              }}>
              {props.OrderReducer.engineerProfile.fname +
                ' ' +
                props.OrderReducer.engineerProfile.lname}
            </Text>
            <Rating
              rated={parseFloat(props.OrderReducer.engineerProfile.rating)}
              totalCount={5}
              ratingColor="#f1c644"
              ratingBackgroundColor="#d4d4d4"
              size={24}
              readonly // by default is false
              icon="ios-star"
              direction="row"
            />

            {/* {props.appReducer.backendErrors.image && (<Text style={{
                            fontFamily: 'Cairo-Regular',
                            fontSize: 10,
                            color: 'red',
                        }}>
                            {props.appReducer.backendErrors.image[0]}
                        </Text>)} */}
          </View>
        </View>
      </ImageBackground>

      <View style={{...styles.subitemStyle, top: -20}}>
        <ScrollView style={{paddingHorizontal: 10}}>
          <View style={{flexDirection: 'row-reverse'}}>
            <Text style={{...styles.titleTextStyle}}>
              {props.OrderReducer.engineerProfile.reviews_count +
                ' ' +
                lang.profile.comments}
            </Text>
          </View>
          {props.OrderReducer.engineerProfile.reviews.map((item, i) => {
            return (
              <View key={i} style={{margin: 10}}>
                {item.author && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: config.colors.mainBgColor,
                      }}
                      source={{uri: item.author.profile_pic}}
                    />
                    <View style={{paddingHorizontal: 10}}>
                      <Text
                        style={{
                          ...styles.titleTextStyle,
                          fontSize: 12,
                          color: config.colors.mainBgColor,
                        }}>
                        {item.author.fname + ' ' + item.author.lname}
                      </Text>

                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        {/* <Rating
                                        readonly
                                        fractions={1}
                                        startingValue={props.OrderReducer.engineerProfile.total_rate}
                                        // onFinishRating={this.ratingCompleted}
                                        imageSize={15}
                                    /> */}
                        <Rating
                          rated={parseFloat(item.rate)}
                          totalCount={5}
                          ratingColor={config.colors.mainBgColor}
                          ratingBackgroundColor="#d4d4d4"
                          size={16}
                          readonly // by default is false
                          icon="ios-star"
                          direction="row"
                        />
                        {/* <Text style={{
                                        ...styles.titleTextStyle,
                                        fontSize: 14,
                                        color: '#FAC900'
                                    }}>
                                        {parseFloat(props.OrderReducer.engineerProfile.total_rate % 1) > 0.0 ? '+' : ''}
                                            {props.OrderReducer.engineerProfile.total_rate}
                                             </Text> */}
                      </View>
                    </View>
                  </View>
                )}
                <View style={styles.fieldContainer}>
                  <Text
                    style={{
                      ...styles.titleTextStyle,
                      fontSize: 12,
                      marginHorizontal: 10,
                      color: '#000',
                      maxWidth: '80%',
                    }}>
                    {item.comment}
                  </Text>
                  <Text
                    style={{
                      ...styles.titleTextStyle,
                      fontSize: 12,
                      marginHorizontal: 5,
                      position: 'absolute',
                      bottom: 5,
                      end: 0,
                    }}>
                    {item.created_at}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  toggleLanguages: data => appActions.toggleLanguages(data)(dispatch),
});

const mapStateToProps = state => ({
  OrderReducer: state.OrderReducer,
  appReducer: state.appReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EngineerProfileScreen);
