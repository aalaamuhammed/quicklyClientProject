import React,{useRef} from 'react'
import {
  View, StyleSheet, Text, Dimensions,
} from 'react-native'
import MultiSelect from 'react-native-multiple-select';
import lang from '../../localization'
import config from '../../assets/config.json'
import common from '../../assets/common'

const styles = StyleSheet.create({
  inputContainer: common.fields.container,
  errormessage: { ...common.fields.errormessage, ...common.fontstyles },
  DropdownStyle: {
    ...common.fields.fieldContainer
  },
  label: {
    marginBottom: -3,
    zIndex: 99,
    ...common.labels
  }
})

const DropdownComp = (props) => {
  const DropdownRef = useRef(null);
  return (

 
      <View style={{...styles.inputContainer,marginTop: 10,marginVertical: props.error?0:0, }}>
        {/* <View style={{ zIndex: 99, alignItems: "flex-start",padding:0, }}>
          {props.label && <View style={styles.label}>
            <Text style={{ marginHorizontal:12, fontSize: 12,padding:0, zIndex: 99, ...common.fontstyles }}>{props.label}</Text>
          </View>}</View> */}
        <MultiSelect
          ref={props.DropdownRef1}
          items={props.items}
          uniqueKey={props.uniqueKey}
          onSelectedItemsChange={
            props.onSelectedItemsChange}
            onToggleList={props.onToggleList}
          selectedItems={props.selectedItems}
          hideDropdown={props.hideDropdown}
          textInputProp = {
         {   autoFocus :false}
        }
          styleDropdownMenu={{ height: 35, }}
          styleInputGroup={{ zIndex: 1,borderWidth: 1, height: 35, backgroundColor:'#FAFBFE', borderColor: config.colors.lightGrayColor,}}
          styleItemsContainer={{ zIndex: 1,paddingVertical:10, }}
          styleListContainer={{ zIndex: 1, }}
          single={props.single}
          itemFontSize={12}
          selectText={props.selectText}
          submitButtonText={lang.btns.Ok}
          submitButtonColor={config.colors.mainBgColor}
          styleTextDropdown={{fontSize: 12 , ...common.fontstyles,marginVertical:0, paddingVertical:0,}}
          styleTextDropdownSelected={{fontSize: 12 , ...common.fontstyles,paddingHorizontal:12,color:config.colors.mainBgColor}}
          styleTextTag={{fontSize: 12 , ...common.fontstyles}}
          searchInputPlaceholderText={props.searchInputPlaceholderText}
          displayKey={props.displayKey}
 
          styleDropdownMenuSubsection={{ borderWidth: 1, height: 35, backgroundColor:'#FAFBFE', borderColor: config.colors.lightGrayColor, marginVertical:0, paddingVertical:0,paddingTop: 2, paddingBottom: 2,paddingLeft:5,paddingRight:5}}
          styleMainWrapper={{ zIndex: 1, }}
          flatListProps={{
              style:common.fontstyles,
          }}
          // onChangeInput={(text) => console.log(text, 'ffff')}
          FontFamily="Almarai-Regular"
          tagRemoveIconColor={config.colors.mainBgColor}
          tagBorderColor={config.colors.mainBgColor}
          tagTextColor={config.colors.mainBgColor}
          selectedItemTextColor={config.colors.mainBgColor}
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          searchInputStyle={{ color:'#000a', zIndex: 1,  height: 40, fontSize: 12, ...common.fontstyles }}
        /> 
        {props.error && (
          <Text style={styles.errormessage}>{props.error}</Text>
        )}
      </View>
   

  )
}

export default DropdownComp
