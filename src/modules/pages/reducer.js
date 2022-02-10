import * as t from './actionTypes';

const INITIAL_STATE = {
  app_description: {},
  about_us: {},
  terms_condations: {},
  support_info: {},
  app_version: null,
};
const PagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.APPDESCRIPTION:
      return {...state, app_description: action.data};
    case t.ABOUTUS:
      return {...state, about_us: action.data};
    case t.TERMSCONDATIONS:
      return {...state, terms_condations: action.data};
    case t.SUPPORTINFO:
      return {...state, support_info: action.data};
    case t.APPVERSION:
      return {...state, app_version: action.data};

    default:
      return {...state};
  }
};
export default PagesReducer;
