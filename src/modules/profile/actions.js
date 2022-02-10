import AsyncStorage from '@react-native-async-storage/async-storage';
import * as t from './actionTypes';
import * as at from '../app/actionTypes';
import axios from '../../helpers/axios';
import * as api from './api';
import {apiErrorMessages} from '../app/actions';

export function ProfileInfo() {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    try {
      const response = await api.profiledata();
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.USERINFO,
            data: response.data.content.data,
          });
          try {
            const response = await api.getReview();
            if (response.status == 200) {
              if (
                response.data.errorCode === 0 &&
                response.data.result === true
              ) {
                dispatch({
                  type: t.REVIEW,
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

export function profileUpdate(dataa) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    var FormData = require('form-data');
    var data = new FormData();
    if (dataa.data.image != null) {
      var photo = {
        uri: dataa.data.image.uri,
        type: 'image/jpeg',
        name: Date.now() + '.jpg',
        type: 'multipart/form-data',
      };
      data.append('profile_pic', photo);
    }
    // const image = `data:image/jpeg;base64,${data.image}`;
    // var FormData = require('form-data');
    // var fs = require('fs');
    data.append('lname', dataa.data.lname);
    data.append('fname', dataa.data.fname);
    data.append('email', dataa.data.email);
    data.append('phone', dataa.data.phone);
    data.append('governorate_id', dataa.data.governorate_id);
    data.append('city_id', dataa.data.city_id);
    try {
      const response = await api.profile_Update(data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          // dispatch({
          //   type: t.USERINFO,
          //   data: response.data.content.data.governorates,
          // });
          dispatch({type: at.API_SUCCESS, success: 'userRegistered'});
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

export function AllReviews() {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    try {
      const response = await api.getReview();
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.REVIEW,
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

export function makeReview(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});

    try {
      const response = await api.review_app(data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.MAKEREVIEW,
            data: false,
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
export function changeReviewDialog(data) {
  return async dispatch => {
    dispatch({
      type: t.MAKEREVIEW,
      data: data,
    });
  };
}
