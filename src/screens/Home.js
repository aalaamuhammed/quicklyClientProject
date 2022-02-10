import React, {useEffect} from 'react';
import {actions as appActions} from '../modules/app';
import {actions as authActions} from '../modules/auth';
import store from '../features/redux/store';
import {connect} from 'react-redux';
import TabNavigator from '../router/TabNavigator';
const HomeScreen = props => {
  return <TabNavigator />;
};

export default HomeScreen;
