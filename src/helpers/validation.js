// import valid from "card-validator";
import lang from '../localization';

// const toStatus = validation => {
//   return validation.isValid ? "valid" :
//     validation.isPotentiallyValid ? "incomplete" :
//       "invalid";
// };
export default function validate(fieldName, isRequired, value, value2) {
  if (isRequired == true) {
    if (value == null || value == '') return lang.Validation.required
  }
  if (fieldName != '') {
    if (fieldName == 'email') {
      reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!reg.test(value)) {
        return lang.Validation.email
      }
      if (value.length > 20) {
        return lang.Validation.exceded
      }
    }
    if (fieldName == 'password') {
      reg2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (!reg2.test(value)) {
        return lang.Validation.passwordwrog
      }
      if (value.length > 8) {
        return lang.Validation.exceded
      }
    }
    if (fieldName == 'confirmPassword') {
      if (value != value2) {
        return lang.Validation.confirmPassword
      }
    }
    if (fieldName == 'dropdown') {
      if (value == value2) {

        return lang.Validation.dropdown1 + value2 + lang.Validation.dropdown2
      }
    }
    // if (fieldName == 'cardNo') {
    //   const numberValidation = valid.number(value);
    //   const number = toStatus(numberValidation)
    //   if (number === 'invalid') {
    //     return lang.Validation.cardNoinvalid
    //   }
    //   if (number === 'incomplete') {
    //     return lang.Validation.cardNoincomplete
    //   }
    // }
    // if (fieldName == 'cardExp') {
    //   const expiryValidation = valid.expirationDate(value);
    //   const expiry = toStatus(valid.expirationDate(value))
    //   if (toStatus(valid.expirationDate(value)) === 'invalid') {
    //     return lang.Validation.cardExpinvalid
    //   }
    //   if (expiry === 'incomplete') {
    //     return lang.Validation.cardExpincomplete
    //   }
    // }
    // if (fieldName == 'cardCVC') {
    //   const FALLBACK_CARD = { gaps: [4, 8, 12], lengths: [16], code: { size: 3 } };
    //   const maxCVCLength = (value2 || FALLBACK_CARD).code.size;
    //   const cvcValidation = valid.cvv(value, maxCVCLength);
    //   const cvc = toStatus(cvcValidation)
    //   if (cvc === 'invalid') {
    //     return lang.Validation.cardCVCinvalid
    //   }
    //   if (cvc === 'incomplete') {
    //     return lang.Validation.cardCVCincomplete
    //   }
    // }
    if(fieldName ==='phone'){
      if (value2 === false) {
        return lang.Validation.phone
      }
    }
  }
  return null
}
