import {commonApi, clientApi} from '../../helpers/axios';

export async function getGovernorates() {
  return await commonApi.get(`governorates`, null, {
    headers: {},
  });
}

export async function Request_Pricing(data) {
  return await clientApi.post(`pricingRequest`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
export async function getPaymentMethods() {
  return await commonApi.get(`paymentMethods`, null, {
    headers: {},
  });
}
export async function pricing_background_img() {
  return await clientApi.get(`pricingRequest/background-image`, null, {
    headers: {},
  });
}
