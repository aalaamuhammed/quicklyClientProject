import * as t from './actionTypes';

const INITIAL_STATE = {
  creditCards:[],
  oneCreditCard: null,
};
const creditCardsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.ALL_CREDITCARDS: 
    return {...state, creditCards: action.data};
  case t.ONE_CREDIT: 
    return {...state, oneCreditCard: action.data};
  case t.DELETE_CREDITCARD:
    const index = state.creditCards.findIndex(s => s.id === action.data);
    if (index === -1) {
    }
    state.creditCards.splice(index, 1);
    var newcreditCards= state.creditCards;
    return {
      ...state, 
      creditCards: newcreditCards,
    };
  case t.UPDATE_CREDIT:
    const sm = state.creditCards.find((s) => s.id === action.data.id)
    if (sm) {
     Object.assign(sm, action.data)
   }
    return {...state, creditCards:[...state.creditCards]};
  case t.ADD_CreditCard:
    state.creditCards.unshift(action.data)
    var newcreditCards =state.creditCards
    return {...state, creditCards: newcreditCards};

    default:
      return state;
  }
};
export default creditCardsReducer;
