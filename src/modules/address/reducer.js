import * as t from './actionTypes';

const INITIAL_STATE = {
  addresses:[],
  oneAddress: null,
};
const AddressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.ALL_ADDRESSES: 
      return {...state, addresses: action.data};
    case t.ONE_ADDRESS:  
      return {...state, oneAddress: action.data};
    case t.DELETE_ADDRESS:
      const index = state.addresses.findIndex(s => s.id === action.data);
      if (index === -1) {
      }
      state.addresses.splice(index, 1);
      var newaddresses = state.addresses;
      return {
        ...state,

        addresses: newaddresses,
      };
    case t.UPDATE_ADDRESS:

      const sm = state.addresses.find((s) => s.id === action.data.id)
      if (sm) {
       Object.assign(sm, action.data)
     }
     var addresses =state.addresses
      return {...state, addresses:addresses};
    case t.ADD_ADDRESS:
      state.addresses.unshift(action.data)
      var newaddresses =state.addresses
      return {...state, addresses: newaddresses};

    default:
      return {...state};
  }
};
export default AddressReducer;
