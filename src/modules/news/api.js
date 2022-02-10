import {commonApi} from '../../helpers/axios';

export async function get_allNews() {
  return await commonApi.get('news/index', null, {
    headers: {},
  });
}

export async function view_One_News(news_id) {
  return await commonApi.get(`news/view/${news_id}`, null, {
    headers: {},
  });
}
