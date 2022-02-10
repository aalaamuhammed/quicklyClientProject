import * as React from 'react';
import { View,TouchableOpacity } from 'react-native';
import { Button, Menu, Divider, Provider,Avatar } from 'react-native-paper';
import config from '../../assets/config.json'
import common from '../../assets/common'
const MenuComponent = (props) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const updateBtn = () => {
    //props.onUpdate
    setVisible(false);
  }

  return ( 
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<TouchableOpacity  onPress={openMenu} ><Avatar.Icon size={25} icon="dots-vertical" style={{ padding: 5, margin: 5 ,backgroundColor:'transparent',}} color={config.colors.mainBgColor}  /></TouchableOpacity>}>
          <Menu.Item onPress={()=>{setVisible(false); props.onUpdate()}} titleStyle={{ fontSize: 12, ...common.fontstyles, color:config.colors.fontOverWhite }}  title={props.onUpdateText} />
          <Menu.Item onPress={()=>{setVisible(false); props.onDelete()}} titleStyle={{ fontSize: 12, ...common.fontstyles, color:config.colors.fontOverWhite }}  title={props.onDeleteText} />
        </Menu> 
  );
};

export default MenuComponent;