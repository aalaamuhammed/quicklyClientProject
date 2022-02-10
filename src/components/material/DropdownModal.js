import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import lang from '../../localization';
import config from '../../assets/config.json';
import common from '../../assets/common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Appbar} from 'react-native-paper';

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
});

const DropdownModal = props => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.Visible}>
      <View style={styles.mainView}>
        <View style={styles.subView}>
          <View style={{flexDirection: 'row',  justifyContent:'space-between', alignItems: 'center'}}>
            <Text style={styles.modalTitleStyles}>{props.modalTitle}</Text>
            <Appbar.Action
              icon={'close'}
              color={config.colors.mainBgColor}
              onPress={props.close}
            />
          </View>
          
           {props.children}
           
      
          
        </View>
      </View>
    </Modal>
  );
};

export default DropdownModal;
