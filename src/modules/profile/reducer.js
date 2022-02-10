import * as t from './actionTypes';

const INITIAL_STATE = {
  userInformation: {},
  UserReviews: [],
  doneReview:false,
};
const ProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.USERINFO:
      return {...state, userInformation: action.data};
      case t.REVIEW:
        return {...state, UserReviews: action.data};
        case t.MAKEREVIEW:
          return {...state, doneReview: action.data};
    default:
      return state;
  }
};
export default ProfileReducer;
