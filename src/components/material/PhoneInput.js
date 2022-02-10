import React, { forwardRef, useRef } from 'react'
import {
  I18nManager,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView, TouchableOpacity, FlatList,
  View, StyleSheet, Text, TextInput,
} from 'react-native'
import common from '../../assets/common'
import config from '../../assets/config.json'
import IntlPhoneInput from 'react-native-intl-phone-input';
import lang from '../../localization';

const styles = StyleSheet.create({
  inputContainer:{
    flex:1,
    maxWidth:'90%',
   justifyContent:'center',
  },
  fieldContainer: {
    borderBottomColor:config.colors.mainBgColor,
    borderBottomWidth:1,
    borderRadius: 0,
  },
  input: {
  
    flex: 1,
    fontSize: 13,
    zIndex: 3,
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 0,
    alignItems: 'center',

    ...common.fontstyles
  },
  errormessage: { ...common.fields.errormessage, ...common.fontstyles },
  label: {
    marginBottom: -8,
    ...common.labels,

  }
})

const PhoneInput = (props, ref) => {

  const renderCustomModal = (modalVisible, countries, onCountryChange) => (
    <Modal visible={modalVisible}>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <View>
            <TextInput placeholder="Search" />
            <Text>🔍</Text>
          </View>
          <FlatList

            style={{ flex: 1 }}
            data={countries}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback style={{ borderWidth: 0, }} onPress={() => onCountryChange(item.code)}>
                <Text>{'DSFSDS'}</Text>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
        <TouchableOpacity onPress={() => inputRef.hideModal()}>
          <Text>CLOSE</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  )
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:13, ...common.dir, }}>
     <View style={{flex:1, height:props.multiline ?  70:30, marginHorizontal:20, marginBottom:20,}}>
        <View style={{ zIndex: 3, alignItems: "flex-start", }}>
          {props.label && <View style={styles.label}>
            <Text style={{ fontSize: 12, ...common.fontstyles, marginHorizontal:13  }}>{props.label}</Text>
          </View>}</View>
        <IntlPhoneInput ref={ref}
          //   customModal={renderCustomModal}
          placeholder={props.placeholder}
          placeholderTextColor='#fff'
          containerStyle={{  ...common.dir,...styles.fieldContainer, borderBottomColor:'#fff',borderBottomWidth:1, backgroundColor:'transparent', }}
          onChangeText={props.onChangeText}
          countryModalStyle={{ borderWidth: 0, borderColor: '#ccc',  backgroundColor:'transparent', }}
          closeText={lang.btns.Cancel}
          filterText={lang.btns.search}
          modalCountryItemCountryNameStyle={{ ...common.fontstyles , color:'#fff'}}
          phoneInputStyle={{
            ...common.dir, 
            ...styles.input,
            ...common.fontstyles,
            writingDirection: !I18nManager.isRTL ? 'rtl' : 'ltr',
            textAlign: !I18nManager.isRTL ? 'right' : 'left',
             color:'#fff'
          }}
          dialCodeTextStyle={{   paddingHorizontal: 3, fontSize: 13, color:'#fff'}}
          flagStyle={{ margin: 0, fontSize: 0,  }}
          lang="EN" defaultCountry="EN" />
      {props.error !== null &&  props.error !== ''  && <Text style={styles.errormessage}>{props.error}</Text>}
        
      </View>
    </View>

  )
}
export default forwardRef(PhoneInput)
