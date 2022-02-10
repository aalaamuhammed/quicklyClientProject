import React, {useRef, useEffect, useState} from 'react';

import {connect} from 'react-redux';
import {
  StyleSheet,
  Animated,
  FlatList,
  I18nManager,
  Dimensions,
  BackHandler,
  Image,
  ImageBackground,
  TouchableOpacity,
  Easing,
  Text,
  View,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FormButton from '../components/material/FormButton';
import {HeaderComponent} from '../components/core/Header';
import DropdownModal from '../components/material/DropdownModal';
import {actions as appActions} from '../modules/app';
import {actions as creditsActions} from '../modules/creditCards';
import lang from '../localization';
import store from '../features/redux/store';
import common from '../assets/common';
import config from '../assets/config.json';
import * as Svg from '../assets/images';
import {DefaultTheme, Divider, Card} from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LoadingComp from '../components/material/LoadingComp';
import NoDataComp from '../components/material/NoDataComp';

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
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: config.colors.mainBgColor,
    borderColor: 'transparent',
  },
  textStyle: {
    ...common.fontstyles,
    fontSize: 15,
    paddingHorizontal: 5,
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
    color: config.colors.mainBgColor,
    ...common.fontstyles,
    textAlign: 'center',
    fontSize: 16,
    margin: 20,
  },
  backgroundSvgStyle: {
    maxWidth: '80%',
    position: 'absolute',
    zIndex: 0,
    right: 10,
    resizeMode: 'cover',
  },
  mainItems: {
    justifyContent: 'center',
  },
  cardNoStyle: {
    ...common.fontstyles,
    color: config.colors.mainBgColor,
    fontSize: 13,
  },
});
const {height} = Dimensions.get('screen');
const CreditCardsScreen = props => {
  const LeftActions = id => {
    return (
      <View style={{flex: 0, justifyContent: 'center', paddingHorizontal: 20}}>
        <TouchableOpacity
          onPress={() => {
            SetCurrentId(id);
            SetVisable(true);
          }}>
          <Svg.Icondeletesweep style={{color: config.colors.maindarkcolor}} />
        </TouchableOpacity>
      </View>
    );
  };
  const renderItem = ({item}) => (
    <Swipeable
      renderLeftActions={() =>
        !I18nManager.isRTL ? LeftActions(item.id) : null
      }
      renderRightActions={() =>
        I18nManager.isRTL ? LeftActions(item.id) : null
      }>
      <Card
        key={item.id}
        style={{
          margin: 10,
          opacity: 7.8,
          backgroundColor: '#fff',
        }}
        onPress={() => {
          SetsubLoading(true);
          props
            .getOneCredit({
              id: item.id,
              redirectToMainScreen: () =>
                props.navigation.navigate('UpdateCreditCard'),
            })
            .then(resp => {
              SetsubLoading(false);
            });
        }}>
        <ImageBackground
          style={{
            justifyContent: 'center',
            height: 91,
          }}>
          <Svg.CirclesBg style={{...styles.backgroundSvgStyle}} />
          <Card.Content
            style={{
              ...styles.mainItems,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../assets/images/visa.png')} width={10} />
              <Text style={styles.textStyle}>{item.name}</Text>
            </View>
            <Divider
              style={{
                maxWidth: 70,
                backgroundColor: '#fff',
                minHeight: 1,
                marginVertical: 5,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.cardNoStyle}>{item.number}</Text>
              <Text style={{...styles.cardNoStyle, color: '#000'}}>
                {item.expire_date}
              </Text>
            </View>
          </Card.Content>
        </ImageBackground>
      </Card>
    </Swipeable>
  );
  let translateY = useRef(new Animated.ValueXY()).current;
  const [subLoading, SetsubLoading] = useState(false);
  const [Visible, SetVisable] = useState(false);
  const [currentId, SetCurrentId] = useState(null);
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
    translateY.setValue({x: 0, y: height});
    props.creditCardsReducer.creditCards.length > 0 && init();
  }, [props.creditCardsReducer.creditCards]);
  useEffect(() => {
    SetsubLoading(true);
    props.getAllCards().then(respo => {
      SetsubLoading(false);
    });
  }, []);

  return (
    <View nestedScrollEnabled={true} style={styles.mainContaier}>
      <View
        style={{
          ...styles.viewStyle,
          // marginBottom: -25,
          // ...styles.viewStyle,
          backgroundColor: config.colors.maindarkcolor,
        }}>
        <HeaderComponent
          fontColor={'#fff'}
          toggleDrawer={() => props.navigation.toggleDrawer()}
          headerbtn2={() => props.navigation.goBack()}>
          {lang.creditCards.title}
        </HeaderComponent>
      </View>
      <Modal animationType="slide" transparent={true} visible={Visible}>
        <View style={styles.mainView}>
          <View style={styles.subView}>
            <Text style={styles.modalTitleStyles}>
              {lang.creditCards.deleteCard}
            </Text>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <FormButton
                textStyles={{color: '#fff'}}
                loadingprop={props.appReducer.loading && !subLoading}
                styleprops={{
                  borderColor: 'transparent',
                  backgroundColor: config.colors.mainBgColor,
                }}
                onPress={() => {
                  props.deleteCreditCard(currentId).then(respo => {
                    SetCurrentId(null);
                    SetVisable(false);
                  });
                }}>
                {lang.creditCards.deletebtn}
              </FormButton>
              <FormButton
                onPress={() => {
                  SetCurrentId(null);
                  SetVisable(false);
                }}>
                {lang.creditCards.cancelbtn}
              </FormButton>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.subitemStyle}>
        <View style={{flexDirection: 'row'}}>
          <FormButton
            textStyles={{color: '#fff'}}
            styleprops={{
              borderColor: 'transparent',
              backgroundColor: config.colors.mainBgColor,
            }}
            onPress={() =>
              props.navigation.navigate('AddCredit', {
                page: 'CreditCards',
              })
            }>
            {lang.creditCards.addNew}
          </FormButton>
        </View>
        {/* {!props.appReducer.loading &&  !subLoading &&( */}
        <View style={{padding: 10, flex: 1}}>
          {props.creditCardsReducer.creditCards.length > 0 && (
            <Animated.FlatList
              data={props.creditCardsReducer.creditCards}
              renderItem={renderItem}
              // fadeDuration={0}
              keyExtractor={item => item.id}
              style={[{transform: [{translateY: translateY.y}]}]}
            />
          )}
          {props.creditCardsReducer.creditCards.length < 1 && (
            <NoDataComp
              navigation={props.navigation}
              NoDataText={lang.creditCards.nodata}
            />
          )}
        </View>
        {/* )} */}
        {props.appReducer.loading && subLoading && (
          //  <View style={{flex: 1}}>
          <LoadingComp
            showHeader={false}
            navigation={props.navigation}
            pageTitle={lang.home.title}
          />
          //  </View>
        )}
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  getAllCards: () => creditsActions.getAllCards()(dispatch),
  deleteCreditCard: data => creditsActions.deleteCreditCard(data)(dispatch),
  getOneCredit: data => creditsActions.getOneCredit(data)(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
  creditCardsReducer: state.creditCardsReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardsScreen);
