import * as t from './actionTypes';

const INITIAL_STATE = {
  categories: [],
  subcategories: {},
  subcategories_devices: [],
  devices: {devices:[]},
  deviceBrands: {brands:[]},
  companyTypes: null,
};
const categoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.MAINCATEGORIES:
      return {...state, categories: action.data};
    case t.SUBCATEGORIES:
      return {
        ...state,
        subcategories: action.data,
        subcategories_devices: action.data.sub_categories,
      };
      case t.DEVICES:
        return {
          ...state,
          devices: action.data, 
        };
        case t.DEVICEBRANDS:
      return {
        ...state,
        deviceBrands: action.data,
       };
    case t.COMPANYTYPES:
      return {  
        ...state,
        companyTypes: action.data,
      
      };
    default:
      return state;
  }
};
export default categoriesReducer;
