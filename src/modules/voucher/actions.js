import * as t from './actionTypes';
import * as at from '../app/actionTypes';
import {apiErrorMessages} from '../app/actions';
import * as api from './api';

export function getVoucherDetails(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});

    try {
      const response = await api.get_voucher_details(data.voucher_id);
      if (response.status === 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.VOUCHERDETAILS,
            data: response.data.content.data,
          });
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
export function voucherCheckout(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});

    try {
      const response = await api.voucher_checkout(data);

      if (response.status === 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.VOUCHERCHECKOUT,
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
