import React, {useState, useEffect} from 'react';

import {useSelector, useDispatch, connect} from 'react-redux';
import {
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  BackHandler,
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
import {actions as orderActions} from '../modules/order';
import {actions as authActions} from '../modules/auth';
import {actions as categoryActions} from '../modules/categories';
import store from '../features/redux/store';
import {Card, Avatar, Appbar, Paragraph} from 'react-native-paper';
import {SvgUri} from 'react-native-svg';
import LoadingComp from '../components/material/LoadingComp';
import NoDataComp from '../components/material/NoDataComp';
import {useForm, Controller} from 'react-hook-form';

const styles = StyleSheet.create({
  mainContaier: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#232323cc',
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
    ...common.fontstyles,
    fontFamily: 'Cairo-Regular',
    fontSize: 20,
    color: '#fff',
  },
  textStyle: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Regular',
    fontSize: 13,
    color: config.colors.mainBgColor,
    fontWeight: '500',
    width: 85,
  },
  BreadCrumb: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Regular',
    fontSize: 10,
    color: config.colors.darkGrayColor,
    fontWeight: '500',
  },
  serviceTitle: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Regular',
    fontSize: 12,
    color: config.colors.maindarkcolor,
    fontWeight: '500',
    lineHeight: 16,
  },
  ServiceDescription: {
    ...common.fontstyles,
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
    height: 80,
    width: 55,
    paddingHorizontal: 5,
    top: 0,
    right: 20,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  TotalPrice: {
    ...common.fontstyles,
    fontFamily: 'Cairo-Regular',
    paddingBottom: 10,
    fontSize: 17,
    color: '#fff',
  },
  Currency: {
    ...common.fontstyles,
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
const ChooseServiceScreen = props => {
  const [loadingSub, setLoadingSub] = useState(false);
  setCompany;
  const [company, setCompany] = useState(null);
  const {
    handleSubmit,
    control,
    formState: {errors, isDirty, isValid},
    setValue,
    getValues,
  } = useForm({
    mode: 'onChange',
  });
  const modelContent = () => {
    if (company) {
      var MainAgentId = props.categoriesReducer.companyTypes.MainAgentId;
      var MainCenterId = props.categoriesReducer.companyTypes.MainCenterId;
      var cmpid = company.toAgent == true ? MainAgentId : MainCenterId;
      var x = props.categoriesReducer.companyTypes.companyTypes.find(
        s => s.id === cmpid,
      );
      return (
        <View style={styles.subView}>
          <View style={styles.closeModel}>
            <Appbar.Action
              icon={'close'}
              size={18}
              style={{margin: 5}}
              color={config.colors.mainBgColor}
              onPress={() => SetVisable(false)}
            />
          </View>
          <Text style={styles.modalTitleStyles}>{company.title}</Text>
          <Text style={styles.modalSubTitleStyles}>
            {company.subTitle + ' ' + x.fees}
          </Text>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <FormButton
              textStyles={{color: '#fff', fontSize: 11}}
              styleprops={{
                borderColor: 'transparent',
                backgroundColor: config.colors.mainBgColor,
              }}
              onPress={() => {
                SetVisable(false);
                if (company.cancel == false) {
                  setOrder({
                    fees: company.fees,
                    company_type_id: company.id,
                  });
                }
              }}>
              {company.btnText2}
            </FormButton>
            <FormButton
              textStyles={{fontSize: 11}}
              onPress={() => {
                SetVisable(false);
                setOrder({
                  fees: x.fees,
                  company_type_id:
                    company.toAgent == true ? MainAgentId : MainCenterId,
                });
              }}>
              {company.btnText}
            </FormButton>
          </View>
        </View>
      );
    }
  };
  useEffect(() => {
    props.LoadCompanyTypes({
      brand_id: props.OrderReducer.currentOrderProcess.brand_id,
      category_id: props.OrderReducer.currentOrderProcess.category_id,
    });
  }, []);
  const setOrder = item => {
    SetVisable(false);
    props
      .SetOrderParam({
        brand_id: props.OrderReducer.currentOrderProcess.brand_id,
        sub_category_id: props.OrderReducer.currentOrderProcess.sub_category_id,
        device_id: props.OrderReducer.currentOrderProcess.device_id,
        complaint: props.OrderReducer.currentOrderProcess.complaint,
        fees: item.fees,
        company_type_id: item.company_type_id,
      })
      .then(respo => {
        props.navigation.navigate('SetFixingTime');
      });
  };
  const checkCategory = item => {
    if (item.isAvailable == 1) {
      if (item.company_types.category_id == 1) {
        setOrder({
          fees: item.fees,
          company_type_id: item.id,
        });
      } else {
        //protected popup
        SetVisable(true);
        setCompany({
          title: lang.ServiceDevice.pop1Text,
          subTitle: lang.ServiceDevice.pop1Sub,
          btnText: lang.ServiceDevice.pop1btn,
          btnText2: lang.ServiceDevice.continue,
          cancel: false,
          toAgent: true,
          id: item.id,
          fees: item.fees,
          ...item.company_types.category,
        });
      }
    } else {
      if (item.company_types.category_id == 1) {
        if (
          props.categoriesReducer.companyTypes.companyTypes.MainAgentId == null
        ) {
          setCompany({
            title: lang.ServiceDevice.pop3Text,
            subTitle: lang.ServiceDevice.pop2Sub,
            btnText: lang.ServiceDevice.pop1btn,
            btnText2: lang.ServiceDevice.cancel,
            cancel: true,
            toAgent: false,
            id: item.id,
            fees: item.fees,
            ...item.company_types.category,
          });
          SetVisable(true);
        } else {
          setOrder({fees: item.fees, company_type_id: item.id});
        }
      }
      if (item.company_types.category_id == 2) {
        if (
          props.categoriesReducer.companyTypes.companyTypes.MainCenterId == null
        ) {
          setCompany({
            title: lang.ServiceDevice.pop1Text,
            subTitle: lang.ServiceDevice.pop1Sub,
            btnText: lang.ServiceDevice.pop2btn,
            btnText2: lang.ServiceDevice.cancel,
            cancel: true,
            toAgent: true,
            id: item.id,
            fees: item.fees,
            ...item.company_types.category,
          });
          SetVisable(true);
        } else {
          setOrder({fees: item.fees, company_type_id: item.id});
        }
      }
      if (item.company_types.category_id == 3) {
        setOrder({
          fees: item.fees,
          company_type_id: item.id,
        });
      }
    }
  };
  const {user} = props.authReducer;
  const [area, setArea] = useState('');
  const [areaVisible, setAreaVisible] = useState(false);
  const [Visible, SetVisable] = useState(false);
  return (
    <View nestedScrollEnabled={true} style={styles.mainContaier}>
      <Modal animationType="slide" transparent={true} visible={Visible}>
        <View style={styles.mainView}>{modelContent()}</View>
      </Modal>
      <View
        style={{
          ...styles.viewStyle,
          backgroundColor: '#fff',
        }}>
        <View style={styles.subitemsimageStyle}>
          <Image
            style={{width: 250, height: 100}}
            source={{uri: props.categoriesReducer.devices.icon}}
          />
        </View>

        <ImageBackground
          style={{
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingBottom: 5,
            height: 150,
            backgroundColor: config.colors.maindarkcolor + 'cc',
          }}>
          <HeaderComponent
            fontColor={'#fff'}
            headerbtn2={() => props.navigation.goBack()}
          />

          <Text style={styles.subitemsTitle}>
            {props.categoriesReducer.devices.name}
          </Text>
        </ImageBackground>
      </View>
      <View style={styles.subitemStyle}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <Text style={styles.BreadCrumb} onPress={() => {}}>
            {props.categoriesReducer.subcategories.name}
          </Text>
          <MaterialCommunityIcons
            style={{
              fontSize: 18,
              color: config.colors.darkGrayColor,
            }}
            name={'chevron-' + common.dir}
          />
          <Text style={styles.BreadCrumb} onPress={() => {}}>
            {props.categoriesReducer.devices.name}
          </Text>
          <MaterialCommunityIcons
            style={{
              fontSize: 18,
              color: config.colors.darkGrayColor,
            }}
            name={'chevron-' + common.dir}
          />
          <Text style={styles.BreadCrumb} onPress={() => {}}>
            {props.categoriesReducer.deviceBrands.name}
          </Text>
        </View>

        <ScrollView style={{paddingHorizontal: 10}}>
          {/* {!props.appReducer.loading && ( */}
          <View style={{paddingVertical: 10}}>
            {props.categoriesReducer.companyTypes &&
              props.categoriesReducer.companyTypes.companyTypes.map(item => {
                return (
                  <Card
                    key={item.id}
                    style={{
                      marginVertical: 10,
                      opacity: 7.8,
                      minHeight: 90,
                    }}
                    onPress={() => checkCategory(item)}>
                    <Card.Content
                      style={{
                        flexDirection: 'row',
                        position: 'relative',
                      }}>
                      <View style={{maxWidth: '75%'}}>
                        <Text style={styles.serviceTitle}>
                          {item.company_types.name}
                        </Text>
                        <Text style={styles.ServiceDescription}>
                          {item.company_types.description}
                        </Text>
                      </View>
                      <View style={styles.priceTag}>
                        <Text style={styles.TotalPrice}>{item.fees}</Text>
                        <Text style={styles.Currency}>{'L.E'}</Text>
                      </View>
                    </Card.Content>
                  </Card>
                );
              })}
            {/* {props.categoriesReducer.companyTypes  &&(
              <NoDataComp
                pageTitle={lang.home.title}
              />
            )} */}
          </View>
          {/* )} */}
        </ScrollView>

        {props.appReducer.loading && (
          <LoadingComp
            showHeader={false}
            navigation={props.navigation}
            pageTitle={lang.home.title}
          />
        )}
      </View>
    </View>
  );
};

// const mapDispatchToProps = (dispatch) => ({
// dispatch})

const mapDispatchToProps = (dispatch, getState = store.getState) => ({
  LoadMainCategories: () =>
    categoryActions.LoadMainCategories()(dispatch, getState),
  LoadCompanyTypes: data =>
    categoryActions.LoadCompanyTypes(data)(dispatch, getState),
  SetOrderParam: data => orderActions.SetOrderParam(data)(dispatch, getState),
  //unloadUser: () => authActions.unloadUser()(dispatch, getState),
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
)(ChooseServiceScreen);
