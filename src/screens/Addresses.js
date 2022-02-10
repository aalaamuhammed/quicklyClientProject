import React, {useRef, useEffect, useState} from 'react';

import {connect} from 'react-redux';
import {
  StyleSheet,
  Animated,
  FlatList,
  I18nManager,
  Dimensions,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  Easing,
  Text,
  View,
  Pressable,
  Modal,
  findNodeHandle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FormButton from '../components/material/FormButton';
import {HeaderComponent} from '../components/core/Header';
import DropdownModal from '../components/material/DropdownModal';
import {actions as appActions} from '../modules/app';
import {actions as OthersActions} from '../modules/other';
import {actions as AddressActions} from '../modules/address';
import lang from '../localization';
import store from '../features/redux/store';
import common from '../assets/common';
import {cities, governorate} from '../localization/citiesandlocations';
import config from '../assets/config.json';
import * as Svg from '../assets/images';
import {Card} from 'react-native-paper';
import NoDataComp from '../components/material/NoDataComp';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LoadingComp from '../components/material/LoadingComp';
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
    paddingVertical: 10,
    marginVertical: 10,
  },
  textStyle: {
    ...common.fontstyles,
    fontSize: 12,
  },
  valueStyle: {
    ...common.fontstyles,
    fontSize: 12,
    paddingVertical: 3,
    width: 40,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#FAC90077',
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
});
const {height} = Dimensions.get('screen');

const AddressesScreen = props => {
  const getlocation = (gov, city) => {
    var currentgov = props.OtherReducer.governorates.find(s => s.id === gov);
    var currentcity = currentgov.cities.find(s => s.id === city);
    return lang.lang === 'ar'
      ? currentgov.name + ',' + currentcity.name
      : currentgov.name_en + ',' + currentcity.name_en;
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
    SetsubLoading(true);
    props.LoadGovernorates().then(respo => {
      props.getAllAddresses().then(respo => {
        SetsubLoading(false);
      });
    });
  }, []);

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
      <Pressable
        style={styles.fieldContainer}
        onPress={() => {
          SetsubLoading(true);
          props
            .getOneAddress({
              id: item.id,
              redirectToMainScreen: () =>
                props.navigation.navigate('updateOldAddress'),
            })
            .then(resp => {
              SetsubLoading(false);
            });
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Svg.Iconlocationon
              width={10}
              style={{color: config.colors.mainBgColor}}
            />
          </View>
          <View style={{paddingHorizontal: 7, flex: 1}}>
            <Text
              style={{
                ...styles.textStyle,
                color: config.colors.mainBgColor,
              }}>
              {getlocation(item.governorate.id, item.city.id)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...styles.textStyle,
                  color: config.colors.mainBgColor,
                }}>
                {item.location}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...styles.textStyle,
                    color: config.colors.darkGrayColor,
                  }}>
                  {lang.addresses.building}
                </Text>
                <View style={styles.valueStyle}>
                  <Text
                    style={{
                      ...styles.textStyle,
                      color: config.colors.mainBgColor,
                    }}>
                    {item.building_no}
                  </Text>
                </View>
                <Text
                  style={{
                    ...styles.textStyle,
                    color: config.colors.darkGrayColor,
                  }}>
                  {lang.addresses.floor}
                </Text>
                <View style={styles.valueStyle}>
                  <Text
                    style={{
                      ...styles.textStyle,
                      color: config.colors.mainBgColor,
                    }}>
                    {item.floor_no}
                  </Text>
                </View>
                <Text
                  style={{
                    ...styles.textStyle,
                    color: config.colors.darkGrayColor,
                  }}>
                  {lang.addresses.apartment}
                </Text>
                <View style={styles.valueStyle}>
                  <Text
                    style={{
                      ...styles.textStyle,
                      color: config.colors.mainBgColor,
                    }}>
                    {item.flat_no}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
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
    translateY.setValue({x: 0, y: height});
    props.AddressReducer.addresses.length > 0 && init();
  }, [props.AddressReducer.addresses]);

  return (
    <View nestedScrollEnabled={true} style={styles.mainContaier}>
      <View
        style={{
          ...styles.viewStyle,
          backgroundColor: config.colors.maindarkcolor,
        }}>
        <HeaderComponent
          fontColor={'#fff'}
          toggleDrawer={() => props.navigation.toggleDrawer()}
          headerbtn2={() => props.navigation.goBack()}>
          {lang.addresses.title}
        </HeaderComponent>
      </View>
      <Modal animationType="slide" transparent={true} visible={Visible}>
        <View style={styles.mainView}>
          <View style={styles.subView}>
            <Text style={styles.modalTitleStyles}>
              {lang.addresses.deleteAddress}
            </Text>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <FormButton
                textStyles={{color: '#fff'}}
                styleprops={{
                  borderColor: 'transparent',
                  backgroundColor: config.colors.mainBgColor,
                }}
                loadingprop={props.appReducer.loading && !subLoading}
                onPress={() => {
                  SetVisable(false);
                  props.deleteAddress(currentId).then(respo => {
                    SetCurrentId(null);
                  });
                }}>
                {lang.addresses.deletebtn}
              </FormButton>
              <FormButton
                onPress={() => {
                  SetCurrentId(null);
                  SetVisable(false);
                }}>
                {lang.addresses.cancelbtn}
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
              props.navigation.navigate('AddNewAddresses', {page: 'Addresses'})
            }>
            {lang.addresses.addNew}
          </FormButton>
        </View>
        {/* {!props.appReducer.loading && !subLoading && ( */}
        <View style={{padding: 10, flex: 1}}>
          {props.AddressReducer.addresses.length > 0 && (
            <Animated.FlatList
              data={props.AddressReducer.addresses}
              renderItem={renderItem}
              // fadeDuration={0}
              keyExtractor={item => item.id}
              style={[{transform: [{translateY: translateY.y}]}]}
            />
          )}
          {props.AddressReducer.addresses.length < 1 && (
            <NoDataComp
              navigation={props.navigation}
              NoDataText={lang.addresses.nodata}
            />
          )}
        </View>
        {/* )} */}
        {props.appReducer.loading && subLoading && (
          // <View style={{ flex: 1 }}>
          <LoadingComp showHeader={false} navigation={props.navigation} />
          // </View>
        )}
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  getOneAddress: data => AddressActions.getOneAddress(data)(dispatch, getState),
  LoadGovernorates: () => OthersActions.LoadGovernorates()(dispatch, getState),
  toggleLanguages: data => appActions.toggleLanguages(data)(dispatch),
  deleteAddress: data => AddressActions.deleteAddress(data)(dispatch),
  getAllAddresses: () => AddressActions.getAllAddresses()(dispatch),
});

const mapStateToProps = state => ({
  appReducer: state.appReducer,
  OtherReducer: state.OtherReducer,
  AddressReducer: state.AddressReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressesScreen);
