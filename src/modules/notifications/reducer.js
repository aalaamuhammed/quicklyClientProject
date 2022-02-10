import * as t from './actionTypes';

const INITIAL_STATE = {
  notifications:[],
  newNotfication:false 
};
const NotificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.ALLNOTIFICATIONS: 
    const index =  action.data.findIndex((s) => s.read === 0) 
    if (index>=0) { 
     newNotfication=false
     }
     else{
      newNotfication=true

     }
      return {...state, notifications: action.data,newNotfication:newNotfication};
    case t.MARKASREAD:  
    const sm = state.notifications.findIndex((s) => s.id === action.data) 
    if (sm>=0) { 
    state.notifications[sm].read=1 
   }
   var notifications =state.notifications
      return {...state, notifications: notifications};
    
    default:
      return {...state};
  }
};
export default NotificationsReducer;
