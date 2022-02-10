import {clientApi} from '../../helpers/axios';

export async function profiledata(data) {
  return await clientApi.get('profile', data, {
    headers: {},
  });
}

export async function profile_Update(data) {
  return await clientApi.post(`profile/update`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function getReview(data) {
  return await clientApi.get(`profile/reviews`, data, {
    headers: {},
  });
}

export async function review_app(data) {
  return await clientApi.post(`profile/review-app`, data, {
    headers: {},
  });
}
