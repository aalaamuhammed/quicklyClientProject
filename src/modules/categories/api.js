import {commonApi} from '../../helpers/axios';

export async function mainCategories() {
  return await commonApi.get('mainCategories', null);
}

export async function subCategories(cat_id) {
  return await commonApi.get(`category/${cat_id}/sub-categories`, null);
}

export async function devices(cat_id) {
  return await commonApi.get(`category/${cat_id}/devices`, null);
}

export async function deviceBrands(device_id) {
  return await commonApi.get(`deviceBrands/${device_id}`, null);
}

export async function companyTypes(data) {
  return await commonApi.post(`subCategories/companyTypes`, data);
}
