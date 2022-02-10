/* eslint-disable prettier/prettier */
import * as t from './actionTypes';

const INITIAL_STATE = {user: undefined, token: undefined, error: ''};
const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.LOAD_USER:
      return {
        ...INITIAL_STATE,
        user: action.data.username,
        token: action.data.token,
      };
    case t.UNLOAD_USER:
      return {...INITIAL_STATE, user: null, token: null};
    default:
      return state;
  }
};
export default authReducer;
