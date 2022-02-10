import {commonApi} from '../../helpers/axios';

export async function getPaymentMethods() {
  return await commonApi.get(`paymentMethods`, null, {
    headers: {},
  });
}
