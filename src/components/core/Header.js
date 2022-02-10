import React, {useState} from 'react';
import {
  TextInput,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';
import Menu from '../../assets/menu.svg';
//import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../../assets/config.json';
import common from '../../assets/common';
const HeaderComponent = props => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Appbar.Header style={{backgroundColor: 'transparent'}}>
       {props.headerbtn2 !== undefined && (
        <Appbar.Action
          icon={'chevron-' + common.diropp}
          color={'#fff'}
          onPress={props.headerbtn2}
        />
      )}
     
      <View style={styles.headerStyle}>
        <Text style={{...styles.titleStyle, color: props.fontColor}}>
          {props.children}
        </Text>
      </View>
      {props.toggleDrawer&& <TouchableOpacity  onPress={props.toggleDrawer} >
        <Menu
       
        style={I18nManager.isRTL?{ color: props.fontColor,transform: [{ scaleX:-1}]}:{color: props.fontColor}}
      />
      </TouchableOpacity>}
    </Appbar.Header>
  );
};
const styles = StyleSheet.create({
  headerStyle: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#fff',
    fontFamily: 'Cairo-Regular',
    textAlign: 'center',
  },
});

export {HeaderComponent};
