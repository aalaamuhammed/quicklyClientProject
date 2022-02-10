import * as t from './actionTypes';

const INITIAL_STATE = {
  paymentMethods: [],
};
const paymentmethodsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.PAYMENTMETHODS:
      return {...state, paymentMethods: action.data};

    default:
      return state;
  }
};
export default paymentmethodsReducer;
