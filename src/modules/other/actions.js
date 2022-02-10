import AsyncStorage from '@react-native-async-storage/async-storage';
import * as t from './actionTypes';
import * as at from '../app/actionTypes';
import axios from '../../helpers/axios';
import {apiErrorMessages} from '../app/actions';
import * as api from './api';

export function LoadGovernorates() {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.getGovernorates();
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.GOVERNMENTS,
            data: response.data.content.data.governorates,
          });
        } else {
          await apiErrorMessages(response.data)(dispatch);
          // dispatch({type: at.API_FAILED, error: response.data.message});
        }
      }
    } catch (e) {
      dispatch({type: at.API_FAILED, error: 'apiFail'});
    }

    dispatch({
      type: at.LOADING_FINISH,
    });
  };
}
export function PricingRequestImage() {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.pricing_background_img();
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.PRICINGIMAGE,
            data: response.data.content.data,
          });
        } else {
          await apiErrorMessages(response.data)(dispatch);
          // dispatch({type: at.API_FAILED, error: response.data.message});
        }
      }
    } catch (e) {
      dispatch({type: at.API_FAILED, error: 'apiFail'});
    }

    dispatch({
      type: at.LOADING_FINISH,
    });
  };
}
export function pricingRequest(dataa) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    var FormData = require('form-data');

    var photo = {
      uri: dataa.image.uri,
      type: 'image/jpeg',
      name: Date.now() + '.jpg',
      type: 'multipart/form-data',
    };
    // let image = new FormData();
    // image.append('file', dataa.image);

    // const image = `data:image/jpeg;base64,${data.image}`;
    // var FormData = require('form-data');
    // var fs = require('fs');
    var data = new FormData();
    data.append('device_id', dataa.data.device_id);
    data.append('brand_id', dataa.data.brand_id);
    data.append('comment', dataa.data.comment);
    data.append('image', photo);
    // data.append('image', fs.createReadStream('BBZuu6JbK/image-001.png'));
    try {
      const response = await api.Request_Pricing(data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: at.API_SUCCESS,
            success: 'PricingRequested',
          });
          dataa.redirectToMainScreen();
        } else {
          await apiErrorMessages(response.data)(dispatch);
          // dispatch({type: at.API_FAILED, error: response.data.message});
        }
      }
    } catch (e) {
      dispatch({type: at.API_FAILED, error: 'apiFail' + e});
    }

    dispatch({
      type: at.LOADING_FINISH,
    });
  };
}

export function LoadPaymentMethods() {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});

    try {
      const response = await api.getPaymentMethods();
      if (response.status == 200) {
        dispatch({
          type: t.PAYMENTMETHODS,
          data: response.data.content.data.payment_methods,
        });
      } else {
        await apiErrorMessages(response.data)(dispatch);
        // dispatch({type: at.API_FAILED, error: response.data.message});
      }
    } catch (e) {
      dispatch({type: at.API_FAILED, error: 'apiFail'});
    }

    dispatch({
      type: at.LOADING_FINISH,
    });
  };
}
