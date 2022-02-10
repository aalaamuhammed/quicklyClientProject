import React, {useState, useRef, useEffect} from 'react';

import {useSelector, useDispatch, connect} from 'react-redux';
import {
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Easing,
  Dimensions,
  ScrollView,
  I18nManager,
  BackHandler,
  View,
  Platform,
} from 'react-native';
import {HeaderComponent} from '../components/core/Header';
import config from '../assets/config.json';
import common from '../assets/common';
import lang from '../localization';
import {actions as orderActions} from '../modules/order';
import {actions as authActions} from '../modules/auth';
import {actions as notificationsActions} from '../modules/notifications';
import {actions as categoryActions} from '../modules/categories';
import store from '../features/redux/store';
import {Card, Title, Paragraph} from 'react-native-paper';
import {SvgUri} from 'react-native-svg';
import LoadingComp from '../components/material/LoadingComp';
import NoDataComp from '../components/material/NoDataComp';

const {height} = Dimensions.get('screen');

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
  mainItems: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 3,
    alignItems: 'center',
    paddingTop: 0,
  },
  mainItemsCard: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 3,
    margin: 10,
    width: 130,
    height: 110,
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
    maxWidth: '80%',
    width: '80%',
    height: 120,
    position: 'absolute',
    zIndex: 0,
    end: 0,
    resizeMode: 'contain',
    // backgroundColor:'blue',
    resizeMode: 'contain',
  },
  subitemsTitle: {
    fontFamily: 'Cairo-Regular',
    fontSize: 17,
    color: '#fff',
  },
  subitemsSubTitle: {
    fontFamily: 'Cairo-Regular',
    fontSize: 15,
    color: '#fff',
  },
});
const MainPage = props => {
  const scrollView = useRef(null);
  const [selectMenu, setSelected] = useState(null);
  const [subMenu, setSubMenu] = useState([]);
  const [loadingSub, setLoadingSub] = useState(false);

  let translateY = useRef(new Animated.ValueXY()).current;
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

    props.LoadMainCategories();
  }, []);
  useEffect(() => {
    translateY.setValue({x: 0, y: height});
    init();
  }, [props.categoriesReducer.subcategories_devices]);
  useEffect(() => {
    props.getAllNotifications();
  }, []);
  const {user} = props.authReducer;

  return (
    <View nestedScrollEnabled={true} style={styles.mainContaier}>
      <View
        style={{
          ...styles.viewStyle,
          backgroundColor: config.colors.maindarkcolor,
        }}>
        <HeaderComponent
          fontColor={'#fff'}
          toggleDrawer={() => {
            props.navigation.toggleDrawer();
          }}>
          {lang.home.title}
        </HeaderComponent>
        <ScrollView
          horizontal={true}
          ref={scrollView}
          onContentSizeChange={(w, h) => {
            if (I18nManager.isRTL) {
              Platform.OS === 'android'
                ? scrollView.current.scrollTo({x: w})
                : '';
            } else {
              scrollView.current.scrollTo({x: 0});
            }
          }}

          // style={{ flexDirection: 'row-reverse' }}
        >
          {props.categoriesReducer.categories.map(item => {
            return (
              <Card
                onPress={() => {
                  setSelected(item.id);
                  props.LoadSubCategories(item.id);
                  setLoadingSub(true);
                }}
                key={item.id}
                style={{
                  backgroundColor:
                    selectMenu !== item.id ? '#fff' : config.colors.mainBgColor,
                  ...styles.mainItemsCard,
                }}>
                <Card.Content style={styles.mainItems}>
                  {/* <Image
                    style={{
                      width: 50,
                      height: 50,
                      marginVertical: 5,
                      resizeMode: 'contain',
                    }}
                    source={require('../assets/mainitem2.png')}
                  /> */}
                  <View style={{marginVertical: 5}}>
                    <SvgUri
                      fill={selectMenu === item.id ? '#fff' : ''}
                      width="50"
                      height="50"
                      uri={item.icon}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: selectMenu === item.id ? '#fff' : '#000',
                      fontFamily: 'Cairo-Regular',
                    }}>
                    {item.name}
                  </Text>
                </Card.Content>
              </Card>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.subitemStyle}>
        {selectMenu && (
          <Animated.ScrollView
            style={[{transform: [{translateY: translateY.y}]}]}>
            {props.categoriesReducer.subcategories_devices.map(item => {
              return (
                <Card
                  key={item.id}
                  style={{margin: 10, opacity: 7.8}}
                  onPress={() => {
                    props
                      .SetOrderParam({
                        category_id: selectMenu,
                        sub_category_id: item.id,
                      })
                      .then(respo => {
                        props.navigation.navigate('Home2');
                      });
                  }}>
                  <ImageBackground
                    style={{
                      // justifyContent: 'center',
                      height: 120,
                    }}>
                    <Image
                      style={styles.subitemsimageStyle}
                      source={{uri: item.icon}}
                    />

                    <Card.Content
                      style={{
                        ...styles.mainItems,
                        alignItems: 'flex-start',
                        backgroundColor: item.color + 'cc',
                      }}>
                      <Text style={styles.subitemsTitle}>{item.name}</Text>
                      {/* <Text style={styles.subitemsSubTitle}>الثلج المنزلية</Text> */}
                    </Card.Content>
                  </ImageBackground>
                </Card>
              );
            })}
          </Animated.ScrollView>
        )}
        {!selectMenu && (
          <NoDataComp
            navigation={props.navigation}
            NoDataText={lang.home.noData}
          />
        )}
        {props.appReducer.loading && loadingSub && (
          <LoadingComp
            showHeader={false}
            navigation={props.navigation}
            pageTitle={lang.home.title}
          />
        )}
      </View>
      {props.appReducer.loading && !loadingSub && (
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
  getAllNotifications: () =>
    notificationsActions.getAllNotifications()(dispatch),
  LoadMainCategories: () =>
    categoryActions.LoadMainCategories()(dispatch, getState),
  LoadSubCategories: data =>
    categoryActions.LoadSubCategories(data)(dispatch, getState),
  SetOrderParam: data => orderActions.SetOrderParam(data)(dispatch, getState),
  //unloadUser:orderActions () => authActions.unloadUser()(dispatch, getState),
});

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  categoriesReducer: state.categoriesReducer,
  appReducer: state.appReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
