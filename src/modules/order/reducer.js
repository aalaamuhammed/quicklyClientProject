import * as t from './actionTypes';

const INITIAL_STATE = {
  currentOrderProcess: {},
  currentOrders: [],
  ComplatedOrders: [],
  WarrantyOrders: [],
  OrderDetails: {},
  orderSucess: false,
  isCanceled: false,
  maintainanceDialog: false,
  promocode: null,
  engineerProfile: null,
  engineerReviews: [],
  ShippedDevices: [],

};
const OrderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.SETORDERREQUESTPARAM:
      return { ...state, currentOrderProcess: action.data };
    case t.ORDERSUCCESS:
      return { ...state, currentOrderProcess: {}, OrderDetails: action.data, orderSucess: true };
    case t.UNSETSUCCESSORDER:
      return { ...state, OrderDetails: {}, orderSucess: false };
    case t.CURRENTORDERS:
      return { ...state, currentOrders: action.data };
    case t.COMPLATEDORDERS:
      return { ...state, ComplatedOrders: action.data };
    case t.WARRANTYORDERS:
      return { ...state, WarrantyOrders: action.data };
    case t.SHIPPEDDEVICES:
      return { ...state, ShippedDevices: action.data };
    case t.ORDERDETAILS:
      return { ...state, OrderDetails: action.data };
    case t.CANCELEDORDER:
      return { ...state, isCanceled: action.data.isCanceled };
    case t.ORDERSTATUS:
      var newOrderDetails = state.OrderDetails
      newOrderDetails.status = action.data.status
      return { ...state, OrderDetails: newOrderDetails };
    case t.PROMOCODE:
      return { ...state, promocode: action.data };
    case t.ENGINEERPROFILE:
      return { ...state, engineerProfile: action.data };
    case t.ENGINEERREVIEWS:
      return { ...state, engineerReviews: action.data };
    case t.RECEIVEDDEVICE: 
      var newOrderDetails = state.OrderDetails
      newOrderDetails.status = "23"
      return { ...state, OrderDetails: newOrderDetails }; 
        case t.WARRENTYDIALOG: 
        return { ...state, maintainanceDialog: action.data };
        
    default:
      return state;
  }
};
export default OrderReducer;
