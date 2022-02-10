import {clientApi} from '../../helpers/axios';

export async function get_all_Cards() {
  return await clientApi.get('cards/all', null, {
    headers: {},
  });
}

export async function view_One_Card(card_id) {
  return await clientApi.get(`cards/view/${card_id}`, null, {
    headers: {},
  });
}
export async function create_Card(data) {
  return await clientApi.post(`cards/create`, data, {
    headers: {},
  });
}
export async function edit_Card(data) {
  return await clientApi.post(`cards/edit/${data.card_id}`, data, {
    headers: {},
  });
}
export async function delete_Card(card_id) {
  return await clientApi.delete(`cards/delete/${card_id}`, null, {
    headers: {},
  });
}
