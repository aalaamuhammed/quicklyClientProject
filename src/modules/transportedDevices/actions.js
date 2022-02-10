import AsyncStorage from '@react-native-async-storage/async-storage';
import * as t from './actionTypes';
import * as at from '../app/actionTypes';
import axios from '../../helpers/axios';
import * as api from './api';
import {apiErrorMessages} from '../app/actions';

export function CurrentOrders() {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    try {
      const response = await api.getCurrentOrders();
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.CURRENTORDERS,
            data: response.data.content.data,
          });
        } else {
          await apiErrorMessages(response.data)(dispatch);
        }
      }
    } catch (e) {
      dispatch({type: at.API_FAILED, error: {msg: 'apiFail', error: e}});
    }

    dispatch({
      type: at.LOADING_FINISH,
    });
  };
}
export function OrderDetails(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    try {
      const response = await api.getOrderDetails(data.id);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.ORDERDETAILS,
            data: response.data.content.data,
          });
          data.redirectToMainScreen();
        } else {
          await apiErrorMessages(response.data)(dispatch);
        }
      }
    } catch (e) {
      dispatch({type: at.API_FAILED, error: {msg: 'apiFail', error: e}});
    }

    dispatch({
      type: at.LOADING_FINISH,
    });
  };
}
