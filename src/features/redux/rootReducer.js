import {combineReducers} from 'redux';
import {reducer as authReducer} from '../../modules/auth';
import {reducer as appReducer} from '../../modules/app';
import {reducer as categoriesReducer} from '../../modules/categories';
import {reducer as OtherReducer} from '../../modules/other';
import {reducer as creditCardsReducer} from '../../modules/creditCards';
import {reducer as AddressReducer} from '../../modules/address';
import {reducer as OrderReducer} from '../../modules/order';
import {reducer as ProfileReducer} from '../../modules/profile';
import {reducer as PagesReducer} from '../../modules/pages';
import {reducer as NewsReducer} from '../../modules/news';
import {reducer as NotificationsReducer} from '../../modules/notifications';
import {reducer as VoucherReducer} from '../../modules/voucher';
import {reducer as InvoiceReducer} from '../../modules/invoice';

const mainReducer = combineReducers({
  authReducer,
  appReducer,
  categoriesReducer,
  OtherReducer,
  creditCardsReducer,
  AddressReducer,
  OrderReducer,
  ProfileReducer,
  PagesReducer,
  NewsReducer,
  NotificationsReducer,
  VoucherReducer,
  InvoiceReducer,
});

const rootReducer = (state, action) => mainReducer(state, action);

export default rootReducer;
