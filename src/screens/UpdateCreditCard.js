import React, {useRef, useEffect, useState} from 'react';
import valid from 'card-validator';
import {connect} from 'react-redux';
import {
  StyleSheet,
  BackHandler,
  Animated,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Easing,
  Text,
  View,
  Modal,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InputField from '../components/material/InputField';
import FormButton from '../components/material/FormButton';
import {HeaderComponent} from '../components/core/Header';
import {cities, governorate} from '../localization/citiesandlocations';
import DropdownModal from '../components/material/DropdownModal';
import {actions as CreditsActions} from '../modules/creditCards';
import {actions as OthersActions} from '../modules/other';
import {actions as appActions} from '../modules/app';
import lang from '../localization';
import store from '../features/redux/store';
import common from '../assets/common';
import config from '../assets/config.json';
import * as Svg from '../assets/images';
import {Card, Checkbox} from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useForm, Controller} from 'react-hook-form';
import MapModal from '../components/material/mapComp';
import LoadingComp from '../components/material/LoadingComp';
const styles = StyleSheet.create({
  modalDataStyles: {
    color: '#000',
    ...common.fontstyles,
    textAlign: 'center',
    fontSize: 14,
    margin: 20,
  },
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
  },
  textStyle: {
    ...common.fontstyles,
    fontSize: 13,
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
  positionChoosen: {
    color: '#fff',
    ...common.fontstyles,
    fontSize: 14,
  },
  currentPosition: {
    color: config.colors.darkGrayColor,
    ...common.fontstyles,
    fontSize: 12,
  },
  mainItemsCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    marginHorizontal: 10,
    backgroundColor: '#FFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    minHeight: 100,
  },
});
const maxCVCLength = (null, {gaps: [4, 8, 12], lengths: [16], code: {size: 3}})
  .code.size;

const toStatus = validation => {
  if (!validation.isValid) {
    return validation.isPotentiallyValid ? 'incomplete' : 'invalid';
  }
};
const UpdateCreditScreen = props => {
  const {
    handleSubmit,
    control,
    formState: {errors, isDirty, isValid},
    setValue,
    getValues,
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = data => {
    SetsubLoading(true);
    props
      .updateCreditCard({
        data: {
          ...data,
          id: props.creditCardsReducer.oneCreditCard.id,
          expire_date:
            (data.month.length == 1 ? '0' + data.month : data.month) +
            '/' +
            data.year.slice(data.year.length - 2),
        },
        redirectToMainScreen: () => props.navigation.navigate('CreditCards'),
      })
      .then(respo => {
        SetsubLoading(false);
      });
  };
  const [deleteVisible, SetDeleteVisible] = useState(false);
  const [subLoading, SetsubLoading] = useState(false);

  const cardNoValidator = validation => {
    if (!validation.isPotentiallyValid) {
      return 'incomplete';
    } else if (!validation.isValid) {
      return 'invalid';
    }
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
    setValue('set_default', '0');

    setValue('name', props.creditCardsReducer.oneCreditCard.name);
    // setValue('cvv', props.creditCardsReducer.oneCreditCard.cvv);
    setValue('number', props.creditCardsReducer.oneCreditCard.number);
    setValue(
      'month',
      props.creditCardsReducer.oneCreditCard.expire_date.substring(0, 2),
    );
    setValue(
      'year',
      props.creditCardsReducer.oneCreditCard.expire_date.slice(
        props.creditCardsReducer.oneCreditCard.expire_date.length - 2,
      ),
    );
  }, []);
  return (
    <View nestedScrollEnabled={true} style={styles.mainContaier}>
      <View
        style={
          {
            //   zIndex: 6,
            //   marginBottom: -25,
          }
        }>
        <HeaderComponent
          fontColor={'#fff'}
          toggleDrawer={() => props.navigation.toggleDrawer()}
          headerbtn2={() => props.navigation.goBack()}>
          {lang.creditCards.addNew}
        </HeaderComponent>
        <Modal animationType="slide" transparent={true} visible={deleteVisible}>
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
                    props
                      .deleteCreditCard(
                        props.creditCardsReducer.oneCreditCard.id,
                      )
                      .then(respo => {
                        SetDeleteVisible(false);
                        props.navigation.navigate('CreditCards');
                      });
                  }}>
                  {lang.creditCards.deletebtn}
                </FormButton>
                <FormButton
                  onPress={() => {
                    SetDeleteVisible(false);
                  }}>
                  {lang.creditCards.cancelbtn}
                </FormButton>
              </View>
            </View>
          </View>
        </Modal>

        {/* <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{
            flexGrow: 1,
            zIndex: 5,
            padding: 5,
          }}>
          <Card
            onPress={() => {}}
            style={
              //  selectDate === item.id
              //   ? [styles.mainItemsCard, styles.activeDate]
              //:
              styles.mainItemsCard
            }>
            <View
              style={{
                minHeight: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  //  color: selectDate === item.id ? '#000' : '#fff',
                  fontFamily: 'Cairo-Regular',
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                {'item.month'}
              </Text>
            </View>
          </Card>
          <Card
            onPress={() => {}}
            style={
              //  selectDate === item.id
              //   ? [styles.mainItemsCard, styles.activeDate]
              //:
              styles.mainItemsCard
            }>
            <View
              style={{
                minHeight: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  //  color: selectDate === item.id ? '#000' : '#fff',
                  fontFamily: 'Cairo-Regular',
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                {'item.month'}
              </Text>
              <Image
                source={require('../assets/images/visa.png')}
                width={100}
                height={100}
                style={{resizeMode: 'contain', margin: 5}}
              />
            </View>
          </Card>
        </ScrollView> */}
      </View>

      <View style={styles.subitemStyle}>
        <View style={{padding: 10, flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.textStyle}>
                {' '}
                {lang.creditCards.cardOwnerName}{' '}
              </Text>
              <View style={{flex: 1, marginHorizontal: 5}}>
                <Controller
                  defaultValue=""
                  name="name"
                  control={control}
                  rules={{
                    required: {value: true, message: lang.Validation.required},
                    validate: {
                      valid: value =>
                        toStatus(valid.cardholderName(value)) !== 'invalid' ||
                        lang.Validation.cardNameinvalid,
                      incomplete: value =>
                        toStatus(valid.cardholderName(value)) !==
                          'incomplete' || lang.Validation.cardNameincomplete,
                    },
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <InputField
                      containerStyles={{
                        paddingHorizontal: 0,
                        marginHorizontal: 0,
                      }}
                      placeholder={lang.creditCards.cardOwnerName}
                      secureTextEntry={false}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}
                      value={value}
                      error={errors.name?.message}
                    />
                  )}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.textStyle}> {lang.creditCards.cardNo} </Text>
              <View style={{flex: 1, marginHorizontal: 5}}>
                <Controller
                  defaultValue=""
                  name="number"
                  control={control}
                  rules={{
                    required: {value: true, message: lang.Validation.required},
                    validate: {
                      valid: value =>
                        cardNoValidator(valid.number(value)) !== 'invalid' ||
                        lang.Validation.cardNoinvalid,
                      incomplete: value =>
                        cardNoValidator(valid.number(value)) !== 'incomplete' ||
                        lang.Validation.cardNoincomplete,
                    },
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <InputField
                      containerStyles={{
                        paddingHorizontal: 0,
                        marginHorizontal: 0,
                      }}
                      keyboardType="phone-pad"
                      placeholder={lang.creditCards.cardNo}
                      secureTextEntry={false}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}
                      value={value}
                      error={errors.number?.message}
                    />
                  )}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.textStyle}> {lang.creditCards.expDate} </Text>
              <View style={{flex: 1, marginHorizontal: 5}}>
                <Controller
                  defaultValue=""
                  name="month"
                  control={control}
                  rules={{
                    required: {value: true, message: lang.Validation.required},
                    validate: {
                      valid: value =>
                        toStatus(valid.expirationMonth(value)) !== 'invalid' ||
                        lang.Validation.cardExpinvalid,
                      incomplete: value =>
                        toStatus(valid.expirationMonth(value)) !==
                          'incomplete' || lang.Validation.cardExpincomplete,
                    },
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <InputField
                      containerStyles={{
                        paddingHorizontal: 0,
                        marginHorizontal: 0,
                      }}
                      keyboardType="phone-pad"
                      placeholder={lang.creditCards.month}
                      maxLength={2}
                      secureTextEntry={false}
                      onBlur={onBlur}
                      onChangeText={value => {
                        onChange(value);
                      }}
                      value={value}
                      error={errors.month?.message}
                    />
                  )}
                />
              </View>
              <View style={{flex: 1, marginHorizontal: 5}}>
                <Controller
                  defaultValue=""
                  name="year"
                  control={control}
                  rules={{
                    required: {value: true, message: lang.Validation.required},
                    validate: {
                      valid: value =>
                        toStatus(valid.expirationYear(value)) !== 'invalid' ||
                        lang.Validation.cardExpinvalid,
                      incomplete: value =>
                        toStatus(valid.expirationYear(value)) !==
                          'incomplete' || lang.Validation.cardExpincomplete,
                    },
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <InputField
                      containerStyles={{
                        paddingHorizontal: 0,
                        marginHorizontal: 0,
                      }}
                      keyboardType="phone-pad"
                      placeholder={lang.creditCards.year}
                      maxLength={4}
                      secureTextEntry={false}
                      onBlur={onBlur}
                      onChangeText={value => {
                        onChange(value);
                      }}
                      value={value}
                      error={errors.year?.message}
                    />
                  )}
                />
              </View>
            </View>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.textStyle}> {lang.creditCards.cvv} </Text>
              <View style={{flex: 1, marginHorizontal: 5,justifyContent:'flex-start',alignItems:'flex-start'}}>
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
                        maxWidth:150
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Controller
                defaultValue=""
                name="set_default"
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Checkbox
                    status={value === '1' ? 'checked' : 'unchecked'}
                    uncheckedColor={config.colors.mainBgColor}
                    color={config.colors.mainBgColor}
                    onPress={() => {
                      setValue('set_default', value === '0' ? '1' : '0');
                    }}
                  />
                )}
              />
              <Text style={styles.textStyle}>
                {lang.creditCards.setDefault}
              </Text>
            </View> */}
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <FormButton
                textStyles={{color: '#fff'}}
                styleprops={{
                  borderColor: 'transparent',
                  backgroundColor:
                    !isDirty || !isValid
                      ? config.colors.darkGrayColor
                      : config.colors.mainBgColor,

                  maxWidth: '70%',
                }}
                disabled={!isDirty || !isValid}
                loadingprop={props.appReducer.loading && subLoading}
                onPress={handleSubmit(onSubmit)}>
                {lang.creditCards.save}
              </FormButton>
            </View>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={() => SetDeleteVisible(true)}>
              <Svg.Icondeletesweep style={{color: config.colors.dangerColor}} />
              <Text
                style={{marginVertical: 5, color: config.colors.dangerColor}}>
                {lang.creditCards.deleteCardTitle}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  toggleLanguages: data => appActions.toggleLanguages(data)(dispatch),
  LoadGovernorates: () => OthersActions.LoadGovernorates()(dispatch, getState),
  deleteCreditCard: data => CreditsActions.deleteCreditCard(data)(dispatch),
  updateCreditCard: data =>
    CreditsActions.updateCreditCard(data)(dispatch, getState),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
  creditCardsReducer: state.creditCardsReducer,
  OtherReducer: state.OtherReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCreditScreen);
