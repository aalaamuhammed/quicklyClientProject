import AsyncStorage from '@react-native-async-storage/async-storage';
import * as t from './actionTypes';
import * as at from '../app/actionTypes';
import axios from '../../helpers/axios';
import * as api from './api';
import {apiErrorMessages} from '../app/actions';

export function LoadPaymentMethods() {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    try {
      const response = await api.getPaymentMethods();
      if (response.status == 200) {
        dispatch({type: t.PAYMENTMETHODS, data: response.data.content});
      } else {
        dispatch({type: at.API_FAILED, error: response.data.message});
      }
    } catch (e) {
      dispatch({type: at.API_FAILED, error: {msg: 'apiFail', error: e}});
    }

    dispatch({
      type: at.LOADING_FINISH,
    });
  };
}
