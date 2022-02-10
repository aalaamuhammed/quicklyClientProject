import {clientApi} from '../../helpers/axios';

export async function get_voucher_details(voucher_id) {
  return await clientApi.get(`voucher/details/${voucher_id}`, null, {
    headers: {},
  });
}

export async function voucher_checkout(data) {
  return await clientApi.post('voucher/checkout', data, {
    headers: {},
  });
}
