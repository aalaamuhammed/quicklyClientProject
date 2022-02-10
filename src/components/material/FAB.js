import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import config from '../../assets/config.json'
const FABComponent = (props) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
        <FAB.Group
          open={open}
          icon={open ? props.openFAB : props.closedFAB}
          actions={props.actions}
          onStateChange={onStateChange}
          color={config.colors.fontColor}
          fabStyle={{backgroundColor:config.colors.mainBgColor}}
        //   onPress={() => {
        //     if (open) {
        //       // do something if the speed dial is open
        //       console.log('hi')
        //     }
        //   }}
        />
      </Portal>
  );
};

export default FABComponent;