import {commonApi, clientApi} from '../../helpers/axios';

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

export async function getShippedOrders() {
  return await clientApi.get('order/shipped-devices', null, {
    headers: {},
  });
}

export async function apply_coupon(data) {
  return await clientApi.post('order/apply-coupon', data, {
    headers: {},
  });
}
export async function warranty_problem(data) {
  return await clientApi.post('order/warranty-problem', data, {
    headers: {},
  });
}
export async function received_shipped_device(order_id) {
  return await clientApi.get(
    'order/received-shipped-device/' + order_id,
    null,
    {
      headers: {},
    },
  );
}
export async function engineer_profile(engineer_id) {
  return await commonApi.get('engineer/profile/' + engineer_id, null, {
    headers: {},
  });
}

export async function engineer_reviews(engineer_id) {
  return await commonApi.get('engineer/profile/' + engineer_id, null, {
    headers: {},
  });
}
