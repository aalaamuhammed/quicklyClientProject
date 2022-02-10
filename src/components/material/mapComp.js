import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Platform,
  ScrollView,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import lang from '../../localization';
import { connect } from 'react-redux';
import config from '../../assets/config.json';
import common from '../../assets/common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appbar } from 'react-native-paper';
// import LoadingImg from '../../assets/images/loadingImg';
import * as Svg from '../../assets/images';
import { HeaderComponent } from '../core/Header';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import FormButton from './FormButton';
import Geolocation from '@react-native-community/geolocation';
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    margin: 0,
    marginTop: 0,
  },
  subView: {
    height: '60%',
    width: '80%',
    backgroundColor: 'white',
    // justifyContent: 'center',
    // borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 0,
  },
  modalTitleStyles: {
    color: config.colors.mainBgColor,
    ...common.fontstyles,
    textAlign: 'center',
    fontSize: 18,
    margin: 20,
  },
  loading: {
    position: 'absolute',

    backgroundColor: '#ffffff',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  LoadingText: {
    padding: 10,
    color: config.colors.darkGrayColor,
    fontFamily: 'Cairo-Regular',
  },
  viewStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  FooterStyles: {
    backgroundColor: config.colors.maindarkcolor,
    width: '100%',
    borderTopWidth: 5,
    borderTopColor: config.colors.mainBgColor,
    padding: 5,
  },
  detailedFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  NotDetailedFooter: {
    maxWidth: '60%',
  },
  LocText: {
    ...common.fontstyles,
    color: config.colors.mainBgColor,
    fontSize: 12,
    padding: 5,
  },
  ErrorLoc: {
    ...common.fontstyles,
    color: config.colors.dangerColor,
    fontSize: 10,
    padding: 5,
  },
  StreetText: {
    ...common.fontstyles,
    color: config.colors.darkGrayColor,
    fontSize: 10,
    padding: 5,
  },
  swichbtn: {
    fontFamily: 'Cairo-Regular',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MapModal = props => {
  //check location

  const [region, setRegion] = useState(
    props.oldlocation === 'update'
    ? {
      latitude: parseFloat(props.AddressReducer.oneAddress.lat),
      longitude: parseFloat(props.AddressReducer.oneAddress.long),
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }:{
    latitude: 30.05749029195056,
    longitude: 31.360107314447184,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const [markerCoordinate, setMarkerCoordinate] = useState(
    props.oldlocation === 'update'
      ? {
        latitude: parseFloat(props.AddressReducer.oneAddress.lat),
        longitude: parseFloat(props.AddressReducer.oneAddress.long),
      }
      : {
        latitude: 30.05749029195056,
        longitude: 31.360107314447184,
      }
  );
  const [detailedFooter, setDetailedFooter] = useState(false);
  const [invalidLocation, setInvalidLocation] = useState(false);
  const checkGps = async () => {
    if (Platform.OS !== 'android') {
      Geolocation.requestAuthorization();
    } else {


      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Cool Photo App Camera Permission",
            message:
              "Cool Photo App needs access to your camera " +
              "so you can take awesome pictures.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }
  const setLoc=()=>{
    if (props.oldlocation === 'update') {
      getlocationInfo({
        latitude: parseFloat(props.AddressReducer.oneAddress.lat),
        longitude: parseFloat(props.AddressReducer.oneAddress.long),
      });
      setRegion({
        latitude: parseFloat(props.AddressReducer.oneAddress.lat),
        longitude: parseFloat(props.AddressReducer.oneAddress.long),
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
     
    } else {

      Geolocation.setRNConfiguration(config);
      Geolocation.getCurrentPosition(info => {
        setRegion({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
        getlocationInfo({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      });
    }
  }
  useEffect(() => { checkGps();  setLoc(); }, [])
 

  const getupdateLoc = LatLng => {
    var Loc = {
      lat: LatLng.latitude,
      lng: LatLng.longitude,
    };
    Geocoder.geocodePosition(Loc).then(res => {
      return {
        latitude: res[0].position.lat,
        longitude: res[0].position.lng,
        governorate: res[0].adminArea,
        country: res[0].country,
        countryCode: res[0].countryCode,
        locale: res[0].locale,
        city: Platform.OS !== 'android'?res[0].subAdminArea:res[0].locality,
        streetName: res[0].streetName,
      };
    });
  };
  const getlocationInfo = LatLng => {
    var Loc = {
      lat: LatLng.latitude,
      lng: LatLng.longitude,
    };
    Geocoder.geocodePosition(Loc)
      .then(res => {
        // res is an Array of geocoding object (see below)
        setMarkerCoordinate({
          latitude: LatLng.latitude,
          longitude:  LatLng.longitude,
          governorate: res[0].adminArea,
          country: res[0].country,
          countryCode: res[0].countryCode,
          locale: res[0].locale,
          city: Platform.OS === 'android'?res[0].subAdminArea:res[0].locality,
          streetName: res[0].streetName,
        });
        if (res[0].countryCode == 'EG') {
          
          setInvalidLocation(false);
          // props.sendDataToParent(markerCoordinate)
        } else {
       
          setInvalidLocation(true);
          // props.sendDataToParent(markerCoordinate)
        }
      })
      .catch(err =>  {});
  };
  return (
    <Modal animationType="slide" transparent={true} visible={props.Visible}>
      <View style={styles.mainView}>
        <View
          style={{
            ...styles.loading,
          }}>
          {/* <HeaderComponent
            // toggleDrawer={() => props.navigation.toggleDrawer()}
            fontColor={config.colors.mainBgColor}>
            {lang.addresses.selectPlace}
          </HeaderComponent> */}

          <View style={styles.viewStyle}>
            <MapView
              style={styles.map} 
               initialRegion={region}
               region={region}
              zoomEnabled={true}
              provider={PROVIDER_GOOGLE}
              
            //  animateToRegion={region}
              showsUserLocation={true}
              onPress={LatLng => {
                getlocationInfo(LatLng.nativeEvent.coordinate);
                Platform.OS === 'android'?'': setRegion(LatLng.nativeEvent.coordinate);
                
              }}
              onRegionChangeComplete={region => {
                Platform.OS === 'android'?
                setRegion(region):''
             
              }}
            >
              <Marker coordinate={markerCoordinate} />
            </MapView>
            <View style={{  
    width: '100%',  }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {detailedFooter && !invalidLocation && (
                  <FormButton
                    textStyles={{ color: '#fff', fontSize: 13 }}
                    styleprops={{
                      borderColor: 'transparent',
                      backgroundColor: config.colors.mainBgColor,
                      width:50,
                      maxWidth:'40%'
                    }}
                    onPress={() => props.sendDataToParent(markerCoordinate)}
                    loadingprop={false}>
                    {lang.addresses.select}
                  </FormButton>
                )}

              </View>

             <View style={{ position: 'absolute', 
                  left: 0, 
                  bottom: 15,}}>
             <TouchableOpacity
                style={{
                  
                  position: 'absolute', 
                  left: 0, 
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 12,
                  margin: 5,
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  maxWidth: 80,
                  minWidth: 80,
                }}
                onPress={() => setLoc()}>
                <Svg.Iconlocation width={22} height={22} style={{ color: config.colors.mainBgColor }} />
              </TouchableOpacity>
             </View>

            </View>
            <View style={styles.FooterStyles}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={
                    detailedFooter
                      ? styles.detailedFooter
                      : styles.NotDetailedFooter
                  }>
                  <TouchableOpacity
                    style={{
                      ...styles.swichbtn,
                      paddingVertical: 1,
                      maxWidth: detailedFooter ? '50%' : '100%',
                    }}
                    onPress={() => setDetailedFooter(!detailedFooter)}>

                    <MaterialCommunityIcons
                      style={{
                        fontSize: 25,
                        color: config.colors.mainBgColor,
                      }}
                      name={!detailedFooter ? 'chevron-down' : 'chevron-up'}
                    />
                    {markerCoordinate && (
                      <Text style={styles.LocText}>
                        {markerCoordinate.governorate +
                          ' , ' +
                          markerCoordinate.city}
                      </Text>
                    )}
                  </TouchableOpacity>
                  {markerCoordinate && (
                    <Text
                      style={{
                        ...styles.StreetText,
                        paddingHorizontal: !detailedFooter ? 25 : 5,
                      }}>
                      {markerCoordinate.streetName}
                    </Text>
                  )}
                </View>
                {!detailedFooter && !invalidLocation && (
                  <FormButton
                    textStyles={{ color: '#fff', fontSize: 13 }}
                    styleprops={{
                      borderColor: 'transparent',
                      backgroundColor: config.colors.mainBgColor,
                      maxWidth: '40%',
                    }}
                    onPress={() => props.sendDataToParent(markerCoordinate)}
                    loadingprop={false}>
                    {lang.addresses.select}
                  </FormButton>
                )}
              </View>
              {invalidLocation && (
                <Text style={styles.ErrorLoc}>{lang.addresses.invalidAddress}</Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const mapStateToProps = state => ({
  AddressReducer: state.AddressReducer,
});
export default connect(mapStateToProps, null)(MapModal);
