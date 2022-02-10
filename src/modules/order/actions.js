import AsyncStorage from '@react-native-async-storage/async-storage';
import * as t from './actionTypes';
import * as at from '../app/actionTypes';
import axios from '../../helpers/axios';
import * as api from './api';
import {apiErrorMessages} from '../app/actions';

export function SetOrderParam(data) {
  return async dispatch => {
    dispatch({
      type: t.SETORDERREQUESTPARAM,
      data: data,
    });
  };
}
export function unsetSucessOrder(data) {
  return async dispatch => {
    dispatch({
      type: t.UNSETSUCCESSORDER,
    });
  };
}
export function setCanceledFalse() {
  return async dispatch => {
    dispatch({
      type: t.CANCELEDORDER,
      data: {isCanceled: false},
    });
  };
}
export function request_Order(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    dispatch({type: at.GIVE_FEEDBACK, data: {}});
    try {
      const response = await api.requestOrder(data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.ORDERSUCCESS,
            data: response.data.content.data,
          });
          // dispatch({type: at.API_SUCCESS, success: 'userRegistered'});
          dispatch({
            type: t.SETORDERREQUESTPARAM,
            data: {},
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
export function ComplatedOrders() {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    try {
      const response = await api.getComplatedOrders();
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.COMPLATEDORDERS,
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
export function WarrantyOrders() {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    try {
      const response = await api.getWarrantyOrders();
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.WARRANTYORDERS,
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
export function ShippedOrders() {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    try {
      const response = await api.getShippedOrders();
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          dispatch({
            type: t.SHIPPEDDEVICES,
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
export function cancelOrder(order_id) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    try {
      const response = await api.cancel_Order(order_id);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          // dispatch({
          //   type: t.ORDERSTATUS,
          //   data: {status:true,order_id:order_id},
          // });
          dispatch({
            type: t.CANCELEDORDER,
            data: {isCanceled: true, order_id: order_id},
          });
          // dispatch({type: at.API_SUCCESS, success: 'OrderCanceled'});
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
export function makeComplaint(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    try {
      const response = await api.complain(data.data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          // dispatch({
          //   type: t.GOVERNMENTS,
          //   data: response.data.content.data.governorates,
          // });
          dispatch({type: at.API_SUCCESS, success: 'ComplaintDone'});
          await OrderDetails({...data, id: data.data.order_id})(dispatch);

          // data.redirectToMainScreen();
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

export function applyCoupon(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    try {
      const response = await api.apply_coupon(data.data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          // dispatch({
          //   type: t.GOVERNMENTS,
          //   data: response.data.content.data.governorates,
          // });
          dispatch({type: at.API_SUCCESS, success: 'applyCouponSuccess'});
          dispatch({type: t.PROMOCODE, data: 'success'});
          // data.redirectToMainScreen();
        } else {
          await apiErrorMessages(response.data)(dispatch);
          // dispatch({type: at.PROMOCODE, data:  response.data.error });
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
export function warrantyProblem(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    try {
      const response = await api.warranty_problem(data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          // dispatch({
          //   type: t.GOVERNMENTS,
          //   data: response.data.content.data.governorates,
          // });
          dispatch({type: at.API_SUCCESS, success: 'warrantyProblemSuccess'});
          dispatch({type: t.WARRENTYDIALOG, data: false});
          // data.redirectToMainScreen();
        } else {
          await apiErrorMessages(response.data)(dispatch);
          // dispatch({type: at.PROMOCODE, data:  response.data.error });
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
export function setWarrantyDialog(data) {
  return async dispatch => {
    dispatch({
      type: t.WARRENTYDIALOG,
      data: data,
    });
  };
}

export function engineerProfile(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    try {
      const response = await api.engineer_profile(data.data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          // dispatch({
          //   type: t.GOVERNMENTS,
          //   data: response.data.content.data.governorates,
          // });
          // dispatch({type: at.API_SUCCESS, success: 'applyCouponSuccess'});
          dispatch({type: t.ENGINEERPROFILE, data: response.data.content.data});
          // await engineerReviews(data)(dispatch);
          data.redirectToMainScreen();
        } else {
          await apiErrorMessages(response.data)(dispatch);
          // dispatch({type: at.PROMOCODE, data:  response.data.error });
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

export function engineerReviews(data) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });
    try {
      const response = await api.engineer_reviews(data.data);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          // dispatch({
          //   type: t.GOVERNMENTS,
          //   data: response.data.content.data.governorates,
          // });
          // dispatch({type: at.API_SUCCESS, success: 'applyCouponSuccess'});
          dispatch({type: t.ENGINEERREVIEWS, data: response.data.content.data});
        } else {
          await apiErrorMessages(response.data)(dispatch);
          // dispatch({type: at.PROMOCODE, data:  response.data.error });
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

export function receiveDevice(order_id) {
  return async dispatch => {
    dispatch({
      type: at.LOADING_ATTEMPT,
    });

    try {
      const response = await api.received_shipped_device(order_id);
      if (response.status == 200) {
        if (response.data.errorCode === 0 && response.data.result === true) {
          // dispatch({
          //   type: t.GOVERNMENTS,
          //   data: response.data.content.data.governorates,
          // });
          dispatch({type: at.API_SUCCESS, success: 'ReceivedDevice'});
          dispatch({type: t.RECEIVEDDEVICE, data: order_id});

          // data.redirectToMainScreen();
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
