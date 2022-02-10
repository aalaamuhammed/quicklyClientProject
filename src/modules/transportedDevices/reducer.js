import * as t from './actionTypes';

const INITIAL_STATE = {
  currentOrderProcess: {},
  currentOrders: [],
  ComplatedOrders: [],
  WarrantyOrders: [],
  OrderDetails: {},
  orderSucess: false,
  isCanceled: false
};
const OrderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.SETORDERREQUESTPARAM:
      return { ...state, currentOrderProcess: action.data };
      case t.ORDERSUCCESS:
        return { ...state,currentOrderProcess: {} , OrderDetails: action.data ,orderSucess:true};
        case t.UNSETSUCCESSORDER:
          return { ...state, OrderDetails: {} ,orderSucess:false};
          case t.CURRENTORDERS:
      return { ...state, currentOrders: action.data };
    case t.COMPLATEDORDERS:
      return { ...state, ComplatedOrders: action.data };
    case t.WARRANTYORDERS:
      return { ...state, WarrantyOrders: action.data };
    case t.ORDERDETAILS:
      return { ...state, OrderDetails: action.data };
    case t.CANCELEDORDER:
      return { ...state, isCanceled: action.data.isCanceled };
    case t.ORDERSTATUS:
      newOrderDetails=OrderDetails
      newOrderDetails.status=action.data.status 
      return { ...state, OrderDetails:newOrderDetails };

    default:
      return state;
  }
};
export default OrderReducer;
