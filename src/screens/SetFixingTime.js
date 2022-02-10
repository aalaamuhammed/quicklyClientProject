import React, {useState, useEffect} from 'react';

import {useSelector, useDispatch, connect} from 'react-redux';
import {
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Modal,
  View,
} from 'react-native';
import {HeaderComponent} from '../components/core/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InputField from '../components/material/InputField';
import config from '../assets/config.json';
import FormButton from '../components/material/FormButton';
import common from '../assets/common';
import lang from '../localization';
import {actions as authActions} from '../modules/auth';
import {actions as orderActions} from '../modules/order';
import {actions as categoryActions} from '../modules/categories';
import store from '../features/redux/store';
import {Card, Avatar, Appbar, Paragraph} from 'react-native-paper';
import {SvgUri} from 'react-native-svg';
import LoadingComp from '../components/material/LoadingComp';
import {useForm, Controller} from 'react-hook-form';
import * as Svg from '../assets/images';

const styles = StyleSheet.create({
  mainContaier: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#232323',
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
    paddingTop: 20,
  },
  subitemsimageStyle: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 40,
    bottom: 0,
    justifyContent: 'center',
  },
  subitemsTitle: {
    fontFamily: 'Cairo-Regular',
    fontSize: 20,
    color: '#fff',
  },
  textStyle: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: config.colors.mainBgColor,
    fontWeight: '500',
  },
  BreadCrumb: {
    fontFamily: 'Cairo-Regular',
    fontSize: 10,
    color: config.colors.darkGrayColor,
    fontWeight: '500',
  },
  serviceTitle: {
    fontFamily: 'Cairo-Regular',
    fontSize: 12,
    color: config.colors.maindarkcolor,
    fontWeight: '500',
    lineHeight: 14,
  },
  ServiceDescription: {
    fontFamily: 'Cairo-Regular',
    fontSize: 10,
    color: config.colors.darkGrayColor,
    fontWeight: '500',
    marginVertical: 5,
    lineHeight: 12,
  },
  priceTag: {
    position: 'absolute',
    zIndex: 0,
    backgroundColor: config.colors.mainBgColor,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    height: 85,
    paddingHorizontal: 5,
    top: 0,
    right: 20,
    bottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  TotalPrice: {
    fontFamily: 'Cairo-Regular',
    paddingBottom: 10,
    fontSize: 17,
    color: '#fff',
  },
  Currency: {
    fontFamily: 'Cairo-Regular',
    fontSize: 10,
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
    fontSize: 13,
    marginVertical: 5,
    marginHorizontal: 30,
  },
  modalSubTitleStyles: {
    color: config.colors.darkGrayColor,
    ...common.fontstyles,
    textAlign: 'center',
    fontSize: 13,
    marginVertical: 5,
    marginHorizontal: 30,
  },
  activeDate: {
    backgroundColor: '#FFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
  },
  mainItems: {
    padding: 2,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  mainItemsCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    backgroundColor: 'transparent',
    borderRadius: 15,
    margin: 0,
    padding: 2,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    width: 80,
    paddingVertical: 20,
  },
  fieldContainer: {
    ...common.fields.fieldContainer,
    paddingVertical: 8,
    marginVertical: 10,
    justifyContent: 'center',
  },
});
const SetFixingTimeScreen = props => {
  const [selectDateId, setSelectedDateId] = useState(null);
  const [selectDate, setSelectedDate] = useState(null);
  const [selectTime, setSelectedTime] = useState('9:11');
  const [selectTime_from, setSelectedTimeFrom] = useState('18:00');
  const [selectTime_to, setSelectedTimeTo] = useState('21:00');
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([
    {
      id: 1,
      time: '9:11',
      time_from: '09:00',
      time_to: '11:00',
      formate: 'am',
    },
    {
      id: 2,
      time: '11:1',
      time_from: '11:00',
      time_to: '13:00',
      formate: 'pm',
    },
    {
      id: 3,
      time: '3:6',
      time_from: '15:00',
      time_to: '18:00',
      formate: 'pm',
    },
    {
      id: 4,
      time: '6:9',
      time_from: '18:00',
      time_to: '21:00',
      formate: 'pm',
    },
  ]);
  const [subMenu, setSubMenu] = useState([]);
  const [loadingSub, setLoadingSub] = useState(false);
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
    props.loginUser({
      data: data,
      redirectToMainScreen: () => props.navigation.navigate('Register'),
    });
  };
  useEffect(() => {
    var alldates = [];
    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    for (var i = 0; i < 7; i++) {
      var date = new Date();
      date.setDate(date.getDate() + i);
      alldates.push({
        id: i + 1,
        day: days[date.getDay()],
        date: date.getDate(),
        month: months[date.getMonth()],
        month_no: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    }

    setDates(alldates);
    setSelectedDateId(alldates[0].id);
    setSelectedDate(
      alldates[0].year + '-' + alldates[0].month_no + '-' + alldates[0].date,
    );
    // props.LoadMainCategories();
  }, []);
  const {user} = props.authReducer;
  return (
    <View nestedScrollEnabled={true} style={styles.mainContaier}>
      <View
        style={{
          //   ...styles.viewStyle,
          //   backgroundColor: 'blue',
          zIndex: 6,
          marginBottom: -15,
        }}>
        <HeaderComponent
          fontColor={'#fff'}
          headerbtn2={() => props.navigation.goBack()}>
          {lang.order.SetTime}
        </HeaderComponent>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{
            flexGrow: 1,
            zIndex: 5,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 'auto',
          }}>
          {dates.map(item => {
            return (
              <Card
                onPress={() => {
                  setSelectedDateId(item.id);
                  setSelectedDate(
                    item.year + '-' + item.month_no + '-' + item.date,
                  );
                }}
                style={
                  selectDateId === item.id
                    ? [styles.mainItemsCard, styles.activeDate]
                    : styles.mainItemsCard
                }
                key={item.id}>
                <View>
                  <Text
                    style={{
                      color: selectDateId === item.id ? '#000' : '#fff',
                      fontFamily: 'Cairo-Regular',
                      textAlign: 'center',
                      fontSize: 13,
                    }}>
                    {item.day}
                  </Text>
                  <Text
                    style={{
                      color: selectDateId === item.id ? '#000' : '#fff',
                      fontFamily: 'Cairo-Regular',
                      textAlign: 'center',
                      fontSize: 20,
                    }}>
                    {item.date}
                  </Text>
                  <Text
                    style={{
                      color: selectDateId === item.id ? '#000' : '#fff',
                      fontFamily: 'Cairo-Regular',
                      textAlign: 'center',
                      fontSize: 10,
                    }}>
                    {item.month}
                  </Text>
                </View>
              </Card>
            );
          })}
        </ScrollView>
      </View>
      <View style={{...styles.subitemStyle, zIndex: 0}}>
        {!props.appReducer.loading && (
          <ScrollView style={{paddingHorizontal: 10}}>
            <View style={{paddingVertical: 10}}>
              {times.map(item => {
                return (
                  <Pressable
                    key={item.id}
                    style={{
                      ...styles.fieldContainer,
                      backgroundColor:
                        selectTime === item.time
                          ? config.colors.mainBgColor
                          : '#FAFBFE',
                    }}
                    onPress={() => {
                      setSelectedTime(item.time);
                      setSelectedTimeFrom(item.time_from);
                      setSelectedTimeTo(item.time_to);
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Svg.Clock
                        width={20}
                        style={{
                          color:
                            selectTime === item.time
                              ? '#fff'
                              : config.colors.darkGrayColor,
                        }}
                      />

                      <Text
                        style={{
                          ...styles.textStyle,
                          color:
                            selectTime === item.time
                              ? '#fff'
                              : config.colors.darkGrayColor,
                        }}>
                        {item.time}
                      </Text>
                      <Text
                        style={{
                          ...styles.textStyle,
                          color:
                            selectTime === item.time
                              ? '#fff'
                              : config.colors.darkGrayColor,
                        }}>
                        {item.formate}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <FormButton
                textStyles={{color: '#fff'}}
                styleprops={{
                  borderColor: 'transparent',
                  backgroundColor: config.colors.mainBgColor,
                  maxWidth: '65%',
                }}
                disabled={!selectDate || !selectTime_from || !selectTime_to}
                loadingprop={props.appReducer.loading}
                onPress={() =>
                  props
                    .SetOrderParam({
                      ...props.OrderReducer.currentOrderProcess,
                      time_from: selectTime_from,
                      time_to: selectTime_to,
                      date: selectDate,
                    })
                    .then(respo => {
                      props.navigation.navigate('OrderAddress');
                    })
                }>
                {lang.btns.Next}
              </FormButton>
            </View>
          </ScrollView>
        )}
      </View>
      {props.appReducer.loading && (
        <LoadingComp
          showHeader={true}
          navigation={props.navigation}
          pageTitle={lang.home.title}
        />
      )}
    </View>
  );
};

// const mapDispatchToProps = (dispatch) => ({
// dispatch})

const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  LoadMainCategories: () =>
    categoryActions.LoadMainCategories()(dispatch, getState),
  LoadSubCategories: data =>
    categoryActions.LoadSubCategories(data)(dispatch, getState),
  SetOrderParam: data => orderActions.SetOrderParam(data)(dispatch, getState),
  //unloadUser:orderActions () => authActions.unloadUser()(dispatch, getState),
});

const mapStateToProps = state => ({
  OrderReducer: state.OrderReducer,
  authReducer: state.authReducer,
  categoriesReducer: state.categoriesReducer,
  appReducer: state.appReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetFixingTimeScreen);
