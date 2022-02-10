
import Snackbar from 'react-native-snackbar';
import * as t from './actionTypes';
import config from '../../assets/config.json'
import lang from '../../localization'

const initialState = {  language:  null,  loading: false, 
  faildmessage: null, successmessage: null,networkError:false,
   backendErrors:{}};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE': {
      return { ...state, language: action.lang };
    }
    case t.LOADING_ATTEMPT: {
      return { ...state, loading: true };
    }
    case t.LOADING_FINISH: {
      return { ...state, loading: false };
    }
    case t.API_SUCCESS: {
      Snackbar.show({
        backgroundColor: '#317B01',
        fontFamily:'Cairo-Regular',
        text: lang.apisuccessmesages[action.success],
        numberOfLines:3,
        duration: Snackbar.LENGTH_LONG ,
        action: {
          text: 'x',
          textColor: config.colors.fontColor,
          onPress: () => Snackbar.dismiss(),
        },
      });
      return { ...state, successmessage: action.success };
    }
    case t.API_FAILED: { 
      
      Snackbar.show({
        backgroundColor: '#e5383b',
        // text:"error",
        // {translates('loginqution2')}
        fontFamily:'Cairo-Regular',
        text:   (action.error.error.errorCode==0 && action.error.error.result==false)?action.error.msg:lang.apifailmessages[action.error.msg],
        numberOfLines:3,
        duration: Snackbar.LENGTH_LONG ,
        rtl:true,
        action: {
          text: 'close',
          textColor: config.colors.fontColor,
          onPress: () => Snackbar.dismiss(),
        },
      });
      return { ...state, faildmessage: action.error,networkError:action.error.error.message==='Network Error'?true:false };
    }
    case t.GIVE_FEEDBACK: {
      return { ...state,   backendErrors:action.data };
    }
    default:
      return state;
  }
}
export default appReducer
