import * as t from './actionTypes';

const INITIAL_STATE = {
  governorates: [],
  paymentMethods: [],
  PricingBImage: null,
};
const OtherReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.GOVERNMENTS:
      return {...state, governorates: action.data};
      case t.PAYMENTMETHODS:
        return {...state, paymentMethods: action.data};
        case t.PRICINGIMAGE:
          return {...state, PricingBImage: action.data};
    default:
      return state;
  }
};
export default OtherReducer;
