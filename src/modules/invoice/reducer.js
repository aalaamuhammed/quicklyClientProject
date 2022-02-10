import * as t from './actionTypes';

const INITIAL_STATE = {
  invoiceDetails: {},
  doneRating:false,
};
const InvoiceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.INVOICEDETAILS:
      return { ...state, invoiceDetails: action.data ,doneRating:false};

    case t.INVOICECHECKOUT: 
      return { ...state };
    case t.MAKEREVIEW:
      return { ...state, doneRating: action.data};
    default:
      return { ...state };
  }
};
export default InvoiceReducer;
