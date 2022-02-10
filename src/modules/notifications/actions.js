import AsyncStorage from '@react-native-async-storage/async-storage';
import * as t from './actionTypes';
import * as at from '../app/actionTypes';
import axios from '../../helpers/axios';
import {apiErrorMessages} from '../app/actions';
import * as api from './api';

export function getAllNotifications() {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});

    try {
      const response = await api.get_allNotifications();
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.ALLNOTIFICATIONS,
            data: response.data.content.data,
          });
        } else {
          await apiErrorMessages(response.data)(dispatch);
          // dispatch({type: at.API_FAILED, error: response.data.message});
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
export function MarkAsRead(data) {
  return async dispatch => {
    // dispatch({
    //   type: at.LOADING_ATTEMPT,
    // });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});

    try {
      const response = await api.mark_as_read(data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.MARKASREAD,
            data: data,
          });
          //  actions.LoadGovernorates();
        } else {
          await apiErrorMessages(response.data)(dispatch);
          // dispatch({type: at.API_FAILED, error: response.data.message});
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
