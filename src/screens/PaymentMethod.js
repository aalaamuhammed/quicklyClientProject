import React, {useRef, useEffect, useState} from 'react';

import {connect} from 'react-redux';
import {
  StyleSheet,
  Animated,
  FlatList,
  ScrollView,
  I18nManager,
  BackHandler,
  TouchableOpacity,
  Image,
  ImageBackground,
  Easing,
  Text,
  View,
  Modal,
} from 'react-native';
import valid from 'card-validator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InputField from '../components/material/InputField';
import FormButton from '../components/material/FormButton';
import {HeaderComponent} from '../components/core/Header';
import DropdownModal from '../components/material/DropdownModal';
import {actions as appActions} from '../modules/app';
import {actions as orderActions} from '../modules/order';
import {actions as OthersActions} from '../modules/other';
import {actions as creditsActions} from '../modules/creditCards';
import lang from '../localization';
import store from '../features/redux/store';
import common from '../assets/common';
import config from '../assets/config.json';
import * as Svg from '../assets/images';
import {Appbar, Avatar, Divider, Card} from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LoadingComp from '../components/material/LoadingComp';
import NoDataComp from '../components/material/NoDataComp';
import {useForm, Controller} from 'react-hook-form';

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
    color: '#fff',
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
    color: '#fff',
    fontSize: 13,
  },
  mainItemsCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    marginHorizontal: 10,
    width: 150,
    backgroundColor: '#FFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    minHeight: 100,
  },
  container2: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  Feedbackbtn2: {
    borderColor: config.colors.mainBgColor,
    borderWidth: 1,
    alignContent: 'stretch',
    flex: 1,
    padding: 12,
    marginVertical: 15,
    borderRadius: 4,
    marginHorizontal: 20,
  },
  feadbackbtn2Text: {
    color: config.colors.darkGrayColor,
    fontSize: 16,
    ...common.fontstyles,
    textAlign: 'center',
  },
  activeDate: {
    backgroundColor: config.colors.mainBgColor,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
  },
  subView2: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 300,
    backgroundColor: 'white',
    justifyContent: 'center',
    // borderRadius: 20,
    padding: 5,
    paddingVertical: 20,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
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
// const maxCVCLength = (null, { gaps: [4, 8, 12], lengths: [16], code: { size: 3 } })
//   .code.size;

const PaymentMethodScreen = props => {
  const {
    handleSubmit,
    control,
    formState: {errors, isDirty, isValid},
    setValue,
    getValues,
  } = useForm({
    mode: 'onChange',
  });
  const [addPromoVisible, SetaddPromoVisible] = useState(false);
  const onSubmit = data => {
    SetVisable(false);
    SetsubLoading(true);
    props
      .request_Order({
        ...props.OrderReducer.currentOrderProcess,
        // promo_code:data.promo_code,
        credit_card_id: currentId,
        payment_method_id: method,
      })
      .then(respo => {
        SetsubLoading(false);
      });
  };

  useEffect(() => {
    const backAction = () => {
      props.OrderReducer.orderSucess
        ? props.navigation.navigate('Home')
        : props.navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (props.OrderReducer.currentOrderProcess === {}) {
      props.navigation.navigate('Home');
    }
  }, []);
  useEffect(() => {
    SetsubLoading(false);
    // setFeedBack(props.OrderReducer.orderSucess);
  }, [props.OrderReducer.orderSucess]);

  useEffect(() => {
    props.OrderReducer.promocode === 'succss' ? SetaddPromoVisible(false) : '';
    // setFeedBack(props.OrderReducer.orderSucess);
  }, [props.OrderReducer.promocode]);
  const renderItem = ({item}) => (
    <Card
      key={item.id}
      style={{
        margin: 10,
        opacity: 7.8,
        backgroundColor:
          item.id == currentId ? config.colors.mainBgColor : '#fff',
      }}
      onPress={() => {
        SetCurrentId(item.id);
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
            <Text
              style={{
                ...styles.textStyle,
                color:
                  item.id != currentId ? config.colors.mainBgColor : '#fff',
              }}>
              {item.name}
            </Text>
          </View>
          <Divider
            style={{
              maxWidth: 70,
              backgroundColor:
                item.id != currentId ? config.colors.mainBgColor : '#fff',
              minHeight: 1,
              marginVertical: 5,
            }}
          />
          <Text
            style={{
              ...styles.cardNoStyle,
              color: item.id != currentId ? config.colors.mainBgColor : '#fff',
            }}>
            {item.number}
          </Text>
        </Card.Content>
      </ImageBackground>
    </Card>
  );
  let translateY = useRef(new Animated.ValueXY()).current;
  const [subLoading, SetsubLoading] = useState(false);
  const [Visible, SetVisable] = useState(false);
  const [currentId, SetCurrentId] = useState(null);
  const [method, SetMethod] = useState(null);
  const [feedBack, setFeedBack] = useState(false);

  // useEffect(() => {
  //   translateY.setValue({x: 0, y: height});
  //   props.creditCardsReducer.creditCards.length > 0 && init();
  // }, props.creditCardsReducer.creditCards);
  useEffect(() => {
    SetsubLoading(true);
    props.LoadPaymentMethods().then(respo => {
      SetMethod(1);
      SetCurrentId(0);
    });
    props.getAllCards().then(respo => {
      SetsubLoading(false);
    });
  }, []);

  return (
    <View nestedScrollEnabled={true} style={styles.mainContaier}>
      <View
        style={{
          // ...styles.viewStyle,
          // backgroundColor: config.colors.maindarkcolor,
          zIndex: 6,
          marginBottom: -25,
        }}>
        <View style={{marginBottom: 25}}>
          <HeaderComponent
            headerbtn2={() =>
              props.OrderReducer.orderSucess
                ? props.navigation.navigate('Home')
                : props.navigation.goBack()
            }
            fontColor={'#fff'}>
            {lang.creditCards.paymentmethodTitle}
          </HeaderComponent>
          <Modal
            animationType="slide"
            transparent={true}
            visible={addPromoVisible}>
            <View style={styles.mainView}>
              <View style={styles.subView2}>
                <View style={styles.closeModel}>
                  <Appbar.Action
                    icon={'close'}
                    size={18}
                    style={{margin: 5}}
                    color={config.colors.mainBgColor}
                    onPress={() => SetaddPromoVisible(false)}
                  />
                </View>

                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      maxWidth: '80%',
                    }}>
                    <Controller
                      defaultValue=""
                      name="code"
                      control={control}
                      rules={{}}
                      render={({field: {onChange, onBlur, value}}) => (
                        <InputField
                          containerStyles={{
                            paddingHorizontal: 0,
                            marginHorizontal: 0,
                          }}
                          keyboardType="phone-pad"
                          placeholder={lang.order.promoCode}
                          secureTextEntry={false}
                          onBlur={onBlur}
                          onChangeText={value => onChange(value)}
                          value={value}
                          error={errors.code?.message}
                        />
                      )}
                    />
                  </View>
                </View>

                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                  <FormButton
                    textStyles={{color: '#fff'}}
                    loadingprop={props.appReducer.loading && !subLoading}
                    styleprops={{
                      borderColor: 'transparent',
                      backgroundColor: config.colors.mainBgColor,
                      maxWidth: '50%',
                    }}
                    onPress={() => {
                      props
                        .applyCoupon({
                          data: {
                            code: getValues('code'),
                            order_id: props.OrderReducer.OrderDetails.id,
                          },
                        })
                        .then(respo => {
                          // SetaddPromoVisible(false);
                        });
                    }}>
                    {lang.Bill.insert}
                  </FormButton>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        {props.OrderReducer.orderSucess == false && (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={{
              flexGrow: 1,
              zIndex: 5,
              padding: 5,
            }}>
            {props.OtherReducer.paymentMethods.map(item => {
              return (
                <Card
                  key={item.id}
                  onPress={() => {
                    SetMethod(item.id);
                    if (item.id === 1) SetCurrentId(0);
                    else SetCurrentId(null);
                  }}
                  style={
                    method === item.id
                      ? [styles.mainItemsCard, styles.activeDate]
                      : styles.mainItemsCard
                  }>
                  <View
                    style={{
                      minHeight: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: method !== item.id ? '#000' : '#fff',
                        fontFamily: 'Cairo-Regular',
                        textAlign: 'center',
                        fontSize: 12,
                      }}>
                      {item.name}
                    </Text>
                    {/* {item.id == 2 && <Image
                  source={require('../assets/images/visa.png')}
                  width={100}
                  height={100}
                  style={{ resizeMode: 'contain', margin: 5 }}
                />} */}
                  </View>
                </Card>
              );
            })}
          </ScrollView>
        )}
      </View>

      {/* 
      
     
      <Modal animationType="slide" transparent={true} visible={Visible}>
<View style={styles.mainView}>
  <View style={styles.subView}> 
  <View>
 <ScrollView>
 <View style={{flexDirection: 'row', alignItems: 'center'}}>
         <View style={{flex: 1, marginHorizontal: 5,}}>
        <Controller
          defaultValue=""
          name="cvv"
          control={control}
          rules={{
            required: {value: true, message: lang.Validation.required},
            validate: {
              valid: value =>
                toStatus(valid.cvv(value, 3)) !== 'invalid' ||
                lang.Validation.cardCVCinvalid,
              incomplete: value =>
                toStatus(valid.cvv(value, 3)) !== 'incomplete' ||
                lang.Validation.cardCVCincomplete,
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputField
              containerStyles={{
                paddingHorizontal: 0,
                marginHorizontal: 0,
                maxWidth:150,
              }}
              keyboardType="phone-pad"
              placeholder={lang.creditCards.cvv}
              secureTextEntry={false}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              error={errors.cvv?.message}
            />
          )}
        />
      </View>
      </View>
 </ScrollView>

  </View>
    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
      <FormButton
        textStyles={{ color: '#fff' }}
        loadingprop={props.appReducer.loading && !subLoading}
        styleprops={{
          borderColor: 'transparent',
          backgroundColor: config.colors.mainBgColor,
        }}
        onPress={handleSubmit(onSubmit)}>
        {lang.btns.Confirm}
      </FormButton>
      <FormButton
        onPress={() => {
          SetVisable(false);
        }}>
        {lang.creditCards.cancelbtn}
      </FormButton>
    </View>
  </View>
</View>
</Modal> */}
      <View style={styles.subitemStyle}>
        {!props.OrderReducer.orderSucess && (
          <View style={{paddingTop: 5, flex: 1}}>
            {method == 2 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 13,
                }}>
                <Text
                  style={{
                    ...styles.textStyle,
                    color: config.colors.darkGrayColor,
                    fontSize: 14,
                  }}>
                  {lang.creditCards.selectCard}
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    props.navigation.navigate('AddCredit', {
                      page: 'PaymentMethod',
                    })
                  }>
                  <MaterialCommunityIcons
                    style={{
                      fontSize: 14,
                      color: config.colors.mainBgColor,
                    }}
                    name={'plus'}
                  />
                  <Text
                    style={{
                      ...styles.textStyle,
                      color: config.colors.mainBgColor,
                    }}>
                    {lang.creditCards.addNew}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {method == 2 && (
              <View style={{padding: 10, paddingVertical: 5, flex: 1}}>
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
                  <NoDataComp NoDataText={lang.addresses.nodata} />
                )}
              </View>
            )}
            {method != 2 && (
              <View style={{padding: 10, paddingVertical: 5, flex: 1}}></View>
            )}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 13,
              }}>
              <Text
                style={{
                  ...styles.textStyle,
                  color: config.colors.darkGrayColor,
                  fontSize: 14,
                }}>
                {lang.creditCards.ExchangeCost}
              </Text>
              <Text
                style={{
                  ...styles.textStyle,
                  color: config.colors.mainBgColor,
                }}>
                {props.OrderReducer.currentOrderProcess.fees + ' L.E'}
              </Text>
            </View>
            <View>
              {/* <ScrollView style={{ height: 50, flex: 0, }}>
                <View style={{ padding: 10, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', }}>
                  <Text
                    style={{
                      ...styles.textStyle,
                      color: config.colors.darkGrayColor,
                      fontSize: 14,
                    }}>
                    {lang.order.promoCode}
                  </Text>
                  <View style={{ flex: 1, marginHorizontal: 5, }}>
                    <Controller
                      defaultValue=""
                      name="promo_code"
                      control={control}
                      rules={{
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                          containerStyles={{
                            paddingHorizontal: 0,
                            marginHorizontal: 0,
                          }}
                          keyboardType="phone-pad"
                          placeholder={lang.order.promoCode}
                          secureTextEntry={false}
                          onBlur={onBlur}
                          onChangeText={value => onChange(value)}
                          value={value}
                          error={errors.promo_code?.message}
                        />
                      )}
                    />
                  </View>
                </View>
              </ScrollView> */}
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <FormButton
                textStyles={{color: '#fff'}}
                styleprops={{
                  borderColor: 'transparent',
                  backgroundColor: config.colors.mainBgColor,
                  maxWidth: '70%',
                }}
                disabled={currentId === null}
                onPress={handleSubmit(onSubmit)}>
                {lang.btns.Confirm}
              </FormButton>
            </View>
          </View>
        )}
        {props.OrderReducer.orderSucess && (
          <View style={styles.container2}>
            <Avatar.Icon
              size={120}
              style={{
                margin: 20,
                borderColor: config.colors.mainBgColor,
                borderWidth: 1,
              }}
              theme={{
                colors: {
                  primary: 'transparent',
                },
              }}
              icon={'check'}
              color={config.colors.mainBgColor}
            />

            <Text style={styles.feadbackbtn2Text}>
              {lang.creditCards.OrderDone}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                flexWrap: 'wrap',
                padding: 5,
              }}>
              <Text style={styles.feadbackbtn2Text}>
                {lang.creditCards.orderNo}
              </Text>
              <Text
                style={{
                  ...styles.feadbackbtn2Text,
                  color: config.colors.mainBgColor,
                }}>
                {' ' + props.OrderReducer.OrderDetails.order_serial_no + ' '}
              </Text>
              <Text style={styles.feadbackbtn2Text}>
                {lang.creditCards.ConfirmedOrder}
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <View style={{marginHorizontal: 5}}>
                <Text
                  style={{
                    ...styles.titleTextStyle,
                    fontSize: 13,
                  }}>
                  {lang.Bill.YourPromoCode}
                </Text>
              </View>

              <FormButton
                // icon={'map-marker'}
                textStyles={{color: '#fff', fontSize: 10, marginVertical: 5}}
                styleprops={{
                  flex: 0,
                  borderColor: 'transparent',
                  marginVertical: 5,
                  marginHorizontal: 0,
                  backgroundColor: config.colors.darkGrayColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 0,
                  maxWidth: '60%',
                }}
                onPress={() => {
                  SetaddPromoVisible(true);
                }}>
                {lang.Bill.addPromoCode}
              </FormButton>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <FormButton
                textStyles={{color: '#fff'}}
                styleprops={{
                  borderColor: 'transparent',
                  backgroundColor: config.colors.mainBgColor,
                  maxWidth: '70%',
                }}
                onPress={() => {
                  props.navigation.navigate('Orders');
                }}>
                {lang.creditCards.orderPage}
              </FormButton>
              {/* <FormButton
                textStyles={{ color: '#fff' }}
                styleprops={{
                  borderColor: 'transparent',
                  backgroundColor: config.colors.mainBgColor,
                  maxWidth: '70%',
                }}
                onPress={() => {   SetaddPromoVisible(true); }}>
                {lang.order.promoCode}
              </FormButton> */}
            </View>
          </View>
        )}
        {props.appReducer.loading && subLoading && (
          // <View style={{ flex: 1 }}>
          <LoadingComp
            showHeader={false}
            navigation={props.navigation}
            pageTitle={lang.home.title}
          />
          // </View>
        )}
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  getAllCards: () => creditsActions.getAllCards()(dispatch),
  LoadPaymentMethods: () =>
    OthersActions.LoadPaymentMethods()(dispatch, getState),
  getOneCredit: data => creditsActions.getOneCredit(data)(dispatch),
  request_Order: data => orderActions.request_Order(data)(dispatch),
  applyCoupon: data => orderActions.applyCoupon(data)(dispatch),
});
//

const mapStateToProps = state => ({
  OrderReducer: state.OrderReducer,
  OtherReducer: state.OtherReducer,
  appReducer: state.appReducer,
  creditCardsReducer: state.creditCardsReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentMethodScreen);
