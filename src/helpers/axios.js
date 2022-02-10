/* eslint-disable prettier/prettier */
import axios from 'axios';
import lang from '../localization';

export const commonApi = axios.create({
  baseURL: 'https://quickly-egypt.com/api/v1/',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    locale: lang.lang,
  },
});
export const clientApi = axios.create({
  baseURL: 'https://quickly-egypt.com/api/v1/client/',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    locale: lang.lang,
  },
});
