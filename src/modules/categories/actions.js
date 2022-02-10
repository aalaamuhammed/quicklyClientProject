import AsyncStorage from '@react-native-async-storage/async-storage';
import * as t from './actionTypes';
import * as at from '../app/actionTypes';
import {apiErrorMessages} from '../app/actions';
import axios from '../../helpers/axios';
import * as api from './api';

export function LoadMainCategories() {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.mainCategories();
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.MAINCATEGORIES,
            data: response.data.content.data.main_categories,
          });
        } else {
          await apiErrorMessages(response.data)(dispatch);
          //   dispatch({type: at.API_FAILED, error: response.data.message});
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
export function LoadSubCategories(cat_id) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});

    try {
      const response = await api.subCategories(cat_id);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.SUBCATEGORIES,
            data: response.data.content.data.category,
          });
        } else {
          await apiErrorMessages(response.data)(dispatch);
          //  dispatch({type: at.API_FAILED, error: response.data.message});
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

export function LoadDevices(cat_id) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});

    try {
      const response = await api.devices(cat_id);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.DEVICES,
            data: response.data.content.data.category,
          });
        } else {
          await apiErrorMessages(response.data)(dispatch);
          //  dispatch({type: at.API_FAILED, error: response.data.message});
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
export function LoadDeviceBrands(device_id) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.deviceBrands(device_id);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.DEVICEBRANDS,
            data: response.data.content.data.deviceBrands,
          });
        } else {
          await apiErrorMessages(response.data)(dispatch);
          //  dispatch({type: at.API_FAILED, error: response.data.message});
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
export function LoadCompanyTypes(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});

    try {
      const response = await api.companyTypes(data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.COMPANYTYPES,
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
