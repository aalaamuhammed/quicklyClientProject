import {clientApi} from '../../helpers/axios';

export async function get_allAdresses() {
  return await clientApi.get('address/all', null, {
    headers: {},
  });
}

export async function view_One_Address(address_id) {
  return await clientApi.get(`address/view/${address_id}`, null, {
    headers: {},
  });
}
export async function create_address(data) {
  return await clientApi.post(`address/create`, data, {
    headers: {},
  });
}
export async function edit_address(data) {
  return await clientApi.post(`address/edit/${data.id}`, data, {
    headers: {},
  });
}
export async function delete_Address(address_id) {
  return await clientApi.get(`address/delete/${address_id}`, null, {
    headers: {},
  });
}
