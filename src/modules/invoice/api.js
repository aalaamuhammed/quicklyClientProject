import {clientApi} from '../../helpers/axios';

export async function get_invoice_details(invoice_id) {
  return await clientApi.get(`invoice/details/${invoice_id}`, null, {
    headers: {},
  });
}

export async function invoice_checkout(data) {
  return await clientApi.post(`invoice/checkout`, data, {
    headers: {},
  });
}

export async function make_review(data) {
  return await clientApi.post(`reviews/create`, data, {
    headers: {},
  });
}
