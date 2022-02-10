import React, {useRef, useEffect} from 'react';
import {
  I18nManager,
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../assets/common';
import config from '../../assets/config.json';
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  inputContainer: common.fields.container,
  fieldContainer: {
    ...common.fields.fieldContainer,
    height: 35,
   },
  SignupInput: {
    ...common.fields.fieldContainer,
    height: 35,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    },
  ErrorInput: {
    ...common.fields.fieldContainer,
    height: 35,
    borderColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    }, 
  SignupText: {
    flex: 1,
    fontSize: 13,
    color: '#FFFFFF',
    zIndex: 3,
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 0,
    alignItems: 'center',
    ...common.fontstyles,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    
   },
  input: {
    flex: 1,
    fontSize: 13,
    color: config.colors.mainBgColor,
    zIndex: 3,
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 0,
    alignItems: 'center',
    ...common.fontstyles,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
  errormessage: {...common.fields.errormessage, fontFamily: 'Cairo-Regular'},
  icon: {
    color: config.colors.darkGrayColor,
    fontSize: 22,
    width: 25,
  },
  SignupIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    width: 25,
  },
  label: {
    marginBottom: -8,
    ...common.labels,
  },
});

const InputField = props => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.setNativeProps({
      style: {fontFamily: 'Cairo-Regular'},
    });
  }, []);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',  
        marginVertical: props.error && props.signup ? 0: 10,
      }}>
      <View style={{...styles.inputContainer,...props.containerStyles}}>
        {/* <View style={{zIndex: 3, alignItems: 'flex-start'}}>
        {props.label && (
          <View style={styles.label}>
            <Text style={{fontSize: 10, ...common.fontstyles}}>
              {props.label}
            </Text>
          </View>
        )}
      </View> */}
        <View
          style={
            props.signup
              ? styles.SignupInput
              : props.error 
              ? {...styles.ErrorInput,...props.ErrorStyle} 
              : {...styles.fieldContainer,...props.containerStyles}
          }>
          {props.preicon}
          {/* {props.preicon && (
            <MaterialCommunityIcons  style={props.signup ? styles.SignupIcon : styles.icon} name={props.preicon} />
          )} */}
          <TextInput
            ref={inputRef}
            placeholderTextColor={config.colors.darkGrayColor}
            placeholderStyle={common.fontstyles}
            {...props}
            style={[props.signup ? styles.SignupText : styles.input,props.inputTextStyle]}
          />
          {props.posticon}
          {/* {props.posticon && (
          <MaterialCommunityIcons
            onPress={props.postIconFunction}
            style={props.signup ? styles.SignupIcon : styles.icon}
            name={props.posticon}
          />
        )} */}
          {props.postText && (
            <Text style={{color: props.signup ?'#fff': config.colors.darkGrayColor, fontSize: 13,paddingHorizontal:4,}}> {props.postText}</Text>
          )}
        </View>
        {props.error && (
          <Text style={styles.errormessage}>{props.error}</Text>
        )}
      </View>
    </View>
  );
};

export default InputField;
