import {commonApi, clientApi} from '../../helpers/axios';

export async function get_app_description() {
  return await commonApi.get('pages/app-desc', null, {
    headers: {},
  });
}

export async function view_one_app_description(address_id) {
  return await clientApi.get(`address/view/${address_id}`, null, {
    headers: {},
  });
}

export async function get_about_us() {
  return await commonApi.get('pages/about-us', null, {
    headers: {},
  });
}

export async function get_terms_conditions() {
  return await commonApi.get('pages/terms', null, {
    headers: {},
  });
}
export async function get_support_info() {
  return await commonApi.get('support/info', null, {
    headers: {},
  });
}
export async function get_app_version() {
  return await commonApi.get('app-version', null, {
    headers: {},
  });
}
