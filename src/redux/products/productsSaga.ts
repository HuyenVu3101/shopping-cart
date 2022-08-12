import { call, put, takeLatest } from 'redux-saga/effects';
import productApi from '~/api/productApi';
import { ProductDetail } from '~/models';
import { productActions } from './productsSlice';

function* handleGetProductList() {
  try {
    const res: ProductDetail[] = yield call(productApi.getAllProduct);
    yield put(productActions.GET_LIST_PRODUCT_SUCCESS(res));
  } catch (error) {
    console.log('Error:', error);
  }
}

export default function* productSaga() {
  yield takeLatest(productActions.GET_LIST_PRODUCT.type, handleGetProductList);
}
