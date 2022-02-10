import AsyncStorage from '@react-native-async-storage/async-storage';
import * as t from './actionTypes';
import * as at from '../app/actionTypes';
import {apiErrorMessages} from '../app/actions';
import {clientApi} from '../../helpers/axios';
import * as api from './api';
// import * as userActions from '../user/actions';
import RNRestart from 'react-native-restart';

export function unloadUser() {
  return async dispatch => {
    delete clientApi.defaults.headers.common['Authorization'];
    await AsyncStorage.removeItem('user');
    dispatch({
      type: t.UNLOAD_USER,
    });
    RNRestart.Restart();
  };
}
export function loadUser() {
  return async dispatch => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    if (user !== null) {
      const username = user.user;
      const {token} = user;
      dispatch({
        type: t.LOAD_USER,
        data: {username, token},
      });

      clientApi.interceptors.request.use(config => {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
        return config;
      });
      return user;
    }

    dispatch({
      type: t.UNLOAD_USER,
    });
  };
}

export function signupUser(data) {
  // var phone = '+2' + data.data.phone;
  // data.data.phone = phone;

  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.signup(data.data);

      if (response.status == 200) {
        console.log(response.data);
        if (response.data.errorCode === 0 && response.data.result === true) {
          data.redirectToMainScreen(data.data.phone);

          dispatch({type: at.API_SUCCESS, success: 'userRegistered'});
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

export function loginUser(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});

    try {
      const response = await api.login(data.data);

      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          const user = {
            user: response.data.content.data.user,
            token: response.data.content.data.token,
          };
          AsyncStorage.setItem('user', JSON.stringify(user));
          await loadUser()(dispatch);
          await registerPhone(data.token)(dispatch);
          // data.redirectToMainScreen();
        } else {
          // await unloadUser()(dispatch);
          await apiErrorMessages(response.data)(dispatch);

          // dispatch({
          //   type: at.API_FAILED,
          //   error: response.data.errorCode,
          // });
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

export function registerPhone(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});

    try {
      const response = await api.register_phone(data);

      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
        } else {
          //  await apiErrorMessages(response.data)(dispatch);
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
export function SocialLogin(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});

    try {
      const response = await api.social_login(data.data);

      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          const user = {
            user: response.data.content.data.user,
            token: response.data.content.data.token,
          };
          AsyncStorage.setItem('user', JSON.stringify(user));
          await loadUser()(dispatch);
          await registerPhone(data.token)(dispatch);
          data.redirectToMainScreen();
        } else {
          // await unloadUser()(dispatch);
          await apiErrorMessages(response.data)(dispatch);

          // dispatch({
          //   type: at.API_FAILED,
          //   error: response.data.errorCode,
          // });
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
export function forgotPassword(data) {
  // var phone = '+2' + data.data.phone;
  var phone2 = data.data.phone;
  // data.data.phone = phone;
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.forgot_password(data.data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          data.redirectToMainScreen(phone2);
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

export function verifyCodeAfterSignup(data) {
  // var phone = '+2' + data.data.phone;
  // data.data.phone = phone;
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.verify_code2(data.data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          data.redirectToMainScreen();
          dispatch({type: at.API_SUCCESS, success: 'RegisteredandVerified'});
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
export function resend_SignupCode(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.resendSignupCode(data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          // data.redirectToMainScreen(data.data.phone);
        } else {
          apiErrorMessages(response.data);
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
export function verifyCode(data) {
  // var phone = '+2' + data.data.phone;
  // data.data.phone = phone;
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.verify_code(data.data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          data.redirectToMainScreen(data.data);
          dispatch({type: at.API_SUCCESS, success: 'VerifiedCode'});
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

export function resetPassword(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.reset_password(data.data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          data.redirectToMainScreen(data.data.phone);
        } else {
          apiErrorMessages(response.data);
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

export function ChangePassword(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.change_password(data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({type: at.API_SUCCESS, success: 'passwordChanged'});
        } else {
          await apiErrorMessages(response.data)(dispatch);
          //dispatch({type: at.API_FAILED, error: response.data.errorCode});
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

export function refreshNewToken() {
  return async (dispatch, getState) => {
    const loginData = JSON.parse(await AsyncStorage.getItem('user'));

    var refreshToken = loginData.refreshToken;
    //clientId=getState.

    try {
      const response = await api.refreshsession({
        refreshToken: refreshToken,
        clientId: clientId,
      });

      if (response.status == 200) {
        //    redirectToMainScreen();
        const user = {
          user: username,
          token: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          expireAfter: response.data.expireAfter,
        };
      } else {
        unloadUser();
        // dispatch({ type: at.API_FAILED, error: 'response.data.message' });
      }
    } catch (e) {
      unloadUser();

      // dispatch({ type: at.API_FAILED, error: 'apiFail' });
    }
  };
}
