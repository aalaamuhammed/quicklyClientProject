import AsyncStorage from '@react-native-async-storage/async-storage';
import * as t from './actionTypes';
import * as at from '../app/actionTypes';
import axios from '../../helpers/axios';
import {apiErrorMessages} from '../app/actions';
import * as api from './api';

export function addCreditCard(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.create_Card({
        // cvv: data.data.cvv,
        expire_date: data.data.expire_date,
        name: data.data.name,
        number: data.data.number,
      });
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          await getAllCards()(dispatch);
          data.redirectToMainScreen();
          // dispatch({
          //   type: t.ADD_CreditCard,
          //   data: response.data.content.data,
          // });
          dispatch({type: at.API_SUCCESS, success: 'addCard'});
        } else {
          await apiErrorMessages(response.data)(dispatch);
          //  dispatch({type: at.API_FAILED, error: response.data.errorCode});
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
export function updateCreditCard(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.edit_Card({
        card_id: data.data.id,
        // cvv: data.data.cvv,
        expire_date: data.data.expire_date,
        name: data.data.name,
        number: data.data.number,
      });
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.UPDATE_CREDIT,
            data: data.data,
          });
          data.redirectToMainScreen();
          dispatch({type: at.API_SUCCESS, success: 'cardupdated'});
        } else {
          await apiErrorMessages(response.data)(dispatch);
          //  dispatch({type: at.API_FAILED, error: response.data.errorCode});
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
export function deleteCreditCard(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.delete_Card(data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          // data.redirectToMainScreen(data.data.phone);
          dispatch({
            type: t.DELETE_CREDITCARD,
            data: data,
          });
          dispatch({type: at.API_SUCCESS, success: 'cardDeleted'});
        } else {
          await apiErrorMessages(response.data)(dispatch);
          // dispatch({type: at.API_FAILED, error: response.data.errorCode});
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
export function getAllCards() {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.get_all_Cards();
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.ALL_CREDITCARDS,
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
export function getOneCredit(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.view_One_Card(data.id);

      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.ONE_CREDIT,
            data: response.data.content.data,
          });
          //  actions.LoadGovernorates();
          data.redirectToMainScreen();
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
