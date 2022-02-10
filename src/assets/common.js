import {I18nManager} from 'react-native';
import config from './config.json';
const common = {
  headerTitle: {
    color: '#fff',
  },
  grayColor: '#97958D',
  dir: I18nManager.isRTL ? 'left' : 'right',
  diropp: I18nManager.isRTL ? 'right' : 'left',
  BoldfontFamily: 'Cairo-Bold',
  fontstyles: {
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    textAlign: I18nManager.isRTL ? 'left' : 'left',
    // Platform.OS !== 'android' ? {direction: isRTL ? 'rtl' : 'ltr'} : null;
    fontFamily: 'Cairo-Regular',
      // fontWeight: 'bold'
  },
  horizontalview: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStyle: {
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 1,
    // },
    // shadowOpacity: 0.20,
    // shadowRadius: 1.41,

    // elevation: 2,
    // borderWidth: 1,
    // borderColor: 'transparent',
    flexDirection: 'row',
    // borderRadius: 5,
    // margin: 5,
    // marginVertical: 10,
  },
  productName: {
    fontSize: 14,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  labels: {
    fontSize: 10,
    color: '#D2D2D4',
    flex: 0,
    backgroundColor: '#fff',
    zIndex: 3,
  },
  graycolor: '#D2D2D4',
  fields: {
    container: {
      flex: 1,
      marginHorizontal: 20,
      // maxWidth: 330,
    },
    errormessage: {
      fontSize: 10,
      color: '#FF0000',
      margin: 2,
    },
    fieldContainer: {
      flex: 1,
      flexDirection: 'row',
      borderStyle: 'solid',
      borderWidth: 1,
      // borderRadius: 5,
      alignItems: 'center',
      zIndex: 2,
      borderRadius: 2,
      borderColor: '#DFDFDF',
      backgroundColor: '#FAFBFE',
      paddingHorizontal: 10,
    },
  },
  radio: {
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    radioContainer: {
      margin: 15,
      marginHorizontal: 20,
      // flexDirection: 'row',
      // alignItems: 'center',
    },
    circle: {
      height: 15,
      width: 15,
      margin: 5,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ACACAC',
      alignItems: 'center',
      justifyContent: 'center',
    },

    checkedCircle: {
      width: 10,
      height: 10,
      borderRadius: 7,
      backgroundColor: config.colors.mainBgColor,
    },
  },
};
export default common;
