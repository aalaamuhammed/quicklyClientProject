import * as t from './actionTypes';

const INITIAL_STATE = {
  news:[],
  oneNews: null,
};
const NewsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.ALLNEWS: 
      return {...state, news: action.data};
    case t.ONE_NEWS:  
      return {...state, oneNews: action.data};
    
    default:
      return {...state};
  }
};
export default NewsReducer;
