import * as t from './actionTypes';

const INITIAL_STATE = {
  voucherDetails: {},
};
const VoucherReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.VOUCHERDETAILS:
      return {...state, voucherDetails: action.data};
    case t.VOUCHERCHECKOUT:
      const sm = state.notifications.findIndex(s => s.id === action.data);
      if (sm) {
        state.notifications[sm].read = 1;
      }
      var notifications = state.notifications;
      return {...state, notifications: notifications};

    default:
      return {...state};
  }
};
export default VoucherReducer;
