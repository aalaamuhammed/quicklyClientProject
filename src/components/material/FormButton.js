import React from 'react'
import {
   TouchableOpacity,StyleSheet, Text
} from 'react-native';
import config from '../../assets/config.json'
import common from '../../assets/common'
import lang from '../../localization';
import { Button } from 'react-native-paper';
const styles = StyleSheet.create({
  textStyle:{ 
    ...common.fontstyles,
    fontFamily:'Cairo-Bold',
    color: config.colors.mainBgColor, 
    fontSize: 14 ,
    textAlign:'center',
  }
})
const FormButton = (props) => (
  // <TouchableOpacity  style={{borderColor:config.colors.mainBgColor, backgroundColor:'#fff', borderRadius:5, paddingVertical:5, borderWidth:2, flex:1,  margin:20,   opacity:props.disabled ? 0.5 : 1,}}  mode="outlined" {...props}>
  //   <Text style={styles.textStyle} >
  //   { props.children }
  //   </Text>
  // </TouchableOpacity>
  <Button loading={props.loadingprop} onPress={props.onPress}  disabled={props.loadingprop}  labelStyle={{...styles.textStyle,...props.textStyles}} 
  contentStyle={{justifyContent:'center',alignItems:'center'}}
  style={{borderColor:props.disabled ? config.colors.darkGrayColor:config.colors.mainBgColor, backgroundColor:'#fff', borderRadius:5, paddingVertical:0, borderWidth:2, flex:1,  margin:20,   opacity:props.disabled ? 0.5 : 1,...props.styleprops}}  mode="outlined" {...props}>
       {props.loadingprop? lang.home.loading: props.children }
</Button>
)

export default FormButton 
