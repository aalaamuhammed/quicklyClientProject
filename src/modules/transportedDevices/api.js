import {clientApi} from '../../helpers/axios';

export async function requestOrder(data) {
  return await clientApi.post('order/request', data, {
    headers: {},
  });
}

export async function getOrderDetails(order_id) {
  return await clientApi.get(`order/details/${order_id}`, null, {
    headers: {},
  });
}

export async function cancel_Order(order_id) {
  return await clientApi.get(`order/cancel/${order_id}`, null, {
    headers: {},
  });
}
export async function complain(data) {
  return await clientApi.post(`order/complain`, data, {
    headers: {},
  });
}

export async function getCurrentOrders() {
  return await clientApi.get('order/status/current', null, {
    headers: {},
  });
}

export async function getComplatedOrders() {
  return await clientApi.get('order/status/completed', null, {
    headers: {},
  });
}

export async function getWarrantyOrders() {
  return await clientApi.get('order/warranty', null, {
    headers: {},
  });
}
