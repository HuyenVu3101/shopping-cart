import { all } from 'redux-saga/effects';
import cartSaga from './cart/cartSaga';
import productSaga from './products/productsSaga';

export default function* rootSaga() {
  yield all([productSaga(), cartSaga()]);
}
