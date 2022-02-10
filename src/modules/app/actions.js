// import {chooseUser} from './actions';

// const getusertype = (usertype) => (dispatch) => {

// };

// export default getusertype;

import {I18nManager, Platform} from 'react-native';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import unloadUser from '../auth/actions';
import * as t from './actionTypes';
export const setCurrentLanguage = () => dispatch => {
  AsyncStorage.getItem('lang').then(savedLanguage => {
    dispatch({type: 'CHANGE_LANGUAGE', lang: savedLanguage});
  });
};
export const toggleLanguages = clang => dispatch => {
  try {
    AsyncStorage.setItem('lang', clang).then(() => {
      if (clang === 'ar') {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
      RNRestart.Restart();
    });
  } catch (e) {
    RNRestart.Restart();
  }
  setCurrentLanguage()(dispatch);
};
// export const toggleLanguage = () => (dispatch, getState) => {
//   const currentLanguage = getState().appReducer.language
//   if (currentLanguage === 'ar') {
//     dispatch(setCurrentLanguage('en'))
//   } else {
//     dispatch(setCurrentLanguage('ar'))
//   }
// }
// export const chooseType = ({ usertype, redirectToMainScreen }) => async (dispatch) => {
//   dispatch({
//     type: t.LOADING_ATTEMPT,
//   });
//   dispatch({ type: 'CHOOSE_USER_TYPE', usertype });
//   redirectToMainScreen();
//   dispatch({
//     type: t.LOADING_FINISH,
//   });
// };

export function apiErrorMessages(response) {
  return async dispatch => {
    var logoutCode = [101, 102, 107];
    if (logoutCode.includes(response.errorCode)) {
      unloadUser();
    } else if (response.errorCode == 0 && response.result == false) {
      if (response.content.errors != undefined) {
        dispatch({
          type: t.API_FAILED,
          error: {msg: response.content.errors, error: response},
        });
      }
    } else if (response.errorCode == 109) {
      //GIVE_FEEDBACK
      dispatch({type: t.GIVE_FEEDBACK, data: response.content.errors});
    } else {
      dispatch({
        type: t.API_FAILED,
        error: {msg: response.errorCode.toString(), error: response},
      });
    }
  };
}
